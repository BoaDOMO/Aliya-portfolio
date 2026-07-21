import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Info as InfoIcon, CheckCircle as CheckCircleIcon, Warning as AlertTriangleIcon, XCircle as XCircleIcon } from "@phosphor-icons/react"

export default function AlertPreview() {
  return (
    <div className="space-y-2">
      <Alert>
        <InfoIcon className="size-3.5" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          A new software update is available for download.
        </AlertDescription>
      </Alert>
      <Alert>
        <CheckCircleIcon className="size-3.5 text-success" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Your changes have been saved successfully.
        </AlertDescription>
      </Alert>
      <Alert>
        <AlertTriangleIcon className="size-3.5 text-warning" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Your storage is almost full. Upgrade your plan.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <XCircleIcon className="size-3.5" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          There was a problem processing your request.
        </AlertDescription>
      </Alert>
    </div>
  )
}
