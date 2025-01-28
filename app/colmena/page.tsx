import { IntroSection } from "./sections/intro-section"
import { ProgramSection } from "./sections/program-section"
import { PricingSection } from "./sections/pricing-section"
import { ToolsSection } from "./sections/tools-section"

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <IntroSection />
      <ProgramSection />
      <PricingSection />
      <ToolsSection />
    </main>
  )
}