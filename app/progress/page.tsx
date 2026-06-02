import { JourneyProgress } from "@/components/acsm/journey-progress";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  ["Streak atual", "1 dia"],
  ["Média emocional", "3/5"],
  ["Medo trabalhado", "Começar"],
];

export default function ProgressPage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-5xl px-5 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#d6a15d]">Progresso</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.06em] md:text-6xl">
          Progresso é ver onde você parou de obedecer automaticamente.
        </h1>
        <div className="mt-10 grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
          <JourneyProgress completedDays={1} totalDays={7} />
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map(([label, value]) => (
              <Card key={label}>
                <CardHeader>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#d6a15d]">{label}</p>
                  <CardTitle>{value}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
