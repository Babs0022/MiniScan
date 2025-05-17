"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Clock, Database, Users } from "lucide-react"

interface BaseStats {
  totalTransactions?: string
  latestBlock?: string
  gasPrice?: string
  activeAddresses?: string
  loading: boolean
  lastUpdated: string
}

export function BaseStats() {
  const [stats, setStats] = useState<BaseStats>({
    loading: true,
    lastUpdated: "",
  })

  useEffect(() => {
    async function fetchBaseStats() {
      try {
        // In a real app, you would fetch this data from a Base blockchain API
        // This is simulated data for demonstration purposes
        const simulatedData = {
          totalTransactions: (Math.floor(Math.random() * 10000000) + 50000000).toLocaleString(),
          latestBlock: (Math.floor(Math.random() * 1000) + 10000000).toString(),
          gasPrice: (Math.random() * 10 + 5).toFixed(2) + " Gwei",
          activeAddresses: (Math.floor(Math.random() * 100000) + 500000).toLocaleString(),
        }

        setStats({
          ...simulatedData,
          loading: false,
          lastUpdated: new Date().toLocaleTimeString(),
        })
      } catch (error) {
        console.error("Error fetching Base stats:", error)
        setStats((prev) => ({ ...prev, loading: false }))
      }
    }

    fetchBaseStats()
    const interval = setInterval(fetchBaseStats, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3">
      <CardHeader>
        <CardTitle>Base Blockchain Stats</CardTitle>
        <CardDescription>Key metrics from the Base network</CardDescription>
      </CardHeader>
      <CardContent>
        {stats.loading ? (
          <div className="flex h-[100px] items-center justify-center">
            <p className="text-sm text-muted-foreground">Loading Base stats...</p>
          </div>
        ) : (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="blocks">Blocks</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="flex flex-col space-y-2 rounded-lg border p-4">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Total Transactions</span>
                  </div>
                  <span className="text-xl font-bold">{stats.totalTransactions}</span>
                </div>
                <div className="flex flex-col space-y-2 rounded-lg border p-4">
                  <div className="flex items-center space-x-2">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Latest Block</span>
                  </div>
                  <span className="text-xl font-bold">{stats.latestBlock}</span>
                </div>
                <div className="flex flex-col space-y-2 rounded-lg border p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Gas Price</span>
                  </div>
                  <span className="text-xl font-bold">{stats.gasPrice}</span>
                </div>
                <div className="flex flex-col space-y-2 rounded-lg border p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Active Addresses</span>
                  </div>
                  <span className="text-xl font-bold">{stats.activeAddresses}</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="transactions" className="pt-4">
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 text-lg font-medium">Transaction History</h3>
                <p className="text-muted-foreground">
                  In a complete implementation, this tab would show a list of recent transactions on the Base
                  blockchain.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="blocks" className="pt-4">
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 text-lg font-medium">Block Explorer</h3>
                <p className="text-muted-foreground">
                  In a complete implementation, this tab would show recent blocks and block details from the Base
                  blockchain.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="addresses" className="pt-4">
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 text-lg font-medium">Address Activity</h3>
                <p className="text-muted-foreground">
                  In a complete implementation, this tab would show top addresses and address activity on the Base
                  blockchain.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">Last updated: {stats.lastUpdated || "Never"}</p>
      </CardFooter>
    </Card>
  )
}
