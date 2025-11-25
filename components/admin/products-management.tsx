"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useDashboard } from "@/lib/context"
import type { Product } from "@/lib/types"
import ProductForm from "./product-form"

export default function ProductsManagement() {
  const { data, deleteProduct } = useDashboard()
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setOpenDialog(true)
  }

  const handleAddNew = () => {
    setSelectedProduct(null)
    setOpenDialog(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja remover este produto?")) {
      deleteProduct(id)
    }
  }

  const activeProducts = data.products.filter((p) => p.ativo)
  const inactiveProducts = data.products.filter((p) => !p.ativo)

  const totalEstoque = data.products.reduce((acc, p) => acc + p.estoqueQG, 0)
  const totalValor = data.products.reduce((acc, p) => acc + p.estoqueQG * p.precoCusto, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Catálogo Mestre</h2>
          <p className="text-muted-foreground">Gerencie o estoque de produtos do seu QG</p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew}>Novo Produto</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedProduct ? "Editar Produto" : "Novo Produto"}</DialogTitle>
              <DialogDescription>Preencha os dados do produto</DialogDescription>
            </DialogHeader>
            <ProductForm product={selectedProduct || undefined} onClose={() => setOpenDialog(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total em Estoque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEstoque}</div>
            <p className="text-xs text-muted-foreground">unidades</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalValor.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">a preço de custo</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Produtos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProducts.length}</div>
            <p className="text-xs text-muted-foreground">em venda</p>
          </CardContent>
        </Card>
      </div>

      {/* Produtos Ativos */}
      <Card>
        <CardHeader>
          <CardTitle>Produtos Ativos ({activeProducts.length})</CardTitle>
          <CardDescription>Produtos disponíveis para consignação</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">Modelo</th>
                  <th className="text-left py-2 px-2">Custo</th>
                  <th className="text-left py-2 px-2">Venda</th>
                  <th className="text-left py-2 px-2">Margem</th>
                  <th className="text-left py-2 px-2">Estoque</th>
                  <th className="text-left py-2 px-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {activeProducts.map((product) => {
                  const margem = ((product.precoVenda - product.precoCusto) / product.precoCusto) * 100
                  return (
                    <tr key={product.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2 font-medium">{product.modelo}</td>
                      <td className="py-3 px-2">R$ {product.precoCusto.toFixed(2)}</td>
                      <td className="py-3 px-2 font-semibold">R$ {product.precoVenda.toFixed(2)}</td>
                      <td className="py-3 px-2">
                        <Badge variant="outline">{margem.toFixed(0)}%</Badge>
                      </td>
                      <td className="py-3 px-2">{product.estoqueQG}</td>
                      <td className="py-3 px-2">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                            Editar
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                            Remover
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Produtos Inativos */}
      {inactiveProducts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Produtos Inativos ({inactiveProducts.length})</CardTitle>
            <CardDescription>Produtos descontinuados ou fora de catálogo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2">Modelo</th>
                    <th className="text-left py-2 px-2">Preço de Venda</th>
                    <th className="text-left py-2 px-2">Estoque Restante</th>
                    <th className="text-left py-2 px-2">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {inactiveProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2 font-medium">{product.modelo}</td>
                      <td className="py-3 px-2">R$ {product.precoVenda.toFixed(2)}</td>
                      <td className="py-3 px-2">{product.estoqueQG}</td>
                      <td className="py-3 px-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                          Reativar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
