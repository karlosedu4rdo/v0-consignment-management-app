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
import ReversalForm from "./reversal-form"

export default function ReverseLogistics() {
  const { data } = useDashboard()
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedMerchantId, setSelectedMerchantId] = useState<string | null>(null)

  const handleAddReversal = (merchantId: string) => {
    setSelectedMerchantId(merchantId)
    setOpenDialog(true)
  }

  // Itens consignados em loja
  const itemsInStore = data.consignments.filter((c) => c.status === "em_loja" && c.quantidadeAtual > 0)

  // Agrupados por comerciante
  const merchantsByStore = data.merchants.reduce(
    (acc, merchant) => {
      const items = itemsInStore.filter((c) => c.merchantId === merchant.id)
      if (items.length > 0) {
        acc.push({ merchant, items })
      }
      return acc
    },
    [] as Array<{ merchant: (typeof data.merchants)[0]; items: typeof itemsInStore }>,
  )

  const pendingReversals = data.reversals.filter((r) => r.status === "solicitado")
  const approvedReversals = data.reversals.filter((r) => r.status === "aprovado")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Logística Reversa</h2>
        <p className="text-muted-foreground">Gerencie devoluções e recolhimento de produtos das lojas</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Itens em Loja</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {itemsInStore.reduce((acc, item) => acc + item.quantidadeAtual, 0)}
            </div>
            <p className="text-xs text-muted-foreground">unidades consignadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Devoluções Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReversals.length}</div>
            <p className="text-xs text-muted-foreground">solicitações abertas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recolhimentos Aprovados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedReversals.length}</div>
            <p className="text-xs text-muted-foreground">aguardando coleta</p>
          </CardContent>
        </Card>
      </div>

      {/* Estoque em Loja */}
      <Card>
        <CardHeader>
          <CardTitle>Estoque em Loja</CardTitle>
          <CardDescription>Produtos disponíveis para recolhimento</CardDescription>
        </CardHeader>
        <CardContent>
          {merchantsByStore.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">Nenhum produto em consignação</div>
          ) : (
            <div className="space-y-4">
              {merchantsByStore.map(({ merchant, items }) => (
                <div key={merchant.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h3 className="font-semibold">{merchant.nome}</h3>
                      <p className="text-sm text-muted-foreground">{merchant.endereco}</p>
                    </div>
                    <Dialog open={openDialog && selectedMerchantId === merchant.id} onOpenChange={setOpenDialog}>
                      <DialogTrigger asChild>
                        <Button size="sm" onClick={() => handleAddReversal(merchant.id)}>
                          Solicitar Devolução
                        </Button>
                      </DialogTrigger>
                      {selectedMerchantId === merchant.id && (
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Solicitar Devolução - {merchant.nome}</DialogTitle>
                            <DialogDescription>Selecione os itens para devolução</DialogDescription>
                          </DialogHeader>
                          <ReversalForm merchantId={merchant.id} items={items} onClose={() => setOpenDialog(false)} />
                        </DialogContent>
                      )}
                    </Dialog>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-2">Produto</th>
                          <th className="text-left py-2 px-2">Qtd</th>
                          <th className="text-left py-2 px-2">Enviado em</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => {
                          const product = data.products.find((p) => p.id === item.productId)
                          return (
                            <tr key={item.id} className="border-b">
                              <td className="py-2 px-2">{product?.modelo}</td>
                              <td className="py-2 px-2 font-semibold">{item.quantidadeAtual}</td>
                              <td className="py-2 px-2 text-muted-foreground">
                                {new Date(item.dataEnvio).toLocaleDateString("pt-BR")}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Solicitações Pendentes */}
      {pendingReversals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Devoluções Solicitadas</CardTitle>
            <CardDescription>Aguardando aprovação para coleta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingReversals.map((reversal) => {
                const merchant = data.merchants.find((m) => m.id === reversal.merchantId)
                const product = data.products.find((p) => p.id === reversal.productId)
                return (
                  <div key={reversal.id} className="border rounded-lg p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{merchant?.nome}</p>
                      <p className="text-sm text-muted-foreground">
                        {product?.modelo} - {reversal.quantidade} un. - {reversal.motivo}
                      </p>
                    </div>
                    <Badge variant="secondary">Solicitado</Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
