export type DailyChallenge = {
  day: number;
  title: string;
  diagnosis: string;
  action: string;
  reflectionPrompt: string;
  closing: string;
};

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
];
