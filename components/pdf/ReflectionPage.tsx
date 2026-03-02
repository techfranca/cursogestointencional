"use client"

const checklistItems = [
  { day: "01", label: "Atenção Plena" },
  { day: "02", label: "Elogio de Caráter" },
  { day: "03", label: "Humor e Leveza" },
  { day: "04", label: "Validar o Outro" },
  { day: "05", label: "Memória Afetiva" },
  { day: "06", label: "Beijo de Carinho" },
  { day: "07", label: 'Pensar no "Nós"' },
  { day: "08", label: "Tempo de Privacidade" },
  { day: "09", label: '"Má Memória"' },
  { day: "10", label: "Respeito à Autonomia" },
  { day: "11", label: "Proteção contra Culpa" },
  { day: "12", label: "Pequeno Flerte" },
  { day: "13", label: "Salto de Empatia" },
  { day: "14", label: "Reafirmar a Lealdade" },
  { day: "15", label: "Orgulho da História" },
]

function WritingLine() {
  return (
    <div className="flex flex-col gap-1.5 mt-1">
      <div className="h-px w-full bg-[oklch(0.87_0.02_70)]" />
      <div className="h-5 sm:h-6" />
      <div className="h-px w-full bg-[oklch(0.87_0.02_70)]" />
      <div className="h-5 sm:h-6" />
      <div className="h-px w-full bg-[oklch(0.87_0.02_70)]" />
    </div>
  )
}

function PageHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[oklch(0.87_0.02_70)] pb-4 sm:pb-5">
      <div className="flex items-center gap-3">
        <div className="w-1 h-5 sm:h-6 bg-[oklch(0.72_0.1_80)]" />
        <span className="font-sans text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[oklch(0.72_0.1_80)] font-light">
          {label}
        </span>
      </div>
      <span className="font-serif italic text-xs sm:text-sm text-[oklch(0.5_0.04_55)]">Jornada de Conexão Conjugal</span>
    </div>
  )
}

