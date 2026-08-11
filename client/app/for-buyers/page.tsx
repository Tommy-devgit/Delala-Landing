import type { Metadata } from "next";
import { Search, MapPin, Heart, Phone, ShieldCheck, Bell } from "lucide-react";
import { PageHero, Section, Points, Steps, CalloutCTA } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "For renters and buyers | Delala",
  description:
    "How to search verified homes across Ethiopia on Delala, filter by city and sub-city, see them on a map, save the ones you like and call the owner directly.",
};

export default function ForBuyersPage() {
  return (
    <>
      <PageHero
        eyebrow="For renters and buyers"
        title={<>Find a home without going through five middlemen.</>}
        lead="Every listing on Delala names a real place, shows real photographs, and gives you the number of the person who actually posted it."
      />

      <Section title="How the search works">
        <Steps
          items={[
            {
              title: "Start with where",
              body: "Pick a city, then narrow to a sub-city and neighbourhood. The locations come from Delala's own database, so you are choosing real administrative areas rather than typing guesses into a box.",
            },
            {
              title: "Narrow by what matters",
              body: "Filter by property type, bedrooms and a monthly budget in Birr. Filters apply to the list and the map together, so you never see one set of results in one place and a different set in the other.",
            },
            {
              title: "See it on the map",
              body: "Switch to the split view to see where homes actually sit. Hovering a card highlights its marker, and clicking a marker brings up that home. On a phone you get a simple list and map toggle instead of a cramped split.",
            },
            {
              title: "Save and compare",
              body: "Tap the heart on any listing. Saved homes are kept on your account, so they are still there when you sign in on another device.",
            },
            {
              title: "Call the owner",
              body: "The contact number is on the listing itself. There is no fee to see it and no one in between.",
            },
          ]}
        />
      </Section>

      <Section title="What you get" tone="surface">
        <Points
          items={[
            { icon: Search, title: "Real filters", body: "City, sub-city, neighbourhood, property type, bedrooms and budget — all applied against live listings." },
            { icon: MapPin, title: "Honest locations", body: "Owners place an approximate pin. It is deliberately approximate: you should not need to publish an exact address to advertise a home." },
            { icon: Heart, title: "Saved homes", body: "Your shortlist lives on your account, not in one browser." },
            { icon: Bell, title: "Updates that matter", body: "Notifications tell you when something you care about changes, rather than filling up with noise." },
            { icon: Phone, title: "Direct contact", body: "Call or message the poster from the listing. No unlock fees." },
            { icon: ShieldCheck, title: "Reviewed listings", body: "Submissions are checked before they are marked verified. See how that works on the verification page." },
          ]}
        />
      </Section>

      <CalloutCTA
        title="Start with a city"
        body="Browse what is available right now across Addis Ababa, Hawassa, Adama, Bahir Dar, Dire Dawa and Gondar."
        primaryHref="/cities"
        primaryLabel="Explore cities"
        secondaryHref="/how-it-works"
        secondaryLabel="How it works"
      />
    </>
  );
}
