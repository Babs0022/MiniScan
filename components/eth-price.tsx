"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, DollarSign } from "lucide-react"

export function EthPrice() {
  const [price, setPrice] = useState<number | null>(null)
  const [previousPrice, setPreviousPrice] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string>("")

  useEffect(() => {
    async function fetchEthPrice() {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true",
        )
        const data = await response.json()

        setPreviousPrice(price)
        setPrice(data.ethereum.usd)
        setLastUpdated(new Date().toLocaleTimeString())
        setLoading(false)
      } catch (error) {
        console.error("Error fetching ETH price:", error)
        setLoading(false)
      }
    }

    fetchEthPrice()
    const interval = setInterval(fetchEthPrice, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [price])

  const priceChange = previousPrice && price ? price - previousPrice : 0
  const isPositive = priceChange >= 0

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">ETH Price</CardTitle>
        <CardDescription>Current Ethereum price in USD</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex h-[40px] items-center justify-center">
            <p className="text-sm text-muted-foreground">Loading price data...</p>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-2xl font-bold">{price?.toFixed(2)}</span>
            {previousPrice && (
              <span className={`flex items-center text-xs ${isPositive ? "text-green-500" : "text-red-500"}`}>
                {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                {Math.abs(priceChange).toFixed(2)}
              </span>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-1">
        <p className="text-xs text-muted-foreground">Last updated: {lastUpdated || "Never"}</p>
      </CardFooter>
    </Card>
  )
}
