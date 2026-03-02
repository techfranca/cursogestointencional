"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { LoginScreen } from "@/components/LoginScreen"
import { CoverPage } from "@/components/pdf/CoverPage"
import { IntroPage } from "@/components/pdf/IntroPage"
import { JourneyPlanPage1, JourneyPlanPage2, JourneyPlanPage3 } from "@/components/pdf/JourneyPlanPage"
import { ReflectionPage, ChecklistPage } from "@/components/pdf/ReflectionPage"
import { QuestionnairePage1, QuestionnairePage2 } from "@/components/pdf/QuestionnairePage"

type Tab = "plano" | "reflexao" | "questionario"

type QuestionnaireDraft = {
  answers: (number | null)[]
  status: "idle" | "loading" | "success" | "error"
  errorMsg: string
}

const tabs: { key: Tab; short: string; long: string }[] = [
  { key: "plano", short: "Plano", long: "Plano de Atividades" },
  { key: "reflexao", short: "Reflexão", long: "Reflexão & Checklist" },
  { key: "questionario", short: "Questionário", long: "Questionário" },
]

function getTabStorageKey(telefone: string) {
  return `jornada_active_tab:${telefone}`
}

function getQuestionnaireStorageKey(telefone: string) {
  return `jornada_questionario:${telefone}`
}

