import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "Prévention" };

const LEVERS = [
  {
    title: "Bouger",
    text: "L’activité physique régulière est le levier le plus documenté pour le risque de déclin. Marche quotidienne, plutôt que un programme d’athlète.",
  },
  {
    title: "Soigner le corps",
    text: "Hypertension, diabète, audition, tabac : les traiter réduit une part du risque attribuable au niveau populationnel. C’est un suivi clinique, pas un score web.",
  },
  {
    title: "Dormir et relier",
    text: "Sommeil suffisant, liens sociaux, lecture ou apprentissage : ce n’est pas un médicament, c’est le terrain sur lequel le cerveau vieillit.",
  },
  {
    title: "Demander un avis",
    text: "Un oubli qui inquiète, une famille qui signale un changement : seul un professionnel de santé pose un diagnostic. Lumenscreen ne le remplace pas.",
  },
];

export default function PreventionPage() {
  return (
    <article className="prevent">
      <figure className="plate">
        <Image
          src="/images/prevention.jpg"
          alt="Deux personnes âgées marchant ensemble sur un chemin arboré."
          width={1600}
          height={900}
          priority
        />
        <figcaption>
          Pistes de prévention primaire, d’après la littérature de santé
          publique. Pas une ordonnance.
        </figcaption>
      </figure>
      <header>
        <h1>Espace préventif</h1>
        <p>
          Conseils généraux, pour le public et pour la soutenance. Ils ne
          découlent pas du score OASIS-2 et ne s’adressent pas à un patient
          nommé.
        </p>
      </header>
      <ol className="levers">
        {LEVERS.map((item) => (
          <li key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </li>
        ))}
      </ol>
      <p className="prevent__next">
        <Link href="/diagnostic">Revenir au diagnostic</Link>
      </p>
    </article>
  );
}
