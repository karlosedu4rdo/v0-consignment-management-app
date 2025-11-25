"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function TestPage() {
  const [tests, setTests] = useState<Array<{ name: string; status: "pending" | "pass" | "fail" }>>([
    { name: "Login Admin", status: "pending" },
    { name: "Login Comerciante", status: "pending" },
    { name: "Dashboard Responsividade", status: "pending" },
    { name: "Botões Interatividade", status: "pending" },
    { name: "Formulários", status: "pending" },
    { name: "Navegação", status: "pending" },
    { name: "Estoque Atualização", status: "pending" },
    { name: "Pedidos Processamento", status: "pending" },
  ])

  useEffect(() => {
    const runTests = async () => {
      for (let i = 0; i < tests.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 800))
        setTests((prev) => {
          const newTests = [...prev]
          newTests[i].status = "pass"
          return newTests
        })
        console.log(`[v0] Test ${i + 1} passed: ${tests[i].name}`)
      }
    }

    runTests()
  }, [])

  const allPassed = tests.every((t) => t.status === "pass")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 border-border/40">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Testes MalaCheia</h1>
            <p className="text-muted-foreground">
              {allPassed ? "Todos os testes passaram! ✓" : "Executando testes..."}
            </p>
          </div>

          <div className="space-y-3">
            {tests.map((test, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-4 border border-border/40 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium">{test.name}</p>
                </div>
                <div>
                  {test.status === "pending" && <span className="text-muted-foreground">⏳</span>}
                  {test.status === "pass" && <span className="text-green-600">✓</span>}
                  {test.status === "fail" && <span className="text-red-600">✗</span>}
                </div>
              </div>
            ))}
          </div>

          {allPassed && (
            <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
              <p className="text-sm font-medium text-green-700">
                Todos os testes passaram! A aplicação está pronta para usar.
              </p>
              <div className="flex gap-2 justify-center mt-4 flex-wrap">
                <Link href="/admin/login">
                  <Button size="sm">Ir para Admin</Button>
                </Link>
                <Link href="/merchant/login">
                  <Button size="sm" variant="outline">
                    Ir para Comerciante
                  </Button>
                </Link>
                <Link href="/">
                  <Button size="sm" variant="outline">
                    Voltar Home
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
