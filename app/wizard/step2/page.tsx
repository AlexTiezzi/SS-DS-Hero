"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function StopInventorySync() {
  const [confirmed, setConfirmed] = useState(false)
  const router = useRouter()

  const handleContinue = () => {
    if (confirmed) {
      router.push("/wizard/step3")
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold">Step 2: Stop Inventory Sync</h1>

      <Alert variant="warning" className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          Before proceeding, you must stop inventory sync on all stores to prevent data inconsistencies during the
          transition process.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Stop Inventory Synchronization</CardTitle>
          <CardDescription>
            Follow these steps to stop inventory sync for all stores associated with this account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Instructions:</h3>
            <ol className="ml-6 list-decimal space-y-2">
              <li>Log in to your ShipHero dashboard</li>
              <li>Navigate to Settings &gt; Integrations</li>
              <li>
                For each connected store:
                <ul className="ml-6 list-disc mt-2">
                  <li>Click on the store name</li>
                  <li>Toggle off "Inventory Sync"</li>
                  <li>Save changes</li>
                </ul>
              </li>
              <li>Verify that all inventory sync processes are stopped</li>
            </ol>
          </div>

          <div className="flex items-start space-x-2 pt-4">
            <Checkbox
              id="confirm"
              checked={confirmed}
              onCheckedChange={(checked) => setConfirmed(checked as boolean)}
            />
            <label
              htmlFor="confirm"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I confirm that I have stopped inventory sync on all stores associated with this account
            </label>
          </div>

          <Button onClick={handleContinue} disabled={!confirmed} className="w-full">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

