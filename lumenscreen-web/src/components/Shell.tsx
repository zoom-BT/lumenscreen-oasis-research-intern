import Link from "next/link";
import { Nav } from "@/components/Nav";

const DISCLAIMER =
  "Outil de démonstration pédagogique. Ce n’est pas un dispositif médical, ni un avis clinique. Le score repose sur un modèle tabulaire entraîné sur OASIS-2 (visite index, n = 150), sans CDR parmi les prédicteurs. Il ne s’applique pas à un patient réel.";

type ShellProps = {
  children: React.ReactNode;
};

export function Shell({ children }: ShellProps) {
  return (
    <>
      <a className="skip" href="#contenu">
        Aller au contenu
      </a>
      <header className="mast">
        <div className="mast__brand">
          <Link href="/" className="wordmark">
            Lumenscreen
          </Link>
          <p className="mast__lab">UMMISCO, OASIS-2, research intern</p>
        </div>
        <Nav />
      </header>
      <main id="contenu">{children}</main>
      <footer className="colophon">
        <p>{DISCLAIMER}</p>
      </footer>
    </>
  );
}
