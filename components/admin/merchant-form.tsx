"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDashboard } from "@/lib/context"
import type { Merchant } from "@/lib/types"

interface MerchantFormProps {
  merchant?: Merchant
  onClose: () => void
}

export default function MerchantForm({ merchant, onClose }: MerchantFormProps) {
  const { addMerchant, updateMerchant } = useDashboard()
  const [formData, setFormData] = useState({
    nome: merchant?.nome || "",
    email: merchant?.email || "",
    whatsapp: merchant?.whatsapp || "",
    endereco: merchant?.endereco || "",
    taxaComissao: merchant?.taxaComissao ? (merchant.taxaComissao * 100).toString() : "20",
    ativo: merchant?.ativo ?? true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nome || !formData.email) {
      alert("Preencha os campos obrigatórios")
      return
    }

    const comissao = Math.min(Math.max(Number.parseFloat(formData.taxaComissao) / 100, 0), 1)

    if (merchant) {
      updateMerchant(merchant.id, {
        nome: formData.nome,
        email: formData.email,
        whatsapp: formData.whatsapp,
        endereco: formData.endereco,
        taxaComissao: comissao,
        ativo: formData.ativo,
      })
    } else {
      addMerchant({
        nome: formData.nome,
        email: formData.email,
        whatsapp: formData.whatsapp,
        endereco: formData.endereco,
        taxaComissao: comissao,
        ativo: formData.ativo,
      })
    }

    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nome">Nome *</Label>
          <Input
            id="nome"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            placeholder="Nome da loja"
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="email@loja.com"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <Input
            id="whatsapp"
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            placeholder="(11) 98765-4321"
          />
        </div>
        <div>
          <Label htmlFor="taxa">Taxa de Comissão (%)</Label>
          <Input
            id="taxa"
            type="number"
            min="0"
            max="100"
            step="0.5"
            value={formData.taxaComissao}
            onChange={(e) => setFormData({ ...formData, taxaComissao: e.target.value })}
            placeholder="20"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="endereco">Endereço</Label>
        <Input
          id="endereco"
          value={formData.endereco}
          onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
          placeholder="Rua, número - Cidade"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="ativo"
          type="checkbox"
          checked={formData.ativo}
          onChange={(e) => setFormData({ ...formData, ativo: e.target.checked })}
          className="w-4 h-4"
        />
        <Label htmlFor="ativo" className="cursor-pointer">
          Parceiro Ativo
        </Label>
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">{merchant ? "Atualizar" : "Criar"} Parceiro</Button>
      </div>
    </form>
  )
}
