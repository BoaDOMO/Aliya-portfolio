import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

export default function AccordionPlayground() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Expand/collapse sections for FAQ-style content.</p>
      <Accordion className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xs">What is a design system?</AccordionTrigger>
          <AccordionContent className="text-xs text-muted-foreground">
            A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-xs">How do I customize the theme?</AccordionTrigger>
          <AccordionContent className="text-xs text-muted-foreground">
            Use the left panel to adjust colors, typography, spacing, and elevation. Changes are reflected in real time across all three previews.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-xs">Can I export my theme?</AccordionTrigger>
          <AccordionContent className="text-xs text-muted-foreground">
            Yes! Click "Export Theme" in the left panel to copy your design tokens as Tailwind v4 CSS variables, plain CSS, or an AI-ready prompt.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-xs">Is dark mode supported?</AccordionTrigger>
          <AccordionContent className="text-xs text-muted-foreground">
            Yes. Toggle between light and dark modes using the sun/moon button in the toolbar. All previews respond immediately.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
