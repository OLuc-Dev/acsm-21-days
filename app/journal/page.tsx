import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function JournalPage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-4xl px-5 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#d6a15d]">Diário emocional</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.06em] md:text-6xl">
          O diário não é para se explicar. É para perceber a negociação da fuga.
        </h1>
        <Card className="mt-10">
          <CardHeader>
            <CardTitle>Reflexão do dia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="min-h-52 rounded-2xl border border-dashed border-white/15 bg-black/20 p-5 text-[#77716a]">
              Espaço reservado para a reflexão curta do usuário na próxima etapa funcional.
            </div>
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}
