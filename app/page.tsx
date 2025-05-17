import { Suspense } from "react"
import type { Metadata } from "next"
import { EthPrice } from "@/components/eth-price"
import { BaseStats } from "@/components/base-stats"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardSkeleton } from "@/components/dashboard-skeleton"

export const metadata: Metadata = {
  title: "Base Blockchain Dashboard",
  description: "Track Base blockchain stats and ETH price in real-time",
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Base Blockchain Dashboard"
        text="Track Base blockchain stats and ETH price in real-time"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<DashboardSkeleton />}>
          <EthPrice />
        </Suspense>
        <Suspense fallback={<DashboardSkeleton />}>
          <BaseStats />
        </Suspense>
      </div>
    </DashboardShell>
  )
}
