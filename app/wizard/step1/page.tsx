"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight } from "lucide-react"

export default function SelectAccount() {
  const [selectedAccount, setSelectedAccount] = useState<string>("")
  const router = useRouter()

  // Mock accounts - in a real app, these would come from an API or database
  const accounts = [
    { id: "acc1", name: "Account 1" },
    { id: "acc2", name: "Account 2" },
    { id: "acc3", name: "Account 3" },
  ]

  const handleContinue = () => {
    if (selectedAccount) {
      // In a real app, you'd save this to state/context or database
      localStorage.setItem("transitionAccount", selectedAccount)
      router.push("/wizard/step2")
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold">Step 1: Select Account to Transition</h1>

      <Card>
        <CardHeader>
          <CardTitle>Account Selection</CardTitle>
          <CardDescription>
            Select the account you want to transition from static slotting (SS) to dynamic slotting (DS).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="account" className="text-sm font-medium">
              Account
            </label>
            <Select value={selectedAccount} onValueChange={setSelectedAccount}>
              <SelectTrigger id="account">
                <SelectValue placeholder="Select an account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4">
            <Button onClick={handleContinue} disabled={!selectedAccount} className="w-full">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

