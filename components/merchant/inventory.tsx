"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, CheckCircle } from "lucide-react"

const mockInventory = [
  { id: 1, modelo: "Bolsa Modelo A", quantidade: 20, preco: 450.0, diasPresenca: 15, vendidas: 5, status: "ativo" },
  { id: 2, modelo: "Bolsa Modelo B", quantidade: 15, preco: 520.0, diasPresenca: 22, vendidas: 0, status: "atencao" },
  { id: 3, modelo: "Bolsa Modelo C", quantidade: 10, preco: 380.0, diasPresenca: 8, vendidas: 3, status: "ativo" },
]

export function MerchantInventory() {
  const [inventory, setInventory] = useState(mockInventory)
  const [sellingItem, setSellingItem] = useState<number | null>(null)

  const handleMarkAsSold = (id: number) => {
    setInventory(
      inventory.map((item) => {
        if (item.id === id && item.quantidade > 0) {
          console.log(`[v0] Produto ${item.modelo} marcado como vendido`)
          return {
            ...item,
            quantidade: item.quantidade - 1,
            vendidas: item.vendidas + 1,
          }
        }
        return item
      }),
    )
    setSellingItem(null)
  }

  const totalValor = inventory.reduce((acc, item) => acc + item.quantidade * item.preco, 0)
  const statusColors = {
    ativo: "bg-green-500/10 text-green-700 border-green-500/20",
    atencao: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 border-border/40">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 text-primary" />
            <div>
              <h3 className="text-lg font-bold">Seu Estoque</h3>
              <p className="text-sm text-muted-foreground">
                Total em rua: R$ {totalValor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {inventory.map((item) => (
            <div key={item.id} className="border border-border/40 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <p className="font-medium">{item.modelo}</p>
                  <p className="text-sm text-muted-foreground">
                    R$ {item.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} cada
                  </p>
                </div>
                <Badge variant="outline" className={statusColors[item.status as keyof typeof statusColors]}>
                  {item.quantidade > 0 ? "Disponível" : "Zerado"}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                <div className="p-2 bg-muted/30 rounded">
                  <p className="text-xs text-muted-foreground">Em Estoque</p>
                  <p className="font-bold">{item.quantidade}</p>
                </div>
                <div className="p-2 bg-muted/30 rounded">
                  <p className="text-xs text-muted-foreground">Vendidas</p>
                  <p className="font-bold text-primary">{item.vendidas}</p>
                </div>
                <div className="p-2 bg-muted/30 rounded">
                  <p className="text-xs text-muted-foreground">Há</p>
                  <p className="font-bold">{item.diasPresenca}d</p>
                </div>
              </div>

              <Button
                onClick={() => setSellingItem(item.id)}
                disabled={item.quantidade === 0}
                className="w-full"
                size="sm"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Marcar Venda
              </Button>

              {sellingItem === item.id && (
                <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded-lg space-y-2">
                  <p className="text-sm font-medium">Confirmar venda de 1 unidade?</p>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleMarkAsSold(item.id)} className="flex-1">
                      Confirmar
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setSellingItem(null)} className="flex-1">
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
