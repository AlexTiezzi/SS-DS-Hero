"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Download, Loader2, Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CreateLocations() {
  const [isLoading, setIsLoading] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [csvUploaded, setCsvUploaded] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const router = useRouter()

  // Mock location data - in a real app, this would be generated from the inventory data saved in step 3
  const mockLocationData = [
    { location_name: "A1-B2-C3", warehouse_id: "WH1", location_type: "Bin", zone: "Picking" },
    { location_name: "A1-B3-C4", warehouse_id: "WH1", location_type: "Bin", zone: "Picking" },
    { location_name: "D5-E6-F7", warehouse_id: "WH2", location_type: "Bin", zone: "Picking" },
  ]

  const createLocationsAPI = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsCompleted(true)
    }, 2000)
  }

  const downloadLocationTemplate = () => {
    // In a real app, this would generate a CSV template for creating locations
    const csvContent =
      "location_name,warehouse_id,location_type,zone\nA1-B2-C3,WH1,Bin,Picking\nA1-B3-C4,WH1,Bin,Picking\nD5-E6-F7,WH2,Bin,Picking"
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "location_creation_template.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, you would process the file here
      setCsvUploaded(true)
      setShowPreview(true)
    }
  }

  const handleContinue = () => {
    if (isCompleted || csvUploaded) {
      router.push("/wizard/step8")
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-2xl font-bold">Step 7: Create Locations</h1>

      <Card>
        <CardHeader>
          <CardTitle>Create Locations from Bin Data</CardTitle>
          <CardDescription>
            Create locations in ShipHero based on the bin data collected in step 3 or upload a custom location CSV.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="saved">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="saved">Use Saved Bin Data</TabsTrigger>
              <TabsTrigger value="custom">Upload Custom Locations</TabsTrigger>
            </TabsList>

            <TabsContent value="saved" className="space-y-4 pt-4">
              <p>
                Create locations in ShipHero based on the bin data collected in step 3. This will automatically generate
                the necessary locations.
              </p>

              <Button onClick={() => setShowPreview(!showPreview)} variant="outline" className="w-full mb-4">
                {showPreview ? "Hide Preview" : "Show Location Preview"}
              </Button>

              {showPreview && (
                <div className="rounded-md border mb-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Location Name</TableHead>
                        <TableHead>Warehouse</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Zone</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockLocationData.map((location, index) => (
                        <TableRow key={index}>
                          <TableCell>{location.location_name}</TableCell>
                          <TableCell>{location.warehouse_id}</TableCell>
                          <TableCell>{location.location_type}</TableCell>
                          <TableCell>{location.zone}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              <Button onClick={createLocationsAPI} disabled={isLoading || isCompleted} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Locations...
                  </>
                ) : isCompleted ? (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Locations Created Successfully
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Locations from Bin Data
                  </>
                )}
              </Button>
            </TabsContent>

            <TabsContent value="custom" className="space-y-4 pt-4">
              <p>Upload a custom CSV file with location data provided by the customer.</p>

              <div className="space-y-4">
                <Button onClick={downloadLocationTemplate} variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Location Template
                </Button>

                <div className="space-y-2">
                  <label htmlFor="csvFile" className="text-sm font-medium">
                    Upload Location CSV
                  </label>
                  <Input id="csvFile" type="file" accept=".csv" onChange={handleFileChange} />
                  {csvUploaded && <p className="text-sm text-green-600">CSV file uploaded successfully</p>}
                </div>

                {csvUploaded && showPreview && (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Location Name</TableHead>
                          <TableHead>Warehouse</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Zone</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockLocationData.map((location, index) => (
                          <TableRow key={index}>
                            <TableCell>{location.location_name}</TableCell>
                            <TableCell>{location.warehouse_id}</TableCell>
                            <TableCell>{location.location_type}</TableCell>
                            <TableCell>{location.zone}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}

                {csvUploaded && (
                  <Button onClick={createLocationsAPI} disabled={isLoading || isCompleted} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Locations...
                      </>
                    ) : isCompleted ? (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Locations Created Successfully
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Locations from CSV
                      </>
                    )}
                  </Button>
                )}
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

