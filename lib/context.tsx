"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { Dashboard, Merchant, Product, ConsignmentItem, Payment, Reversal } from "./types"
import { loadData, saveData } from "./storage"

interface DashboardContextType {
  data: Dashboard
  // Merchant operations
  addMerchant: (merchant: Omit<Merchant, "id" | "dataCadastro" | "saldoPendente">) => void
  updateMerchant: (id: string, merchant: Partial<Merchant>) => void
  deleteMerchant: (id: string) => void
  getMerchantById: (id: string) => Merchant | undefined
  // Product operations
  addProduct: (product: Omit<Product, "id" | "dataCadastro">) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  getProductById: (id: string) => Product | undefined
  // Consignment operations
  addConsignment: (consignment: Omit<ConsignmentItem, "id" | "dataEnvio" | "dataUltimaAlteracao">) => void
  updateConsignment: (id: string, consignment: Partial<ConsignmentItem>) => void
  getConsignmentsByMerchant: (merchantId: string) => ConsignmentItem[]
  // Payment operations
  addPayment: (payment: Omit<Payment, "id">) => void
  updatePayment: (id: string, payment: Partial<Payment>) => void
  getPaymentsByMerchant: (merchantId: string) => Payment[]
  // Reversal operations
  addReversal: (reversal: Omit<Reversal, "id" | "data">) => void
  updateReversal: (id: string, reversal: Partial<Reversal>) => void
  getReversalsByMerchant: (merchantId: string) => Reversal[]
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Dashboard | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Carregar dados do localStorage ao montar
  useEffect(() => {
    const loadedData = loadData()
    setData(loadedData)
    setIsLoaded(true)
  }, [])

  // Persistir mudanças
  const updateDataAndPersist = (newData: Dashboard) => {
    setData(newData)
    saveData(newData)
  }

  if (!isLoaded || !data) {
    return null
  }

  const value: DashboardContextType = {
    data,

    // Merchant operations
    addMerchant: (merchant) => {
      const newMerchant: Merchant = {
        ...merchant,
        id: `mer-${Date.now()}`,
        dataCadastro: new Date().toISOString(),
        saldoPendente: 0,
      }
      updateDataAndPersist({
        ...data,
        merchants: [...data.merchants, newMerchant],
      })
    },

    updateMerchant: (id, updatedFields) => {
      updateDataAndPersist({
        ...data,
        merchants: data.merchants.map((m) => (m.id === id ? { ...m, ...updatedFields } : m)),
      })
    },

    deleteMerchant: (id) => {
      updateDataAndPersist({
        ...data,
        merchants: data.merchants.filter((m) => m.id !== id),
        consignments: data.consignments.filter((c) => c.merchantId !== id),
      })
    },

    getMerchantById: (id) => data.merchants.find((m) => m.id === id),

    // Product operations
    addProduct: (product) => {
      const newProduct: Product = {
        ...product,
        id: `prod-${Date.now()}`,
        dataCadastro: new Date().toISOString(),
      }
      updateDataAndPersist({
        ...data,
        products: [...data.products, newProduct],
      })
    },

    updateProduct: (id, updatedFields) => {
      updateDataAndPersist({
        ...data,
        products: data.products.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)),
      })
    },

    deleteProduct: (id) => {
      updateDataAndPersist({
        ...data,
        products: data.products.filter((p) => p.id !== id),
      })
    },

    getProductById: (id) => data.products.find((p) => p.id === id),

    // Consignment operations
    addConsignment: (consignment) => {
      const newConsignment: ConsignmentItem = {
        ...consignment,
        id: `cons-${Date.now()}`,
        dataEnvio: new Date().toISOString(),
        dataUltimaAlteracao: new Date().toISOString(),
      }
      updateDataAndPersist({
        ...data,
        consignments: [...data.consignments, newConsignment],
      })
    },

    updateConsignment: (id, updatedFields) => {
      updateDataAndPersist({
        ...data,
        consignments: data.consignments.map((c) =>
          c.id === id
            ? {
                ...c,
                ...updatedFields,
                dataUltimaAlteracao: new Date().toISOString(),
              }
            : c,
        ),
      })
    },

    getConsignmentsByMerchant: (merchantId) => data.consignments.filter((c) => c.merchantId === merchantId),

    // Payment operations
    addPayment: (payment) => {
      const newPayment: Payment = {
        ...payment,
        id: `pay-${Date.now()}`,
      }
      updateDataAndPersist({
        ...data,
        payments: [...data.payments, newPayment],
      })
    },

    updatePayment: (id, updatedFields) => {
      updateDataAndPersist({
        ...data,
        payments: data.payments.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)),
      })
    },

    getPaymentsByMerchant: (merchantId) => data.payments.filter((p) => p.merchantId === merchantId),

    // Reversal operations
    addReversal: (reversal) => {
      const newReversal: Reversal = {
        ...reversal,
        id: `rev-${Date.now()}`,
        data: new Date().toISOString(),
      }
      updateDataAndPersist({
        ...data,
        reversals: [...data.reversals, newReversal],
      })
    },

    updateReversal: (id, updatedFields) => {
      updateDataAndPersist({
        ...data,
        reversals: data.reversals.map((r) => (r.id === id ? { ...r, ...updatedFields } : r)),
      })
    },

    getReversalsByMerchant: (merchantId) => data.reversals.filter((r) => r.merchantId === merchantId),
  }

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error("useDashboard deve ser usado dentro de DashboardProvider")
  }
  return context
}
