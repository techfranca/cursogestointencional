"use client"

export function IntroPage() {
  const pillars = [
    {
      icon: "♡",
      title: "Amizade & Respeito",
      desc: "Nutrir a base que sustenta o amor duradouro.",
    },
    {
      icon: "⊕",
      title: "Fortalecer o 'Nós'",
      desc: "Criar uma identidade única sem anular a sua autonomia.",
    },
    {
      icon: "◇",
      title: "Proteger o Espaço",
      desc: "Garantir que o casamento seja sempre um porto seguro.",
    },
  ]

  return (
    <div className="pdf-page relative flex flex-col bg-[oklch(0.975_0.008_75)] rounded-sm
      px-5 py-8 gap-7
      sm:px-10 sm:py-12 sm:gap-9
      md:px-14 md:py-14 md:gap-10">

      {/* Page header */}
      <div className="flex items-center justify-between border-b border-[oklch(0.87_0.02_70)] pb-4 sm:pb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-5 sm:h-6 bg-[oklch(0.48_0.09_42)]" />
          <span className="font-sans text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[oklch(0.48_0.09_42)] font-light">
            Introdução
          </span>
        </div>
        <span className="font-serif italic text-xs sm:text-sm text-[oklch(0.5_0.04_55)]">Jornada de 15 Dias</span>
      </div>

      {/* Main intro text */}
      <div className="flex flex-col gap-4 sm:gap-6">
        <h2 className="font-serif font-light leading-snug text-[oklch(0.22_0.02_55)] text-balance
          text-2xl sm:text-3xl md:text-4xl">
          Um bom casamento é uma{" "}
          <span className="italic font-semibold text-[oklch(0.48_0.09_42)]">obra em andamento.</span>
        </h2>

        <div className="flex flex-col gap-3 sm:gap-4 font-sans text-sm leading-relaxed text-[oklch(0.35_0.03_55)]">
          <p>
            Muitas vezes acreditamos que um casamento feliz é algo que simplesmente "acontece" ou que depende
            apenas da sorte de encontrar a pessoa certa. No entanto, a ciência e os estudos psicológicos nos
            mostram algo diferente: um bom casamento é, na verdade, uma obra em andamento que exige dedicação
            e esforço ao longo de toda a vida.
          </p>
          <p>
            Este material foi baseado em estudos que identificaram que a felicidade conjugal não é estática,
            mas sim um processo de construção diária. Para que o amor dure, é preciso enfrentar "processos"
            que fortalecem o vínculo e protegem a relação contra o desgaste do tempo e do estresse cotidiano.
          </p>
          <p>
            Nesta jornada, convido você a realizar{" "}
            <strong className="font-semibold text-[oklch(0.22_0.02_55)]">pequenas ações diárias</strong>{" "}
            que, quando feitas com intenção, têm a capacidade de renovar o brilho da relação e transformar a
            rotina em um espaço de maior prazer e segurança.
          </p>
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-px flex-1 bg-[oklch(0.87_0.02_70)]" />
          <span className="font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[oklch(0.5_0.04_55)] whitespace-nowrap">
            Os 3 focos da jornada
          </span>
          <div className="h-px flex-1 bg-[oklch(0.87_0.02_70)]" />
        </div>
        {/* Stack on mobile, 3 cols on md+ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="bg-[oklch(0.99_0.005_70)] border border-[oklch(0.87_0.02_70)] rounded-sm p-4 sm:p-5 flex sm:flex-col gap-3 sm:gap-3 items-start"
            >
              <span className="text-[oklch(0.72_0.1_80)] text-xl shrink-0">{p.icon}</span>
              <div className="flex flex-col gap-1">
                <h3 className="font-serif text-sm sm:text-base font-semibold text-[oklch(0.22_0.02_55)] leading-snug">
                  {p.title}
                </h3>
                <p className="font-sans text-xs leading-relaxed text-[oklch(0.5_0.04_55)]">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How-to-use box */}
      <div className="bg-[oklch(0.48_0.09_42)] text-[oklch(0.99_0.005_70)] rounded-sm p-5 sm:p-7 flex flex-col gap-3">
        <h3 className="font-serif text-lg sm:text-xl font-semibold">Como usar este material</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 sm:gap-x-10 gap-y-2 font-sans text-xs leading-relaxed text-[oklch(0.93_0.02_75)]">
          <div className="flex gap-2">
            <span className="text-[oklch(0.72_0.1_80)] mt-0.5 shrink-0">01</span>
            <span>Leia a atividade do dia antes de começar o seu dia.</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[oklch(0.72_0.1_80)] mt-0.5 shrink-0">02</span>
            <span>Ao final do dia, use o Espaço de Reflexão para registrar sua experiência.</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[oklch(0.72_0.1_80)] mt-0.5 shrink-0">03</span>
            <span>Marque o dia no Checklist de Progresso ao concluir.</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[oklch(0.72_0.1_80)] mt-0.5 shrink-0">04</span>
            <span>Após os 15 dias, responda ao Questionário de Percepção Conjugal.</span>
          </div>
        </div>
      </div>

      {/* Page number */}
      <div className="flex justify-center mt-auto pt-2">
        <span className="font-serif italic text-xs text-[oklch(0.5_0.04_55)]">01</span>
      </div>
    </div>
  )
}
