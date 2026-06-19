import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { TrendingUpIcon, UsersIcon } from "lucide-react"

export default function CardsPlayground() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-xs">Stat Card</CardTitle>
          <CardDescription className="text-[10px]">Monthly performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-semibold text-foreground">$45,231</span>
            <span className="flex items-center gap-0.5 text-[10px] text-success">
              <TrendingUpIcon className="size-3" />
              +12.5%
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xs">Profile Card</CardTitle>
              <CardDescription className="text-[10px]">Team member</CardDescription>
            </div>
            <Avatar className="size-8">
              <AvatarFallback className="text-[10px]">JD</AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-[10px] text-muted-foreground">Jane Doe · Senior Designer</p>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground">
            <UsersIcon className="size-3" />
            12 projects
          </div>
        </CardContent>
        <CardFooter>
          <Button size="xs" variant="outline">Message</Button>
          <Button size="xs" className="ml-2">View Profile</Button>
        </CardFooter>
      </Card>

      <Card>
        <div className="h-24 bg-gradient-to-br from-primary/20 to-primary/5" />
        <CardHeader>
          <CardTitle className="text-xs">Product Card</CardTitle>
          <div className="flex items-center gap-1.5">
            <Badge variant="default" className="text-xs px-1.5 py-0 h-4">New</Badge>
            <Badge variant="secondary" className="text-xs px-1.5 py-0 h-4">Sale</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-xs font-semibold text-foreground">Ceramic Table Lamp</p>
          <p className="text-[10px] text-muted-foreground">$89 · Free shipping</p>
        </CardContent>
        <CardFooter>
          <Button size="xs" className="w-full">Add to Cart</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xs">Article Preview</CardTitle>
          <CardDescription className="text-[10px]">Design tips · 5 min read</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-[10px] text-foreground leading-relaxed">
            Learn how to build a cohesive design system that scales across your entire product portfolio.
          </p>
        </CardContent>
        <CardFooter>
          <Button size="xs" variant="ghost">Read More →</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
