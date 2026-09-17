from __future__ import annotations

from lumenscreen.application.dto import ProfilOASIS, ScoreDiagnostic
from lumenscreen.domain.contract import FEATURE_LABELS
from lumenscreen.domain.policy import DISCLAIMER, NEGATIVE_LABEL, POSITIVE_LABEL, THRESHOLD
from lumenscreen.infrastructure.ml_adapter import SklearnInferenceAdapter


class DiagnosisService:
    def __init__(self, adapter: SklearnInferenceAdapter) -> None:
        self._adapter = adapter

    def diagnose(self, profile: ProfilOASIS) -> ScoreDiagnostic:
        result = self._adapter.predict(profile)
        proba = result["probability"]
        positive = proba >= THRESHOLD
        importances = [
            {
                "feature": item["feature"],
                "label": FEATURE_LABELS.get(item["feature"], item["feature"]),
                "weight": item["weight"],
            }
            for item in result["importances"]
        ]
        return ScoreDiagnostic(
            probability=round(float(proba), 4),
            predicted_positive=bool(positive),
            label=POSITIVE_LABEL if positive else NEGATIVE_LABEL,
            threshold=THRESHOLD,
            model_name=result["model_name"],
            importances=importances,
            values=profile.as_row(),
            disclaimer=DISCLAIMER,
        )
