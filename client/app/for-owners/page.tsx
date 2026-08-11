import type { Metadata } from "next";
import { Camera, MapPin, ClipboardCheck, Phone, Bell, ListChecks } from "lucide-react";
import { PageHero, Section, Points, Steps, CalloutCTA } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "For property owners | Delala",
  description:
    "List your house or apartment on Delala: add photos, choose the location, place an approximate map pin and publish. Renters call you directly.",
};

export default function ForOwnersPage() {
  return (
    <>
      <PageHero
        eyebrow="For owners"
        title={<>List your property once. Reach renters directly.</>}
        lead="Publishing is a single page. No agent sits between you and the person who wants to rent your home, and your number is the one on the listing."
      />

      <Section title="Publishing, step by step">
        <Steps
          items={[
            {
              title: "Add your photos",
              body: "Up to twelve, JPG, PNG or WEBP. Choose which one leads. Photos are stored properly, not squeezed into the page, so listings stay quick to load.",
            },
            {
              title: "Describe the property",
              body: "Title, type, monthly rent in Birr, bedrooms, bathrooms and floor area. Only the essentials are required.",
            },
            {
              title: "Choose the location",
              body: "City, then sub-city, then neighbourhood. This is what renters filter by, so it is worth being accurate.",
            },
            {
              title: "Place an approximate pin",
              body: "Tap the map roughly where the property is, and drag to adjust. It is deliberately approximate — you should never have to publish the exact address of a private home to advertise it.",
            },
            {
              title: "Publish",
              body: "Your listing goes into review. Once approved it appears on the marketplace and is marked verified, and you get a notification either way.",
            },
          ]}
        />
      </Section>

      <Section title="After you publish" tone="surface">
        <Points
          items={[
            { icon: ClipboardCheck, title: "A real review", body: "Every submission is checked by a person before it is marked verified. If something needs fixing you are told what." },
            { icon: Bell, title: "You are kept informed", body: "Approval, rejection and visit requests all reach you as notifications." },
            { icon: Phone, title: "Renters call you", body: "Your number sits on the listing card and the property page. Delala does not charge anyone to see it." },
            { icon: ListChecks, title: "Your listings in one place", body: "See everything you have posted, and the public profile renters see when they tap your name." },
            { icon: Camera, title: "Photos that keep working", body: "Images are held in object storage, so they load quickly and stay available." },
            { icon: MapPin, title: "Found by location", body: "Because the location is structured, your home appears when someone filters that exact sub-city." },
          ]}
        />
      </Section>

      <CalloutCTA
        title="Ready to list?"
        body="Publishing takes a few minutes and costs nothing."
        primaryHref="/download"
        primaryLabel="Get started"
        secondaryHref="/verification"
        secondaryLabel="How verification works"
      />
    </>
  );
}
