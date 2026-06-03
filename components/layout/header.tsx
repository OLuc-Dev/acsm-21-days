"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const appLinks = [
  { href: "/dashboard", label: "Hoje" },
  { href: "/progress", label: "Progresso" },
  { href: "/journal", label: "Diário" },
];

const landingLinks = [
  { href: "#metodo", label: "Método" },
  { href: "#jornada", label: "Jornada" },
  { href: "#tom", label: "Tom" },
];

export function Header() {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050506]/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3" aria-label="ACSM 21 Days">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d6a15d]/35 bg-[#d6a15d]/10 text-xs font-bold text-[#f0b76a]">
            A
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.32em] text-[#f5f2ea]">
            ACSM
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-[#a7a29a] md:flex">
          {isLanding
            ? landingLinks.map((link) => (
                <a key={link.href} href={link.href} className="transition hover:text-[#f5f2ea]">
                  {link.label}
                </a>
              ))
            : appLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition hover:text-[#f5f2ea] ${
                      isActive ? "text-[#f0b76a]" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
        </nav>
        <Button asChild size="sm" variant="secondary">
          <Link href={isLanding ? "/onboarding" : "/dashboard"}>
            {isLanding ? "Iniciar" : "Hoje"}
          </Link>
        </Button>
      </div>
    </header>
  );
}
