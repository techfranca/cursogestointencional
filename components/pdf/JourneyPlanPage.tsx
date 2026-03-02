"use client"

import { useState } from "react"

const day04Why = "Todos precisam ouvir regularmente um encorajamento para enfrentar o mundo."
const day04Action = "Quando ele enfrentar um desafio, diga: Voc\u00EA fez o melhor que p\u00F4de ou Eu acredito em voc\u00EA."

const days = [
  {
    day: "01",
    title: "Atenção Plena",
    why: "O amor começa com o ato de prestar atenção genuína ao outro.",
    action:
      "Dedique alguns minutos apenas para observar e ouvir seu marido sem interrupções. Desligue o celular, olhe nos olhos e esteja 100% presente.",
    tag: "Presença",
  },
  {
    day: "02",
    title: "Elogio de Caráter",
    why: "Casais felizes nutrem o respeito mútuo e veem o parceiro como alguém virtuoso.",
    action:
      "Diga a ele algo que você admira em seu caráter ou em como ele lida com as responsabilidades, reforçando a visão de que ele é uma pessoa virtuosa e competente.",
    tag: "Admiração",
  },
  {
    day: "03",
    title: "Humor contra Tensão",
    why: "O riso restaura a conexão ameaçada pela exasperação do dia a dia.",
    action:
      "Diante de uma pequena irritação cotidiana, escolha fazer uma brincadeira leve ou uma provocação carinhosa para restaurar a conexão.",
    tag: "Leveza",
  },
  {
    day: "04",
    title: "Validar o Esforço",
    why: day04Why,
    action: day04Action,
    tag: "Encorajamento",
  },
  {
    day: "05",
    title: "Relembrar o Início",
    why: "Manter vivas as imagens do início do romance protege o casal contra o desgaste.",
    action:
      "Compartilhe uma lembrança alegre de quando vocês se conheceram ou do namoro para manter vivas as imagens idealizadas que os uniram.",
    tag: "Memória",
  },
  {
    day: "06",
    title: "Beijo de Carinho",
    why: "A intimidade exige acesso a sentimentos ternos e gentis, sem cobranças.",
    action:
      "Dê um beijo ou um abraço afetuoso sem segundas intenções, focando apenas no acesso a sentimentos ternos e gentis.",
    tag: "Ternura",
  },
  {
    day: "07",
    title: 'Priorizar o "Nós"',
    why: 'Em um bom casamento, a mentalidade deve mudar de "Eu-Eu" para "Nós-Nós".',
    action:
      "Tome uma pequena decisão no dia pensando no que é melhor para o equilíbrio do casamento, em vez de focar apenas no desejo individual.",
    tag: "Parceria",
  },
  {
    day: "08",
    title: "Tempo a Dois",
    why: 'É vital proteger a privacidade do casal contra a "invasão" das demandas externas.',
    action:
      "Se vocês têm filhos, reserve 15 minutos onde as necessidades deles fiquem em espera para que vocês dois possam conversar sozinhos.",
    tag: "Proteção",
  },
  {
    day: "09",
    title: 'Praticar a "Má Memória"',
    why: "Saber esquecer pequenas decepções triviais é um dos grandes segredos da união.",
    action:
      "Escolha conscientemente ignorar uma pequena falha ou decepção trivial do dia, focando naquilo que realmente importa para a relação.",
    tag: "Perdão",
  },
  {
    day: "10",
    title: "Dar Espaço",
    why: "O vínculo saudável exige um equilíbrio entre proximidade e autonomia individual.",
    action:
      "Incentive-o a ter um tempo ou espaço só dele, reconhecendo que a proximidade precisa do contraponto de uma distância flexível.",
    tag: "Autonomia",
  },
  {
    day: "11",
    title: "Proteger da Culpa",
    why: "Em tempos de crise, proteger o parceiro fortalece o laço.",
    action:
      "Se algo der errado em uma tarefa doméstica ou externa, evite a tentação de culpar o parceiro, protegendo-o e a si mesma.",
    tag: "Suporte",
  },
  {
    day: "12",
    title: "Pequeno Flerte",
    why: 'Brincadeiras e flertes tiram o tédio e mantêm a "eletricidade" da relação.',
    action:
      "Envie uma mensagem ou faça um comentário que contenha um toque de flerte ou jogo, ajudando a iluminar o dia e afastar o tédio.",
    tag: "Sedução",
  },
  {
    day: "13",
    title: "Salto de Empatia",
    why: 'Praticar o exercício de "entrar na pele" do outro para entender sua dor ou alegria.',
    action:
      'Tente fazer um "salto imaginário" para dentro da pele dele para entender uma preocupação que ele expressou, mesmo que você não concorde totalmente.',
    tag: "Empatia",
  },
  {
    day: "14",
    title: "Reafirmar a Lealdade",
    why: "A mudança de foco para o parceiro como amor primário é uma tarefa contínua.",
    action:
      "Demonstre, por meio de palavras ou ações, que ele é a sua prioridade e o centro do seu mundo emocional.",
    tag: "Lealdade",
  },
  {
    day: "15",
    title: "Orgulho da História",
    why: "Celebrar o casamento como a conquista mais orgulhosa da vida adulta.",
    action:
      "Agradeça por algo que vocês construíram juntos ao longo dos anos, reconhecendo que o casamento de vocês é um trabalho contínuo e orgulhoso.",
    tag: "Gratidão",
  },
]

