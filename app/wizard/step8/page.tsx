"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Loader2, RefreshCw } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function RestoreInventory() {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const router = useRouter()

  // Mock inventory data - in a real app, this would come from the data saved in step 3
  const mockInventoryData = [
    { sku: "SKU001", warehouse_id: "WH1", location: "A1-B2-C3", qty: 25 },
    { sku: "SKU002", warehouse_id: "WH1", location: "A1-B3-C4", qty: 10 },
    { sku: "SKU003", warehouse_id: "WH2", location: "D5-E6-F7", qty: 15 },
  ]

  const restoreInventory = () => {
    setIsLoading(true)
    setProgress(0)

    // Simulate progress updates
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsLoading(false)
          setIsCompleted(true)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const handleContinue = () => {
    if (isCompleted) {
      router.push("/wizard/step9")
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold">Step 8: Restore Inventory</h1>

      <Card>
        <CardHeader>
          <CardTitle>Restore Inventory Quantities</CardTitle>
          <CardDescription>
            Reupload the saved inventory quantities to the newly created locations using the ShipHero API.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-md border p-4">
            <h3 className="mb-4 font-medium">Inventory Data to Restore:</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Warehouse</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockInventoryData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell>{item.warehouse_id}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell className="text-right">{item.qty}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="space-y-4">
            <Button onClick={restoreInventory} disabled={isLoading || isCompleted} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Restoring Inventory...
                </>
              ) : isCompleted ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Inventory Restored Successfully
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Restore Inventory Quantities
                </>
              )}
            </Button>

            {isLoading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </div>

          <Button onClick={handleContinue} disabled={!isCompleted} className="w-full">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

