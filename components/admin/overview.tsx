"use client"
import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { useDashboard } from "@/lib/context"

export function AdminOverview() {
  const { data } = useDashboard()

  const COLORS = ["#6366f1", "#ec4899", "#f97316"]

  // Calcular métricas em tempo real
  const activeMerchants = data.merchants.filter((m) => m.ativo)

  const valorEmRua = data.consignments
    .filter((c) => c.status === "em_loja")
    .reduce((acc, c) => {
      const product = data.products.find((p) => p.id === c.productId)
      return acc + (product ? c.quantidadeAtual * product.precoCusto : 0)
    }, 0)

  const vendidosPendente = data.consignments.filter((c) => c.status === "vendido_pendente_pgto").length

  const alertasEstagnacao = data.consignments.filter((c) => {
    const diasEnviado = Math.floor((Date.now() - new Date(c.dataEnvio).getTime()) / (1000 * 60 * 60 * 24))
    return c.status === "em_loja" && diasEnviado > 30 && c.quantidadeAtual > 0
  }).length

  // Curva ABC: agrupar por merchant
  const curvaABC = data.merchants
    .filter((m) => m.ativo)
    .map((m) => {
      const totalVendido = data.consignments
        .filter((c) => c.merchantId === m.id && c.status === "pago")
        .reduce((acc, c) => {
          const product = data.products.find((p) => p.id === c.productId)
          return acc + (product ? c.quantidadeVendida * product.precoVenda : 0)
        }, 0)
      return { merchant: m, totalVendido }
    })
    .sort((a, b) => b.totalVendido - a.totalVendido)
    .slice(0, 3)

  const totalVendas = curvaABC.reduce((acc, item) => acc + item.totalVendido, 0)

  const curvaABCFormatada = curvaABC.map((item, idx) => ({
    name: `Classe ${["A", "B", "C"][idx]}`,
    valor: item.totalVendido,
    percentual: totalVendas > 0 ? Math.round((item.totalVendido / totalVendas) * 100) : 0,
  }))

  // Vendas por Dia
  const vendasPorDia = [
    { dia: "Seg", vendas: 2400 },
    { dia: "Ter", vendas: 1398 },
    { dia: "Qua", vendas: 9800 },
    { dia: "Qui", vendas: 3908 },
    { dia: "Sex", vendas: 4800 },
    { dia: "Sab", vendas: 3800 },
    { dia: "Dom", vendas: 4300 },
  ]

  // Top parceiros por vendas
  const parceirosTop = data.merchants
    .filter((m) => m.ativo)
    .map((m) => {
      const vendas = data.consignments
        .filter((c) => c.merchantId === m.id && c.status === "pago")
        .reduce((acc, c) => {
          const product = data.products.find((p) => p.id === c.productId)
          return acc + (product ? c.quantidadeVendida * product.precoVenda : 0)
        }, 0)
      const estoque = data.consignments
        .filter((c) => c.merchantId === m.id && c.status === "em_loja")
        .reduce((acc, c) => acc + c.quantidadeAtual, 0)
      return { nome: m.nome, vendas, estoque }
    })
    .sort((a, b) => b.vendas - a.vendas)
    .slice(0, 3)

  // Produtos estagnados
  const produtosEstagnados = data.consignments
    .filter((c) => {
      const diasEnviado = Math.floor((Date.now() - new Date(c.dataEnvio).getTime()) / (1000 * 60 * 60 * 24))
      return c.status === "em_loja" && diasEnviado > 30 && c.quantidadeAtual > 0
    })
    .slice(0, 3)
    .map((c) => {
      const product = data.products.find((p) => p.id === c.productId)
      const merchant = data.merchants.find((m) => m.id === c.merchantId)
      const diasLoja = Math.floor((Date.now() - new Date(c.dataEnvio).getTime()) / (1000 * 60 * 60 * 24))
      return {
        produto: product?.modelo || "Desconhecido",
        diasLoja,
        loja: merchant?.nome || "Desconhecida",
      }
    })

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 border-border/40">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Valor em Rua</p>
              <p className="text-2xl sm:text-3xl font-bold">
                R$ {valorEmRua.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <span className="text-2xl">💰</span>
          </div>
        </Card>

        <Card className="p-6 border-border/40">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Parceiros Ativos</p>
              <p className="text-2xl sm:text-3xl font-bold">{activeMerchants.length}</p>
            </div>
            <span className="text-2xl">👥</span>
          </div>
        </Card>

        <Card className="p-6 border-border/40">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Itens Vendidos</p>
              <p className="text-2xl sm:text-3xl font-bold">{vendidosPendente}</p>
            </div>
            <span className="text-2xl">📦</span>
          </div>
        </Card>

        <Card className="p-6 border-border/40">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Alertas Estagnação</p>
              <p className="text-2xl sm:text-3xl font-bold text-destructive">{alertasEstagnacao}</p>
            </div>
            <span className="text-2xl">⚠️</span>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Vendas por Dia */}
        <Card className="p-6 border-border/40">
          <h3 className="font-bold mb-4">Vendas por Dia</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={vendasPorDia}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="dia" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Line
                type="monotone"
                dataKey="vendas"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Curva ABC */}
        <Card className="p-6 border-border/40">
          <h3 className="font-bold mb-4">Top 3 Parceiros por Vendas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={curvaABCFormatada}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentual }) => `${name}: ${percentual}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="percentual"
              >
                {curvaABCFormatada.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Parceiros */}
        <Card className="p-6 border-border/40">
          <h3 className="font-bold mb-4">Top Parceiros</h3>
          <div className="space-y-4">
            {parceirosTop.length > 0 ? (
              parceirosTop.map((parceiro, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{parceiro.nome}</p>
                    <p className="text-xs text-muted-foreground">{parceiro.estoque} itens em estoque</p>
                  </div>
                  <p className="font-bold text-primary">R$ {parceiro.vendas.toLocaleString("pt-BR")}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">Nenhuma venda registrada ainda</div>
            )}
          </div>
        </Card>

        {/* Produtos Estagnados */}
        <Card className="p-6 border-border/40">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <span>⚠️</span>
            Produtos Estagnados (&gt;30 dias)
          </h3>
          <div className="space-y-4">
            {produtosEstagnados.length > 0 ? (
              produtosEstagnados.map((produto, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-start p-3 bg-destructive/5 border border-destructive/20 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-sm">{produto.produto}</p>
                    <p className="text-xs text-muted-foreground">{produto.loja}</p>
                  </div>
                  <p className="text-xs font-bold text-destructive">{produto.diasLoja} dias</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">Nenhum produto estagnado</div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
