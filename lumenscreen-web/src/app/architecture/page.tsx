import type { Metadata } from "next";
import { ArchitectureScene } from "@/components/ArchitectureScene";

export const metadata: Metadata = { title: "Architecture" };

export default function ArchitecturePage() {
  return (
    <article className="arch">
      <header className="arch__head">
        <h1>Conception</h1>
        <p>
          Quatre étages séparés, du socle joblib jusqu’au navigateur. L’air
          entre les marches montre la profondeur. Cliquer une plaque ouvre son
          dossier.
        </p>
      </header>

      <ArchitectureScene />

      <section className="prisms" aria-label="Entraînement et inférence">
        <article className="prism">
          <div className="prism__box prism__box--train" aria-hidden="true">
            <span className="prism__top" />
            <span className="prism__east" />
            <span className="prism__south" />
          </div>
          <div>
            <h2>Hors ligne</h2>
            <ol>
              <li>CSV OASIS-2, visite index</li>
              <li>Split 75 / 25, sans CDR</li>
              <li>Forêt retenue, métriques</li>
              <li>joblib versionné</li>
            </ol>
          </div>
        </article>
        <article className="prism">
          <div className="prism__box prism__box--serve" aria-hidden="true">
            <span className="prism__top" />
            <span className="prism__east" />
            <span className="prism__south" />
          </div>
          <div>
            <h2>En ligne</h2>
            <ol>
              <li>Next.js, saisie validée</li>
              <li>FastAPI, contrat d’entrée</li>
              <li>predict_proba seulement</li>
              <li>Score et importances</li>
            </ol>
          </div>
        </article>
      </section>
    </article>
  );
}
