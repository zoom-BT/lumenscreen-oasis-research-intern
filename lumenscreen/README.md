# Lumenscreen

Démo diagnostic OASIS-2. **Next.js** (présentation) + **FastAPI** (contrat + inférence). Pas un dispositif médical.

## Prérequis déjà présents

- Node v24 + npm 11
- Python 3.13, FastAPI, scikit-learn
- `oasis_outputs/models/best_pipeline.joblib`

## Lancer

Deux terminaux, depuis `Rapport_Stage_MCI` :

```
python -m uvicorn lumenscreen.main:app --reload --host 127.0.0.1 --port 8000
```

```
cd lumenscreen-web
npm run dev
```

Ouvrir http://127.0.0.1:3000 — Protocole → Diagnostic → Architecture.

Next proxifie `/api/*` vers FastAPI `:8000`.
