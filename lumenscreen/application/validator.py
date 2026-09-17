from __future__ import annotations

from lumenscreen.application.dto import ProfilOASIS
from lumenscreen.domain.contract import BOUNDS, FEATURES, FORBIDDEN_FIELDS


class ContratViole(ValueError):
    def __init__(self, message: str, code: str = "contrat") -> None:
        super().__init__(message)
        self.code = code


def _norm_key(key: str) -> str:
    return " ".join(key.strip().lower().replace("-", "_").replace("/", " ").split())


def _as_float(name: str, raw, required: bool = True) -> float | None:
    if raw is None or raw == "":
        if required:
            raise ContratViole(f"Champ manquant : {name}.", "missing")
        return None
    try:
        return float(raw)
    except (TypeError, ValueError) as exc:
        raise ContratViole(f"{name} doit être numérique.", "type") from exc


def _check_bounds(name: str, value: float) -> None:
    lo, hi = BOUNDS[name]
    if not (lo <= value <= hi):
        raise ContratViole(
            f"{name} hors bornes OASIS plausibles ({lo:g}–{hi:g}).",
            "bounds",
        )


def validate_payload(payload: dict) -> ProfilOASIS:
    if not isinstance(payload, dict):
        raise ContratViole("Le corps doit être un objet JSON.", "type")

    for key in payload:
        nk = _norm_key(str(key))
        compact = nk.replace(" ", "")
        if nk in FORBIDDEN_FIELDS or compact in {f.replace(" ", "") for f in FORBIDDEN_FIELDS}:
            raise ContratViole(
                f"Champ interdit dans le contrat d’entrée : {key}. "
                "CDR, Group et identifiants ne sont pas des prédicteurs.",
                "forbidden",
            )

    sex_male = payload.get("sex_male")
    sex = payload.get("sex") or payload.get("M/F") or payload.get("mf")
    if sex_male in (None, ""):
        if sex is None or str(sex).strip() == "":
            raise ContratViole("Indiquer le sexe (F ou M).", "missing")
        token = str(sex).strip().upper()
        if token in {"M", "MALE", "H", "HOMME", "1"}:
            sex_male = 1
        elif token in {"F", "FEMALE", "FEMME", "0"}:
            sex_male = 0
        else:
            raise ContratViole("Sexe : F ou M.", "type")
    else:
        sex_male = int(float(sex_male))
        if sex_male not in (0, 1):
            raise ContratViole("sex_male doit valoir 0 ou 1.", "type")

    values = {"sex_male": sex_male}
    for name in FEATURES:
        if name == "sex_male":
            continue
        required = name != "SES"
        num = _as_float(name, payload.get(name), required=required)
        if num is not None:
            _check_bounds(name, num)
        values[name] = num

    return ProfilOASIS(**values)
