"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Download, Database, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function GetInventory() {
  const [isLoading, setIsLoading] = useState(false)
  const [isDataFetched, setIsDataFetched] = useState(false)
  const router = useRouter()

  // Mock inventory data - in a real app, this would come from an API call
  const mockInventoryData = [
    {
      sku: "SKU001",
      warehouse_id: "WH1",
      bin: "A1-B2-C3",
      is_kit: false,
      build_kit: false,
      customer_3pl: "Customer A",
      qty: 25,
    },
    {
      sku: "SKU002",
      warehouse_id: "WH1",
      bin: "A1-B3-C4",
      is_kit: true,
      build_kit: true,
      customer_3pl: "Customer A",
      qty: 10,
    },
    {
      sku: "SKU003",
      warehouse_id: "WH2",
      bin: "D5-E6-F7",
      is_kit: false,
      build_kit: false,
      customer_3pl: "Customer B",
      qty: 15,
    },
  ]

  const fetchInventoryData = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // In a real app, you would save this data to Supabase or state management
      localStorage.setItem("inventoryData", JSON.stringify(mockInventoryData))
      setIsLoading(false)
      setIsDataFetched(true)
    }, 2000)
  }

  const downloadCSV = () => {
    // Create CSV content
    const headers = ["SKU", "Warehouse ID", "Bin", "Is Kit", "Build Kit", "3PL Customer", "Quantity"]
    const csvRows = [
      headers.join(","),
      ...mockInventoryData.map((item) =>
        [item.sku, item.warehouse_id, item.bin, item.is_kit, item.build_kit, item.customer_3pl, item.qty].join(","),
      ),
    ]

    const csvContent = csvRows.join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)

    // Create download link and trigger click
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "inventory_data.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleContinue = () => {
    if (isDataFetched) {
      router.push("/wizard/step4")
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-6 text-2xl font-bold">Step 3: Get All Inventory Data</h1>

      <Card>
        <CardHeader>
          <CardTitle>Retrieve Inventory Data</CardTitle>
          <CardDescription>
            Get all inventory data including SKU, warehouse ID, bin location, kit information (kit and build kit Yes/No), 3PL customer, and
            quantity on hand. This data will be saved to Supabase for later use in the transition process.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="api">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="api">API Method</TabsTrigger>
              <TabsTrigger value="report">Database Report</TabsTrigger>
            </TabsList>

            <TabsContent value="api" className="space-y-4 pt-4">
              <p>
                Fetch inventory data directly from the ShipHero API. This will retrieve all necessary information and
                save it to our database.
              </p>

              <Button onClick={fetchInventoryData} disabled={isLoading || isDataFetched} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Fetching Data...
                  </>
                ) : isDataFetched ? (
                  <>
                    <Database className="mr-2 h-4 w-4" />
                    Data Retrieved Successfully
                  </>
                ) : (
                  <>
                    <Database className="mr-2 h-4 w-4" />
                    Fetch Inventory Data
                  </>
                )}
              </Button>
            </TabsContent>

            <TabsContent value="report" className="space-y-4 pt-4">
              <p>
                Generate a database report with all inventory information. You can download this as a CSV file for your
                records.
              </p>

              <Button onClick={downloadCSV} variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Inventory Report (CSV)
              </Button>
            </TabsContent>
          </Tabs>

          {isDataFetched && (
            <div className="pt-4">
              <h3 className="mb-2 font-medium">Retrieved Inventory Data Preview:</h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SKU</TableHead>
                      <TableHead>Warehouse</TableHead>
                      <TableHead>Bin</TableHead>
                      <TableHead>Is Kit</TableHead>
                      <TableHead>Quantity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockInventoryData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.sku}</TableCell>
                        <TableCell>{item.warehouse_id}</TableCell>
                        <TableCell>{item.bin}</TableCell>
                        <TableCell>{item.is_kit ? "Yes" : "No"}</TableCell>
                        <TableCell>{item.qty}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          <Button onClick={handleContinue} disabled={!isDataFetched} className="w-full">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

