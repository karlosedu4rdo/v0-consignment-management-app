"use client"

import { Card } from "@/components/ui/card"
import { DollarSign, TrendingUp, ShoppingCart } from "lucide-react"

export function MerchantFinancial() {
  const mockFinancial = {
    totalVendido: 5200,
    comissaoLoja: 1040,
    aPagarFornecedor: 4160,
    ultimasVendas: [
      { data: "2025-11-25", quantidade: 2, valor: 900 },
      { data: "2025-11-24", quantidade: 3, valor: 1350 },
      { data: "2025-11-23", quantidade: 1, valor: 450 },
    ],
  }

  return (
    <div className="space-y-6">
      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-6 border-border/40">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Vendido</p>
              <p className="text-2xl sm:text-3xl font-bold">
                R$ {mockFinancial.totalVendido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <ShoppingCart className="w-8 h-8 text-primary/40" />
          </div>
        </Card>

        <Card className="p-6 border-border/40">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Sua Comissão (20%)</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600">
                R$ {mockFinancial.comissaoLoja.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600/40" />
          </div>
        </Card>

        <Card className="p-6 border-border/40 bg-primary/5 border-primary/20">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">A Pagar ao Fornecedor</p>
              <p className="text-2xl sm:text-3xl font-bold text-primary">
                R$ {mockFinancial.aPagarFornecedor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-primary/40" />
          </div>
        </Card>
      </div>

      {/* Últimas Vendas */}
      <Card className="p-6 border-border/40">
        <h3 className="text-lg font-bold mb-4">Últimas Vendas</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {mockFinancial.ultimasVendas.map((venda, idx) => (
            <div key={idx} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium text-sm">{venda.data}</p>
                <p className="text-xs text-muted-foreground">{venda.quantidade} unidade(s)</p>
              </div>
              <p className="font-bold text-primary">
                R$ {venda.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Informações */}
      <Card className="p-6 border-border/40 bg-muted/30">
        <h3 className="font-bold mb-2">Como funciona o acerto?</h3>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li>✓ Cada venda é registrada instantaneamente no seu estoque</li>
          <li>✓ Sua comissão (20%) é calculada automaticamente</li>
          <li>✓ O acerto final é realizado na visita do fornecedor</li>
          <li>✓ Nenhuma surpresa na hora - tudo transparente</li>
        </ul>
      </Card>
    </div>
  )
}
