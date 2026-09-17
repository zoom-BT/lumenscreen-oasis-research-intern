import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "Protocole" };

export default function HomePage() {
  return (
    <article className="protocol protocol--wide">
      <figure className="plate">
        <Image
          src="/images/mri.jpg"
          alt="Coupe IRM T1 axiale affichée sur un négatoscope, salle de lecture."
          width={1600}
          height={900}
          priority
        />
        <figcaption>
          Salle de lecture. Le modèle ne voit pas cette image : seulement des
          volumes tabulaires (eTIV, nWBV, ASF).
        </figcaption>
      </figure>
      <header className="protocol__head">
        <h1>Protocole de démonstration</h1>
        <p>
          Prédiction binaire du groupe OASIS-2 à la visite index. Pas un examen
          clinique.
        </p>
      </header>
      <section className="protocol__body">
        <p>
          Lumenscreen sert deux choses : <strong>poser un score</strong> sur un
          profil tabulaire (âge, sexe, éducation, SES, MMSE, volumes IRM) et{" "}
          <strong>montrer une conception</strong> : couches, contrat d’entrée,
          entraînement hors ligne.
        </p>
        <p>
          Le CDR, le groupe et les identifiants sont <em>refusés</em> par
          l’API. Le modèle est une forêt aléatoire déjà entraînée (AUC test
          0,75, n = 150). L’écran de diagnostic ne la réentraîne pas.
        </p>
        <ul className="facts">
          <li>
            <span>Question</span> Nondemented vs Demented + Converted
          </li>
          <li>
            <span>Données</span> OASIS-2, une ligne par participant
          </li>
          <li>
            <span>Seuil</span> 0,5 sur la probabilité positive
          </li>
        </ul>
        <form className="gate" action="/diagnostic" method="get">
          <label className="check">
            <input type="checkbox" name="ack" required />
            <span>
              J’ai lu le bandeau : cet outil n’est pas un dispositif médical.
            </span>
          </label>
          <button type="submit" className="btn">
            Ouvrir le diagnostic
          </button>
        </form>
      </section>
    </article>
  );
}
