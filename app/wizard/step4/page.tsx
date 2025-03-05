"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Loader2, AlertTriangle, Download } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"

export default function ClearInventory() {
  const [isLoading, setIsLoading] = useState(false)
  const [isCleared, setIsCleared] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const router = useRouter()

  const clearInventoryAPI = () => {
    setIsLoading(true)

    // Simulate API call to clear inventory
    setTimeout(() => {
      setIsLoading(false)
      setIsCleared(true)
    }, 2000)
  }

  const downloadClearTemplate = () => {
    // In a real app, this would generate a CSV template with all SKUs set to 0 quantity
    const csvContent = "sku,warehouse_id,quantity\nSKU001,WH1,0\nSKU002,WH1,0\nSKU003,WH2,0"
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "clear_inventory_template.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleContinue = () => {
    if (isCleared && confirmed) {
      router.push("/wizard/step5")
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold">Step 4: Clear All Inventory</h1>

      <Alert variant="destructive" className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning: Critical Operation</AlertTitle>
        <AlertDescription>
          This step will set all inventory quantities to zero. This is necessary for the transition process but will
          temporarily affect your inventory records.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Clear Inventory to Zero</CardTitle>
          <CardDescription>
            Set all inventory quantities to zero using either the inventory sync API or by generating a CSV file to
            upload in the ShipHero UI.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="api">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="api">API Method</TabsTrigger>
              <TabsTrigger value="csv">CSV Upload</TabsTrigger>
            </TabsList>

            <TabsContent value="api" className="space-y-4 pt-4">
              <p>
                Clear all inventory quantities to zero using the ShipHero inventory sync API. This will update all SKUs
                in the system.
              </p>

              <Button
                onClick={clearInventoryAPI}
                disabled={isLoading || isCleared}
                variant="destructive"
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Clearing Inventory...
                  </>
                ) : isCleared ? (
                  <>
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Inventory Cleared to Zero
                  </>
                ) : (
                  <>
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Clear All Inventory to Zero
                  </>
                )}
              </Button>
            </TabsContent>

            <TabsContent value="csv" className="space-y-4 pt-4">
              <p>
                Download a CSV template with all inventory set to zero. You can then upload this file in the ShipHero
                UI.
              </p>

              <div className="space-y-4">
                <Button onClick={downloadClearTemplate} variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Zero Inventory Template
                </Button>

                <div className="rounded-md border p-4">
                  <h4 className="mb-2 font-medium">Upload Instructions:</h4>
                  <ol className="ml-6 list-decimal space-y-2 text-sm">
                    <li>Log in to your ShipHero dashboard</li>
                    <li>Navigate to Inventory &gt; Bulk Edit</li>
                    <li>Upload the downloaded CSV file</li>
                    <li>Confirm the upload to set all quantities to zero</li>
                  </ol>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="csvUploaded"
                    checked={isCleared}
                    onCheckedChange={(checked) => setIsCleared(checked as boolean)}
                  />
                  <label
                    htmlFor="csvUploaded"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I have uploaded the CSV and confirmed all inventory is set to zero
                  </label>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {isCleared && (
            <div className="flex items-start space-x-2 pt-4 border-t">
              <Checkbox
                id="confirm"
                checked={confirmed}
                onCheckedChange={(checked) => setConfirmed(checked as boolean)}
              />
              <label
                htmlFor="confirm"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I confirm that all inventory quantities have been set to zero and I understand this is a critical step
                in the transition process
              </label>
            </div>
          )}

          <Button onClick={handleContinue} disabled={!isCleared || !confirmed} className="w-full">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

