"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight } from "lucide-react"
import { AccountSelector } from "@/components/ui/account-selector"

interface Account {
  id: string;
  name: string;
  accountId: string;
  customerPOC: string;
  status: string;
  effortLevel: string;
  type: string;
  numberOfClients: number;
}

export default function Step1() {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
  const router = useRouter()

  const handleContinue = () => {
    if (selectedAccount) {
      // In a real app, you'd save this to state/context or database
      localStorage.setItem("transitionAccount", selectedAccount.id)
      router.push("/wizard/step2")
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Select Account</CardTitle>
          <CardDescription>
            Choose the account you want to transition from the list below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AccountSelector onAccountSelect={setSelectedAccount} />
          
          {selectedAccount && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-medium">Account Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Account ID</p>
                  <p>{selectedAccount.accountId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Customer POC</p>
                  <p>{selectedAccount.customerPOC}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p>{selectedAccount.status}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Effort Level</p>
                  <p>{selectedAccount.effortLevel}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Type</p>
                  <p>{selectedAccount.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Number of Clients</p>
                  <p>{selectedAccount.numberOfClients}</p>
                </div>
              </div>
            </div>
          )}

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

