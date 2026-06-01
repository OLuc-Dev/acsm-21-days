# Workflow de IA do Projeto

Este documento define como Codex, Claude Code e humanos devem trabalhar no ACSM 21 Days.

## Objetivo

Evitar que cada IA implemente coisas desconectadas.

Toda IA que trabalhar neste repositório deve seguir:

1. README.md
2. docs/ARCHITECTURE.md
3. docs/MVP.md
4. docs/ACSM_METHOD.md
5. docs/AI_WORKFLOW.md

## Papéis sugeridos

### Codex 1 — Estrutura e Front-end

Responsável por:

- setup Next.js;
- TypeScript;
- Tailwind;
- shadcn/ui;
- estrutura de pastas;
- landing page;
- componentes visuais.

### Codex 2 — Lógica e Estado

Responsável por:

- tipos TypeScript;
- dados mockados;
- lógica da jornada;
- cálculo de progresso;
- persistência local;
- check-ins.

### Claude Code — Arquitetura e Revisão

Responsável por:

- revisar decisões técnicas;
- melhorar organização;
- refatorar código;
- documentar padrões;
- criar testes quando fizer sentido;
- manter a linguagem do produto alinhada com a ACSM.

### Humano — Produto e Direção

Responsável por:

- aprovar tom de voz;
- decidir escopo;
- testar experiência;
- validar se parece ACSM;
- cortar excesso de funcionalidades.

## Regra de ouro

Nenhuma IA deve adicionar feature nova sem antes validar se ela pertence ao MVP.

## Ordem de implementação

1. Setup do projeto.
2. Criar estrutura de pastas.
3. Criar tokens visuais básicos.
4. Criar landing page.
5. Criar onboarding.
6. Criar mock de desafios.
7. Criar storage local.
8. Criar dashboard.
9. Criar check-in.
10. Criar progresso.
11. Criar resultado final.

## Prompt base para Codex

```txt
Você está trabalhando no repositório ACSM 21 Days.
Leia README.md e todos os arquivos dentro de docs/ antes de implementar.
O objetivo é construir um MVP web responsivo em Next.js, TypeScript e Tailwind.
Não adicione funcionalidades fora do MVP.
Mantenha a estética dark, minimalista, psicológica e premium.
Implemente de forma limpa, com componentes pequenos e código legível.
```

## Prompt base para Claude Code

```txt
Você está atuando como arquiteto técnico e revisor do ACSM 21 Days.
Leia README.md e docs/.
Sua função é melhorar a organização, reduzir complexidade e garantir que o produto continue fiel ao método ACSM.
Não transforme o produto em app genérico de hábitos.
Priorize clareza, consistência e experiência emocional.
```

## Critérios de revisão

Antes de aceitar qualquer implementação, conferir:

- funciona no mobile;
- não quebrou o escopo do MVP;
- não depende de login no início;
- não usa frases genéricas;
- mantém tom ACSM;
- código está separado por responsabilidade;
- dados persistem localmente quando necessário;
- README e docs continuam coerentes.
