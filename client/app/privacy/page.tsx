import type { Metadata } from "next";
import { PageHero, Section } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Privacy | Delala",
  description: "What Delala stores, why, and the choices you have over your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title={<>What we store, and why.</>}
        lead="Written in plain language. If anything here is unclear, ask us and we will explain it."
      />

      <Section title="What we hold">
        <div className="space-y-4 text-base text-muted leading-relaxed">
          <p>
            <span className="font-semibold text-ink">Your account.</span> Your email address, name,
            and optionally a phone number, photograph and short bio. Name, photograph and role are
            shown publicly on listings you post. Your email address is never shown publicly.
          </p>
          <p>
            <span className="font-semibold text-ink">Your listings.</span> Everything you publish:
            photographs, description, price, structured location and the approximate map pin. This is
            public by design.
          </p>
          <p>
            <span className="font-semibold text-ink">Your activity.</span> Homes you save and
            notifications raised for you. Your saved list is private to your account.
          </p>
        </div>
      </Section>

      <Section title="Location" tone="surface">
        <div className="space-y-4 text-base text-muted leading-relaxed">
          <p>
            The map pin on a listing is placed by the owner and is deliberately approximate. We do not
            ask for or store exact addresses of private homes.
          </p>
          <p>
            If you use &ldquo;find my location&rdquo; on the map, your position is used in your browser
            to centre the view. It is not sent to us or stored.
          </p>
        </div>
      </Section>

      <Section title="Your choices">
        <div className="space-y-4 text-base text-muted leading-relaxed">
          <p>
            You can edit or remove your profile information at any time from your account, and delete
            listings you have posted.
          </p>
          <p>
            To have your account and its data removed entirely, email{" "}
            <a href="mailto:support@delala.et" className="text-primary font-semibold hover:underline">
              support@delala.et
            </a>
            . Deleting an account removes its listings, saved homes and notifications.
          </p>
        </div>
      </Section>

      <Section title="Who else sees it" tone="surface">
        <p className="text-base text-muted leading-relaxed">
          We do not sell personal information. Photographs are held in object storage and the database
          is hosted with our infrastructure providers purely to run the service.
        </p>
      </Section>
    </>
  );
}
