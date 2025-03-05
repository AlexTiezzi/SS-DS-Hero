"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export default function ResumeSync() {
  const [confirmed, setConfirmed] = useState(false)
  const router = useRouter()

  const handleContinue = () => {
    if (confirmed) {
      router.push("/wizard/complete")
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold">Step 9: Resume Inventory Sync</h1>

      <Card>
        <CardHeader>
          <CardTitle>Resume Pushing Inventory to Shopify Stores</CardTitle>
          <CardDescription>
            Now that the transition is almost complete, you need to resume the inventory synchronization between
            ShipHero and Shopify stores.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-md border p-4">
            <h3 className="mb-4 font-medium">Instructions:</h3>
            <ol className="ml-6 list-decimal space-y-3">
              <li>Log in to your ShipHero dashboard</li>
              <li>Navigate to Settings &gt; Integrations</li>
              <li>
                For each connected store:
                <ul className="ml-6 list-disc mt-2">
                  <li>Click on the store name</li>
                  <li>Toggle on "Inventory Sync"</li>
                  <li>Save changes</li>
                </ul>
              </li>
              <li>Verify that inventory is being pushed correctly to all stores</li>
              <li>Check a few products in Shopify to confirm inventory quantities are updated</li>
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
              I confirm that I have resumed inventory synchronization for all stores and verified that inventory is
              being pushed correctly
            </label>
          </div>

          <Button onClick={handleContinue} disabled={!confirmed} className="w-full">
            Continue to Final Step
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

