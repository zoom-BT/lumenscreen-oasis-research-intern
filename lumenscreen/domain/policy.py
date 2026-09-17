"""Règles métier : libellés, seuil, disclaimer non clinique."""

THRESHOLD = 0.5
POSITIVE_LABEL = "Demented + Converted"
NEGATIVE_LABEL = "Nondemented"

DISCLAIMER = (
    "Outil de démonstration pédagogique. Ce n’est pas un dispositif médical, "
    "ni un avis clinique. Le score repose sur un modèle tabulaire entraîné "
    "sur OASIS-2 (visite index, n = 150), sans CDR parmi les prédicteurs. "
    "Il ne s’applique pas à un patient réel."
)

MODEL_NOTE = (
    "Forêt aléatoire figée (meilleur AUC test = 0,75). "
    "L’interface ne réentraîne pas le modèle."
)
