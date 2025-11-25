"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                ← Voltar
              </Button>
            </Link>
            <h1 className="font-bold text-lg">Documentação MalaCheia</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="geral" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="geral">Geral</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
            <TabsTrigger value="comerciante">Comerciante</TabsTrigger>
            <TabsTrigger value="credenciais">Credenciais</TabsTrigger>
          </TabsList>

          <TabsContent value="geral" className="space-y-6">
            <Card className="p-6 border-border/40">
              <h2 className="text-2xl font-bold mb-4">MalaCheia - Gestão de Consignados</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">MalaCheia</strong> é um sistema completo e inteligente para gestão
                  de produtos em regime de consignação. A filosofia do sistema é: <em>"Confiança baseada em dados"</em>.
                </p>
                <div className="space-y-3">
                  <h3 className="font-bold text-foreground text-lg">Principais Recursos:</h3>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Dashboard administrativo com métricas em tempo real</li>
                    <li>Gestão de estoque (QG e consignado)</li>
                    <li>Sistema de pedidos com aprovação inteligente</li>
                    <li>Financeiro transparente com cálculo automático</li>
                    <li>QR Codes únicos para rastreabilidade</li>
                    <li>Roteirização inteligente para entregas</li>
                    <li>App PWA para comerciantes</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="admin" className="space-y-6">
            <Card className="p-6 border-border/40">
              <h2 className="text-2xl font-bold mb-4">Painel Administrativo</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-bold text-foreground mb-2">Dashboard (Visão Geral)</h3>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Valor total em rua</li>
                    <li>Curva ABC de parceiros</li>
                    <li>Alertas de estagnação (30+ dias)</li>
                    <li>Gráficos de desempenho</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Gestão de Estoque</h3>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Estoque na sede (QG)</li>
                    <li>Estoque em rua (consignado)</li>
                    <li>Histórico completo</li>
                    <li>Rastreabilidade por produto</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Gestão de Pedidos</h3>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Visualizar pedidos pendentes</li>
                    <li>Sistema de sugestão automática</li>
                    <li>Editar quantidade</li>
                    <li>Aprovar ou rejeitar</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="comerciante" className="space-y-6">
            <Card className="p-6 border-border/40">
              <h2 className="text-2xl font-bold mb-4">App do Comerciante</h2>
              <div className="space-y-4 text-muted-foreground">
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-sm">
                    <strong className="text-foreground">Nota:</strong> O app é um PWA, funciona como app no celular sem
                    necessidade de baixar.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Meu Estoque</h3>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Visualize o que está em sua loja</li>
                    <li>Marque vendas em tempo real</li>
                    <li>Dias que o produto está</li>
                    <li>Total de vendas realizadas</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Catálogo</h3>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Visualize estoque disponível</li>
                    <li>Filtros por região</li>
                    <li>Escolha quantidade</li>
                    <li>Envie solicitação de consignação</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="credenciais" className="space-y-6">
            <Card className="p-6 border-border/40">
              <h2 className="text-2xl font-bold mb-4">Credenciais de Acesso (Demo)</h2>
              <div className="space-y-4">
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg space-y-2">
                  <h3 className="font-bold text-foreground">Administrador</h3>
                  <div className="font-mono text-sm space-y-1">
                    <p>
                      <strong>Email:</strong> admin@malacheia.com
                    </p>
                    <p>
                      <strong>Senha:</strong> admin123
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg space-y-2">
                  <h3 className="font-bold text-foreground">Comerciante</h3>
                  <div className="font-mono text-sm space-y-1">
                    <p>
                      <strong>Email:</strong> comerciante@malacheia.com
                    </p>
                    <p>
                      <strong>Senha:</strong> merchant123
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-muted/30 border border-border/40 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    ℹ️ Credenciais de demonstração. Em produção, usar autenticação real.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border/40">
              <h2 className="text-2xl font-bold mb-4">Links Rápidos</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <Link href="/admin/login" className="flex-1">
                  <Button className="w-full">Admin Login</Button>
                </Link>
                <Link href="/merchant/login" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    Comerciante Login
                  </Button>
                </Link>
                <Link href="/test" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    Testes
                  </Button>
                </Link>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
