"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"

export function LoginScreen() {
  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")

    if (numbers.length <= 2) {
      return numbers
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    } else if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
    }

    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelefone(formatPhone(e.target.value))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!nome.trim()) {
      setError("Por favor, digite seu nome.")
      return
    }

    const phoneNumbers = telefone.replace(/\D/g, "")
    if (phoneNumbers.length < 10) {
      setError("Por favor, digite um telefone valido.")
      return
    }

    setIsSubmitting(true)

    try {
      const result = await login(nome, telefone)
      if (!result.ok) {
        setError(result.error || "Erro ao fazer login. Tente novamente.")
      }
    } catch {
      setError("Erro de conexao. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="h-dvh overflow-hidden bg-[oklch(0.22_0.02_55)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-[oklch(0.72_0.1_80)] flex items-center justify-center">
            <span className="font-serif text-2xl italic text-[oklch(0.72_0.1_80)]">J</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[oklch(0.93_0.02_75)] mb-2">
            Jornada de 15 Dias
          </h1>
          <p className="font-sans text-sm text-[oklch(0.60_0.04_55)]">Conexao Conjugal</p>
        </div>

        <div className="bg-[oklch(0.975_0.008_75)] rounded-lg p-6 sm:p-8 shadow-xl">
          <div className="text-center mb-6">
            <h2 className="font-serif text-lg text-[oklch(0.28_0.03_50)] mb-2">
              Bem-vinda a sua jornada
            </h2>
            <p className="font-sans text-xs text-[oklch(0.5_0.04_55)]">
              Digite os dados usados na compra para acessar seu material exclusivo.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="nome"
                className="font-sans text-xs tracking-widest uppercase text-[oklch(0.5_0.04_55)]"
              >
                SEU NOME E SOBRENOME
              </label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite seu nome e sobrenome"
                className="w-full bg-[oklch(0.99_0.005_70)] border border-[oklch(0.87_0.02_70)] rounded-sm px-4 py-3 font-sans text-base sm:text-sm text-[oklch(0.22_0.02_55)] placeholder:text-[oklch(0.7_0.02_55)] focus:outline-none focus:border-[oklch(0.48_0.09_42)] transition-colors"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="telefone"
                className="font-sans text-xs tracking-widest uppercase text-[oklch(0.5_0.04_55)]"
              >
                Telefone da compra
              </label>
              <input
                id="telefone"
                type="tel"
                value={telefone}
                onChange={handlePhoneChange}
                placeholder="(00) 00000-0000"
                className="w-full bg-[oklch(0.99_0.005_70)] border border-[oklch(0.87_0.02_70)] rounded-sm px-4 py-3 font-sans text-base sm:text-sm text-[oklch(0.22_0.02_55)] placeholder:text-[oklch(0.7_0.02_55)] focus:outline-none focus:border-[oklch(0.48_0.09_42)] transition-colors"
                disabled={isSubmitting}
              />
            </div>

            {error && (
              <p className="font-sans text-xs text-[oklch(0.5_0.08_25)] bg-[oklch(0.95_0.03_25)] px-3 py-2 rounded-sm">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-[oklch(0.48_0.09_42)] hover:bg-[oklch(0.42_0.09_42)] disabled:opacity-60 text-[oklch(0.99_0.005_70)] font-sans text-sm font-medium px-6 py-3.5 rounded-sm transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Entrando...
                </>
              ) : (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  Acessar minha jornada
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 font-sans text-xs text-[oklch(0.45_0.03_55)]">
          Area exclusiva para alunas do curso.
        </p>
      </div>
    </div>
  )
}
