"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminOverview } from "./overview"
import MerchantsManagement from "./merchants-management"
import ProductsManagement from "./products-management"
import FinancialSettlement from "./financial-settlement"
import ReverseLogistics from "./reverse-logistics"

export function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminEmail")
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                M
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-lg">MalaCheia Admin</h1>
                <p className="text-xs text-muted-foreground">Gestão de Consignados</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="parceiros">Parceiros</TabsTrigger>
            <TabsTrigger value="produtos">Produtos</TabsTrigger>
            <TabsTrigger value="acerto">Acertos</TabsTrigger>
            <TabsTrigger value="reversa">Reversas</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AdminOverview />
          </TabsContent>

          <TabsContent value="parceiros">
            <MerchantsManagement />
          </TabsContent>

          <TabsContent value="produtos">
            <ProductsManagement />
          </TabsContent>

          <TabsContent value="acerto">
            <FinancialSettlement />
          </TabsContent>

          <TabsContent value="reversa">
            <ReverseLogistics />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
