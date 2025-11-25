"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, Package, ShoppingCart, DollarSign } from "lucide-react"
import { MerchantInventory } from "./inventory"
import { MerchantCatalog } from "./catalog"
import { MerchantFinancial } from "./financial"

export function MerchantDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("inventory")
  const merchantName =
    typeof window !== "undefined" ? localStorage.getItem("merchantName") || "Comerciante" : "Comerciante"

  const handleLogout = () => {
    localStorage.removeItem("merchantToken")
    localStorage.removeItem("merchantEmail")
    localStorage.removeItem("merchantName")
    router.push("/merchant/login")
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
                <h1 className="font-bold text-lg">{merchantName}</h1>
                <p className="text-xs text-muted-foreground">MalaCheia Comerciante</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="inventory" className="flex gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Meu Estoque</span>
            </TabsTrigger>
            <TabsTrigger value="catalog" className="flex gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Catálogo</span>
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex gap-2">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Financeiro</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inventory">
            <MerchantInventory />
          </TabsContent>

          <TabsContent value="catalog">
            <MerchantCatalog />
          </TabsContent>

          <TabsContent value="financial">
            <MerchantFinancial />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
