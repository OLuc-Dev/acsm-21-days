# ACSM 21 Days

Aplicação baseada no método **ACSM — Acabe Com Seus Medos** para ajudar pessoas a reconstruírem hábitos, vencerem bloqueios emocionais e transformarem medo em ação prática em 21 dias.

O projeto não é apenas um app de hábitos. É uma experiência de reconstrução emocional guiada, com check-ins diários, desafios práticos, diário emocional e um painel de progresso que mostra para o usuário como ele está parando de obedecer ao medo.

## Visão

O ACSM 21 Days nasce para ser um produto digital simples, profundo e compartilhável.

A pessoa entra, escolhe uma jornada, identifica o medo principal que está travando sua vida e recebe pequenas ações diárias para quebrar o padrão de fuga. Ao final, ela gera um resumo visual da transformação para compartilhar nas redes sociais.

## Princípio central

> A pessoa não trava porque é fraca. Ela trava porque o medo aprendeu a decidir antes dela.

## MVP

A primeira versão deve focar em uma experiência funcional e bonita, sem excesso de features.

### Fluxo principal

1. Landing page dark/minimalista da ACSM.
2. Onboarding com escolha de objetivo e medo principal.
3. Escolha da jornada: 7, 14 ou 21 dias.
4. Dashboard diário com tarefa, reflexão e check-in.
5. Diário emocional simples.
6. Tela de progresso com dias concluídos, streak e evolução percebida.
7. Página final com resumo compartilhável.

### Funcionalidades iniciais

- Criar perfil local ou conta simples.
- Selecionar objetivo pessoal.
- Selecionar medo dominante.
- Receber desafio diário.
- Fazer check-in diário.
- Registrar nota emocional de 1 a 5.
- Escrever uma reflexão curta.
- Ver progresso da jornada.
- Gerar resumo final da transformação.

## Stack sugerida

### Front-end

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

### Back-end / Dados

Para o MVP, começar simples:

- LocalStorage ou IndexedDB para protótipo rápido.
- Depois evoluir para Supabase com autenticação e banco.

### IA

A IA não entra primeiro como chat genérico. Ela entra como um motor de reflexão ACSM:

- gerar perguntas de diagnóstico;
- adaptar desafios diários;
- resumir evolução do usuário;
- sugerir próximos passos com base nos check-ins.

## Estrutura planejada

```txt
acsm-21-days/
├── app/
│   ├── page.tsx
│   ├── onboarding/
│   ├── dashboard/
│   ├── journal/
│   ├── progress/
│   └── result/
├── components/
│   ├── ui/
│   ├── acsm/
│   └── layout/
├── lib/
│   ├── acsm-method.ts
│   ├── challenges.ts
│   ├── storage.ts
│   └── utils.ts
├── docs/
│   ├── ARCHITECTURE.md
│   ├── MVP.md
│   ├── ACSM_METHOD.md
│   └── AI_WORKFLOW.md
├── public/
├── README.md
└── .gitignore
```

## Identidade visual

- Fundo escuro.
- Contraste limpo.
- Poucas cores.
- Tipografia forte.
- Visual psicológico, silencioso e premium.
- Nada de estética gamer, coaching raso ou excesso de elementos.

## Tom de produto

Direto, introspectivo e emocionalmente inteligente.

Exemplo de linguagem:

> Você não perdeu disciplina. Você aprendeu a fugir antes de começar.

> Hoje o desafio não é vencer sua vida inteira. É desobedecer um medo específico.

## Roadmap

### Fase 1 — Fundação

- [ ] Criar estrutura Next.js.
- [ ] Criar design system básico.
- [ ] Criar landing page.
- [ ] Criar onboarding.
- [ ] Criar dados mockados da jornada.

### Fase 2 — Jornada funcional

- [ ] Dashboard diário.
- [ ] Check-in diário.
- [ ] Diário emocional.
- [ ] Barra de progresso.
- [ ] Persistência local.

### Fase 3 — Resultado compartilhável

- [ ] Tela final da jornada.
- [ ] Card de transformação.
- [ ] Botão de compartilhar.
- [ ] Export visual simples.

### Fase 4 — Produto real

- [ ] Autenticação.
- [ ] Banco de dados.
- [ ] Comunidade.
- [ ] IA ACSM personalizada.
- [ ] Desafios premium.

## Documentação

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — arquitetura técnica do projeto.
- [`docs/MVP.md`](docs/MVP.md) — escopo fechado da primeira versão.
- [`docs/ACSM_METHOD.md`](docs/ACSM_METHOD.md) — método emocional por trás do produto.
- [`docs/AI_WORKFLOW.md`](docs/AI_WORKFLOW.md) — divisão de trabalho entre Codex, Claude Code e humanos.
