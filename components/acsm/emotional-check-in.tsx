export function EmotionalCheckIn() {
  return (
    <div className="rounded-3xl border border-dashed border-white/15 bg-black/20 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d6a15d]">Check-in emocional</p>
      <div className="mt-5 grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((score) => (
          <button
            key={score}
            className="rounded-2xl border border-white/10 bg-white/[0.04] py-3 text-sm text-[#f5f2ea] transition hover:border-[#d6a15d]/50 hover:bg-[#d6a15d]/10"
            type="button"
          >
            {score}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-[#a7a29a]">
        Este bloco é visual por enquanto. A persistência local entra na próxima etapa do MVP.
      </p>
    </div>
  );
}
