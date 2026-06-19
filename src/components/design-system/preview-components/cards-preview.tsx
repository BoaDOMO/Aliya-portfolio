import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CardsPreview() {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>Account Overview</CardTitle>
        <CardDescription>Your plan renews in 12 days</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          You&apos;re on the <strong>Pro</strong> plan with 50 projects and
          priority support. Upgrade to Enterprise for unlimited everything.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="default" size="sm">
          Upgrade
        </Button>
        <Button variant="outline" size="sm">
          Manage Plan
        </Button>
      </CardFooter>
    </Card>
  )
}
