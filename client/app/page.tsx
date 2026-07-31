import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { SocialProof } from "@/components/social-proof";
import { WhyDelala } from "@/components/why-delala";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { AppShowcase } from "@/components/app-showcase";
import { PopularCities } from "@/components/popular-cities";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { FinalCTA } from "@/components/final-cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] selection:bg-[#B4C292]/40 selection:text-[#4C061D]">
      {/* Top Navbar Header */}
      <Navbar />

      {/* Main Content Flow for Storytelling */}
      <main id="main-content" className="flex-grow pt-24 sm:pt-28">
        {/* 1. Unforgettable Hero Section */}
        <Hero />

        {/* 2. Key Social Proof Metrics */}
        <SocialProof />

        {/* 3. Problem vs. Solution Framing (Traditional Telegram Chaos vs. Delala Standard) */}
        <WhyDelala />

        {/* 4. Human Outcome-Oriented Features */}
        <Features />

        {/* 5. 3-Step Simple Journey */}
        <HowItWorks />

        {/* 6. Hero Product Mobile App Showcase */}
        <AppShowcase />

        {/* 7. Regional Hubs & Popular Ethiopian Cities */}
        <PopularCities />

        {/* 8. Verified Community Reviews & Testimonials */}
        <Testimonials />

        {/* 9. Objection Handling Accordion (FAQ) */}
        <FAQ />

        {/* 10. Grand App Download CTA Banner */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
