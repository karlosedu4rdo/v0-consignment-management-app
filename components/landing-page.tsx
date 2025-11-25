"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                M
              </div>
              <span className="font-bold text-xl hidden sm:inline">MalaCheia</span>
            </div>
            <div className="flex gap-2 sm:gap-4">
              <Link href="/info">
                <Button variant="ghost" size="sm">
                  Docs
                </Button>
              </Link>
              <Link href="/admin/login">
                <Button variant="outline" size="sm">
                  Admin
                </Button>
              </Link>
              <Link href="/merchant/login">
                <Button size="sm">Comerciante</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-32">
        <div className="text-center space-y-6 sm:space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
            <span className="text-lg">⚡</span>
            <span className="text-sm font-medium text-primary">Confiança baseada em dados</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            Gestão Inteligente de <span className="text-primary">Consignados</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Controle total sobre seu estoque em rua. Rastreie produtos, aprove pedidos, gere QR codes e receba
            pagamentos com transparência total.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admin/login">
              <Button size="lg" className="w-full sm:w-auto">
                Área do Administrador →
              </Button>
            </Link>
            <Link href="/merchant/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Área do Comerciante
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          <Card className="p-6 sm:p-8 border-border/40 hover:border-primary/30 transition-colors">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">Dashboard Completo</h3>
            <p className="text-muted-foreground">
              Visualize valor em rua, curva ABC de parceiros e alertas de estagnação em tempo real.
            </p>
          </Card>

          <Card className="p-6 sm:p-8 border-border/40 hover:border-primary/30 transition-colors">
            <div className="text-3xl mb-4">📱</div>
            <h3 className="text-xl font-bold mb-2">QR Codes Únicos</h3>
            <p className="text-muted-foreground">
              Cada bolsa com QR code. Escaneia na visita e o acerto é gerado automaticamente.
            </p>
          </Card>

          <Card className="p-6 sm:p-8 border-border/40 hover:border-primary/30 transition-colors">
            <div className="text-3xl mb-4">🗺️</div>
            <h3 className="text-xl font-bold mb-2">Roteirização Inteligente</h3>
            <p className="text-muted-foreground">
              Agrupa pedidos por região e cria roteiros otimizados para economizar gasolina.
            </p>
          </Card>

          <Card className="p-6 sm:p-8 border-border/40 hover:border-primary/30 transition-colors">
            <div className="text-3xl mb-4">👥</div>
            <h3 className="text-xl font-bold mb-2">Gestão de Parceiros</h3>
            <p className="text-muted-foreground">
              Controle completo: estoque, vendas, comissões e acertos transparentes com cada comerciante.
            </p>
          </Card>

          <Card className="p-6 sm:p-8 border-border/40 hover:border-primary/30 transition-colors">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">Aprovação Inteligente</h3>
            <p className="text-muted-foreground">
              Sistema sugere quantidades baseado no histórico e você pode editar antes de aprovar.
            </p>
          </Card>

          <Card className="p-6 sm:p-8 border-border/40 hover:border-primary/30 transition-colors">
            <div className="text-3xl mb-4">🔗</div>
            <h3 className="text-xl font-bold mb-2">Rastreabilidade Total</h3>
            <p className="text-muted-foreground">
              Histórico completo: por onde cada produto passou e em qual loja vendeu.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <Card className="p-8 sm:p-12 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <div className="text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold">Pronto para começar?</h2>
            <p className="text-lg text-muted-foreground">
              Entre como administrador ou comerciante e comece a usar agora.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/admin/login">
                <Button size="lg">Admin Login</Button>
              </Link>
              <Link href="/merchant/login">
                <Button size="lg" variant="outline">
                  Merchant Login
                </Button>
              </Link>
              <Link href="/info">
                <Button size="lg" variant="ghost">
                  Ver Documentação
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/50 mt-12 sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 MalaCheia. Sistema de Gestão de Consignados. Todos os direitos reservados.</p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="/info" className="hover:text-foreground transition-colors">
              Documentação
            </Link>
            <Link href="/test" className="hover:text-foreground transition-colors">
              Testes
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
