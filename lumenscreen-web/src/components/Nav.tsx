"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Protocole" },
  { href: "/diagnostic", label: "Diagnostic" },
  { href: "/prevention", label: "Prévention" },
  { href: "/architecture", label: "Architecture" },
] as const;

export function Nav() {
  const path = usePathname();
  return (
    <nav className="nav" aria-label="Principal">
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={path === link.href ? "page" : undefined}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
