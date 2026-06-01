import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden bg-[#050506] text-[#f5f2ea]">
      <div className="noise-overlay pointer-events-none fixed inset-0 opacity-40" />
      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
