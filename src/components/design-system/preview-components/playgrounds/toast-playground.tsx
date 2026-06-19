import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export default function ToastPlayground() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Fire toast notifications with one click.</p>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={() => toast.success("Saved successfully!")}>
          Success
        </Button>
        <Button size="sm" variant="outline" onClick={() => toast.error("Something went wrong.")}>
          Error
        </Button>
        <Button size="sm" variant="secondary" onClick={() => toast("General notification")}>
          Info
        </Button>
        <Button size="sm" variant="ghost" onClick={() => toast.warning("Check your settings.")}>
          Warning
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button size="xs" variant="outline" onClick={() =>
          toast("Action required", {
            description: "Please review the changes before continuing.",
            action: { label: "Review", onClick: () => toast("Review opened") },
          })
        }>
          With Action
        </Button>
        <Button size="xs" variant="outline" onClick={() =>
          toast("Upload complete", {
            description: "Your file has been uploaded successfully.",
            duration: 5000,
          })
        }>
          With Description
        </Button>
      </div>
    </div>
  )
}
