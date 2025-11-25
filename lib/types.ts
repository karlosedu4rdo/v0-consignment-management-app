// Tipos para toda a aplicação
export interface Merchant {
  id: string
  nome: string
  email: string
  whatsapp: string
  endereco: string
  taxaComissao: number // ex: 0.20 para 20%
  ativo: boolean
  dataCadastro: string
  saldoPendente: number
}

export interface Product {
  id: string
  nome: string
  modelo: string
  precoCusto: number
  precoVenda: number
  estoqueQG: number
  foto?: string
  ativo: boolean
  dataCadastro: string
}

export interface ConsignmentItem {
  id: string
  merchantId: string
  productId: string
  quantidadeEnviada: number
  quantidadeAtual: number
  quantidadeVendida: number
  quantidadeDevolvida: number
  dataEnvio: string
  dataUltimaAlteracao: string
  status: "em_loja" | "vendido_pendente_pgto" | "pago" | "devolvido"
  observacoes?: string
}

export interface Payment {
  id: string
  merchantId: string
  valor: number
  metodo: "dinheiro" | "pix" | "cartao"
  status: "pendente" | "pago"
  dataPagamento?: string
  dataVencimento: string
  observacoes?: string
  itensConsignados: string[] // IDs dos itens que este pagamento liquida
}

export interface Reversal {
  id: string
  merchantId: string
  productId: string
  quantidade: number
  motivo: "defeituoso" | "nao_vendeu" | "reposicionamento" | "outro"
  data: string
  status: "solicitado" | "aprovado" | "recusado" | "concluido"
  observacoes?: string
}

export interface Dashboard {
  merchants: Merchant[]
  products: Product[]
  consignments: ConsignmentItem[]
  payments: Payment[]
  reversals: Reversal[]
}