export default function PDFViewer() {
  const { user, progresso, isLoading, toggleDay, saveProgress, logout, submitQuestionnaire } = useAuth()
  const [activeTab, setActiveTab] = useState<Tab>("plano")
  const [answers, setAnswers] = useState<(number | null)[]>(Array(9).fill(null))
  const [questionnaireStatus, setQuestionnaireStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    if (!user) return

    const storedTab = localStorage.getItem(getTabStorageKey(user.telefone))
    if (storedTab === "plano" || storedTab === "reflexao" || storedTab === "questionario") {
      setActiveTab(storedTab)
    } else {
      setActiveTab("plano")
    }

    const storedQuestionnaire = localStorage.getItem(getQuestionnaireStorageKey(user.telefone))
    if (storedQuestionnaire) {
      try {
        const parsed = JSON.parse(storedQuestionnaire) as QuestionnaireDraft
        if (Array.isArray(parsed.answers) && parsed.answers.length === 9) {
          setAnswers(parsed.answers)
        } else {
          setAnswers(Array(9).fill(null))
        }
        setQuestionnaireStatus(parsed.status || "idle")
        setErrorMsg(parsed.errorMsg || "")
      } catch {
        setAnswers(Array(9).fill(null))
        setQuestionnaireStatus("idle")
        setErrorMsg("")
      }
      return
    }

    setAnswers(Array(9).fill(null))
    setQuestionnaireStatus("idle")
    setErrorMsg("")
  }, [user])

  useEffect(() => {
    if (!user) return
    localStorage.setItem(getTabStorageKey(user.telefone), activeTab)
  }, [activeTab, user])

  useEffect(() => {
    if (!user) return

    const draft: QuestionnaireDraft = {
      answers,
      status: questionnaireStatus,
      errorMsg,
    }

    localStorage.setItem(getQuestionnaireStorageKey(user.telefone), JSON.stringify(draft))
  }, [answers, questionnaireStatus, errorMsg, user])

  useEffect(() => {
    if (!user) return

    const timer = setTimeout(() => {
      saveProgress()
    }, 800)

    return () => clearTimeout(timer)
  }, [progresso, user, saveProgress])

  useEffect(() => {
    if (!user) return

    const flushProgress = () => {
      void saveProgress({ keepalive: true })
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        flushProgress()
      }
    }

    window.addEventListener("pagehide", flushProgress)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.removeEventListener("pagehide", flushProgress)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [user, saveProgress])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[oklch(0.22_0.02_55)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin w-8 h-8 text-[oklch(0.72_0.1_80)]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span className="font-sans text-sm text-[oklch(0.60_0.04_55)]">Carregando...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginScreen />
  }

  const completedCount = progresso.filter(Boolean).length

  const setAnswer = (i: number, v: number) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[i] = v
      return next
    })
    setQuestionnaireStatus((prev) => (prev === "success" ? "idle" : prev))
    setErrorMsg("")
  }

  const questions = [
    { num: "01", text: "Sinto que minha lealdade e investimento emocional estão primeiramente no meu casamento...", theme: "Lealdade", optional: false },
    { num: "02", text: "Consigo equilibrar bem o meu tempo e interesses individuais com a construção da nossa identidade como casal...", theme: "Identidade", optional: false },
    { num: "03", text: "(Se tiver filhos) Conseguimos manter a nossa cumplicidade e privacidade como casal...", theme: "Privacidade", optional: true },
    { num: "04", text: "Quando enfrentamos crises externas, tendemos a nos proteger e nos apoiar mutuamente...", theme: "Resiliência", optional: false },
    { num: "05", text: "Sinto que nosso casamento é um lugar seguro para expressar diferenças e até raiva...", theme: "Segurança", optional: false },
    { num: "06", text: "Nossa vida íntima e sexual é valorizada e protegida por nós...", theme: "Intimidade", optional: false },
    { num: "07", text: "Mantemos o bom humor, o riso e o interesse um pela vida do outro...", theme: "Leveza", optional: false },
    { num: "08", text: "Sinto que meu parceiro é um 'porto seguro' para minhas vulnerabilidades...", theme: "Suporte", optional: false },
    { num: "09", text: "Consigo manter viva a admiração e as imagens carinhosas de quando nos apaixonamos...", theme: "Admiração", optional: false },
  ]

  const handleSubmitQuestionnaire = async () => {
    const requiredUnanswered = questions
      .filter((q) => !q.optional)
      .some((_, i) => answers[i] === null && !questions[i].optional)

    if (requiredUnanswered) {
      setErrorMsg("Por favor, responda todas as perguntas obrigatórias antes de enviar.")
      setQuestionnaireStatus("error")
      return
    }

    setQuestionnaireStatus("loading")
    setErrorMsg("")

    try {
      const result = await submitQuestionnaire(answers)
      if (result.ok) {
        setQuestionnaireStatus("success")
      } else {
        throw new Error(result.error || "Erro ao enviar")
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao enviar. Tente novamente."
      setErrorMsg(message)
      setQuestionnaireStatus("error")
    }
  }

  const questionnaireState = {
    name: user.nome,
    setName: () => {},
    answers,
    setAnswer,
    status: questionnaireStatus,
    errorMsg,
    onSubmit: handleSubmitQuestionnaire,
  }

  return (
    <>
      <div className="no-print sticky top-0 z-50 bg-[oklch(0.22_0.02_55)] border-b border-[oklch(0.35_0.03_55)] shadow-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-6 h-6 rounded-full border border-[oklch(0.72_0.1_80)] flex items-center justify-center">
              <span className="font-serif text-xs italic text-[oklch(0.72_0.1_80)]">J</span>
            </div>
            <span className="font-serif text-sm text-[oklch(0.87_0.02_70)] tracking-wide hidden sm:block">
              Jornada de 15 Dias
            </span>
          </div>

          <nav className="flex items-center gap-1 overflow-x-auto scrollbar-none" aria-label="Seções do material">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`shrink-0 px-3 py-1.5 font-sans text-xs tracking-wide rounded-sm transition-all ${
                  activeTab === tab.key
                    ? "bg-[oklch(0.48_0.09_42)] text-[oklch(0.99_0.005_70)]"
                    : "text-[oklch(0.72_0.1_80)] hover:text-[oklch(0.93_0.02_75)] hover:bg-[oklch(0.30_0.02_55)]"
                }`}
                aria-current={activeTab === tab.key ? "page" : undefined}
              >
                <span className="sm:hidden">{tab.short}</span>
                <span className="hidden sm:inline">{tab.long}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden sm:block font-sans text-xs text-[oklch(0.72_0.1_80)]">
              Olá, {user.nome.split(" ")[0]}
            </span>
            <button
              onClick={logout}
              title="Sair"
              className="shrink-0 p-2 text-[oklch(0.72_0.1_80)] hover:text-[oklch(0.93_0.02_75)] hover:bg-[oklch(0.30_0.02_55)] rounded-sm transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="sm:hidden flex border-t border-[oklch(0.35_0.03_55)]">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2 font-sans text-[11px] tracking-wide transition-all ${
                activeTab === tab.key
                  ? "bg-[oklch(0.48_0.09_42)] text-[oklch(0.99_0.005_70)]"
                  : "text-[oklch(0.60_0.04_55)]"
              }`}
              aria-current={activeTab === tab.key ? "page" : undefined}
            >
              {tab.short}
            </button>
          ))}
        </div>
      </div>

      <main className="no-print bg-[oklch(0.87_0.02_70)] min-h-screen py-5 sm:py-8 px-3 sm:px-4">
        <div className="max-w-4xl mx-auto flex flex-col gap-4 sm:gap-6">
          {activeTab === "plano" && (
            <>
              <div className="bg-[oklch(0.99_0.005_70)] border border-[oklch(0.87_0.02_70)] rounded-sm px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3 sm:gap-4">
                <span className="font-sans text-xs text-[oklch(0.5_0.04_55)] tracking-wide whitespace-nowrap">
                  Progresso
                </span>
                <div className="flex-1 h-2 bg-[oklch(0.87_0.02_70)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[oklch(0.48_0.09_42)] rounded-full transition-all duration-500"
                    style={{ width: `${(completedCount / 15) * 100}%` }}
                  />
                </div>
                <span className="font-serif text-sm font-semibold text-[oklch(0.48_0.09_42)] whitespace-nowrap">
                  {completedCount} / 15
                </span>
              </div>
              <CoverPage />
              <IntroPage />
              <JourneyPlanPage1 checked={progresso} onToggle={toggleDay} />
              <JourneyPlanPage2 checked={progresso} onToggle={toggleDay} />
              <JourneyPlanPage3 checked={progresso} onToggle={toggleDay} />
            </>
          )}

          {activeTab === "reflexao" && (
            <>
              <ReflectionPage />
              <ChecklistPage checked={progresso} onToggle={toggleDay} />
            </>
          )}

          {activeTab === "questionario" && (
            <>
              <QuestionnairePage1 state={questionnaireState} />
              <QuestionnairePage2 state={questionnaireState} />
            </>
          )}
        </div>

        <div className="max-w-4xl mx-auto mt-6 sm:mt-8 flex items-center justify-center gap-3">
          <div className="h-px flex-1 bg-[oklch(0.78_0.02_70)]" />
          <p className="font-sans text-xs text-[oklch(0.5_0.04_55)] text-center px-2">
            Seu progresso é salvo automaticamente.
          </p>
          <div className="h-px flex-1 bg-[oklch(0.78_0.02_70)]" />
        </div>
      </main>

      <div className="print-only">
        <CoverPage />
        <IntroPage />
        <JourneyPlanPage1 checked={progresso} onToggle={toggleDay} />
        <JourneyPlanPage2 checked={progresso} onToggle={toggleDay} />
        <JourneyPlanPage3 checked={progresso} onToggle={toggleDay} />
        <ReflectionPage />
        <ChecklistPage checked={progresso} onToggle={toggleDay} />
        <QuestionnairePage1 state={questionnaireState} />
        <QuestionnairePage2 state={questionnaireState} />
      </div>
    </>
  )
}
