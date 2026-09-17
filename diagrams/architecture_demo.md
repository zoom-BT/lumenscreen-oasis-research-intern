# Diagrammes — démo diagnostic OASIS-2 (conception logicielle)

Exporter chaque bloc sur [mermaid.live](https://mermaid.live) → PNG/SVG.  
Légendes pour le rapport : **Figures 5.3 à 5.8**.

Principes illustrés : séparation des responsabilités, contrat d’entrée **sans CDR**, entraînement ≠ inférence, disclaimer non clinique.

---

## FIG 5.3 — Cas d’utilisation

```mermaid
flowchart LR
  U[Utilisateur / démonstrateur]
  R[Encadrant / lecteur du rapport]

  subgraph Systeme["Lumenscreen — démo UMMISCO"]
    UC1((Consulter le cadrage<br/>et le disclaimer))
    UC2((Saisir un profil OASIS-2<br/>sans CDR))
    UC3((Obtenir un score<br/>de risque binaire))
    UC4((Voir l'explication<br/>des variables))
  end

  U --> UC1
  U --> UC2
  UC2 --> UC3
  UC3 --> UC4
  R --> UC1
```

---

## FIG 5.4 — Contexte (C4 niveau 1)

```mermaid
C4Context
  title Démo diagnostic — vue contexte
  Person(user, "Utilisateur", "Saisit un profil tabulaire OASIS-2")
  System(app, "Lumenscreen", "Mini-site : disclaimer, diagnostic, explication")
  System_Ext(art, "Artefacts ML", "best_pipeline.joblib + schéma de features")
  System_Ext(rep, "Rapport de stage", "Métriques, courbes, limites")

  Rel(user, app, "HTTPS / formulaire")
  Rel(app, art, "Charge le modèle figé")
  Rel(app, rep, "Même protocole anti-fuite")
```

Si C4 ne passe pas dans mermaid.live, utiliser celui-ci :

```mermaid
flowchart TB
  U[Utilisateur]
  APP[Lumenscreen<br/>présentation + API]
  ART[best_pipeline.joblib<br/>features figées]
  RAP[Rapport / métriques]

  U -->|saisie validée| APP
  APP -->|predict_proba| ART
  APP -.->|mêmes règles sans CDR| RAP
```

---

## FIG 5.5 — Architecture en couches

```mermaid
flowchart TB
  subgraph P["Présentation"]
    UI[Pages : accueil, disclaimer, formulaire, résultat]
  end

  subgraph A["Application"]
    CTRL[Contrôleur diagnostic]
    VAL[Validation du contrat d'entrée]
    DTO[DTO ProfilOASIS / ScoreDiagnostic]
  end

  subgraph D["Domaine"]
    POL[Politique : pas de CDR, seuils, libellés]
    DIS[Disclaimer non-clinique]
  end

  subgraph I["Infrastructure"]
    ML[Adaptateur inférence sklearn]
    FS[Fichiers joblib]
  end

  UI --> CTRL
  CTRL --> VAL
  VAL --> POL
  CTRL --> DIS
  CTRL --> ML
  ML --> FS
```

---

## FIG 5.6 — Séquence du diagnostic

```mermaid
sequenceDiagram
  actor U as Utilisateur
  participant UI as Interface
  participant API as Contrôleur
  participant V as Validateur
  participant M as Inférence RF

  U->>UI: Ouvre /diagnostic
  UI-->>U: Disclaimer + formulaire sans CDR
  U->>UI: Soumet âge, sexe, MMSE, volumes…
  UI->>API: POST /api/diagnose
  API->>V: Vérifier types, bornes, champs interdits
  alt CDR présent ou champ hors contrat
    V-->>API: 400 Contrat violé
    API-->>UI: Erreur explicite
  else OK
    V-->>API: ProfilOASIS
    API->>M: predict_proba(X)
    M-->>API: p, classe, importances
    API-->>UI: ScoreDiagnostic + bandeau non-clinique
    UI-->>U: Résultat + explication
  end
```

---

## FIG 5.7 — Composants

```mermaid
flowchart LR
  subgraph Front["Next.js (App Router)"]
    P1["/ protocole"]
    P2["/diagnostic"]
    P3["/architecture"]
  end

  subgraph API["FastAPI :8000"]
    R3["POST /api/diagnose"]
    R4["GET /api/contrat"]
  end

  subgraph Core
    S[DiagnosisService]
    C[InputContract]
  end

  subgraph ML
    P[Pipeline sklearn]
    J[joblib]
  end

  P2 --> R3
  R3 --> S
  S --> C
  S --> P
  P --> J
```

---

## FIG 5.8 — Entraînement vs inférence (MLOps léger)

```mermaid
flowchart LR
  subgraph Train["Hors ligne — oasis_experiments.py"]
    CSV[oasis_longitudinal.csv]
    EXP[Split 75/25, sans CDR]
    FIT[RF retenu]
    OUT[metrics + figures + joblib]
  end

  subgraph Serve["En ligne — Lumenscreen"]
    JOB[joblib figé]
    INF[Inférence seule]
    WEB[Mini-site]
  end

  CSV --> EXP --> FIT --> OUT
  OUT -->|copie versionnée| JOB
  JOB --> INF --> WEB

  note1[On ne réentraîne pas derrière le formulaire]
```

---

## FIG 5.9 — Déploiement local

```mermaid
flowchart TB
  B[Navigateur]
  N[Next.js :3000]
  S[Uvicorn FastAPI :8000]
  D[oasis_outputs/models]

  B --> N
  N -->|/api/*| S
  S --> D
```

Export : thème clair, fond blanc, PNG 1920 px de large pour le LaTeX.
