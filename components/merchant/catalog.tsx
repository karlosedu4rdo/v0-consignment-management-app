"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Plus } from "lucide-react"

const mockCatalog = [
  { id: 1, modelo: "Bolsa Modelo A", preco: 450.0, estoque: 150, vendidas: 234, regiao: "Centro" },
  { id: 2, modelo: "Bolsa Modelo B", preco: 520.0, estoque: 200, vendidas: 189, regiao: "Zona Sul" },
  { id: 3, modelo: "Bolsa Modelo C", preco: 380.0, estoque: 85, vendidas: 312, regiao: "Zona Norte" },
  { id: 4, modelo: "Bolsa Modelo D", preco: 580.0, estoque: 120, vendidas: 98, regiao: "Centro" },
]

export function MerchantCatalog() {
  const [catalog, setCatalog] = useState(mockCatalog)
  const [search, setSearch] = useState("")
  const [quantities, setQuantities] = useState<Record<number, number>>({})
  const [pendingRequests, setPendingRequests] = useState<number[]>([])

  const handleAddToRequest = (id: number) => {
    const qty = quantities[id] || 1
    setPendingRequests([...pendingRequests, id])
    console.log(`[v0] Produto ${id} adicionado ao pedido com quantidade: ${qty}`)
    setTimeout(() => {
      setPendingRequests(pendingRequests.filter((pid) => pid !== id))
      setQuantities({ ...quantities, [id]: 1 })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 border-border/40">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-primary" />
            Catálogo de Reposição
          </h3>
        </div>

        <Input
          placeholder="Buscar modelo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {catalog
            .filter((item) => item.modelo.toLowerCase().includes(search.toLowerCase()))
            .map((item) => (
              <Card key={item.id} className="p-4 border-border/40 hover:border-primary/30 transition-colors">
                <div className="mb-3">
                  <p className="font-bold text-sm">{item.modelo}</p>
                  <p className="text-xs text-muted-foreground mb-2">Mais vendido em: {item.regiao}</p>
                  <p className="text-lg font-bold text-primary">
                    R$ {item.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  <div className="p-2 bg-muted/30 rounded">
                    <p className="text-muted-foreground">Em QG</p>
                    <p className="font-bold">{item.estoque}</p>
                  </div>
                  <div className="p-2 bg-muted/30 rounded">
                    <p className="text-muted-foreground">Vendidas</p>
                    <p className="font-bold text-primary">{item.vendidas}</p>
                  </div>
                </div>

                <div className="flex gap-2 items-center mb-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setQuantities({ ...quantities, [item.id]: Math.max(1, (quantities[item.id] || 1) - 1) })
                    }
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    value={quantities[item.id] || 1}
                    onChange={(e) => setQuantities({ ...quantities, [item.id]: Number.parseInt(e.target.value) || 1 })}
                    className="w-16 text-center"
                    min="1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantities({ ...quantities, [item.id]: (quantities[item.id] || 1) + 1 })}
                  >
                    +
                  </Button>
                </div>

                <Button
                  onClick={() => handleAddToRequest(item.id)}
                  disabled={pendingRequests.includes(item.id)}
                  className="w-full"
                  size="sm"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {pendingRequests.includes(item.id) ? "Adicionado!" : "Solicitar"}
                </Button>
              </Card>
            ))}
        </div>
      </Card>
    </div>
  )
}
