from __future__ import annotations

from pathlib import Path

import joblib
import numpy as np
import pandas as pd

from lumenscreen.application.dto import ProfilOASIS
from lumenscreen.domain.contract import FEATURES

DEFAULT_MODEL = (
    Path(__file__).resolve().parents[2]
    / "oasis_outputs"
    / "models"
    / "best_pipeline.joblib"
)


class SklearnInferenceAdapter:
    """Charge le joblib figé. Aucun réentraînement derrière le formulaire."""

    def __init__(self, model_path: Path | None = None) -> None:
        self.model_path = Path(model_path) if model_path else DEFAULT_MODEL
        self._blob: dict | None = None

    def load(self) -> None:
        if not self.model_path.is_file():
            raise FileNotFoundError(
                f"Modèle introuvable : {self.model_path}. "
                "Exécuter oasis_experiments.py d’abord."
            )
        self._blob = joblib.load(self.model_path)
        stored = tuple(self._blob.get("features") or FEATURES)
        if stored != FEATURES:
            raise RuntimeError(
                f"Schéma du joblib {stored} ≠ contrat {FEATURES}."
            )

    @property
    def ready(self) -> bool:
        return self._blob is not None

    @property
    def model_name(self) -> str:
        if not self._blob:
            return "unloaded"
        return str(self._blob.get("model_name", "unknown"))

    def predict(self, profile: ProfilOASIS) -> dict:
        if not self._blob:
            self.load()
        pipeline = self._blob["pipeline"]
        row = profile.as_row()
        frame = pd.DataFrame([{k: row[k] for k in FEATURES}])
        proba = float(pipeline.predict_proba(frame)[0, 1])
        return {
            "probability": proba,
            "model_name": self.model_name,
            "importances": self._importances(pipeline),
        }

    def _importances(self, pipeline) -> list[dict]:
        clf = pipeline.named_steps.get("clf")
        if clf is None or not hasattr(clf, "feature_importances_"):
            return []
        weights = np.asarray(clf.feature_importances_, dtype=float)
        pairs = sorted(
            zip(FEATURES, weights),
            key=lambda item: item[1],
            reverse=True,
        )
        return [{"feature": name, "weight": round(float(w), 4)} for name, w in pairs]
