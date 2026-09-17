"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ScoreDiagnostic } from "@/lib/types";

const EXAMPLES = {
  nondemented: {
    sex: "M",
    Age: "87",
    EDUC: "14",
    SES: "2",
    MMSE: "27",
    eTIV: "1987",
    nWBV: "0.696",
    ASF: "0.883",
  },
  demented: {
    sex: "M",
    Age: "75",
    EDUC: "12",
    SES: "",
    MMSE: "23",
    eTIV: "1678",
    nWBV: "0.736",
    ASF: "1.046",
  },
} as const;

type FormState = {
  sex: string;
  Age: string;
  EDUC: string;
  SES: string;
  MMSE: string;
  eTIV: string;
  nWBV: string;
  ASF: string;
};

const EMPTY: FormState = {
  sex: "",
  Age: "",
  EDUC: "",
  SES: "",
  MMSE: "",
  eTIV: "",
  nWBV: "",
  ASF: "",
};

export function DiagnoseForm() {
  const [form, setForm] = useState({ ...EMPTY });
  const [error, setError] = useState("");
  const [score, setScore] = useState<ScoreDiagnostic | null>(null);
  const [pending, setPending] = useState(false);

  function setField(name: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setPending(true);
    const body: Record<string, string> = {};
    for (const [key, value] of Object.entries(form)) {
      if (value !== "") body[key] = value;
    }
    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        const detail = data.detail;
        setError(
          typeof detail === "object" && detail?.error
            ? detail.error
            : "Requête refusée.",
        );
        return;
      }
      setScore(data as ScoreDiagnostic);
    } catch {
      setError("Le service de diagnostic ne répond pas. Lancer l’API FastAPI :8000.");
    } finally {
      setPending(false);
    }
  }

  const pct = score ? Math.round(score.probability * 100) : 0;
  const gaugeClass = [
    "gauge",
    score?.predicted_positive ? "is-pos" : "",
    pending ? "is-busy" : "",
    score ? "is-ready" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="case">
      <section className="sheet" aria-labelledby="fiche-titre">
        <header className="sheet__head">
          <h1 id="fiche-titre">Fiche de visite index</h1>
          <p>Huit variables du contrat. Aucun champ CDR.</p>
        </header>
        <p className="examples">
          Remplir avec un exemple
          <button
            type="button"
            className="textbtn"
            onClick={() => setForm({ ...EXAMPLES.nondemented })}
          >
            OAS2_0001 (nondemented)
          </button>
          <button
            type="button"
            className="textbtn"
            onClick={() => setForm({ ...EXAMPLES.demented })}
          >
            OAS2_0002 (demented)
          </button>
        </p>
        <form onSubmit={onSubmit}>
          <fieldset className="sex">
            <legend>Sexe</legend>
            <label>
              <input
                type="radio"
                name="sex"
                value="F"
                checked={form.sex === "F"}
                onChange={() => setField("sex", "F")}
                required
              />{" "}
              Femme
            </label>
            <label>
              <input
                type="radio"
                name="sex"
                value="M"
                checked={form.sex === "M"}
                onChange={() => setField("sex", "M")}
              />{" "}
              Homme
            </label>
          </fieldset>
          <div className="fields">
            {(
              [
                ["Age", "Âge (années)", "40", "110", "1"],
                ["EDUC", "Éducation (années)", "0", "30", "1"],
                ["SES", "SES (1 à 5, optionnel)", "1", "5", "1"],
                ["MMSE", "MMSE (0 à 30)", "0", "30", "1"],
                ["eTIV", "eTIV (cm³)", "800", "2500", "1"],
                ["nWBV", "nWBV", "0.5", "1", "0.001"],
                ["ASF", "ASF", "0.6", "2", "0.001"],
              ] as const
            ).map(([name, label, min, max, step]) => (
              <label key={name}>
                {label}
                <input
                  name={name}
                  type="number"
                  min={min}
                  max={max}
                  step={step}
                  required={name !== "SES"}
                  value={form[name]}
                  onChange={(e) => setField(name, e.target.value)}
                />
              </label>
            ))}
          </div>
          {error ? <p className="err">{error}</p> : null}
          <button type="submit" className="btn" disabled={pending}>
            {pending ? "Calcul en cours" : "Obtenir le score"}
          </button>
        </form>
      </section>
      <aside className="instrument" aria-live="polite">
        <h2>Instrument</h2>
        <figure className="plate plate--console">
          <Image
            src="/images/console.jpg"
            alt="Poste de lecture IRM et fiche papier dans un laboratoire de neuroimagerie."
            width={1200}
            height={900}
          />
        </figure>
        <div className={gaugeClass}>
          <div className="gauge__track">
            <div className="gauge__fill" style={{ height: `${pct}%` }} />
            <span className="gauge__tick gauge__tick--lo">0</span>
            <span className="gauge__tick gauge__tick--hi">1</span>
          </div>
          <div className="gauge__readout">
            <p className="gauge__p">
              {score ? score.probability.toFixed(2).replace(".", ",") : ""}
            </p>
            <p className="gauge__cls">
              {pending
                ? "Lecture du pipeline"
                : score
                  ? score.label
                  : "Remplir la fiche puis obtenir le score"}
            </p>
            <p className="gauge__meta">
              {score
                ? `${score.model_name}, seuil ${String(score.threshold).replace(".", ",")}`
                : "Forêt figée. L’écran ne réentraîne pas le modèle."}
            </p>
            {score ? (
              <p className="gauge__next">
                <Link href="/prevention">Lire les conseils de prévention</Link>
              </p>
            ) : null}
          </div>
        </div>
        {score ? (
          <ol className="imp">
            {score.importances.map((item) => (
              <li key={item.feature}>
                <span>{item.label}</span>
                <b>{item.weight.toFixed(2).replace(".", ",")}</b>
              </li>
            ))}
          </ol>
        ) : null}
      </aside>
    </div>
  );
}