export function ReflectionPage() {
  return (
    <div className="pdf-page relative flex flex-col bg-[oklch(0.975_0.008_75)] rounded-sm
      px-5 py-8 gap-6
      sm:px-10 sm:py-12 sm:gap-8
      md:px-14 md:py-14">

      <PageHeader label="Reflexão & Progresso" />

      {/* Section title */}
      <div className="flex flex-col gap-2">
        <h2 className="font-serif font-light text-[oklch(0.22_0.02_55)] text-balance
          text-2xl sm:text-3xl md:text-4xl">
          Espaço de{" "}
          <span className="italic font-semibold text-[oklch(0.72_0.1_80)]">Reflexão Diária</span>
        </h2>
        <p className="font-sans text-sm text-[oklch(0.5_0.04_55)] leading-relaxed max-w-xl">
          Escolha um dia para detalhar mais profundamente. A escrita transforma a experiência em aprendizado.
        </p>
      </div>

      {/* Date & Task row — stacked on mobile */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <div className="flex flex-col gap-1 sm:flex-[1]">
          <span className="font-sans text-[10px] text-[oklch(0.5_0.04_55)] tracking-widest uppercase">Data</span>
          <div className="h-px w-full bg-[oklch(0.87_0.02_70)]" />
          <div className="h-6" />
        </div>
        <div className="flex flex-col gap-1 sm:flex-[3]">
          <span className="font-sans text-[10px] text-[oklch(0.5_0.04_55)] tracking-widest uppercase">
            Tarefa do Dia
          </span>
          <div className="h-px w-full bg-[oklch(0.87_0.02_70)]" />
          <div className="h-6" />
        </div>
      </div>

      {/* Questions */}
      <div className="flex flex-col gap-5 sm:gap-6">
        {[
          {
            num: "01",
            title: "O Meu Gesto",
            hint: "Como eu coloquei a intenção em prática hoje?",
            note: null,
          },
          {
            num: "02",
            title: "A Minha Experiência",
            hint: "Como me senti ao agir? (Leveza, resistência, alegria, timidez?)",
            note: "Lembre-se: Criar intimidade exige vulnerabilidade e sentimentos gentis.",
          },
          {
            num: "03",
            title: "O Salto de Empatia",
            hint: "Se eu pudesse entrar na pele do meu parceiro hoje, o que eu veria? Do que ele está precisando?",
            note: null,
          },
          {
            num: "04",
            title: "O Eco da Relação",
            hint: "Como ele reagiu? Notei alguma mudança sutil no olhar ou no tom de voz?",
            note: null,
          },
          {
            num: "05",
            title: 'Lição para o "Nós"',
            hint: "O que aprendi hoje sobre a força do nosso vínculo?",
            note: null,
          },
        ].map((q) => (
          <div key={q.num} className="flex flex-col gap-2">
            <div className="flex items-start gap-3">
              <span className="font-sans text-xs font-semibold text-[oklch(0.48_0.09_42)] tabular-nums mt-0.5 shrink-0">
                {q.num}
              </span>
              <div className="flex flex-col gap-0.5">
                <p className="font-serif text-sm sm:text-base font-semibold text-[oklch(0.22_0.02_55)]">
                  {q.title}
                </p>
                <p className="font-sans text-xs italic text-[oklch(0.5_0.04_55)] leading-relaxed">{q.hint}</p>
              </div>
            </div>
            {q.note && (
              <div className="bg-[oklch(0.93_0.02_75)] border border-[oklch(0.87_0.02_70)] rounded-sm px-4 py-2 ml-6">
                <p className="font-sans text-[10px] italic text-[oklch(0.5_0.04_55)]">{q.note}</p>
              </div>
            )}
            <WritingLine />
          </div>
        ))}
      </div>

      <div className="mt-auto flex justify-center pt-2">
        <span className="font-serif italic text-xs text-[oklch(0.5_0.04_55)]">05</span>
      </div>
    </div>
  )
}

export function ChecklistPage({
  checked,
  onToggle,
}: {
  checked: boolean[]
  onToggle: (index: number) => void
}) {
  const completedCount = checked.filter(Boolean).length

  return (
    <div className="pdf-page relative flex flex-col bg-[oklch(0.975_0.008_75)] rounded-sm
      px-5 py-8 gap-6
      sm:px-10 sm:py-12 sm:gap-8
      md:px-14 md:py-14">

      <PageHeader label="Acompanhe seu Progresso" />

      {/* Checklist grid */}
      <div className="flex flex-col gap-4 bg-[oklch(0.99_0.005_70)] border border-[oklch(0.87_0.02_70)] rounded-sm p-4 sm:p-6">
        <div className="flex items-center gap-3 border-b border-[oklch(0.87_0.02_70)] pb-3 sm:pb-4">
          <div className="w-1 h-5 bg-[oklch(0.72_0.1_80)]" />
          <h3 className="font-serif text-base sm:text-lg font-semibold text-[oklch(0.22_0.02_55)]">
            Checklist da Jornada
          </h3>
        </div>
        <p className="font-sans text-xs text-[oklch(0.5_0.04_55)] leading-relaxed">
          Marque cada dia após realizar a atividade. Ver seu progresso é poderoso.
        </p>
        {/* 2 cols on mobile, 3 on sm+ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-2.5 no-print">
          {checklistItems.map((item, index) => (
            <button
              key={item.day}
              type="button"
              onClick={() => onToggle(index)}
              aria-label={`Marcar dia ${item.day} como ${checked[index] ? "nÃ£o concluÃ­do" : "concluÃ­do"}`}
              className="flex items-center gap-2 text-left cursor-pointer"
            >
              <div
                className={`w-4 h-4 rounded-sm border shrink-0 flex items-center justify-center ${
                  checked[index]
                    ? "bg-[oklch(0.48_0.09_42)] border-[oklch(0.48_0.09_42)]"
                    : "border-[oklch(0.48_0.09_42)]"
                }`}
              >
                {checked[index] && (
                  <svg width="10" height="8" viewBox="0 0 12 10" fill="none" aria-hidden="true">
                    <path
                      d="M1 5L4.5 8.5L11 1"
                      stroke="oklch(0.99 0.005 70)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-sans text-[10px] text-[oklch(0.72_0.1_80)] font-semibold tabular-nums shrink-0">
                  {item.day}
                </span>
                <span
                  className={`font-sans text-[11px] leading-none truncate ${
                    checked[index]
                      ? "text-[oklch(0.55_0.04_55)] line-through"
                      : "text-[oklch(0.35_0.03_55)]"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </button>
          ))}
        </div>
        <div className="print-only grid grid-cols-2 sm:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-2.5">
          {checklistItems.map((item, index) => (
            <div key={item.day} className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-sm border shrink-0 ${
                  checked[index]
                    ? "bg-[oklch(0.48_0.09_42)] border-[oklch(0.48_0.09_42)]"
                    : "border-[oklch(0.48_0.09_42)]"
                }`}
              />
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-sans text-[10px] text-[oklch(0.72_0.1_80)] font-semibold tabular-nums shrink-0">
                  {item.day}
                </span>
                <span
                  className={`font-sans text-[11px] leading-none truncate ${
                    checked[index]
                      ? "text-[oklch(0.55_0.04_55)] line-through"
                      : "text-[oklch(0.35_0.03_55)]"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* Progress bar */}
        <div className="mt-2 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="font-sans text-[10px] tracking-widest uppercase text-[oklch(0.5_0.04_55)]">
              Progresso
            </span>
            <span className="font-sans text-[10px] text-[oklch(0.5_0.04_55)]">{completedCount} / 15 dias</span>
          </div>
          <div className="h-2 w-full bg-[oklch(0.87_0.02_70)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[oklch(0.48_0.09_42)] rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / 15) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Final reflection */}
      <div className="flex flex-col gap-4 bg-[oklch(0.99_0.005_70)] border border-[oklch(0.87_0.02_70)] rounded-sm p-4 sm:p-6">
        <div className="flex items-center gap-3 border-b border-[oklch(0.87_0.02_70)] pb-3 sm:pb-4">
          <div className="w-1 h-5 bg-[oklch(0.48_0.09_42)]" />
          <h3 className="font-serif text-base sm:text-lg font-semibold text-[oklch(0.22_0.02_55)]">
            Reflexão ao Final da Jornada
          </h3>
        </div>
        <div className="flex flex-col gap-4 sm:gap-5">
          {[
            { bold: "O que mudou em mim", rest: " durante estes 15 dias?" },
            { bold: "Qual atividade", rest: " tocou mais fundo em mim e por quê?" },
            { bold: "Qual gesto", rest: " desejo manter como hábito permanente?" },
          ].map((q, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <p className="font-sans text-xs text-[oklch(0.35_0.03_55)] leading-relaxed">
                <span className="font-semibold text-[oklch(0.22_0.02_55)]">{q.bold}</span>{q.rest}
              </p>
              <WritingLine />
            </div>
          ))}
        </div>
      </div>

      {/* Closing quote */}
      <div className="flex flex-col items-center text-center gap-3 pt-4 border-t border-[oklch(0.87_0.02_70)]">
        <blockquote className="font-serif text-sm sm:text-base italic text-[oklch(0.48_0.09_42)] max-w-md leading-relaxed">
          "O casamento tem o poder de ser uma experiência transformadora. Pequenos gestos, quando feitos com
          intenção, renovam o brilho da relação."
        </blockquote>
      </div>

      <div className="mt-auto flex justify-center pt-2">
        <span className="font-serif italic text-xs text-[oklch(0.5_0.04_55)]">06</span>
      </div>
    </div>
  )
}
