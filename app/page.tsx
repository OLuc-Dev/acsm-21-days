import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FearCard } from "@/components/acsm/fear-card";
import { SectionHeading } from "@/components/acsm/section-heading";
import { acsmPrinciples, fearProfiles } from "@/lib/acsm-method";

const journeySteps = [
  "Escolha um objetivo real, não uma fantasia perfeita.",
  "Nomeie o medo que vem decidindo antes de você.",
  "Receba uma ação pequena para quebrar o padrão do dia.",
  "Faça um check-in emocional e registre o que tentou te parar.",
];

export default function Home() {
  return (
    <AppShell>
      <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:py-28">
        <div>
          <div className="inline-flex rounded-full border border-[#d6a15d]/25 bg-[#d6a15d]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#f0b76a]">
            Acabe Com Seus Medos
          </div>
          <h1 className="mt-8 max-w-4xl text-5xl font-semibold tracking-[-0.075em] text-[#f5f2ea] md:text-7xl">
            Você não perdeu disciplina. Você aprendeu a fugir antes de começar.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-9 text-[#a7a29a]">
            O ACSM 21 Days é uma jornada de reconstrução emocional guiada. Todos os dias, você identifica
            uma fuga, executa uma ação pequena e registra como o medo tentou negociar com você.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/onboarding">
                Começar jornada <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="#metodo">Entender o método</a>
            </Button>
          </div>
        </div>

        <Card className="relative overflow-hidden border-[#d6a15d]/20 bg-[#0c0b09]/80">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#d6a15d]/20 blur-3xl" />
          <CardHeader className="relative">
            <p className="text-sm uppercase tracking-[0.28em] text-[#d6a15d]">Dia 01</p>
            <CardTitle className="text-3xl">Diagnóstico do medo</CardTitle>
          </CardHeader>
          <CardContent className="relative space-y-6">
            <p className="text-base leading-8 text-[#c7c0b6]">
              Hoje o desafio não é vencer sua vida inteira. É desobedecer um medo específico por tempo suficiente
              para perceber que ele não manda em tudo.
            </p>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d6a15d]">Ação prática</p>
              <p className="mt-3 text-sm leading-7 text-[#f5f2ea]">
                Escolha uma tarefa pequena que você está adiando e execute por 10 minutos sem negociar com a fuga.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              <div className="rounded-2xl bg-white/[0.04] p-4">
                <strong className="block text-2xl text-[#f0b76a]">7</strong>
                dias iniciais
              </div>
              <div className="rounded-2xl bg-white/[0.04] p-4">
                <strong className="block text-2xl text-[#f0b76a]">14</strong>
                expansão
              </div>
              <div className="rounded-2xl bg-white/[0.04] p-4">
                <strong className="block text-2xl text-[#f0b76a]">21</strong>
                jornada total
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="metodo" className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading
          eyebrow="Método"
          title="Não é hábito genérico. É fuga emocional exposta."
          description="O ACSM não trata o usuário como fraco. Ele mostra o padrão que aprendeu a protegê-lo e cria uma ação pequena para quebrar essa autoridade."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {acsmPrinciples.map((principle, index) => (
            <Card key={principle}>
              <CardHeader>
                <span className="text-sm font-semibold text-[#d6a15d]">0{index + 1}</span>
                <CardTitle>{principle}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section id="jornada" className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading
          eyebrow="Fluxo"
          title="A jornada começa pequena para não virar mais uma cobrança."
          description="O MVP prioriza uma experiência curta: objetivo, medo dominante, desafio diário, check-in e progresso visível. Sem login obrigatório. Sem distrações."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-4">
          {journeySteps.map((step) => (
            <div key={step} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <CheckCircle2 className="h-5 w-5 text-[#d6a15d]" />
              <p className="mt-5 text-sm leading-7 text-[#c7c0b6]">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="tom" className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading
          eyebrow="Medos iniciais"
          title="O app começa onde a pessoa costuma se esconder."
          description="Cada medo precisa virar linguagem, diagnóstico e ação. O objetivo é diminuir a obediência à fuga, não vender motivação vazia."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {fearProfiles.map((fear) => (
            <FearCard key={fear.id} title={fear.title} diagnostic={fear.diagnostic} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
