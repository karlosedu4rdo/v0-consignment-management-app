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

// Mock data
const mockData = {
  valorEmRua: 15420.5,
  totalParceiros: 24,
  pedidosPendentes: 8,
  alertasEstagnacao: 5,

  curvaABC: [
    { name: "Classe A", parceiros: 5, percentualVendas: 70 },
    { name: "Classe B", parceiros: 12, percentualVendas: 25 },
    { name: "Classe C", parceiros: 7, percentualVendas: 5 },
  ],

  vendasPorDia: [
    { dia: "Seg", vendas: 2400 },
    { dia: "Ter", vendas: 1398 },
    { dia: "Qua", vendas: 9800 },
    { dia: "Qui", vendas: 3908 },
    { dia: "Sex", vendas: 4800 },
    { dia: "Sab", vendas: 3800 },
    { dia: "Dom", vendas: 4300 },
  ],

  parceirosTop: [
    { nome: "Loja do João", vendas: 5200, estoque: 45 },
    { nome: "Loja da Maria", vendas: 4100, estoque: 32 },
    { nome: "Loja do Pedro", vendas: 3800, estoque: 28 },
  ],

  produtosEstagnados: [
    { produto: "Bolsa Modelo A", diasLoja: 45, loja: "Loja do Carlos" },
    { produto: "Bolsa Modelo B", diasLoja: 38, loja: "Loja da Ana" },
    { produto: "Bolsa Modelo C", diasLoja: 32, loja: "Loja do João" },
  ],
}

export function AdminOverview() {
  const COLORS = ["#6366f1", "#ec4899", "#f97316"]

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 border-border/40">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Valor em Rua</p>
              <p className="text-2xl sm:text-3xl font-bold">
                R$ {mockData.valorEmRua.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <span className="text-2xl">💰</span>
          </div>
        </Card>

        <Card className="p-6 border-border/40">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Parceiros Ativos</p>
              <p className="text-2xl sm:text-3xl font-bold">{mockData.totalParceiros}</p>
            </div>
            <span className="text-2xl">👥</span>
          </div>
        </Card>

        <Card className="p-6 border-border/40">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Pedidos Pendentes</p>
              <p className="text-2xl sm:text-3xl font-bold">{mockData.pedidosPendentes}</p>
            </div>
            <span className="text-2xl">📦</span>
          </div>
        </Card>

        <Card className="p-6 border-border/40">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Alertas Estagnação</p>
              <p className="text-2xl sm:text-3xl font-bold text-destructive">{mockData.alertasEstagnacao}</p>
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
            <LineChart data={mockData.vendasPorDia}>
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
          <h3 className="font-bold mb-4">Curva ABC de Parceiros</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockData.curvaABC}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentualVendas }) => `${name}: ${percentualVendas}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="percentualVendas"
              >
                {mockData.curvaABC.map((entry, index) => (
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
          <h3 className="font-bold mb-4">Top 3 Parceiros</h3>
          <div className="space-y-4">
            {mockData.parceirosTop.map((parceiro, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{parceiro.nome}</p>
                  <p className="text-xs text-muted-foreground">{parceiro.estoque} itens em estoque</p>
                </div>
                <p className="font-bold text-primary">R$ {parceiro.vendas.toLocaleString("pt-BR")}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Produtos Estagnados */}
        <Card className="p-6 border-border/40">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <span>⚠️</span>
            Produtos Estagnados (&gt;30 dias)
          </h3>
          <div className="space-y-4">
            {mockData.produtosEstagnados.map((produto, idx) => (
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
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
