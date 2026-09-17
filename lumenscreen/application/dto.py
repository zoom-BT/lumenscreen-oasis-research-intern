from __future__ import annotations

from dataclasses import asdict, dataclass


@dataclass(frozen=True)
class ProfilOASIS:
    sex_male: int
    Age: float
    EDUC: float
    SES: float | None
    MMSE: float
    eTIV: float
    nWBV: float
    ASF: float

    def as_row(self) -> dict[str, float | None]:
        return {
            "sex_male": float(self.sex_male),
            "Age": self.Age,
            "EDUC": self.EDUC,
            "SES": self.SES,
            "MMSE": self.MMSE,
            "eTIV": self.eTIV,
            "nWBV": self.nWBV,
            "ASF": self.ASF,
        }


@dataclass(frozen=True)
class ScoreDiagnostic:
    probability: float
    predicted_positive: bool
    label: str
    threshold: float
    model_name: str
    importances: list[dict]
    values: dict
    disclaimer: str

    def as_dict(self) -> dict:
        return asdict(self)
