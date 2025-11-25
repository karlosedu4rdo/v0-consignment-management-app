"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useDashboard } from "@/lib/context"
import type { ConsignmentItem } from "@/lib/types"

interface ReversalFormProps {
  merchantId: string
  items: ConsignmentItem[]
  onClose: () => void
}

export default function ReversalForm({ merchantId, items, onClose }: ReversalFormProps) {
  const { data, addReversal } = useDashboard()
  const [selectedItems, setSelectedItems] = useState<Record<string, { qty: number; motivo: string }>>({})

  const handleToggleItem = (itemId: string) => {
    setSelectedItems((prev) => {
      if (prev[itemId]) {
        const newState = { ...prev }
        delete newState[itemId]
        return newState
      }
      return {
        ...prev,
        [itemId]: { qty: 1, motivo: "nao_vendeu" },
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const hasSelection = Object.keys(selectedItems).length > 0
    if (!hasSelection) {
      alert("Selecione pelo menos um item")
      return
    }

    // Criar reversal para cada item selecionado
    Object.entries(selectedItems).forEach(([itemId, { qty, motivo }]) => {
      const item = items.find((i) => i.id === itemId)
      const product = data.products.find((p) => p.id === item?.productId)

      if (item && product) {
        addReversal({
          merchantId,
          productId: item.productId,
          quantidade: Math.min(qty, item.quantidadeAtual),
          motivo: motivo as "defeituoso" | "nao_vendeu" | "reposicionamento" | "outro",
          status: "solicitado",
          observacoes: `Recolhimento de ${product.modelo}`,
        })
      }
    })

    alert("Solicitação de devolução criada!")
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-3">
        {items.map((item) => {
          const product = data.products.find((p) => p.id === item.productId)
          const isSelected = selectedItems[item.id]

          return (
            <div key={item.id} className="border rounded-lg p-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!isSelected}
                  onChange={() => handleToggleItem(item.id)}
                  className="w-4 h-4 mt-1"
                />
                <div className="flex-1">
                  <p className="font-medium">{product?.modelo}</p>
                  <p className="text-sm text-muted-foreground">{item.quantidadeAtual} unidades disponível</p>
                </div>
              </label>

              {isSelected && (
                <div className="mt-3 ml-7 space-y-2">
                  <div>
                    <Label htmlFor={`qty-${item.id}`} className="text-xs">
                      Quantidade
                    </Label>
                    <Input
                      id={`qty-${item.id}`}
                      type="number"
                      min="1"
                      max={item.quantidadeAtual}
                      value={selectedItems[item.id].qty}
                      onChange={(e) =>
                        setSelectedItems((prev) => ({
                          ...prev,
                          [item.id]: {
                            ...prev[item.id],
                            qty: Number.parseInt(e.target.value) || 1,
                          },
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`motivo-${item.id}`} className="text-xs">
                      Motivo
                    </Label>
                    <select
                      id={`motivo-${item.id}`}
                      value={selectedItems[item.id].motivo}
                      onChange={(e) =>
                        setSelectedItems((prev) => ({
                          ...prev,
                          [item.id]: {
                            ...prev[item.id],
                            motivo: e.target.value,
                          },
                        }))
                      }
                      className="w-full border rounded px-2 py-1 text-sm"
                    >
                      <option value="nao_vendeu">Não vendeu</option>
                      <option value="defeituoso">Defeituoso</option>
                      <option value="reposicionamento">Reposicionamento</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Solicitar Devolução</Button>
      </div>
    </form>
  )
}
