"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp, Clock } from "lucide-react"

const mockFinanceiro = [
  { id: 1, loja: "Loja do João", totalVendido: 5200, comissao: 1040, aPagar: 4160, status: "pendente" },
  { id: 2, loja: "Loja da Maria", totalVendido: 4100, comissao: 820, aPagar: 3280, status: "pago" },
  { id: 3, loja: "Loja do Pedro", totalVendido: 3800, comissao: 760, aPagar: 3040, status: "pendente" },
  { id: 4, loja: "Loja da Ana", totalVendido: 2900, comissao: 580, aPagar: 2320, status: "parcial" },
]

export function Financial() {
  const totalVendido = mockFinanceiro.reduce((acc, item) => acc + item.totalVendido, 0)
  const totalAReceber = mockFinanceiro.reduce((acc, item) => acc + item.aPagar, 0)

  const statusColors = {
    pago: "bg-green-500/10 text-green-700 border-green-500/20",
    pendente: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
    parcial: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  }

  return (
    <div className="space-y-6">
      {/* Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-6 border-border/40">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Vendido</p>
              <p className="text-2xl sm:text-3xl font-bold">
                R$ {totalVendido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-primary/40" />
          </div>
        </Card>

        <Card className="p-6 border-border/40">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">A Receber</p>
              <p className="text-2xl sm:text-3xl font-bold text-primary">
                R$ {totalAReceber.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <Clock className="w-8 h-8 text-primary/40" />
          </div>
        </Card>

        <Card className="p-6 border-border/40">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Comissões</p>
              <p className="text-2xl sm:text-3xl font-bold">
                R${" "}
                {mockFinanceiro
                  .reduce((acc, item) => acc + item.comissao, 0)
                  .toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-primary/40" />
          </div>
        </Card>
      </div>

      {/* Contas a Receber */}
      <Card className="p-6 border-border/40">
        <h3 className="text-lg font-bold mb-4">Contas a Receber</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {mockFinanceiro.map((item) => (
            <div key={item.id} className="border border-border/40 rounded-lg p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="font-medium">{item.loja}</p>
                  <p className="text-sm text-muted-foreground">
                    Total: R$ {item.totalVendido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className={statusColors[item.status as keyof typeof statusColors]}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-2 bg-muted/30 rounded">
                  <p className="text-xs text-muted-foreground">Comissão (20%)</p>
                  <p className="font-bold">R$ {item.comissao.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="p-2 bg-primary/5 border border-primary/20 rounded">
                  <p className="text-xs text-muted-foreground">A Pagar</p>
                  <p className="font-bold text-primary">
                    R$ {item.aPagar.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
