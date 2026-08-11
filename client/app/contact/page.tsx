import type { Metadata } from "next";
import { Mail, MessageSquare, Building2, ShieldAlert } from "lucide-react";
import { PageHero, Section, CalloutCTA } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Contact Delala",
  description: "How to reach Delala about listings, partnerships, reporting a property or support.",
};

const CHANNELS = [
  {
    icon: MessageSquare,
    title: "General support",
    body: "Questions about searching, saving homes or your account.",
    action: "support@delala.et",
    href: "mailto:support@delala.et",
  },
  {
    icon: Building2,
    title: "Listing your property",
    body: "Help publishing, or getting an account switched to the agent role.",
    action: "listings@delala.et",
    href: "mailto:listings@delala.et",
  },
  {
    icon: ShieldAlert,
    title: "Report a listing",
    body: "Something inaccurate, misleading or already taken. Reports reach the review team.",
    action: "report@delala.et",
    href: "mailto:report@delala.et",
  },
  {
    icon: Mail,
    title: "Partnerships and press",
    body: "Working with Delala, or writing about us.",
    action: "hello@delala.et",
    href: "mailto:hello@delala.et",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Talk to us.</>}
        lead="Pick the address that matches what you need and you will reach the right people directly."
      />

      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CHANNELS.map(({ icon: Icon, title, body, action, href }) => (
            <a
              key={title}
              href={href}
              className="rounded-card border border-line bg-surface p-4 transition-colors hover:border-primary/40 block"
            >
              <span className="w-8 h-8 rounded-control bg-primary/10 text-primary flex items-center justify-center mb-2.5">
                <Icon className="w-4 h-4" aria-hidden="true" />
              </span>
              <h2 className="text-base font-semibold text-ink">{title}</h2>
              <p className="text-micro text-muted mt-1 leading-relaxed">{body}</p>
              <p className="text-micro text-primary font-semibold mt-2">{action}</p>
            </a>
          ))}
        </div>
      </Section>

      <Section title="Where we are" tone="surface">
        <p className="text-base text-muted leading-relaxed">
          Delala is built in Addis Ababa and operates across six Ethiopian cities. We reply to email
          within two working days.
        </p>
      </Section>

      <CalloutCTA
        title="Looking for a home instead?"
        body="You do not need to contact us to browse. Every listing carries the owner's number."
        primaryHref="/cities"
        primaryLabel="Explore cities"
        secondaryHref="/faq"
        secondaryLabel="Read the FAQ"
      />
    </>
  );
}
