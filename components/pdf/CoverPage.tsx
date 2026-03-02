"use client"

export function CoverPage() {
  return (
    <div className="pdf-page relative flex flex-col items-center justify-between bg-[oklch(0.22_0.02_55)] text-[oklch(0.99_0.005_70)] overflow-hidden rounded-sm
      min-h-[70vw] sm:min-h-[480px] md:min-h-screen
      py-10 sm:py-16">
      {/* Top gold border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[oklch(0.72_0.1_80)]" />

      {/* Top label */}
      <div className="flex items-center gap-3 sm:gap-4 px-6">
        <div className="h-px w-8 sm:w-16 bg-[oklch(0.72_0.1_80)]" />
        <span className="font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[oklch(0.72_0.1_80)]">
          Material de Apoio
        </span>
        <div className="h-px w-8 sm:w-16 bg-[oklch(0.72_0.1_80)]" />
      </div>

      {/* Center content */}
      <div className="flex flex-col items-center gap-6 sm:gap-8 px-6 sm:px-12 text-center">
        {/* Monogram */}
        <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border border-[oklch(0.72_0.1_80)] flex items-center justify-center">
          <span className="font-serif text-2xl sm:text-4xl font-light italic text-[oklch(0.72_0.1_80)]">J</span>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <h1 className="font-serif font-light leading-tight tracking-wide text-balance
            text-4xl sm:text-5xl md:text-6xl">
            Jornada de
            <span className="block font-serif font-semibold italic text-[oklch(0.72_0.1_80)]
              text-5xl sm:text-6xl md:text-7xl">
              15 Dias
            </span>
          </h1>
          <div className="h-px w-32 sm:w-48 mx-auto bg-[oklch(0.72_0.1_80)] opacity-60" />
          <p className="font-serif text-lg sm:text-2xl font-light italic tracking-widest text-[oklch(0.87_0.02_70)]">
            de Conexão Conjugal
          </p>
        </div>

        {/* Subtitle */}
        <p className="font-sans text-xs sm:text-sm font-light tracking-[0.2em] uppercase text-[oklch(0.72_0.1_80)] opacity-80 max-w-[220px] sm:max-w-xs leading-relaxed">
          Pequenos gestos que renovam o amor
        </p>
      </div>

      {/* Bottom quote */}
      <div className="flex flex-col items-center gap-4 sm:gap-6 px-6 sm:px-12 text-center">
        <div className="h-px w-20 sm:w-32 mx-auto bg-[oklch(0.72_0.1_80)] opacity-40" />
        <blockquote className="font-serif text-sm sm:text-base italic font-light text-[oklch(0.87_0.02_70)] max-w-xs sm:max-w-sm leading-relaxed">
          "O amor começa com o ato de prestar atenção."
        </blockquote>
        <div className="flex items-center gap-3">
          <div className="h-px w-6 sm:w-8 bg-[oklch(0.72_0.1_80)] opacity-40" />
          <span className="font-sans text-[9px] sm:text-xs tracking-[0.2em] uppercase text-[oklch(0.72_0.1_80)] opacity-60">
            Confidencial
          </span>
          <div className="h-px w-6 sm:w-8 bg-[oklch(0.72_0.1_80)] opacity-40" />
        </div>
      </div>

      {/* Bottom gold border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[oklch(0.72_0.1_80)]" />
    </div>
  )
}
