"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"

export default function UpdateAccountType() {
  const [confirmed, setConfirmed] = useState(false)
  const [accountName, setAccountName] = useState("Selected Account")
  const router = useRouter()

  useEffect(() => {
    const storedAccount = localStorage.getItem("transitionAccount")
    if (storedAccount) {
      setAccountName(storedAccount)
    }
  }, [])

  const handleContinue = () => {
    if (confirmed) {
      router.push("/wizard/step7")
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold">Step 6: Update Account Type</h1>

      <Alert className="mb-6">
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>Inventory Status</AlertTitle>
        <AlertDescription>
          All inventory is now set to zero and SKUs are disassociated from bins. You can now safely change the account
          type.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Change Account from Static to Dynamic Slotting</CardTitle>
          <CardDescription>
            Update the account type in your backend system (CASH) to change from Static Slotting (SS) to Dynamic
            Slotting (DS).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-md border p-4">
            <h3 className="mb-4 font-medium">Instructions:</h3>
            <ol className="ml-6 list-decimal space-y-3">
              <li>Log in to your backend system (CASH)</li>
              <li>Navigate to Account Management</li>
              <li>
                Find account: <span className="font-semibold">{accountName}</span>
              </li>
              <li>
                Change the slotting type from <span className="font-semibold">Static Slotting (SS)</span> to{" "}
                <span className="font-semibold">Dynamic Slotting (DS)</span>
              </li>
              <li>Save the changes</li>
              <li>Verify that the account type has been updated successfully</li>
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
              I confirm that I have changed the account type from Static Slotting (SS) to Dynamic Slotting (DS) in the
              backend system
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

