"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4">
          <h1 className="text-lg font-semibold">Slotting Transition Wizard</h1>
        </div>
      </header>
      <main className="flex-1">
        <div className="container flex flex-col items-center justify-center space-y-8 py-12 md:py-24">
          <div className="mx-auto flex max-w-[700px] flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Static to Dynamic Slotting Transition
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              This wizard will guide you through the process of transitioning an account from static slotting to dynamic
              slotting.
            </p>
          </div>
          <div className="w-full max-w-[700px] space-y-4">
            <div className="rounded-lg border bg-card p-8 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Important Information</h2>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                <li>This process will temporarily set all inventory to zero</li>
                <li>Inventory sync to stores will need to be stopped during the process</li>
                <li>The process must be completed in order without interruption</li>
                <li>Make sure you have all necessary permissions before starting</li>
              </ul>
            </div>
            <Button size="lg" className="w-full" onClick={() => router.push("/wizard/step1")}>
              Start Transition Process
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

