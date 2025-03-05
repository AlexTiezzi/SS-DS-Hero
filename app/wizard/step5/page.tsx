"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Download, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export default function DisassociateSKUs() {
  const [isLoading, setIsLoading] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [csvUploaded, setCsvUploaded] = useState(false)
  const router = useRouter()

  const disassociateViaAPI = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsCompleted(true)
    }, 2000)
  }

  const downloadCSVTemplate = () => {
    // In a real app, this would generate a CSV template for disassociating SKUs from bins
    const csvContent = "sku,warehouse_id,bin\nSKU001,WH1,\nSKU002,WH1,\nSKU003,WH2,"
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "disassociate_skus_template.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, you would process the file here
      setCsvUploaded(true)
    }
  }

  const handleContinue = () => {
    if (isCompleted || csvUploaded) {
      router.push("/wizard/step6")
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold">Step 5: Disassociate SKUs from Bins</h1>

      <Card>
        <CardHeader>
          <CardTitle>Disassociate SKUs from Bin Locations</CardTitle>
          <CardDescription>
            Remove the association between SKUs and bin locations to prepare for dynamic slotting.
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
                Use the ShipHero API to disassociate all SKUs from their bin locations. This will clear all bin
                assignments in preparation for dynamic slotting.
              </p>

              <Button onClick={disassociateViaAPI} disabled={isLoading || isCompleted} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Disassociating SKUs...
                  </>
                ) : isCompleted ? (
                  <>
                    <ArrowRight className="mr-2 h-4 w-4" />
                    SKUs Disassociated Successfully
                  </>
                ) : (
                  <>
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Disassociate All SKUs from Bins
                  </>
                )}
              </Button>
            </TabsContent>

            <TabsContent value="csv" className="space-y-4 pt-4">
              <p>Download a CSV template to disassociate SKUs from bins, then upload it in the ShipHero UI.</p>

              <div className="space-y-4">
                <Button onClick={downloadCSVTemplate} variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Disassociation Template
                </Button>

                <div className="rounded-md border p-4">
                  <h4 className="mb-2 font-medium">Upload Instructions:</h4>
                  <ol className="ml-6 list-decimal space-y-2 text-sm">
                    <li>Log in to your ShipHero dashboard</li>
                    <li>Navigate to Inventory &gt; Bulk Edit</li>
                    <li>Upload the downloaded CSV file</li>
                    <li>Confirm the upload to clear all bin assignments</li>
                  </ol>
                </div>

                <div className="space-y-2">
                  <label htmlFor="csvFile" className="text-sm font-medium">
                    Upload Completed CSV (Optional)
                  </label>
                  <Input id="csvFile" type="file" accept=".csv" onChange={handleFileChange} />
                  {csvUploaded && <p className="text-sm text-green-600">CSV file uploaded successfully</p>}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Button onClick={handleContinue} disabled={!isCompleted && !csvUploaded} className="w-full">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

