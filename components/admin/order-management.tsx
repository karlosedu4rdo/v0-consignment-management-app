"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Check, X, Edit2 } from "lucide-react"

const mockPedidos = [
  {
    id: 1,
    loja: "Loja do João",
    modelo: "Bolsa A",
    qtdSolicitada: 10,
    qtdSugerida: 5,
    status: "pendente",
    data: "2025-11-25",
  },
  {
    id: 2,
    loja: "Loja da Maria",
    modelo: "Bolsa B",
    qtdSolicitada: 15,
    qtdSugerida: 12,
    status: "pendente",
    data: "2025-11-25",
  },
  {
    id: 3,
    loja: "Loja do Pedro",
    modelo: "Bolsa C",
    qtdSolicitada: 8,
    qtdSugerida: 8,
    status: "aprovado",
    data: "2025-11-24",
  },
  {
    id: 4,
    loja: "Loja da Ana",
    modelo: "Bolsa A",
    qtdSolicitada: 20,
    qtdSugerida: 0,
    status: "rejeitado",
    data: "2025-11-24",
  },
]

export function OrderManagement() {
  const [pedidos, setPedidos] = useState(mockPedidos)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editValue, setEditValue] = useState("")

  const handleApprove = (id: number, quantidade: number) => {
    setPedidos(pedidos.map((p) => (p.id === id ? { ...p, status: "aprovado" } : p)))
    console.log(`[v0] Pedido ${id} aprovado com quantidade: ${quantidade}`)
  }

  const handleReject = (id: number) => {
    setPedidos(pedidos.map((p) => (p.id === id ? { ...p, status: "rejeitado" } : p)))
    console.log(`[v0] Pedido ${id} rejeitado`)
  }

  const handleEditStart = (id: number, valor: number) => {
    setEditingId(id)
    setEditValue(valor.toString())
  }

  const handleEditSave = (id: number) => {
    setPedidos(pedidos.map((p) => (p.id === id ? { ...p, qtdSugerida: Number.parseInt(editValue) || 0 } : p)))
    setEditingId(null)
    console.log(`[v0] Quantidade sugerida atualizada para: ${editValue}`)
  }

  const statusColors = {
    pendente: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
    aprovado: "bg-green-500/10 text-green-700 border-green-500/20",
    rejeitado: "bg-red-500/10 text-red-700 border-red-500/20",
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 border-border/40">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-bold">Gestão de Pedidos</h3>
          </div>
          <Badge variant="outline">{pedidos.filter((p) => p.status === "pendente").length} Pendentes</Badge>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="border border-border/40 rounded-lg p-4 hover:bg-muted/30 transition-colors">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="font-medium">{pedido.loja}</p>
                  <p className="text-sm text-muted-foreground">{pedido.modelo}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Solicitado</p>
                  <p className="text-lg font-bold">{pedido.qtdSolicitada} un</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div className="p-2 bg-muted/30 rounded">
                  <p className="text-xs text-muted-foreground">Sugerido</p>
                  <p className="font-bold">{pedido.qtdSugerida} un</p>
                </div>
                <div className="p-2 bg-muted/30 rounded">
                  <p className="text-xs text-muted-foreground">Status</p>
                  <Badge variant="outline" className={statusColors[pedido.status as keyof typeof statusColors]}>
                    {pedido.status}
                  </Badge>
                </div>
                <div className="p-2 bg-muted/30 rounded">
                  <p className="text-xs text-muted-foreground">Data</p>
                  <p className="font-bold text-sm">{new Date(pedido.data).toLocaleDateString("pt-BR")}</p>
                </div>
              </div>

              {pedido.status === "pendente" && (
                <div className="flex gap-2 flex-wrap">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditStart(pedido.id, pedido.qtdSugerida)}
                    className="flex-1 sm:flex-none"
                  >
                    <Edit2 className="w-3 h-3 mr-1" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleApprove(pedido.id, pedido.qtdSugerida)}
                    className="flex-1 sm:flex-none"
                  >
                    <Check className="w-3 h-3 mr-1" />
                    Aprovar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleReject(pedido.id)}
                    className="flex-1 sm:flex-none"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Rejeitar
                  </Button>
                </div>
              )}

              {editingId === pedido.id && (
                <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded-lg space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 px-2 py-1 border border-border rounded text-sm"
                      min="0"
                      max={pedido.qtdSolicitada}
                    />
                    <Button size="sm" onClick={() => handleEditSave(pedido.id)}>
                      Salvar
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
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
