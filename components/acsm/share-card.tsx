"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type ShareCardProps = {
  userName?: string;
  goal: string;
  fearTitle: string;
  completedDays: number;
  totalDays: number;
  emotional: string;
};

type CardData = {
  headline: string;
  goal: string;
  fearTitle: string;
  completedDays: number;
  totalDays: number;
  emotional: string;
};

const WIDTH = 1080;
const HEIGHT = 1350;
const MARGIN = 96;

function wrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number,
): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }

  if (current) {
    lines.push(current);
  }

  if (lines.length <= maxLines) {
    return lines;
  }

  const kept = lines.slice(0, maxLines);
  let last = kept[maxLines - 1];
  while (last.length > 0 && ctx.measureText(`${last}…`).width > maxWidth) {
    last = last.slice(0, -1);
  }
  kept[maxLines - 1] = `${last.replace(/\s+$/, "")}…`;
  return kept;
}

function drawCard(canvas: HTMLCanvasElement, data: CardData) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.fillStyle = "#07060a";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const emberGlow = ctx.createRadialGradient(WIDTH * 0.22, 40, 0, WIDTH * 0.22, 40, 760);
  emberGlow.addColorStop(0, "rgba(214,161,93,0.20)");
  emberGlow.addColorStop(1, "rgba(214,161,93,0)");
  ctx.fillStyle = emberGlow;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const bloodGlow = ctx.createRadialGradient(WIDTH * 0.9, HEIGHT * 0.1, 0, WIDTH * 0.9, HEIGHT * 0.1, 820);
  bloodGlow.addColorStop(0, "rgba(127,29,29,0.20)");
  bloodGlow.addColorStop(1, "rgba(127,29,29,0)");
  ctx.fillStyle = bloodGlow;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.textBaseline = "alphabetic";

  // Marca
  ctx.beginPath();
  ctx.arc(MARGIN + 26, 150, 30, 0, Math.PI * 2);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(214,161,93,0.5)";
  ctx.stroke();
  ctx.textAlign = "center";
  ctx.fillStyle = "#f0b76a";
  ctx.font = "700 30px system-ui, sans-serif";
  ctx.fillText("A", MARGIN + 26, 161);
  ctx.textAlign = "left";
  ctx.fillStyle = "#f5f2ea";
  ctx.font = "600 30px system-ui, sans-serif";
  ctx.letterSpacing = "8px";
  ctx.fillText("ACSM 21 DAYS", MARGIN + 74, 160);

  // Eyebrow
  ctx.fillStyle = "#d6a15d";
  ctx.font = "700 26px system-ui, sans-serif";
  ctx.letterSpacing = "7px";
  ctx.fillText("ACABE COM SEUS MEDOS", MARGIN, 380);
  ctx.letterSpacing = "0px";

  // Título
  ctx.fillStyle = "#f5f2ea";
  ctx.font = "600 66px system-ui, sans-serif";
  let headlineY = 470;
  for (const line of wrapLines(ctx, data.headline, WIDTH - 2 * MARGIN, 3)) {
    ctx.fillText(line, MARGIN, headlineY);
    headlineY += 84;
  }

  // Régua
  ctx.fillStyle = "rgba(214,161,93,0.5)";
  ctx.fillRect(MARGIN, 700, 96, 3);

  // Objetivo
  ctx.fillStyle = "#d6a15d";
  ctx.font = "700 22px system-ui, sans-serif";
  ctx.letterSpacing = "5px";
  ctx.fillText("OBJETIVO", MARGIN, 800);
  ctx.letterSpacing = "0px";
  ctx.fillStyle = "#c7c0b6";
  ctx.font = "400 38px system-ui, sans-serif";
  let goalY = 852;
  for (const line of wrapLines(ctx, data.goal, WIDTH - 2 * MARGIN, 2)) {
    ctx.fillText(line, MARGIN, goalY);
    goalY += 50;
  }

  // Três estatísticas
  const stats: [string, string][] = [
    ["MEDO", data.fearTitle],
    ["DIAS", `${data.completedDays} de ${data.totalDays}`],
    ["MEDO MÉDIO", data.emotional],
  ];
  const columnWidth = (WIDTH - 2 * MARGIN) / 3;
  stats.forEach(([label, value], index) => {
    const x = MARGIN + index * columnWidth;
    ctx.fillStyle = "#d6a15d";
    ctx.font = "700 20px system-ui, sans-serif";
    ctx.letterSpacing = "3px";
    ctx.fillText(label, x, 1040);
    ctx.letterSpacing = "0px";
    ctx.fillStyle = "#f5f2ea";
    ctx.font = "600 34px system-ui, sans-serif";
    const fitted = wrapLines(ctx, value, columnWidth - 16, 1)[0] ?? value;
    ctx.fillText(fitted, x, 1086);
  });

  // Rodapé
  ctx.fillStyle = "#77716a";
  ctx.font = "400 24px system-ui, sans-serif";
  ctx.fillText("Sem promessas mágicas. Só ações pequenas contra fugas antigas.", MARGIN, HEIGHT - 70);
}

export function ShareCard({
  userName,
  goal,
  fearTitle,
  completedDays,
  totalDays,
  emotional,
}: ShareCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [downloaded, setDownloaded] = useState(false);

  const headline = `${userName ? `${userName}, você` : "Você"} desobedeceu o medo por ${completedDays} ${
    completedDays === 1 ? "dia" : "dias"
  }.`;

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    drawCard(canvas, { headline, goal, fearTitle, completedDays, totalDays, emotional });

    canvas.toBlob((blob) => {
      if (!blob) {
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "acsm-jornada.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setDownloaded(true);
    }, "image/png");
  };

  const stats: [string, string][] = [
    ["Medo", fearTitle],
    ["Dias", `${completedDays} de ${totalDays}`],
    ["Medo médio", emotional],
  ];

  return (
    <div className="space-y-5">
      <div className="mx-auto max-w-md overflow-hidden rounded-3xl border border-[#d6a15d]/25 bg-[#0c0b09] p-8 text-left shadow-2xl shadow-black/40">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d6a15d]/40 text-xs font-bold text-[#f0b76a]">
            A
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#f5f2ea]">
            ACSM 21 Days
          </span>
        </div>
        <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.34em] text-[#d6a15d]">
          Acabe com seus medos
        </p>
        <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#f5f2ea]">
          {headline}
        </h3>
        <div className="mt-6 h-px w-16 bg-[#d6a15d]/50" />
        <div className="mt-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d6a15d]">Objetivo</p>
          <p className="mt-1 text-sm leading-6 text-[#c7c0b6]">{goal}</p>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {stats.map(([label, value]) => (
            <div key={label}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d6a15d]">{label}</p>
              <p className="mt-1 text-sm font-semibold text-[#f5f2ea]">{value}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-[11px] leading-5 text-[#77716a]">
          Sem promessas mágicas. Só ações pequenas contra fugas antigas.
        </p>
      </div>

      <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} className="hidden" />

      <div className="flex justify-center">
        <Button type="button" onClick={handleDownload}>
          {downloaded ? "Baixar card novamente" : "Baixar card para compartilhar"}
        </Button>
      </div>
    </div>
  );
}
