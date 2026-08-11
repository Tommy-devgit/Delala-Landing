import type { Metadata } from "next";
import { PageHero, Section } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Terms of use | Delala",
  description: "The rules for using Delala, for people searching for homes and for people listing them.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms"
        title={<>Using Delala.</>}
        lead="Delala is a marketplace. We connect people looking for homes with the people offering them; we are not a party to any agreement between you."
      />

      <Section title="If you are listing a property">
        <div className="space-y-4 text-base text-muted leading-relaxed">
          <p>You confirm that you own the property or are authorised to advertise it.</p>
          <p>
            Photographs must be of the actual property. Price and details must be accurate, and you
            must update or remove a listing once it is no longer available.
          </p>
          <p>
            Listings are reviewed before they are marked verified. We may reject or remove a listing,
            and may suspend accounts that repeatedly publish inaccurate ones.
          </p>
        </div>
      </Section>

      <Section title="If you are looking for a home" tone="surface">
        <div className="space-y-4 text-base text-muted leading-relaxed">
          <p>
            View a property in person before paying anything. Never send money for a home you have not
            seen, and be cautious of anyone asking for payment simply to show you one.
          </p>
          <p>
            Delala does not charge for contact details. If someone claims otherwise, report them.
          </p>
        </div>
      </Section>

      <Section title="What we do and do not guarantee">
        <div className="space-y-4 text-base text-muted leading-relaxed">
          <p>
            The verified marker means a person reviewed the listing. It is not a legal title check and
            not a guarantee of ownership, condition or availability. See the{" "}
            <a href="/verification" className="text-primary font-semibold hover:underline">
              verification page
            </a>{" "}
            for exactly what it covers.
          </p>
          <p>
            Any agreement over a property is between you and the other party. We are not responsible
            for the outcome of that arrangement, and we strongly recommend a written contract.
          </p>
        </div>
      </Section>

      <Section title="Your account" tone="surface">
        <div className="space-y-4 text-base text-muted leading-relaxed">
          <p>Keep your sign-in details private. You are responsible for activity on your account.</p>
          <p>
            We may suspend accounts used to publish fraudulent listings, harass other people, or
            misuse the service. Questions go to{" "}
            <a href="mailto:support@delala.et" className="text-primary font-semibold hover:underline">
              support@delala.et
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
