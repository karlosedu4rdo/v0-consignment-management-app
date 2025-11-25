"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDashboard } from "@/lib/context"
import type { Product } from "@/lib/types"

interface ProductFormProps {
  product?: Product
  onClose: () => void
}

export default function ProductForm({ product, onClose }: ProductFormProps) {
  const { addProduct, updateProduct } = useDashboard()
  const [formData, setFormData] = useState({
    nome: product?.nome || "",
    modelo: product?.modelo || "",
    precoCusto: product?.precoCusto.toString() || "",
    precoVenda: product?.precoVenda.toString() || "",
    estoqueQG: product?.estoqueQG.toString() || "0",
    ativo: product?.ativo ?? true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nome || !formData.modelo || !formData.precoCusto || !formData.precoVenda) {
      alert("Preencha todos os campos obrigatórios")
      return
    }

    const custo = Number.parseFloat(formData.precoCusto)
    const venda = Number.parseFloat(formData.precoVenda)
    const estoque = Number.parseInt(formData.estoqueQG)

    if (venda <= custo) {
      alert("O preço de venda deve ser maior que o de custo")
      return
    }

    if (product) {
      updateProduct(product.id, {
        nome: formData.nome,
        modelo: formData.modelo,
        precoCusto: custo,
        precoVenda: venda,
        estoqueQG: estoque,
        ativo: formData.ativo,
      })
    } else {
      addProduct({
        nome: formData.nome,
        modelo: formData.modelo,
        precoCusto: custo,
        precoVenda: venda,
        estoqueQG: estoque,
        ativo: formData.ativo,
      })
    }

    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="nome">Nome do Produto *</Label>
        <Input
          id="nome"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          placeholder="Ex: Bolsa Executiva"
          required
        />
      </div>

      <div>
        <Label htmlFor="modelo">Modelo/Referência *</Label>
        <Input
          id="modelo"
          value={formData.modelo}
          onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
          placeholder="Ex: Luxe Brown"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="custo">Preço de Custo (R$) *</Label>
          <Input
            id="custo"
            type="number"
            step="0.01"
            min="0"
            value={formData.precoCusto}
            onChange={(e) => setFormData({ ...formData, precoCusto: e.target.value })}
            placeholder="0.00"
            required
          />
        </div>
        <div>
          <Label htmlFor="venda">Preço de Venda (R$) *</Label>
          <Input
            id="venda"
            type="number"
            step="0.01"
            min="0"
            value={formData.precoVenda}
            onChange={(e) => setFormData({ ...formData, precoVenda: e.target.value })}
            placeholder="0.00"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="estoque">Estoque QG (unidades)</Label>
        <Input
          id="estoque"
          type="number"
          min="0"
          value={formData.estoqueQG}
          onChange={(e) => setFormData({ ...formData, estoqueQG: e.target.value })}
          placeholder="0"
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
          Produto Ativo
        </Label>
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">{product ? "Atualizar" : "Criar"} Produto</Button>
      </div>
    </form>
  )
}
