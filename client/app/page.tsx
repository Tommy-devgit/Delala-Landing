import { Hero } from "@/components/hero";
import { SocialProof } from "@/components/social-proof";
import { WhyDelala } from "@/components/why-delala";
import { FinalCTA } from "@/components/final-cta";

export default function Home() {
  return (
    <>
      {/* Minimalistic Hero */}
      <Hero />

      {/* Social Proof Trust Statistics */}
      <SocialProof />

      {/* Quick Transformation Overview */}
      <WhyDelala />

      {/* Final Conversion CTA Banner */}
      <FinalCTA />
    </>
  );
}
