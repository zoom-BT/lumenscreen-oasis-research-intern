import type { Metadata } from "next";
import { Shell } from "@/components/Shell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Lumenscreen",
    template: "%s | Lumenscreen",
  },
  description:
    "Démo diagnostic OASIS-2. Outil pédagogique UMMISCO / research intern. Non clinique.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
