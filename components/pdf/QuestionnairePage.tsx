"use client"

const questions = [
  {
    num: "01",
    text: "Sinto que minha lealdade e investimento emocional estão primeiramente no meu casamento, e não mais na minha família de origem (pais/irmãos) ou em relacionamentos do passado.",
    theme: "Lealdade",
    optional: false,
  },
  {
    num: "02",
    text: 'Consigo equilibrar bem o meu tempo e interesses individuais com a construção da nossa identidade como casal; sinto que existe um "Nós" forte sem que eu perca o meu "Eu".',
    theme: "Identidade",
    optional: false,
  },
  {
    num: "03",
    text: "(Se tiver filhos) Conseguimos manter a nossa cumplicidade e privacidade como casal, protegendo nosso espaço da rotina e das demandas exaustivas da maternidade/paternidade.",
    theme: "Privacidade",
    optional: true,
  },
  {
    num: "04",
    text: "Quando enfrentamos crises externas (problemas financeiros, doenças ou luto), tendemos a nos proteger e nos apoiar mutuamente em vez de buscarmos culpados.",
    theme: "Resiliência",
    optional: false,
  },
  {
    num: "05",
    text: "Sinto que nosso casamento é um lugar seguro para expressar diferenças e até raiva, conseguimos discutir sem que eu tema que a relação vá acabar ou que eu seja ferida propositalmente.",
    theme: "Segurança",
    optional: false,
  },
  {
    num: "06",
    text: "Nossa vida íntima e sexual é valorizada e protegida por nós contra as incursões do estresse do trabalho e das obrigações familiares.",
    theme: "Intimidade",
    optional: false,
  },
  {
    num: "07",
    text: "Mantemos o bom humor, o riso e o interesse um pela vida do outro, evitando que a relação caia no tédio ou em uma rotina puramente funcional.",
    theme: "Leveza",
    optional: false,
  },
  {
    num: "08",
    text: 'Sinto que meu parceiro é um "porto seguro" para minhas vulnerabilidades e que ele me oferece o encorajamento e o conforto emocional que eu preciso.',
    theme: "Suporte",
    optional: false,
  },
  {
    num: "09",
    text: "Consigo manter viva a admiração e as imagens carinhosas de quando nos apaixonamos, mesmo aceitando as mudanças reais que o tempo trouxe para nós dois.",
    theme: "Admiração",
    optional: false,
  },
]

function PageHeader() {
  return (
    <div className="flex items-center justify-between border-b border-[oklch(0.87_0.02_70)] pb-4 sm:pb-5">
      <div className="flex items-center gap-3">
        <div className="w-1 h-5 sm:h-6 bg-[oklch(0.48_0.09_42)]" />
        <span className="font-sans text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[oklch(0.48_0.09_42)] font-light">
          Questionário de Percepção Conjugal
        </span>
      </div>
      <span className="font-serif italic text-xs sm:text-sm text-[oklch(0.5_0.04_55)] hidden sm:block">
        Jornada de Conexão Conjugal
      </span>
    </div>
  )
}

