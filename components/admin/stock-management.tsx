"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Warehouse } from "lucide-react"

const mockStocks = {
  qg: [
    { id: 1, modelo: "Bolsa Modelo A", quantidade: 150, valor: 450.0 },
    { id: 2, modelo: "Bolsa Modelo B", quantidade: 200, valor: 520.0 },
    { id: 3, modelo: "Bolsa Modelo C", quantidade: 85, valor: 380.0 },
  ],
  consignado: [
    { id: 1, loja: "Loja do João", modelo: "Bolsa Modelo A", quantidade: 20, diasPresença: 15, valor: 450.0 },
    { id: 2, loja: "Loja da Maria", modelo: "Bolsa Modelo B", quantidade: 15, diasPresença: 22, valor: 520.0 },
    { id: 3, loja: "Loja do Pedro", modelo: "Bolsa Modelo C", quantidade: 10, diasPresença: 8, valor: 380.0 },
  ],
}

export function StockManagement() {
  const [stocks, setStocks] = useState(mockStocks)
  const [searchQG, setSearchQG] = useState("")
  const [searchConsignado, setSearchConsignado] = useState("")

  const totalQG = stocks.qg.reduce((acc, item) => acc + item.quantidade * item.valor, 0)
  const totalConsignado = stocks.consignado.reduce((acc, item) => acc + item.quantidade * item.valor, 0)

  return (
    <div className="space-y-6">
      <Tabs defaultValue="qg" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="qg">Estoque QG</TabsTrigger>
          <TabsTrigger value="consignado">Estoque Consignado</TabsTrigger>
        </TabsList>

        {/* Estoque QG */}
        <TabsContent value="qg" className="space-y-4">
          <Card className="p-6 border-border/40">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-bold text-lg">Seu Estoque (Sede)</h3>
                <p className="text-sm text-muted-foreground">
                  Total: R$ {totalQG.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <Warehouse className="w-6 h-6 text-primary/40" />
            </div>

            <Input
              placeholder="Buscar modelo..."
              value={searchQG}
              onChange={(e) => setSearchQG(e.target.value)}
              className="mb-4"
            />

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {stocks.qg
                .filter((item) => item.modelo.toLowerCase().includes(searchQG.toLowerCase()))
                .map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{item.modelo}</p>
                      <p className="text-sm text-muted-foreground">
                        Unitário: R$ {item.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{item.quantidade}</p>
                      <p className="text-xs text-muted-foreground">unidades</p>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </TabsContent>

        {/* Estoque Consignado */}
        <TabsContent value="consignado" className="space-y-4">
          <Card className="p-6 border-border/40">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-bold text-lg">Estoque em Rua</h3>
                <p className="text-sm text-muted-foreground">
                  Total: R$ {totalConsignado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <Package className="w-6 h-6 text-primary/40" />
            </div>

            <Input
              placeholder="Buscar loja ou modelo..."
              value={searchConsignado}
              onChange={(e) => setSearchConsignado(e.target.value)}
              className="mb-4"
            />

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {stocks.consignado
                .filter(
                  (item) =>
                    item.loja.toLowerCase().includes(searchConsignado.toLowerCase()) ||
                    item.modelo.toLowerCase().includes(searchConsignado.toLowerCase()),
                )
                .map((item) => (
                  <div key={item.id} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{item.loja}</p>
                        <p className="text-sm text-muted-foreground">{item.modelo}</p>
                      </div>
                      <p className="text-lg font-bold">{item.quantidade}</p>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>há {item.diasPresença} dias</span>
                      <span>
                        Total: R$ {(item.quantidade * item.valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
