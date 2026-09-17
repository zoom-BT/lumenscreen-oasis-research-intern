"use client";

import { useState, type CSSProperties } from "react";

const LAYERS = [
  {
    id: "infra",
    title: "Infrastructure",
    brief: "Artefact figé",
    face: "#1a5c4e",
    ink: "#fbfcfb",
    role: "Adapter l’inférence. Rien n’est réentraîné derrière le formulaire.",
    owns: ["SklearnInferenceAdapter", "best_pipeline.joblib", "predict_proba"],
    rule: "Le joblib est une copie versionnée du run oasis_experiments.py.",
  },
  {
    id: "domain",
    title: "Domaine",
    brief: "Règles métier",
    face: "#7fa394",
    ink: "#14202b",
    role: "Dire ce qui est permis, interdit, et comment nommer le résultat.",
    owns: ["8 features OASIS-2", "CDR et Group refusés", "seuil 0,5", "disclaimer"],
    rule: "Le contrat d’entrée est le même que le notebook, sans fuite de cible.",
  },
  {
    id: "app",
    title: "Application",
    brief: "Cas d’usage",
    face: "#c5d4ce",
    ink: "#14202b",
    role: "Orchestrer une demande de score : valider, appeler, renvoyer un DTO.",
    owns: ["POST /api/diagnose", "validate_payload", "DiagnosisService", "ProfilOASIS"],
    rule: "Un champ hors contrat (CDR, identifiant) lève 400, pas une prédiction.",
  },
  {
    id: "ui",
    title: "Présentation",
    brief: "Next.js",
    face: "#fbfcfb",
    ink: "#14202b",
    role: "Pages et jauge. Aucune logique sklearn dans React.",
    owns: ["/ protocole", "/diagnostic", "/prevention", "rewrites /api/*"],
    rule: "Le navigateur ne parle qu’à Next. Next proxifie FastAPI :8000.",
  },
] as const;

export function ArchitectureScene() {
  const [active, setActive] = useState<(typeof LAYERS)[number]["id"]>("ui");
  const current = LAYERS.find((layer) => layer.id === active) ?? LAYERS[3];

  return (
    <div className="arch3d">
      <div className="scene">
        <div className="stack">
          {LAYERS.map((layer, index) => (
            <button
              key={layer.id}
              type="button"
              className={`slab${active === layer.id ? " is-on" : ""}`}
              style={
                {
                  "--i": index,
                  "--face": layer.face,
                  "--ink": layer.ink,
                } as CSSProperties
              }
              onClick={() => setActive(layer.id)}
              aria-pressed={active === layer.id}
            >
              <span className="slab__south" />
              <span className="slab__east" />
              <span className="slab__top">
                <b>{layer.title}</b>
                <em>{layer.brief}</em>
              </span>
            </button>
          ))}
        </div>
      </div>

      <aside className="dossier" aria-live="polite">
        <p className="dossier__kicker">{current.brief}</p>
        <h2>{current.title}</h2>
        <p>{current.role}</p>
        <ul>
          {current.owns.map((item) => (
            <li key={item}>
              <code>{item}</code>
            </li>
          ))}
        </ul>
        <p className="dossier__rule">{current.rule}</p>
      </aside>
    </div>
  );
}
