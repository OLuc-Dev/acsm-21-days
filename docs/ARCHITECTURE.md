# Arquitetura do ACSM 21 Days

Este documento define a arquitetura inicial do projeto ACSM 21 Days.

## Decisão técnica principal

O projeto deve começar como uma aplicação web responsiva, com arquitetura simples e escalável.

Stack recomendada para o MVP:

- Next.js com App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Persistência local no início
- Supabase em uma fase posterior

## Por que começar com web app

Um web app permite testar a ideia mais rápido do que um aplicativo mobile nativo.

O objetivo da primeira versão não é ter todas as funcionalidades, mas validar a experiência:

- a pessoa entende a proposta?
- ela completa os check-ins?
- ela sente que está evoluindo?
- ela compartilharia o resultado?

## Camadas do sistema

### Interface

Responsável pelas telas, componentes visuais e experiência do usuário.

Páginas principais:

- Landing page
- Onboarding
- Dashboard
- Diário
- Progresso
- Resultado final

### Domínio ACSM

Responsável pelas regras emocionais e lógicas do método.

Exemplos:

- tipos de medo;
- objetivos;
- desafios diários;
- perguntas de reflexão;
- cálculo de progresso;
- geração do resumo final.

Arquivos sugeridos:

```txt
lib/acsm-method.ts
lib/challenges.ts
lib/progress.ts
lib/reflections.ts
```

### Persistência

No MVP, os dados podem ficar no navegador usando LocalStorage ou IndexedDB.

Depois, a persistência deve migrar para Supabase.

Dados principais:

- perfil do usuário;
- objetivo escolhido;
- medo dominante;
- duração da jornada;
- check-ins;
- reflexões;
- progresso;
- resultado final.

### IA

A IA deve ser tratada como camada auxiliar, não como dependência obrigatória para o MVP.

Funções futuras:

- adaptar desafios;
- interpretar padrões emocionais;
- resumir evolução;
- gerar mensagens no tom ACSM;
- sugerir próximos passos.

## Modelo de dados inicial

```ts
export type JourneyLength = 7 | 14 | 21;

export type FearType =
  | 'judgment'
  | 'failure'
  | 'starting'
  | 'visibility'
  | 'discipline'
  | 'rejection'
  | 'uncertainty';

export type UserJourney = {
  id: string;
  name?: string;
  goal: string;
  fearType: FearType;
  length: JourneyLength;
  currentDay: number;
  startedAt: string;
  completedAt?: string;
};

export type DailyCheckIn = {
  id: string;
  journeyId: string;
  day: number;
  completed: boolean;
  emotionalScore: 1 | 2 | 3 | 4 | 5;
  reflection: string;
  createdAt: string;
};

export type DailyChallenge = {
  day: number;
  title: string;
  description: string;
  action: string;
  reflectionPrompt: string;
};
```

## Estrutura de pastas recomendada

```txt
app/
  page.tsx
  onboarding/page.tsx
  dashboard/page.tsx
  journal/page.tsx
  progress/page.tsx
  result/page.tsx

components/
  acsm/
    FearCard.tsx
    JourneyProgress.tsx
    DailyChallengeCard.tsx
    EmotionalCheckIn.tsx
  layout/
    AppShell.tsx
    Header.tsx
    Footer.tsx
  ui/

lib/
  acsm-method.ts
  challenges.ts
  progress.ts
  storage.ts
  utils.ts

docs/
  ARCHITECTURE.md
  MVP.md
  ACSM_METHOD.md
  AI_WORKFLOW.md
```

## Regras de produto

- O app não deve parecer uma lista genérica de hábitos.
- Toda tarefa deve conectar hábito com medo.
- O usuário precisa sentir diagnóstico, não palestra motivacional.
- A experiência deve ser curta, profunda e compartilhável.
- O MVP deve funcionar sem login.

## Critério de sucesso do MVP

O MVP está bom quando uma pessoa consegue:

1. entrar no site;
2. escolher um objetivo;
3. identificar um medo;
4. iniciar uma jornada;
5. completar um check-in;
6. visualizar progresso;
7. entender claramente a proposta ACSM.
