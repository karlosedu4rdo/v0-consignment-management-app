"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useDashboard } from "@/lib/context"
import type { Merchant } from "@/lib/types"

interface SettlementDialogProps {
  merchant: Merchant
  debt: number
  commission: number
  onClose: () => void
}

export default function SettlementDialog({ merchant, debt, commission, onClose }: SettlementDialogProps) {
  const { data, addPayment, updateConsignment } = useDashboard()
  const [paymentType, setPaymentType] = useState<"total" | "partial" | "forgive">("total")
  const [amount, setAmount] = useState(debt.toString())
  const [method, setMethod] = useState<"dinheiro" | "pix" | "cartao">("pix")
  const [notes, setNotes] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || Number.parseFloat(amount) <= 0) {
      alert("Insira um valor válido")
      return
    }

    const paymentAmount = Number.parseFloat(amount)

    if (paymentAmount > debt) {
      alert("O valor não pode exceder a dívida")
      return
    }

    // Encontrar itens consignados pendentes de pagamento
    const itemsPending = data.consignments.filter(
      (c) => c.merchantId === merchant.id && c.status === "vendido_pendente_pgto",
    )

    // Marcar itens como pagos
    let remaining = paymentAmount
    itemsPending.forEach((item) => {
      const product = data.products.find((p) => p.id === item.productId)
      if (!product || remaining <= 0) return

      const itemTotal = item.quantidadeVendida * product.precoVenda
      if (remaining >= itemTotal) {
        updateConsignment(item.id, { status: "pago" })
        remaining -= itemTotal
      }
    })

    // Registrar pagamento
    addPayment({
      merchantId: merchant.id,
      valor: paymentAmount,
      metodo: method,
      status: "pago",
      dataPagamento: new Date().toISOString(),
      dataVencimento: new Date().toISOString(),
      observacoes: notes,
      itensConsignados: itemsPending.map((i) => i.id),
    })

    alert("Pagamento registrado com sucesso!")
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Resumo */}
      <div className="bg-muted p-4 rounded-lg space-y-2">
        <div className="flex justify-between">
          <span>Valor em Dívida:</span>
          <span className="font-bold">R$ {debt.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Sua Comissão (pago pelo cliente):</span>
          <Badge>R$ {commission.toFixed(2)}</Badge>
        </div>
      </div>

      {/* Tipo de Pagamento */}
      <div className="space-y-2">
        <Label>Tipo de Pagamento</Label>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentType"
              value="total"
              checked={paymentType === "total"}
              onChange={(e) => {
                setPaymentType(e.target.value as "total" | "partial" | "forgive")
                setAmount(debt.toString())
              }}
              className="w-4 h-4"
            />
            <span>Pagamento Total (R$ {debt.toFixed(2)})</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentType"
              value="partial"
              checked={paymentType === "partial"}
              onChange={(e) => setPaymentType(e.target.value as "total" | "partial" | "forgive")}
              className="w-4 h-4"
            />
            <span>Pagamento Parcial</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentType"
              value="forgive"
              checked={paymentType === "forgive"}
              onChange={(e) => {
                setPaymentType(e.target.value as "total" | "partial" | "forgive")
                setAmount("0")
              }}
              className="w-4 h-4"
            />
            <span>Perdão de Dívida (casos raros)</span>
          </label>
        </div>
      </div>

      {/* Valor (apenas se parcial) */}
      {paymentType === "partial" && (
        <div>
          <Label htmlFor="amount">Valor do Pagamento (R$)</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            max={debt}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
          />
        </div>
      )}

      {/* Método */}
      <div>
        <Label htmlFor="method">Método de Pagamento</Label>
        <select
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value as "dinheiro" | "pix" | "cartao")}
          className="w-full border rounded px-3 py-2"
        >
          <option value="pix">PIX</option>
          <option value="dinheiro">Dinheiro</option>
          <option value="cartao">Cartão</option>
        </select>
      </div>

      {/* Observações */}
      <div>
        <Label htmlFor="notes">Observações (opcional)</Label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ex: Parcela 1 de 2, próximo acerto em..."
          className="w-full border rounded px-3 py-2 text-sm"
          rows={3}
        />
      </div>

      {/* Botões */}
      <div className="flex gap-2 justify-end pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">{paymentType === "forgive" ? "Perdoar Dívida" : "Registrar Pagamento"}</Button>
      </div>
    </form>
  )
}
