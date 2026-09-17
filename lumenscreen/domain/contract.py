"""Contrat d'entrée : mêmes colonnes que oasis_experiments.py, sans CDR."""

FEATURES = ("sex_male", "Age", "EDUC", "SES", "MMSE", "eTIV", "nWBV", "ASF")

FORBIDDEN_FIELDS = frozenset(
    {
        "cdr",
        "group",
        "hand",
        "mri id",
        "mri_id",
        "mrid",
        "visit",
        "mr delay",
        "mr_delay",
        "subject id",
        "subject_id",
        "y",
        "group_raw",
    }
)

BOUNDS = {
    "Age": (40.0, 110.0),
    "EDUC": (0.0, 30.0),
    "SES": (1.0, 5.0),
    "MMSE": (0.0, 30.0),
    "eTIV": (800.0, 2500.0),
    "nWBV": (0.50, 1.00),
    "ASF": (0.60, 2.00),
}

FEATURE_LABELS = {
    "sex_male": "Sexe (codé homme)",
    "Age": "Âge (années)",
    "EDUC": "Éducation (années)",
    "SES": "Statut socio-économique (1–5)",
    "MMSE": "MMSE",
    "eTIV": "Volume intracrânien estimé (eTIV)",
    "nWBV": "Volume cérébral normalisé (nWBV)",
    "ASF": "Facteur d’échelle atlas (ASF)",
}
