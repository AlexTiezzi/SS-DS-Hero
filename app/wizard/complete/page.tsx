"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Home } from "lucide-react"

export default function Complete() {
  const router = useRouter()

  // Get account name from localStorage (in a real app, this would be from state management)
  const accountName =
    typeof window !== "undefined" ? localStorage.getItem("transitionAccount") || "Selected Account" : "Selected Account"

  const markAsCompleted = () => {
    // In a real app, this would make an API call to mark the account as transitioned
    localStorage.removeItem("transitionAccount")
    localStorage.removeItem("inventoryData")

    // Redirect to home
    router.push("/")
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-col items-center justify-center text-center mb-8">
        <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
        <h1 className="text-3xl font-bold">Transition Complete!</h1>
        <p className="text-muted-foreground mt-2">
          The account has been successfully transitioned from Static Slotting to Dynamic Slotting.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transition Summary</CardTitle>
          <CardDescription>
            Review the completed transition process and mark the account as successfully transitioned.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-md border p-4">
            <h3 className="mb-4 font-medium">Completed Steps:</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                <span>
                  Selected account: <span className="font-semibold">{accountName}</span>
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                <span>Stopped inventory sync on all stores</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                <span>Retrieved and saved all inventory data</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                <span>Cleared all inventory to zero</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                <span>Disassociated SKUs from bins</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                <span>Changed account from Static Slotting to Dynamic Slotting</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                <span>Created new locations from bin data</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                <span>Restored inventory quantities to new locations</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                <span>Resumed inventory sync to Shopify stores</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col space-y-4">
            <Button onClick={markAsCompleted} className="w-full">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Mark Account as Successfully Transitioned
            </Button>

            <Button variant="outline" onClick={() => router.push("/")} className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