const tagColors: Record<string, string> = {
  Presença:     "bg-[oklch(0.88_0.04_70)] text-[oklch(0.35_0.04_55)]",
  Admiração:    "bg-[oklch(0.92_0.05_80)] text-[oklch(0.35_0.04_55)]",
  Leveza:       "bg-[oklch(0.90_0.04_75)] text-[oklch(0.35_0.04_55)]",
  Encorajamento:"bg-[oklch(0.88_0.04_70)] text-[oklch(0.35_0.04_55)]",
  Memória:      "bg-[oklch(0.92_0.05_80)] text-[oklch(0.35_0.04_55)]",
  Ternura:      "bg-[oklch(0.90_0.04_75)] text-[oklch(0.35_0.04_55)]",
  Parceria:     "bg-[oklch(0.88_0.04_70)] text-[oklch(0.35_0.04_55)]",
  Proteção:     "bg-[oklch(0.92_0.05_80)] text-[oklch(0.35_0.04_55)]",
  Perdão:       "bg-[oklch(0.90_0.04_75)] text-[oklch(0.35_0.04_55)]",
  Autonomia:    "bg-[oklch(0.88_0.04_70)] text-[oklch(0.35_0.04_55)]",
  Suporte:      "bg-[oklch(0.92_0.05_80)] text-[oklch(0.35_0.04_55)]",
  Sedução:      "bg-[oklch(0.90_0.04_75)] text-[oklch(0.35_0.04_55)]",
  Empatia:      "bg-[oklch(0.88_0.04_70)] text-[oklch(0.35_0.04_55)]",
  Lealdade:     "bg-[oklch(0.92_0.05_80)] text-[oklch(0.35_0.04_55)]",
  Gratidão:     "bg-[oklch(0.90_0.04_75)] text-[oklch(0.35_0.04_55)]",
}

function PageHeader() {
  return (
    <div className="flex items-center justify-between border-b border-[oklch(0.87_0.02_70)] pb-4 sm:pb-5 mb-6 sm:mb-8">
      <div className="flex items-center gap-3">
        <div className="w-1 h-5 sm:h-6 bg-[oklch(0.48_0.09_42)]" />
        <span className="font-sans text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[oklch(0.48_0.09_42)] font-light">
          Plano de 15 Dias
        </span>
      </div>
      <span className="font-serif italic text-xs sm:text-sm text-[oklch(0.5_0.04_55)]">Jornada de Conexão Conjugal</span>
    </div>
  )
}

