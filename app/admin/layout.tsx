import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin - MalaCheia",
  description: "Painel administrativo de gestão de consignados",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
