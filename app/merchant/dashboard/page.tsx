"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MerchantDashboard } from "@/components/merchant/dashboard"
import { Loader2 } from "lucide-react"

export default function MerchantDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("merchantToken")
    if (!token) {
      router.push("/merchant/login")
    } else {
      setIsAuthenticated(true)
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <MerchantDashboard />
}