function DayCard({
  day,
  checked,
  onToggle,
}: {
  day: (typeof days)[number]
  checked: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={`flex gap-3 sm:gap-5 border rounded-sm p-4 sm:p-5 transition-colors duration-200 ${
        checked
          ? "bg-[oklch(0.93_0.02_75)] border-[oklch(0.72_0.1_80)]"
          : "bg-[oklch(0.99_0.005_70)] border-[oklch(0.87_0.02_70)]"
      }`}
    >
      {/* Interactive checkbox (screen) */}
      <button
        onClick={onToggle}
        aria-label={`Marcar dia ${day.day} como ${checked ? "não concluído" : "concluído"}`}
        className={`no-print shrink-0 mt-1 w-6 h-6 rounded-sm border-2 flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.48_0.09_42)] ${
          checked
            ? "bg-[oklch(0.48_0.09_42)] border-[oklch(0.48_0.09_42)]"
            : "border-[oklch(0.72_0.1_80)] bg-transparent hover:border-[oklch(0.48_0.09_42)]"
        }`}
      >
        {checked && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden="true">
            <path d="M1 5L4.5 8.5L11 1" stroke="oklch(0.99 0.005 70)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Print-only checkbox square */}
      <div
        className="print-only shrink-0 mt-1 w-6 h-6 rounded-sm border-2 border-[oklch(0.72_0.1_80)] bg-transparent"
        aria-hidden="true"
      />

      {/* Day number */}
      <div className="flex flex-col items-center gap-1.5 sm:gap-2 min-w-[36px] sm:min-w-[48px]">
        <span
          className={`font-serif font-light leading-none transition-colors duration-200
            text-2xl sm:text-3xl
            ${checked ? "text-[oklch(0.6_0.05_42)]" : "text-[oklch(0.48_0.09_42)]"}`}
        >
          {day.day}
        </span>
        <div className="h-px w-6 sm:w-8 bg-[oklch(0.72_0.1_80)]" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5 sm:gap-2 flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className={`font-serif text-sm sm:text-base font-semibold transition-colors duration-200 ${
              checked ? "line-through text-[oklch(0.55_0.03_55)]" : "text-[oklch(0.22_0.02_55)]"
            }`}
          >
            {day.title}
          </h3>
          <span
            className={`font-sans text-[9px] sm:text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full ${
              tagColors[day.tag] ?? "bg-[oklch(0.90_0.04_75)] text-[oklch(0.35_0.04_55)]"
            }`}
          >
            {day.tag}
          </span>
          {checked && (
            <span className="no-print font-sans text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full bg-[oklch(0.48_0.09_42)] text-[oklch(0.99_0.005_70)]">
              Concluído
            </span>
          )}
        </div>
        <p className="font-sans text-xs italic text-[oklch(0.5_0.04_55)] leading-relaxed border-l-2 border-[oklch(0.87_0.02_70)] pl-3">
          {day.why}
        </p>
        <p
          className={`font-sans text-xs sm:text-[13px] leading-relaxed transition-colors duration-200 ${
            checked ? "text-[oklch(0.55_0.04_55)]" : "text-[oklch(0.35_0.03_55)]"
          }`}
        >
          {day.action}
        </p>
      </div>
    </div>
  )
}

/* ─── Page wrappers ─── */

export function JourneyPlanPage1({
  checked,
  onToggle,
}: {
  checked: boolean[]
  onToggle: (i: number) => void
}) {
  return (
    <div className="pdf-page relative flex flex-col bg-[oklch(0.975_0.008_75)] rounded-sm
      px-5 py-8 gap-4
      sm:px-10 sm:py-12
      md:px-14 md:py-14">
      <PageHeader />

      <div className="flex flex-col gap-1 mb-4 sm:mb-8">
        <h2 className="font-serif font-light text-[oklch(0.22_0.02_55)] text-balance
          text-2xl sm:text-3xl md:text-4xl">
          O Plano de{" "}
          <span className="italic font-semibold text-[oklch(0.48_0.09_42)]">Atividades Diárias</span>
        </h2>
        <p className="font-sans text-sm text-[oklch(0.5_0.04_55)] leading-relaxed max-w-xl mt-2">
          Cada atividade é fundamentada em psicologia conjugal. Leia o fundamento, realize o gesto e marque
          o dia quando concluir.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        {days.slice(0, 5).map((d, i) => (
          <DayCard key={d.day} day={d} checked={checked[i]} onToggle={() => onToggle(i)} />
        ))}
      </div>

      <div className="mt-4 sm:mt-8 flex justify-center">
        <span className="font-serif italic text-xs text-[oklch(0.5_0.04_55)]">02</span>
      </div>
    </div>
  )
}

export function JourneyPlanPage2({
  checked,
  onToggle,
}: {
  checked: boolean[]
  onToggle: (i: number) => void
}) {
  return (
    <div className="pdf-page relative flex flex-col bg-[oklch(0.975_0.008_75)] rounded-sm
      px-5 py-8 gap-4
      sm:px-10 sm:py-12
      md:px-14 md:py-14">
      <PageHeader />

      <div className="flex flex-col gap-3 sm:gap-4">
        {days.slice(5, 10).map((d, i) => (
          <DayCard key={d.day} day={d} checked={checked[i + 5]} onToggle={() => onToggle(i + 5)} />
        ))}
      </div>

      {/* Midpoint encouragement */}
      <div className="mt-4 sm:mt-6 flex items-start sm:items-center gap-4 bg-[oklch(0.93_0.02_75)] border border-[oklch(0.87_0.02_70)] rounded-sm p-5 sm:p-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[oklch(0.72_0.1_80)] flex items-center justify-center shrink-0">
          <span className="font-serif text-lg sm:text-xl text-[oklch(0.22_0.02_55)]">♡</span>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-serif text-sm sm:text-base italic text-[oklch(0.22_0.02_55)] leading-relaxed">
            {"\"Você chegou à metade da jornada. Cada pequeno gesto que você praticou até aqui já está construindo um vínculo mais forte.\""}
          </p>
          <span className="font-sans text-[10px] text-[oklch(0.5_0.04_55)] tracking-widest uppercase mt-1">
            — Um lembrete carinhoso
          </span>
        </div>
      </div>

      <div className="mt-4 sm:mt-8 flex justify-center">
        <span className="font-serif italic text-xs text-[oklch(0.5_0.04_55)]">03</span>
      </div>
    </div>
  )
}

export function JourneyPlanPage3({
  checked,
  onToggle,
}: {
  checked: boolean[]
  onToggle: (i: number) => void
}) {
  return (
    <div className="pdf-page relative flex flex-col bg-[oklch(0.975_0.008_75)] rounded-sm
      px-5 py-8 gap-4
      sm:px-10 sm:py-12
      md:px-14 md:py-14">
      <PageHeader />

      <div className="flex flex-col gap-3 sm:gap-4">
        {days.slice(10, 15).map((d, i) => (
          <DayCard key={d.day} day={d} checked={checked[i + 10]} onToggle={() => onToggle(i + 10)} />
        ))}
      </div>

      {/* Completion celebration */}
      <div className="mt-4 sm:mt-8 bg-[oklch(0.22_0.02_55)] text-[oklch(0.99_0.005_70)] rounded-sm p-6 sm:p-8 flex flex-col items-center text-center gap-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-[oklch(0.72_0.1_80)] flex items-center justify-center">
          <span className="font-serif text-xl sm:text-2xl text-[oklch(0.72_0.1_80)]">✦</span>
        </div>
        <h3 className="font-serif text-xl sm:text-2xl font-light text-[oklch(0.72_0.1_80)]">
          15 dias completados.
        </h3>
        <p className="font-sans text-sm leading-relaxed text-[oklch(0.87_0.02_70)] max-w-md">
          Parabéns pela dedicação. Agora é hora de olhar para trás com carinho e responder ao Questionário
          de Percepção Conjugal para medir o quanto o seu olhar sobre a relação evoluiu.
        </p>
        <div className="flex items-center gap-3 mt-2">
          <div className="h-px w-8 sm:w-12 bg-[oklch(0.72_0.1_80)] opacity-40" />
          <span className="font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[oklch(0.72_0.1_80)] opacity-60">
            Continue para a Aba 3
          </span>
          <div className="h-px w-8 sm:w-12 bg-[oklch(0.72_0.1_80)] opacity-40" />
        </div>
      </div>

      <div className="mt-4 sm:mt-8 flex justify-center">
        <span className="font-serif italic text-xs text-[oklch(0.5_0.04_55)]">04</span>
      </div>
    </div>
  )
}
