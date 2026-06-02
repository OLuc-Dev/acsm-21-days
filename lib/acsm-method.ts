export type JourneyLength = 7 | 14 | 21;

export type FearType =
  | "judgment"
  | "failure"
  | "starting"
  | "visibility"
  | "discipline"
  | "rejection"
  | "uncertainty";

export type FearProfile = {
  id: FearType;
  title: string;
  diagnostic: string;
};

export const fearProfiles: FearProfile[] = [
  {
    id: "judgment",
    title: "Julgamento",
    diagnostic: "Você imagina a reação dos outros antes de testar a própria ação.",
  },
  {
    id: "failure",
    title: "Falhar",
    diagnostic: "Você trata erro como identidade, não como informação.",
  },
  {
    id: "starting",
    title: "Começar",
    diagnostic: "Você transforma o primeiro passo em uma prova impossível.",
  },
  {
    id: "visibility",
    title: "Aparecer",
    diagnostic: "Você sente que ser visto é quase sempre ser atacado.",
  },
  {
    id: "discipline",
    title: "Disciplina",
    diagnostic: "Você associa constância com prisão, cobrança ou perda de liberdade.",
  },
  {
    id: "rejection",
    title: "Rejeição",
    diagnostic: "Você evita se posicionar para não confirmar uma recusa antiga.",
  },
  {
    id: "uncertainty",
    title: "Incerteza",
    diagnostic: "Você espera garantia antes de agir e chama isso de prudência.",
  },
];

export const journeyOptions: JourneyLength[] = [7, 14, 21];

export const acsmPrinciples = [
  "Nomear o medo antes que ele escolha por você.",
  "Enxergar o padrão de fuga sem chamar isso de fraqueza.",
  "Executar uma ação pequena que contradiz a fuga.",
];
