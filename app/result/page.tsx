import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResultPage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-4xl px-5 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#d6a15d]">Resultado final</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.06em] md:text-6xl">
          Você não eliminou o medo. Você provou que ele não precisa decidir sozinho.
        </h1>
        <Card className="mx-auto mt-10 max-w-2xl border-[#d6a15d]/25 bg-[#0c0b09] text-left">
          <CardHeader>
            <CardTitle>Card compartilhável</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 text-[#c7c0b6]">
            <p>Objetivo inicial: iniciar uma jornada real.</p>
            <p>Medo dominante: medo de começar.</p>
            <p>Dias concluídos: 7.</p>
            <p className="text-xl font-semibold tracking-[-0.03em] text-[#f5f2ea]">
              O primeiro passo não mudou sua vida inteira. Mas quebrou a autoridade do medo.
            </p>
            <Button type="button" variant="secondary">Compartilhar em breve</Button>
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}
