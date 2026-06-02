import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
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
          <a href="#metodo" className="transition hover:text-[#f5f2ea]">Método</a>
          <a href="#jornada" className="transition hover:text-[#f5f2ea]">Jornada</a>
          <a href="#tom" className="transition hover:text-[#f5f2ea]">Tom</a>
        </nav>
        <Button asChild size="sm" variant="secondary">
          <Link href="/onboarding">Iniciar</Link>
        </Button>
      </div>
    </header>
  );
}
