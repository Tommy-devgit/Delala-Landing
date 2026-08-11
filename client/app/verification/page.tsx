import type { Metadata } from "next";
import { ClipboardCheck, ShieldCheck, XCircle, Eye, Bell, AlertTriangle } from "lucide-react";
import { PageHero, Section, Points, Steps, CalloutCTA } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "How verification works | Delala",
  description:
    "What Delala's verified marker means, how listings are reviewed before they appear, and what it deliberately does not claim.",
};

export default function VerificationPage() {
  return (
    <>
      <PageHero
        eyebrow="Verification"
        title={<>What the verified marker actually means.</>}
        lead="A trust badge is only worth something if it is honest about its limits. Here is exactly what ours covers."
      />

      <Section title="The review process">
        <Steps
          items={[
            {
              title: "The owner submits",
              body: "A listing is published with photos, a structured location, contact details and an approximate map pin.",
            },
            {
              title: "It enters a queue",
              body: "Nothing is auto-approved. Every new submission waits for review before it is marked verified.",
            },
            {
              title: "A reviewer checks it",
              body: "Delala staff look at whether the photographs match the described property, whether the location is plausible, and whether the contact details work.",
            },
            {
              title: "It is approved or sent back",
              body: "Approved listings are marked verified. Rejected ones come back to the owner with a reason so they can fix it and resubmit.",
            },
            {
              title: "The owner is told",
              body: "Either outcome reaches the owner as a notification, with the reason attached.",
            },
          ]}
        />
      </Section>

      <Section title="What it covers" tone="surface">
        <Points
          items={[
            { icon: ClipboardCheck, title: "A person looked at it", body: "Every verified listing was reviewed by Delala staff, not passed by an automated filter." },
            { icon: Eye, title: "Photographs were checked", body: "Reviewers look for photos that do not match the property being described." },
            { icon: ShieldCheck, title: "The location is structured", body: "Listings are filed against real cities and sub-cities rather than free text." },
            { icon: Bell, title: "Owners get an answer", body: "Rejections carry a reason, so the process is not a black box." },
          ]}
        />
      </Section>

      <Section title="What it does not claim">
        <div className="rounded-card border border-line bg-surface p-5">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-3 text-micro text-muted leading-relaxed">
              <p>
                <span className="font-semibold text-ink">It is not a legal title check.</span> Delala
                does not confirm ownership or inspect title deeds. Verify ownership independently
                before paying anything.
              </p>
              <p>
                <span className="font-semibold text-ink">The map pin is approximate.</span> Owners
                place a rough position on purpose. Never treat it as the exact address.
              </p>
              <p>
                <span className="font-semibold text-ink">It is not a guarantee against disputes.</span>{" "}
                Always view a property in person and use a written agreement.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="If something looks wrong" tone="surface">
        <div className="flex gap-3 items-start">
          <XCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-base text-muted leading-relaxed">
            Report the listing. Reports go to the same review team, who can take a listing down or
            suspend the account behind it. Tell us at{" "}
            <a href="mailto:report@delala.et" className="text-primary font-semibold hover:underline">
              report@delala.et
            </a>
            .
          </p>
        </div>
      </Section>

      <CalloutCTA
        title="Browse reviewed listings"
        body="Every home marked verified has been through the process above."
        primaryHref="/cities"
        primaryLabel="Explore cities"
        secondaryHref="/faq"
        secondaryLabel="Read the FAQ"
      />
    </>
  );
}
