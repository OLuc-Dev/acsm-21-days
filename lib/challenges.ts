import type { DailyChallenge } from "@/lib/types";

export const initialChallenges: DailyChallenge[] = [
  {
    day: 1,
    title: "Diagnóstico do medo",
    diagnosis: "Hoje você não vai se cobrar coragem. Vai observar onde o medo está decidindo primeiro.",
    action: "Escreva uma tarefa pequena que você vem evitando e dê a ela 10 minutos de presença real.",
    reflectionPrompt: "Qual medo tentou negociar com você antes de começar?",
    closing: "Você não precisa vencer o medo inteiro hoje. Só precisa parar de obedecer uma vez.",
  },
  {
    day: 2,
    title: "Quebra da fuga automática",
    diagnosis: "A fuga parece alívio porque ela termina a tensão rápido. Depois ela cobra em silêncio.",
    action: "Escolha uma decisão adiada e execute o menor passo possível antes de pensar demais.",
    reflectionPrompt: "O que você costuma chamar de prudência, mas talvez seja fuga?",
    closing: "A ação pequena não resolve tudo. Ela retira autoridade do medo.",
  },
  {
    day: 3,
    title: "Desconforto controlado",
    diagnosis: "O corpo tenta convencer você de que desconforto é perigo. Nem sempre é.",
    action: "Faça uma ação útil que gere leve desconforto, sem aumentar a intensidade para provar nada.",
    reflectionPrompt: "Que sensação apareceu quando você não obedeceu imediatamente?",
    closing: "Você está treinando presença, não performance.",
  },
  {
    day: 4,
    title: "Exposição controlada",
    diagnosis: "Aparecer em baixa intensidade ensina ao medo que exposição não é sentença.",
    action: "Mostre uma parte pequena do que você está construindo para uma pessoa segura ou em um espaço controlado.",
    reflectionPrompt: "O que você imaginou que aconteceria antes de se expor?",
    closing: "Ser visto não precisa ser espetáculo. Pode ser só presença sem fuga.",
  },
  {
    day: 5,
    title: "Disciplina sem motivação",
    diagnosis: "Motivação é instável. Uma ação pequena repetida começa a quebrar a dependência do humor.",
    action: "Repita por 15 minutos uma tarefa importante mesmo sem vontade de começar.",
    reflectionPrompt: "Que argumento a fuga usou para tentar adiar sua ação?",
    closing: "Disciplina não é prisão quando ela devolve direção para você.",
  },
  {
    day: 6,
    title: "Revisão do padrão antigo",
    diagnosis: "O padrão antigo perde força quando você enxerga a sequência: tensão, negociação e fuga.",
    action: "Escreva uma situação recente em que você fugiu e identifique o primeiro sinal da negociação.",
    reflectionPrompt: "Em que ponto você poderia ter escolhido uma ação menor em vez de desaparecer?",
    closing: "Perceber o padrão já é começar a tirar o medo do automático.",
  },
  {
    day: 7,
    title: "Resumo da reconstrução",
    diagnosis: "Você não precisa fingir que virou outra pessoa. Precisa reconhecer onde deixou de obedecer.",
    action: "Liste três microações que você executou apesar do desconforto.",
    reflectionPrompt: "Qual prova pequena mostra que o medo perdeu autoridade?",
    closing: "O primeiro ciclo não encerra o medo. Ele prova que você pode responder diferente.",
  },
];

export function getChallengeForDay(day: number) {
  const safeDay = Math.max(day, 1);
  const challenge = initialChallenges.find((dailyChallenge) => dailyChallenge.day === safeDay);

  if (challenge) {
    return challenge;
  }

  const challengeTemplate = initialChallenges[(safeDay - 1) % initialChallenges.length];

  return {
    ...challengeTemplate,
    day: safeDay,
  };
}
