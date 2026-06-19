import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircleIcon } from "lucide-react"

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, "You must accept the terms"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type SignupForm = z.infer<typeof signupSchema>

export default function FormPlayground() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "", terms: false },
  })

  function onSubmit() {
    toast.success("Form submitted successfully!")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="sf-name" className="text-xs">Name</Label>
        <Input id="sf-name" {...register("name")} placeholder="Your name" className="text-xs" />
        {errors.name && (
          <p className="flex items-center gap-1 text-xs text-destructive">
            <AlertCircleIcon className="size-3" />
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="sf-email" className="text-xs">Email</Label>
        <Input id="sf-email" {...register("email")} placeholder="you@example.com" className="text-xs" />
        {errors.email && (
          <p className="flex items-center gap-1 text-xs text-destructive">
            <AlertCircleIcon className="size-3" />
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="sf-pass" className="text-xs">Password</Label>
          <Input id="sf-pass" type="password" {...register("password")} placeholder="••••••••" className="text-xs" />
          {errors.password && (
            <p className="flex items-center gap-1 text-xs text-destructive">
              <AlertCircleIcon className="size-3" />
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="sf-confirm" className="text-xs">Confirm</Label>
          <Input id="sf-confirm" type="password" {...register("confirmPassword")} placeholder="••••••••" className="text-xs" />
          {errors.confirmPassword && (
            <p className="flex items-center gap-1 text-xs text-destructive">
              <AlertCircleIcon className="size-3" />
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="sf-terms"
          onCheckedChange={(c) => setValue("terms", c === true, { shouldValidate: true })}
        />
        <Label htmlFor="sf-terms" className="text-xs">I accept the terms and conditions</Label>
      </div>
      {errors.terms && (
        <p className="flex items-center gap-1 text-xs text-destructive">
          <AlertCircleIcon className="size-3" />
          {errors.terms.message}
        </p>
      )}

      <Button type="submit" size="sm">Create Account</Button>
    </form>
  )
}
