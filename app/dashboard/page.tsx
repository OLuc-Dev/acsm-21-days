import { DailyChallengeCard } from "@/components/acsm/daily-challenge-card";
import { EmotionalCheckIn } from "@/components/acsm/emotional-check-in";
import { JourneyProgress } from "@/components/acsm/journey-progress";
import { AppShell } from "@/components/layout/app-shell";
import { initialChallenges } from "@/lib/challenges";

export default function DashboardPage() {
  const challenge = initialChallenges[0];

  return (
    <AppShell>
      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-20 lg:grid-cols-[1fr_0.42fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#d6a15d]">Dashboard diário</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.06em] md:text-6xl">
            Hoje você pratica uma desobediência pequena.
          </h1>
          <div className="mt-10">
            <DailyChallengeCard challenge={challenge} />
          </div>
        </div>
        <aside className="space-y-5 lg:pt-28">
          <JourneyProgress completedDays={1} totalDays={7} />
          <EmotionalCheckIn />
        </aside>
      </section>
    </AppShell>
  );
}
