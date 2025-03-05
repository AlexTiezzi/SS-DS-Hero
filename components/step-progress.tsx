"use client"

import { usePathname } from "next/navigation"
import { CheckCircle2, Circle } from "lucide-react"
import Link from "next/link"

const steps = [
  { id: 1, name: "Select Account", path: "/wizard/step1" },
  { id: 2, name: "Stop Inventory Sync", path: "/wizard/step2" },
  { id: 3, name: "Get Inventory Data", path: "/wizard/step3" },
  { id: 4, name: "Clear Inventory", path: "/wizard/step4" },
  { id: 5, name: "Disassociate SKUs", path: "/wizard/step5" },
  { id: 6, name: "Update Account Type", path: "/wizard/step6" },
  { id: 7, name: "Create Locations", path: "/wizard/step7" },
  { id: 8, name: "Restore Inventory", path: "/wizard/step8" },
  { id: 9, name: "Resume Sync", path: "/wizard/step9" },
  { id: 10, name: "Complete", path: "/wizard/complete" },
]

export function StepProgress() {
  const pathname = usePathname()
  const currentStepId = Number.parseInt(pathname.split("step")[1]?.split("/")[0] || "0")

  return (
    <div className="container py-4 overflow-x-auto">
      <div className="flex min-w-max">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStepId || pathname === "/wizard/complete"
          const isCurrent = step.id === currentStepId || (step.id === 10 && pathname === "/wizard/complete")

          return (
            <div key={step.id} className="flex items-center">
              <Link
                href={isCompleted || isCurrent ? step.path : "#"}
                className={`flex items-center ${
                  isCompleted || isCurrent ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                }`}
              >
                <div className="flex flex-col items-center">
                  {isCompleted ? (
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  ) : (
                    <Circle className={`h-8 w-8 ${isCurrent ? "text-primary" : "text-muted-foreground"}`} />
                  )}
                  <span className={`mt-1 text-xs ${isCurrent ? "font-medium text-primary" : "text-muted-foreground"}`}>
                    {step.name}
                  </span>
                </div>
              </Link>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-8 ${index < currentStepId - 1 || pathname === "/wizard/complete" ? "bg-primary" : "bg-muted"}`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

