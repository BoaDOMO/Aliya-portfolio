import { ArrowRight } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { BlurredBackground, type BlurredBackgroundImage } from "@/components/blurred-background"
import { FadeInWhenVisible } from "@/components/fade-in-when-visible"
import { PageContainer, PageSection } from "@/components/page-layout"
import { SectionLabel } from "@/components/section-label"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SiteCta({
  title,
  label = "// next",
  image = "blue-flower",
}: {
  title: string
  label?: string
  image?: BlurredBackgroundImage
}) {
  return (
    <PageSection className="relative isolate min-h-[34rem] overflow-hidden border-t py-24 md:flex md:min-h-[42rem] md:items-center md:py-32">
      <BlurredBackground image={image} position="50% 58%" className="opacity-65" />
      <PageContainer className="relative z-10">
        <FadeInWhenVisible className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <SectionLabel align="center">{label}</SectionLabel>
          <h2 className="mt-10 text-balance font-display text-[clamp(2.6rem,5.2vw,4.75rem)] font-medium leading-[1.04] tracking-[-0.05em]">
            {title}
          </h2>
          <Link
            to="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-10 h-12 rounded-full px-8 text-base"
            )}
          >
            Start a conversation
            <ArrowRight className="ml-1 transition-transform duration-200 group-hover/button:translate-x-1 motion-reduce:transition-none" />
          </Link>
        </FadeInWhenVisible>
      </PageContainer>
    </PageSection>
  )
}
