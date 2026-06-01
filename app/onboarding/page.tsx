import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fearProfiles, journeyOptions } from "@/lib/acsm-method";

export default function OnboardingPage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-5xl px-5 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#d6a15d]">Onboarding</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.06em] md:text-6xl">
          Antes de montar a jornada, nomeie o que vem decidindo por você.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#a7a29a]">
          Esta tela estrutura o fluxo inicial do MVP. A interação e a persistência local entram na próxima etapa,
          sem login obrigatório e sem banco de dados.
        </p>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_0.85fr]">
          <Card>
            <CardHeader>
              <CardTitle>Objetivo principal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-[#a7a29a]">
                Exemplo: voltar a estudar, publicar conteúdo, cuidar do corpo, iniciar um projeto.
              </div>
              <Button type="button" variant="secondary">Campo visual por enquanto</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Duração</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-3">
              {journeyOptions.map((days) => (
                <button
                  key={days}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] py-4 text-sm font-semibold transition hover:border-[#d6a15d]/50 hover:bg-[#d6a15d]/10"
                  type="button"
                >
                  {days} dias
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {fearProfiles.map((fear) => (
            <Card key={fear.id} className="hover:border-[#d6a15d]/35">
              <CardHeader>
                <CardTitle>{fear.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-7 text-[#a7a29a]">{fear.diagnostic}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
