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
import MerchantForm from "./merchant-form"

export default function MerchantsManagement() {
  const { data, deleteMerchant } = useDashboard()
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null)

  const handleEdit = (merchant: Merchant) => {
    setSelectedMerchant(merchant)
    setOpenDialog(true)
  }

  const handleAddNew = () => {
    setSelectedMerchant(null)
    setOpenDialog(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja remover este parceiro?")) {
      deleteMerchant(id)
    }
  }

  const activeMerchants = data.merchants.filter((m) => m.ativo)
  const inactiveMerchants = data.merchants.filter((m) => !m.ativo)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Parceiros</h2>
          <p className="text-muted-foreground">Gerencie comerciantes e configure taxas de comissão personalizadas</p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew}>Adicionar Parceiro</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedMerchant ? "Editar Parceiro" : "Novo Parceiro"}</DialogTitle>
              <DialogDescription>Preencha os dados do comerciante</DialogDescription>
            </DialogHeader>
            <MerchantForm merchant={selectedMerchant || undefined} onClose={() => setOpenDialog(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Parceiros Ativos */}
      <Card>
        <CardHeader>
          <CardTitle>Parceiros Ativos ({activeMerchants.length})</CardTitle>
          <CardDescription>Comerciantes com status ativo para receber consignados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">Nome</th>
                  <th className="text-left py-2 px-2">Contato</th>
                  <th className="text-left py-2 px-2">Comissão</th>
                  <th className="text-left py-2 px-2">Saldo Pendente</th>
                  <th className="text-left py-2 px-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {activeMerchants.map((merchant) => (
                  <tr key={merchant.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-2 font-medium">{merchant.nome}</td>
                    <td className="py-3 px-2 text-muted-foreground">{merchant.whatsapp}</td>
                    <td className="py-3 px-2">
                      <Badge variant="outline">{(merchant.taxaComissao * 100).toFixed(0)}%</Badge>
                    </td>
                    <td className="py-3 px-2 font-semibold">R$ {merchant.saldoPendente.toFixed(2)}</td>
                    <td className="py-3 px-2">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(merchant)}>
                          Editar
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(merchant.id)}>
                          Remover
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Parceiros Inativos */}
      {inactiveMerchants.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Parceiros Inativos ({inactiveMerchants.length})</CardTitle>
            <CardDescription>Comerciantes desativados ou em análise</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2">Nome</th>
                    <th className="text-left py-2 px-2">Email</th>
                    <th className="text-left py-2 px-2">Motivo</th>
                    <th className="text-left py-2 px-2">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {inactiveMerchants.map((merchant) => (
                    <tr key={merchant.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2 font-medium">{merchant.nome}</td>
                      <td className="py-3 px-2 text-muted-foreground">{merchant.email}</td>
                      <td className="py-3 px-2">
                        <Badge variant="secondary">Inativo</Badge>
                      </td>
                      <td className="py-3 px-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(merchant)}>
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
