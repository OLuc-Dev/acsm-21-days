# E-book ACSM — Acabe Com Seus Medos

Fonte do e-book em Markdown (`acsm-acabe-com-seus-medos.md`), pronta para exportar para PDF, EPUB ou DOCX.

## Estrutura

- **Antes de começar** — define o contrato (não é motivação, é método).
- **Parte 1 — O método** — por que o medo decide antes de você, os 3 movimentos, a anatomia de uma ação ACSM.
- **Parte 2 — Os sete medos** — julgamento, falhar, começar, aparecer, disciplina, rejeição, incerteza.
- **Parte 3 — A jornada de 21 dias** — 3 semanas, um dia por página (diagnóstico, ação, reflexão, fechamento).
- **Parte 4 — Depois dos 21 dias** — sustentar sem a estrutura, o que é coragem, fechamento.

> Os marcadores `\newpage` viram quebra de página no PDF (LaTeX). Em EPUB/HTML o Pandoc os ignora — sem efeito colateral.

## Como exportar

Requer [Pandoc](https://pandoc.org/). Rode dentro de `ebook/`.

**PDF diagramado (dark/premium, identidade ACSM)** — usa o `template.html` deste diretório:

```bash
# 1) Converte o conteúdo em fragmento HTML
pandoc acsm-acabe-com-seus-medos.md -t html5 -o body.html
# 2) Injeta o corpo no template (substitui <!--BODY-->)
sed -e '/<!--BODY-->/{r body.html' -e 'd}' template.html > final.html
# 3) Imprime em PDF (Chromium headless), página 14x21cm com fundo
chromium --headless --no-pdf-header-footer --print-to-pdf=acsm.pdf final.html
# (ou abra final.html no navegador e use "Salvar como PDF", fundo gráfico ativado)
```

**PDF simples** (sem diagramação, via LaTeX — `xelatex` para os acentos):

```bash
pandoc acsm-acabe-com-seus-medos.md -o acsm.pdf --pdf-engine=xelatex \
  -V geometry:margin=2.5cm -V fontsize=12pt
```

**EPUB** (e-readers / Kindle via conversão):

```bash
pandoc acsm-acabe-com-seus-medos.md -o acsm.epub \
  --metadata title="ACSM — Acabe Com Seus Medos" \
  --metadata language=pt-BR
```

**DOCX** (para editar/diagramar no Word, Google Docs ou importar no Canva):

```bash
pandoc acsm-acabe-com-seus-medos.md -o acsm.docx
```

## Para um e-book "premium" (diagramado)

1. Exporte para **DOCX** e importe no **Canva** (template de e-book) ou no InDesign/Affinity.
2. Use a mesma identidade do produto: fundo escuro, tipografia forte, acento âmbar (`#d6a15d` / `#f0b76a`), toque de vermelho-sangue (`#7f1d1d`).
3. Capa: reaproveite o estilo do *share card* do app (`components/acsm/share-card.tsx`).

## Onde vender (Brasil)

Hotmart, Kiwify ou Eduzz — checkout, área de membros e afiliados prontos. O *share card* gerado pelo app serve como peça de aquisição nas redes.
