import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

export default function TabsPreview() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Underline Tabs
        </p>
        <Tabs defaultValue="tab1">
          <TabsList variant="default">
            <TabsTrigger value="tab1">Overview</TabsTrigger>
            <TabsTrigger value="tab2">Analytics</TabsTrigger>
            <TabsTrigger value="tab3">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="pt-2 text-xs text-muted-foreground">
            Overview panel with key metrics and summary data.
          </TabsContent>
          <TabsContent value="tab2" className="pt-2 text-xs text-muted-foreground">
            Analytics panel with charts and visualizations.
          </TabsContent>
          <TabsContent value="tab3" className="pt-2 text-xs text-muted-foreground">
            Settings panel with configuration options.
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Pill Tabs
        </p>
        <Tabs defaultValue="tab1">
          <TabsList variant="default">
            <TabsTrigger value="tab1">All</TabsTrigger>
            <TabsTrigger value="tab2">Active</TabsTrigger>
            <TabsTrigger value="tab3">Archived</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="pt-2 text-xs text-muted-foreground">
            Showing all items.
          </TabsContent>
          <TabsContent value="tab2" className="pt-2 text-xs text-muted-foreground">
            Showing active items only.
          </TabsContent>
          <TabsContent value="tab3" className="pt-2 text-xs text-muted-foreground">
            Showing archived items.
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Breadcrumb
        </p>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Categories</BreadcrumbPage>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Separator
        </p>
        <div className="space-y-3">
          <p className="text-xs text-foreground">Above this line</p>
          <Separator />
          <p className="text-xs text-foreground">Below this line</p>
        </div>
      </div>
    </div>
  )
}
