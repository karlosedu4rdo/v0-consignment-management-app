// Gerenciar persistência de dados com localStorage
import type { Dashboard } from "./types"

const STORAGE_KEY = "malacheia_data"

// Dados iniciais padrão
const defaultData: Dashboard = {
  merchants: [
    {
      id: "mer-001",
      nome: "Loja da Maria",
      email: "maria@loja.com",
      whatsapp: "(11) 98765-4321",
      endereco: "Rua A, 123 - São Paulo",
      taxaComissao: 0.2,
      ativo: true,
      dataCadastro: new Date().toISOString(),
      saldoPendente: 500.0,
    },
    {
      id: "mer-002",
      nome: "Loja do João",
      email: "joao@loja.com",
      whatsapp: "(11) 99876-5432",
      endereco: "Av. B, 456 - Rio de Janeiro",
      taxaComissao: 0.15,
      ativo: true,
      dataCadastro: new Date().toISOString(),
      saldoPendente: 750.0,
    },
  ],
  products: [
    {
      id: "prod-001",
      nome: "Bolsa Executiva",
      modelo: "Luxe Brown",
      precoCusto: 150.0,
      precoVenda: 300.0,
      estoqueQG: 25,
      ativo: true,
      dataCadastro: new Date().toISOString(),
    },
    {
      id: "prod-002",
      nome: "Bolsa Casual",
      modelo: "Urban Black",
      precoCusto: 80.0,
      precoVenda: 180.0,
      estoqueQG: 40,
      ativo: true,
      dataCadastro: new Date().toISOString(),
    },
  ],
  consignments: [
    {
      id: "cons-001",
      merchantId: "mer-001",
      productId: "prod-001",
      quantidadeEnviada: 5,
      quantidadeAtual: 3,
      quantidadeVendida: 2,
      quantidadeDevolvida: 0,
      dataEnvio: new Date().toISOString(),
      dataUltimaAlteracao: new Date().toISOString(),
      status: "vendido_pendente_pgto",
    },
  ],
  payments: [],
  reversals: [],
}

export function loadData(): Dashboard {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      saveData(defaultData)
      return defaultData
    }
    return JSON.parse(stored)
  } catch {
    return defaultData
  }
}

export function saveData(data: Dashboard): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function resetData(): void {
  localStorage.removeItem(STORAGE_KEY)
  saveData(defaultData)
}
