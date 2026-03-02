"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

const SHEETS_API_URL = "/api/sheets"

type User = {
  nome: string
  telefone: string
}

type ActionResult = {
  ok: boolean
  error?: string
}

type LoginData = {
  success: true
  exists?: boolean
  nome?: string
  progresso?: boolean[]
}

type ApiEnvelope<T> = {
  ok: boolean
  error?: string
  data?: T
}

type SaveProgressOptions = {
  keepalive?: boolean
}

type AuthContextType = {
  user: User | null
  progresso: boolean[]
  isLoading: boolean
  login: (nome: string, telefone: string) => Promise<ActionResult>
  logout: () => void
  toggleDay: (index: number) => void
  saveProgress: (options?: SaveProgressOptions) => Promise<void>
  submitQuestionnaire: (answers: (number | null)[]) => Promise<ActionResult>
}

const AuthContext = createContext<AuthContextType | null>(null)

async function readApiError(response: Response) {
  try {
    const payload = (await response.json()) as { error?: string }
    return payload.error || "Falha ao comunicar com a planilha."
  } catch {
    return "Falha ao comunicar com a planilha."
  }
}

async function readApiJson<T>(response: Response) {
  return (await response.json()) as ApiEnvelope<T>
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [progresso, setProgresso] = useState<boolean[]>(Array(15).fill(false))
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("jornada_user")
    const savedProgresso = localStorage.getItem("jornada_progresso")

    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }

    if (savedProgresso) {
      setProgresso(JSON.parse(savedProgresso))
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (user) {
      localStorage.setItem("jornada_progresso", JSON.stringify(progresso))
    }
  }, [progresso, user])

  const login = async (nome: string, telefone: string): Promise<ActionResult> => {
    try {
      const response = await fetch(SHEETS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "login",
          nome: nome.trim(),
          telefone: telefone.trim(),
        }),
      })

      if (!response.ok) {
        return { ok: false, error: await readApiError(response) }
      }

      const payload = await readApiJson<LoginData>(response)
      const progressoServidor =
        Array.isArray(payload.data?.progresso) && payload.data?.progresso.length === 15
          ? payload.data.progresso
          : [...Array(15).fill(false)]
      const userData = {
        nome: payload.data?.nome?.trim() || nome.trim(),
        telefone: telefone.trim(),
      }

      setUser(userData)
      setProgresso(progressoServidor)
      localStorage.setItem("jornada_user", JSON.stringify(userData))
      localStorage.setItem("jornada_progresso", JSON.stringify(progressoServidor))
      return { ok: true }
    } catch (error) {
      console.error("Erro no login:", error)
      return { ok: false, error: "Erro de conexao com a planilha." }
    }
  }

  const logout = () => {
    setUser(null)
    setProgresso(Array(15).fill(false))
    localStorage.removeItem("jornada_user")
    localStorage.removeItem("jornada_progresso")
  }

  const toggleDay = (index: number) => {
    setProgresso((prev) => {
      const next = [...prev]
      next[index] = !next[index]
      return next
    })
  }

  const saveProgress = async (options?: SaveProgressOptions): Promise<void> => {
    if (!user) return

    try {
      const response = await fetch(SHEETS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "saveProgress",
          telefone: user.telefone,
          progresso,
        }),
        keepalive: options?.keepalive ?? false,
      })

      if (!response.ok) {
        console.error("Erro ao salvar progresso na planilha:", await readApiError(response))
      }
    } catch (error) {
      console.error("Erro ao salvar progresso:", error)
    }
  }

  const submitQuestionnaire = async (answers: (number | null)[]): Promise<ActionResult> => {
    if (!user) {
      return { ok: false, error: "Usuario nao autenticado." }
    }

    try {
      const response = await fetch(SHEETS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "questionnaire",
          nome: user.nome,
          telefone: user.telefone,
          answers,
        }),
      })

      if (!response.ok) {
        return { ok: false, error: await readApiError(response) }
      }

      return { ok: true }
    } catch (error) {
      console.error("Erro ao enviar questionario:", error)
      return { ok: false, error: "Erro de conexao com a planilha." }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        progresso,
        isLoading,
        login,
        logout,
        toggleDay,
        saveProgress,
        submitQuestionnaire,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider")
  }

  return context
}
