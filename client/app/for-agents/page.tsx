import type { Metadata } from "next";
import { Users, BadgeCheck, LineChart, MapPin, Phone, ListChecks } from "lucide-react";
import { PageHero, Section, Points, CalloutCTA } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "For agents and brokers | Delala",
  description:
    "Delala gives professional agents a public profile, a place to manage multiple listings and renters who can see exactly who they are dealing with.",
};

export default function ForAgentsPage() {
  return (
    <>
      <PageHero
        eyebrow="For agents and brokers"
        title={<>A profile renters can actually check.</>}
        lead="The complaint about brokers in Ethiopia is rarely about the fee — it is not knowing who you are dealing with. A Delala profile makes that visible."
      />

      <Section title="What the marketplace gives you">
        <Points
          items={[
            { icon: BadgeCheck, title: "A public profile", body: "Your name, photo, an owner or agent designation, and a short bio. Renters reach it by tapping your name on any listing you post." },
            { icon: ListChecks, title: "All your homes in one place", body: "Your profile lists everything you currently have available, so one good listing leads renters to the rest." },
            { icon: Users, title: "Renters who already know who you are", body: "By the time someone calls, they have seen your profile and how many homes you manage." },
            { icon: MapPin, title: "Location-accurate listings", body: "Homes are filed against real sub-cities and neighbourhoods, so they surface for the searches that matter." },
            { icon: Phone, title: "Direct enquiries", body: "Calls and messages come straight to you." },
            { icon: LineChart, title: "Reviewed, not rubber-stamped", body: "Listings are checked before going live, which is what makes the verified marker worth anything." },
          ]}
        />
      </Section>

      <Section title="How to get set up" tone="surface">
        <p className="text-base text-muted leading-relaxed">
          Create an account, complete your profile with a photo and bio, and publish your first
          property. Ask us to switch your account to the agent role and your listings will show the
          agent designation instead of owner.
        </p>
      </Section>

      <CalloutCTA
        title="Put your listings somewhere people trust"
        body="Set up a profile and publish your first property today."
        primaryHref="/contact"
        primaryLabel="Talk to us"
        secondaryHref="/for-owners"
        secondaryLabel="See how publishing works"
      />
    </>
  );
}
