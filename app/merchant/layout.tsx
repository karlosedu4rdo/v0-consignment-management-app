import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Comerciante - MalaCheia",
  description: "App do comerciante - Consignação de produtos",
}

export default function MerchantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
