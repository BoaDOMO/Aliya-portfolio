import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DialogPlayground() {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [sheetSide, setSheetSide] = useState<"top" | "right" | "bottom" | "left">("right")

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Click buttons to open dialogs and sheets.</p>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={() => setConfirmOpen(true)}>Confirm Dialog</Button>
        <Button size="sm" variant="outline" onClick={() => setFormOpen(true)}>Form Dialog</Button>
        <Button size="sm" variant="secondary" onClick={() => setAlertOpen(true)}>Alert Dialog</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Button
            key={side}
            size="xs"
            variant="ghost"
            onClick={() => { setSheetSide(side); setSheetOpen(true) }}
          >
            Sheet {side}
          </Button>
        ))}
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              Are you sure you want to proceed? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => { setConfirmOpen(false); toast.success("Confirmed!") }}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new project.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1">
              <Label htmlFor="project-name" className="text-xs">Name</Label>
              <Input id="project-name" placeholder="My Project" className="text-xs" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="project-desc" className="text-xs">Description</Label>
              <Input id="project-desc" placeholder="Brief description..." className="text-xs" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setFormOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => { setFormOpen(false); toast.success("Project created!") }}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Account</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your account and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => { setAlertOpen(false); toast.error("Account deleted.") }}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side={sheetSide}>
          <SheetHeader>
            <SheetTitle>{sheetSide.charAt(0).toUpperCase() + sheetSide.slice(1)} Sheet</SheetTitle>
            <SheetDescription>
              Slide-in panel from the {sheetSide}. Great for detail views.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4 text-xs text-muted-foreground">
            <p>This sheet slides in from the <strong>{sheetSide}</strong> side.</p>
            <p className="mt-2">Useful for settings panels, product details, or navigation.</p>
          </div>
          <SheetFooter>
            <Button size="sm" onClick={() => setSheetOpen(false)}>Close</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
