import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function DashboardSkeleton() {
  return (
    <Card>
      <CardHeader className="gap-2">
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="h-10">
        <Skeleton className="h-full w-full" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-4 w-3/4" />
      </CardFooter>
    </Card>
  )
}
