import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { SocialProof } from "@/components/social-proof";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { AppShowcase } from "@/components/app-showcase";
import { PopularCities } from "@/components/popular-cities";
import { WhyDelala } from "@/components/why-delala";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { FinalCTA } from "@/components/final-cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] selection:bg-[#B4C292]/40 selection:text-[#4C061D]">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Flow */}
      <main className="flex-grow pt-24 sm:pt-28">
        {/* 1. Reference Layout Inspired Hero */}
        <Hero />

        {/* 2. Social Proof Stat Counter */}
        <SocialProof />

        {/* 3. Bento Grid Features */}
        <Features />

        {/* 4. How It Works 3-Step Journey */}
        <HowItWorks />

        {/* 5. Mobile App Showcase */}
        <AppShowcase />

        {/* 6. Popular Cities Showcase */}
        <PopularCities />

        {/* 7. Why Delala */}
        <WhyDelala />

        {/* 8. Verified Testimonials */}
        <Testimonials />

        {/* 9. FAQ Accordion */}
        <FAQ />

        {/* 10. Grand Final CTA Banner */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