function ScaleSelector({
  value,
  onChange,
}: {
  value: number | null
  onChange: (v: number) => void
}) {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5">
      {[1, 2, 3, 4, 5].map((n) => {
        const active = value === n
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-label={`Nota ${n}`}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.48_0.09_42)] ${
              active
                ? "bg-[oklch(0.48_0.09_42)] border-[oklch(0.48_0.09_42)]"
                : "border-[oklch(0.72_0.1_80)] bg-transparent hover:border-[oklch(0.48_0.09_42)]"
            }`}
          >
            <span
              className={`font-sans text-xs font-semibold ${
                active ? "text-[oklch(0.99_0.005_70)]" : "text-[oklch(0.48_0.09_42)]"
              }`}
            >
              {n}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function QuestionItem({
  question,
  value,
  onChange,
}: {
  question: (typeof questions)[number]
  value: number | null
  onChange: (v: number) => void
}) {
  return (
    <div className="flex gap-3 sm:gap-4 items-start py-4 border-b border-[oklch(0.87_0.02_70)] last:border-b-0">
      <span className="font-sans text-xs font-semibold text-[oklch(0.72_0.1_80)] tabular-nums shrink-0 mt-0.5">
        {question.num}
      </span>
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        <p className="font-sans text-xs sm:text-[13px] leading-relaxed text-[oklch(0.28_0.03_50)]">
          {question.text}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-sans text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full text-[oklch(0.48_0.09_42)] bg-[oklch(0.95_0.03_55)]">
            {question.theme}
          </span>
          {question.optional && (
            <span className="font-sans text-[9px] italic text-[oklch(0.5_0.04_55)]">
              (se tiver filhos)
            </span>
          )}
        </div>
        <ScaleSelector value={value} onChange={onChange} />
      </div>
    </div>
  )
}

// Shared state lifted via props
export type QuestionnaireState = {
  name: string
  setName: (v: string) => void
  answers: (number | null)[]
  setAnswer: (i: number, v: number) => void
  status: "idle" | "loading" | "success" | "error"
  errorMsg: string
  onSubmit: () => void
}

export function QuestionnairePage1({ state }: { state: QuestionnaireState }) {
  const { name, answers, setAnswer } = state

  return (
    <div
      className="pdf-page relative flex flex-col bg-[oklch(0.975_0.008_75)] rounded-sm
      px-5 py-8 gap-6
      sm:px-10 sm:py-12 sm:gap-8
      md:px-14 md:py-14"
    >
      <PageHeader />

      {/* Title */}
      <div className="flex flex-col gap-3">
        <h2
          className="font-serif font-light text-[oklch(0.22_0.02_55)] text-balance
          text-2xl sm:text-3xl md:text-4xl"
        >
          Reflexão sobre{" "}
          <span className="italic font-semibold text-[oklch(0.48_0.09_42)]">o Nosso Vínculo</span>
        </h2>
        <p className="font-sans text-sm text-[oklch(0.5_0.04_55)] leading-relaxed">
          Este questionário foi desenhado para ajudar você a observar como as tarefas fundamentais
          de um casamento estão funcionando na sua vida hoje. Não existem respostas certas ou
          erradas — o objetivo é a sua honestidade.
        </p>

        {/* Scale legend */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-1 bg-[oklch(0.93_0.02_75)] rounded-sm px-4 sm:px-5 py-3">
          <span className="font-sans text-xs text-[oklch(0.35_0.03_55)] whitespace-nowrap">
            <strong className="font-semibold text-[oklch(0.22_0.02_55)]">1</strong> — Discordo /
            Nunca
          </span>
          <div className="hidden sm:flex gap-1 flex-1 justify-center">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="w-5 h-1.5 rounded-full"
                style={{
                  background: `oklch(${0.45 + n * 0.1} ${0.06 + n * 0.01} 42)`,
                  opacity: 0.7,
                }}
              />
            ))}
          </div>
          <span className="font-sans text-xs text-[oklch(0.35_0.03_55)] whitespace-nowrap">
            <strong className="font-semibold text-[oklch(0.22_0.02_55)]">5</strong> — Concordo /
            Sempre
          </span>
        </div>
      </div>

      {/* Nome do usuário (read-only, vem do login) */}
      <div className="flex flex-col gap-2">
        <label className="font-sans text-xs tracking-widest uppercase text-[oklch(0.5_0.04_55)]">
          Respondendo como
        </label>
        <div className="w-full sm:w-72 bg-[oklch(0.93_0.02_75)] border border-[oklch(0.87_0.02_70)] rounded-sm px-4 py-2.5 font-sans text-sm text-[oklch(0.35_0.03_55)]">
          {name}
        </div>
      </div>

      {/* Questions 1–5 */}
      <div className="bg-[oklch(0.99_0.005_70)] border border-[oklch(0.87_0.02_70)] rounded-sm px-4 sm:px-6 py-2">
        {questions.slice(0, 5).map((q, i) => (
          <QuestionItem
            key={q.num}
            question={q}
            value={answers[i]}
            onChange={(v) => setAnswer(i, v)}
          />
        ))}
      </div>

      <div className="mt-auto flex justify-center pt-2">
        <span className="font-serif italic text-xs text-[oklch(0.5_0.04_55)]">07</span>
      </div>
    </div>
  )
}

export function QuestionnairePage2({ state }: { state: QuestionnaireState }) {
  const { answers, setAnswer, status, errorMsg, onSubmit } = state

  const total = answers.reduce<number>((sum, v) => sum + (v ?? 0), 0)
  const answered = answers.filter((v) => v !== null).length
  const maxScore = answered * 5

  const classification =
    total === 0
      ? "—"
      : total <= 22
      ? "Atenção"
      : total <= 35
      ? "Base sólida"
      : "Vínculo forte"

  return (
    <div
      className="pdf-page relative flex flex-col bg-[oklch(0.975_0.008_75)] rounded-sm
      px-5 py-8 gap-6
      sm:px-10 sm:py-12 sm:gap-8
      md:px-14 md:py-14"
    >
      <PageHeader />

      {/* Questions 6–9 */}
      <div className="bg-[oklch(0.99_0.005_70)] border border-[oklch(0.87_0.02_70)] rounded-sm px-4 sm:px-6 py-2">
        {questions.slice(5).map((q, i) => (
          <QuestionItem
            key={q.num}
            question={q}
            value={answers[i + 5]}
            onChange={(v) => setAnswer(i + 5, v)}
          />
        ))}
      </div>

      {/* Live score summary */}
      <div className="flex flex-col gap-4 bg-[oklch(0.99_0.005_70)] border border-[oklch(0.87_0.02_70)] rounded-sm p-4 sm:p-6">
        <div className="flex items-center gap-3 border-b border-[oklch(0.87_0.02_70)] pb-3 sm:pb-4">
          <div className="w-1 h-5 bg-[oklch(0.72_0.1_80)]" />
          <h3 className="font-serif text-base sm:text-lg font-semibold text-[oklch(0.22_0.02_55)]">
            Minha Pontuação Total
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
          {/* Live score */}
          <div className="flex flex-col gap-1">
            <span className="font-sans text-[10px] tracking-widest uppercase text-[oklch(0.5_0.04_55)]">
              Soma dos pontos
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-semibold text-[oklch(0.48_0.09_42)]">
                {total > 0 ? total : "—"}
              </span>
              <span className="font-sans text-sm text-[oklch(0.5_0.04_55)]">/ {maxScore || 45}</span>
            </div>
            {total > 0 && (
              <span className="font-sans text-xs font-semibold text-[oklch(0.48_0.09_42)]">
                {classification}
              </span>
            )}
          </div>

          {/* Score bands */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 flex-1 w-full">
            {[
              { range: "9 – 22", label: "Pontos de atenção a trabalhar", bg: "bg-[oklch(0.95_0.04_42)]", fg: "text-[oklch(0.35_0.06_42)]" },
              { range: "23 – 35", label: "Base sólida com espaço para crescer", bg: "bg-[oklch(0.93_0.03_75)]", fg: "text-[oklch(0.35_0.03_55)]" },
              { range: "36 – 45", label: "Vínculo forte e consciente", bg: "bg-[oklch(0.91_0.05_80)]", fg: "text-[oklch(0.35_0.05_55)]" },
            ].map((band) => (
              <div key={band.range} className={`${band.bg} rounded-sm px-3 py-2 flex flex-col gap-0.5`}>
                <span className={`font-semibold text-xs ${band.fg}`}>{band.range}</span>
                <span className="text-[oklch(0.5_0.04_55)] leading-tight text-xs">{band.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Written notes */}
      <div className="flex flex-col gap-3">
        <h3 className="font-serif text-base sm:text-lg font-semibold text-[oklch(0.22_0.02_55)]">
          O que este resultado me revela?
        </h3>
        <div className="flex flex-col gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i}>
              <div className="h-px w-full bg-[oklch(0.87_0.02_70)]" />
              <div className="h-6 sm:h-7" />
            </div>
          ))}
        </div>
      </div>

      {/* Submit button */}
      <div className="no-print flex flex-col gap-3 items-start">
        {status !== "success" ? (
          <button
            type="button"
            onClick={onSubmit}
            disabled={status === "loading"}
            className="flex items-center gap-2 bg-[oklch(0.48_0.09_42)] hover:bg-[oklch(0.42_0.09_42)] disabled:opacity-60 text-[oklch(0.99_0.005_70)] font-sans text-sm font-medium px-6 py-3 rounded-sm transition-colors cursor-pointer disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.48_0.09_42)] focus-visible:ring-offset-2"
          >
            {status === "loading" ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Enviando...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 2L11 13" /><path d="M22 2L15 22 11 13 2 9l20-7z" />
                </svg>
                Salvar resposta pra acompanhar evolucao
              </>
            )}
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-[oklch(0.91_0.05_80)] border border-[oklch(0.72_0.1_80)] text-[oklch(0.28_0.03_50)] font-sans text-sm px-5 py-3 rounded-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Respostas salvas na planilha com sucesso!
          </div>
        )}
        {status === "error" && errorMsg && (
          <p className="font-sans text-xs text-[oklch(0.5_0.05_30)]">{errorMsg}</p>
        )}
      </div>

      <div className="mt-auto flex justify-center pt-2">
        <span className="font-serif italic text-xs text-[oklch(0.5_0.04_55)]">08</span>
      </div>
    </div>
  )
}
