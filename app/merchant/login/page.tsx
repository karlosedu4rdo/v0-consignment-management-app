"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function MerchantLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (email === "comerciante@malacheia.com" && password === "merchant123") {
        localStorage.setItem("merchantToken", "mock-token-" + Date.now())
        localStorage.setItem("merchantEmail", email)
        localStorage.setItem("merchantName", "Loja do João")
        router.push("/merchant/dashboard")
      } else {
        setError("Email ou senha incorretos")
      }
    } catch (err) {
      setError("Erro ao fazer login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border/40">
        <div className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold mx-auto">
              M
            </div>
            <h1 className="text-2xl font-bold">Comerciante Login</h1>
            <p className="text-sm text-muted-foreground">Acesse sua conta de vendedor</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="comerciante@malacheia.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Senha</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"} →
            </Button>
          </form>

          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">Demo: comerciante@malacheia.com / merchant123</p>
            <Link href="/">
              <Button variant="ghost" className="w-full" size="sm">
                Voltar para Home
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}
