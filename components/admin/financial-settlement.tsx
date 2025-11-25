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
import type { Merchant } from "@/lib/types"
import SettlementDialog from "./settlement-dialog"

export default function FinancialSettlement() {
  const { data } = useDashboard()
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null)
  const [openDialog, setOpenDialog] = useState(false)

  const handleSettle = (merchant: Merchant) => {
    setSelectedMerchant(merchant)
    setOpenDialog(true)
  }

  // Calcular totais por comerciante
  const getMerchantDebt = (merchantId: string) => {
    return data.consignments
      .filter((c) => c.merchantId === merchantId && c.status === "vendido_pendente_pgto")
      .reduce((acc, c) => {
        const product = data.products.find((p) => p.id === c.productId)
        if (!product) return acc
        return acc + c.quantidadeVendida * product.precoVenda
      }, 0)
  }

  const getMerchantCommission = (merchantId: string, debt: number) => {
    const merchant = data.merchants.find((m) => m.id === merchantId)
    if (!merchant) return 0
    return debt * merchant.taxaComissao
  }

  const merchantsWithDebt = data.merchants
    .filter((m) => m.ativo)
    .map((merchant) => {
      const debt = getMerchantDebt(merchant.id)
      const commission = getMerchantCommission(merchant.id, debt)
      return { merchant, debt, commission }
    })
    .filter(({ debt }) => debt > 0)

  const totalDebt = merchantsWithDebt.reduce((acc, { debt }) => acc + debt, 0)
  const totalCommission = merchantsWithDebt.reduce((acc, { commission }) => acc + commission, 0)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Acerto Financeiro</h2>
        <p className="text-muted-foreground">Feche caixas e registre pagamentos de comerciantes</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Parceiros com Dívida</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{merchantsWithDebt.length}</div>
            <p className="text-xs text-muted-foreground">aguardando acerto</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vendas Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalDebt.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">a receber</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sua Comissão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalCommission.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">em débitos pendentes</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Acertos */}
      <Card>
        <CardHeader>
          <CardTitle>Pendências de Acerto</CardTitle>
          <CardDescription>Selecione um comerciante para registrar o pagamento</CardDescription>
        </CardHeader>
        <CardContent>
          {merchantsWithDebt.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">Nenhum acerto pendente</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2">Comerciante</th>
                    <th className="text-left py-2 px-2">Contato</th>
                    <th className="text-right py-2 px-2">Valor de Vendas</th>
                    <th className="text-right py-2 px-2">Sua Comissão</th>
                    <th className="text-left py-2 px-2">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {merchantsWithDebt.map(({ merchant, debt, commission }) => (
                    <tr key={merchant.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2 font-medium">{merchant.nome}</td>
                      <td className="py-3 px-2 text-muted-foreground">{merchant.whatsapp}</td>
                      <td className="py-3 px-2 text-right font-semibold">R$ {debt.toFixed(2)}</td>
                      <td className="py-3 px-2 text-right">
                        <Badge variant="outline">R$ {commission.toFixed(2)}</Badge>
                      </td>
                      <td className="py-3 px-2">
                        <Dialog open={openDialog && selectedMerchant?.id === merchant.id} onOpenChange={setOpenDialog}>
                          <DialogTrigger asChild>
                            <Button size="sm" onClick={() => handleSettle(merchant)}>
                              Acertar
                            </Button>
                          </DialogTrigger>
                          {selectedMerchant && (
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Acerto com {selectedMerchant.nome}</DialogTitle>
                                <DialogDescription>Registre o pagamento das vendas</DialogDescription>
                              </DialogHeader>
                              <SettlementDialog
                                merchant={selectedMerchant}
                                debt={debt}
                                commission={commission}
                                onClose={() => setOpenDialog(false)}
                              />
                            </DialogContent>
                          )}
                        </Dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
