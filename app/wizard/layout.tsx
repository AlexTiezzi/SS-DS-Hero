import type React from "react"
import { Suspense } from "react"
import { StepProgress } from "@/components/step-progress"

export default function WizardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border">
        <div className="container flex h-16 items-center px-4">
          <h1 className="text-lg font-semibold">Slotting Transition Wizard</h1>
        </div>
      </header>
      <Suspense fallback={<div className="container py-4">Loading progress...</div>}>
        <StepProgress />
      </Suspense>
      <main className="flex-1">
        <div className="container py-6">{children}</div>
      </main>
    </div>
  )
}

