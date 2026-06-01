import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "ACSM 21 Days | Acabe Com Seus Medos",
  description:
    "Uma jornada escura, direta e prática para transformar medo em ação por meio de check-ins e desafios diários.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
