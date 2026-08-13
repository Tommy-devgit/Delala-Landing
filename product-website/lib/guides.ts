import type { ImageSlot } from "./imagery";

/**
 * Editorial content for the guides section.
 *
 * Structured rather than free-form markdown so that moving it into the database
 * and the admin dashboard later is a change of source, not a rewrite of the
 * rendering: a guide is `{ meta, sections[] }`, and a section is a heading plus
 * blocks. Anything a CMS would need — slug, summary, category, updated date,
 * reading time — is already a field.
 *
 * The writing is deliberately specific to renting and buying in Ethiopia and
 * deliberately cautious about anything legal or numeric. Where a figure would
 * vary by area, landlord or year it is described as a range people report
 * rather than stated as fact, and readers are pointed at the document or the
 * office that can confirm it. Inventing a precise number here would be the same
 * failure as the 4.9 ratings this codebase has just been cleared of.
 */

export type GuideBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "checklist"; items: string[] }
  | { kind: "callout"; tone: "warning" | "note"; text: string };

export interface GuideSection {
  heading: string;
  blocks: GuideBlock[];
}

export interface Guide {
  slug: string;
  title: string;
  summary: string;
  category: "Renting" | "Buying" | "Safety" | "Neighbourhoods" | "Money";
  readingMinutes: number;
  /** ISO date. Shown so a reader can judge how current the advice is. */
  updatedAt: string;
  /**
   * Optional header photograph, by slot name from `lib/imagery.ts`.
   *
   * Optional on purpose. Four of the six guides have a picture that genuinely
   * belongs to the subject; the other two open on typography rather than
   * borrowing an unrelated image to fill the space.
   */
  image?: ImageSlot;
  sections: GuideSection[];
}

export const GUIDES: Guide[] = [
  {
    slug: "finding-an-apartment-in-addis-ababa",
    title: "How to find an apartment in Addis Ababa",
    summary:
      "Where to start, how the sub-city system shapes your search, and what to line up before you begin viewing places.",
    category: "Renting",
    readingMinutes: 6,
    updatedAt: "2026-07-28",
    image: "editorial-gables",
    sections: [
      {
        heading: "Start with the sub-city, not the city",
        blocks: [
          {
            kind: "paragraph",
            text: "Addis Ababa is administratively divided into sub-cities, and each is divided again into smaller areas. Almost nobody searching for a home thinks in terms of the whole city — they think in terms of Bole, Yeka, Kirkos, Nifas Silk-Lafto, Arada, Gulele, Addis Ketema or Kolfe Keranio, and then a specific area inside one of those.",
          },
          {
            kind: "paragraph",
            text: "That matters practically because commute times across the city vary enormously by time of day. A place that looks central on a map can be an hour from where you work in the morning. Before you fall in love with an area, travel from it to your workplace at the hour you would actually be travelling.",
          },
          {
            kind: "list",
            items: [
              "Pick two or three sub-cities rather than one — it roughly triples what you can consider without widening your search to places you would never live.",
              "Filter by area on Delala and sort by newest. Good listings in popular areas move quickly.",
              "Note which areas your budget actually reaches before you start viewing, so you are comparing real options against each other.",
            ],
          },
        ],
      },
      {
        heading: "Decide what you cannot compromise on",
        blocks: [
          {
            kind: "paragraph",
            text: "The things that make daily life workable in Addis are often not the things listings lead with. Power cuts and water interruptions happen; whether a building handles them well is the difference between an inconvenience and a serious problem.",
          },
          {
            kind: "checklist",
            items: [
              "Is there a standby generator, and does it serve your unit or only the common areas and lift?",
              "Is there a reserve water tank, and how long does it last the building?",
              "How is water pressure on the floor you would be living on, not the ground floor?",
              "Is there dedicated parking, and is it included in the rent or charged separately?",
              "Who pays for water, electricity and any building service charge?",
            ],
          },
          {
            kind: "callout",
            tone: "note",
            text: "On Delala, an amenity is only shown when the poster has said the property has it. A blank means they were not asked or did not answer — not that the answer is no. Ask.",
          },
        ],
      },
      {
        heading: "Have your side ready before you view",
        blocks: [
          {
            kind: "paragraph",
            text: "Places that are well priced for their area do not sit empty for long. If you view something good and then need a week to organise money and paperwork, you will usually lose it. Sorting this out first is what turns a good viewing into a home.",
          },
          {
            kind: "list",
            items: [
              "Know your total move-in cost, not just the monthly rent — deposits and any advance months are usually payable together.",
              "Have identification ready, and be prepared to be asked for proof of income or an employment letter.",
              "Decide in advance the maximum you will pay, and write it down. Viewing a place you like is a bad moment to work that out.",
            ],
          },
        ],
      },
      {
        heading: "View properly",
        blocks: [
          {
            kind: "paragraph",
            text: "Visit in daylight, and if you can, visit twice at different times. A quiet street at eleven in the morning is not the same street at seven in the evening. Run the taps, test the lights and sockets, and open and close every window and door.",
          },
          {
            kind: "paragraph",
            text: "Ask who else lives in the building and who manages it. A responsive manager matters more over a year than an extra square metre of floor space.",
          },
        ],
      },
    ],
  },
  {
    slug: "what-to-check-before-you-rent",
    title: "What to check before you sign a rental agreement",
    summary:
      "The questions worth asking, the paperwork worth reading, and the things that are far harder to fix after you move in.",
    category: "Renting",
    readingMinutes: 7,
    updatedAt: "2026-07-28",
    image: "guide-bedroom",
    sections: [
      {
        heading: "Confirm the person can actually let the property",
        blocks: [
          {
            kind: "paragraph",
            text: "This is the single most important check, and the one most often skipped. The person showing you a property is not always its owner, and not everyone presenting themselves as an agent is acting for the owner.",
          },
          {
            kind: "checklist",
            items: [
              "Ask to see proof of ownership, and check the name on it against the identification of the person you are dealing with.",
              "If you are dealing with a broker or agent, ask what authorises them to let this specific property.",
              "If someone is subletting, ask to see the head lease and whether it permits subletting at all.",
              "Be wary if the person cannot produce anything and pushes you to decide quickly.",
            ],
          },
          {
            kind: "callout",
            tone: "warning",
            text: "If you cannot establish who owns the property, do not pay anything. This is the point at which most rental fraud succeeds.",
          },
        ],
      },
      {
        heading: "Get the money terms in writing, in full",
        blocks: [
          {
            kind: "paragraph",
            text: "Verbal agreements about who pays for what are where most disputes start. Everything below should be written into the agreement, with amounts, rather than agreed in conversation.",
          },
          {
            kind: "list",
            items: [
              "The rent, and exactly what period it covers.",
              "The deposit, the conditions for getting it back, and when it is returned after you leave.",
              "How many months are payable in advance. This varies a great deal between landlords — establish it early, because it dominates your move-in cost.",
              "Any broker or agent fee, who pays it, and when.",
              "Whether water, electricity, internet and any service or maintenance charge are included.",
              "How and when rent may be increased, and how much notice you get.",
            ],
          },
        ],
      },
      {
        heading: "Record the condition before you move in",
        blocks: [
          {
            kind: "paragraph",
            text: "Deposit disputes are almost always arguments about whether damage was already there. The cheapest insurance against that is twenty minutes with a phone camera on the day you get the keys.",
          },
          {
            kind: "checklist",
            items: [
              "Photograph every room, including floors, walls, ceilings and window frames.",
              "Photograph anything already damaged, close up, and make sure the date is visible in the file details.",
              "Test and note every socket, light, tap, and the toilet flush.",
              "Photograph the meter readings for water and electricity on the day you take over.",
              "Send the whole set to the landlord in writing and keep their reply.",
            ],
          },
        ],
      },
      {
        heading: "Read the exit terms before the entry terms",
        blocks: [
          {
            kind: "paragraph",
            text: "It is worth reading an agreement backwards. How much notice must you give? What happens if you need to leave early? What condition must the property be in for the deposit to be returned in full? These clauses are ignored on the day you sign and decisive on the day you leave.",
          },
        ],
      },
    ],
  },
  {
    slug: "avoiding-property-scams",
    title: "How to avoid property scams",
    summary:
      "How rental and sale fraud actually works, the patterns that give it away, and the rules that keep you out of it.",
    category: "Safety",
    readingMinutes: 6,
    updatedAt: "2026-08-04",
    image: "guide-keys-in-door",
    sections: [
      {
        heading: "Almost every scam needs one thing: payment before verification",
        blocks: [
          {
            kind: "paragraph",
            text: "The specifics vary, but the shape is nearly always identical. Something desirable is offered below its market price, a reason is produced why you cannot see it or meet the owner right now, and you are asked to send money to secure it. Once the money moves, the listing and the person disappear.",
          },
          {
            kind: "paragraph",
            text: "Everything else in this guide is detail. The rule that protects you is simple: nothing is paid until you have stood inside the property and confirmed who you are dealing with.",
          },
        ],
      },
      {
        heading: "Patterns worth stopping for",
        blocks: [
          {
            kind: "list",
            items: [
              "The price is far below anything comparable in the same area, with a story attached explaining why.",
              "The person cannot meet you and needs a deposit to 'hold' the property.",
              "You are told several other people are about to take it, and you must decide today.",
              "The photographs look like a furniture catalogue — no sockets, no wear, no neighbours, no view out of any window.",
              "The same photographs appear on another listing at a different address or a different price.",
              "The conversation is moved off the platform immediately, before anything has been established.",
              "You are asked to send money to an account in a name that does not match the person or the ownership document.",
            ],
          },
        ],
      },
      {
        heading: "Verify in this order",
        blocks: [
          {
            kind: "checklist",
            items: [
              "See the property in person, in daylight.",
              "Confirm the identity of the person and their right to let or sell it, against a document.",
              "Agree the terms in writing.",
              "Only then, pay — in a way that leaves a record, and get a receipt.",
            ],
          },
          {
            kind: "callout",
            tone: "warning",
            text: "Delala never takes payment for a property and will never ask you to send money through the site. Anyone claiming to collect a fee on Delala's behalf is not from Delala.",
          },
        ],
      },
      {
        heading: "What the badges on Delala do and do not tell you",
        blocks: [
          {
            kind: "paragraph",
            text: "A listing marked Reviewed has been through Delala's moderation queue — somebody looked at the advert and let it through. It is a check on the listing, not on the building, and nobody from Delala has been inside the property.",
          },
          {
            kind: "paragraph",
            text: "A poster's badges say precisely what has been checked: Phone verified means the phone number is theirs, Identity verified means identification was checked against the profile name, Business verified means a registered agency showed its registration. A poster with no badges is not necessarily a problem — most have not been through verification — but it means the checks in this guide carry the whole weight.",
          },
          {
            kind: "paragraph",
            text: "If something looks wrong, use Report listing on the property page. Reports go to Delala's moderators and the poster is not told who reported them.",
          },
        ],
      },
    ],
  },
  {
    slug: "renting-versus-buying",
    title: "Renting or buying: how to think about it",
    summary:
      "The questions that actually decide this, rather than the ones that feel like they should.",
    category: "Buying",
    readingMinutes: 5,
    updatedAt: "2026-07-14",
    sections: [
      {
        heading: "The honest first question is how long you will stay",
        blocks: [
          {
            kind: "paragraph",
            text: "Buying carries substantial one-off costs — transfer costs, fees, and the work almost every property needs on arrival. Those costs are spread over the years you stay. Over a long enough period they become small; over a short one they dominate everything else and buying is usually the worse financial decision even in a rising market.",
          },
          {
            kind: "paragraph",
            text: "If your plans for the next few years are genuinely uncertain, that uncertainty is itself an argument for renting, and it is not a lesser choice.",
          },
        ],
      },
      {
        heading: "What renting really buys you",
        blocks: [
          {
            kind: "list",
            items: [
              "The ability to leave — for a job, a change in the household, or because the area turned out not to suit you.",
              "Somebody else's responsibility for major repairs, provided that is written into the agreement.",
              "A far smaller amount of money committed at once.",
            ],
          },
        ],
      },
      {
        heading: "What buying really buys you",
        blocks: [
          {
            kind: "list",
            items: [
              "Security of tenure. Nobody ends your lease or raises your rent.",
              "Freedom to change the property, which matters more than people expect once they have lived somewhere a while.",
              "Housing costs that stop moving with the rental market, which is worth a great deal over time.",
            ],
          },
        ],
      },
      {
        heading: "Before you commit to buying",
        blocks: [
          {
            kind: "checklist",
            items: [
              "Confirm the ownership documentation is in order and matches the seller, before any money moves.",
              "Establish what transfer costs and fees will fall to you, and add them to the purchase price when you compare options.",
              "Budget for the work the property needs on arrival. Almost every property needs some.",
              "Have the structure looked at by somebody whose job that is, not by the person selling it to you.",
              "Check what is planned for the immediate area — a road, a development or a change of use can alter both daily life and value.",
            ],
          },
          {
            kind: "callout",
            tone: "note",
            text: "This is general guidance, not legal or financial advice. Property transfer has formal requirements, and it is worth paying a professional to confirm them for your specific transaction.",
          },
        ],
      },
    ],
  },
  {
    slug: "understanding-property-prices",
    title: "Understanding what a property should cost",
    summary:
      "How to work out whether an asking price is reasonable, using the listings in front of you.",
    category: "Money",
    readingMinutes: 5,
    updatedAt: "2026-07-14",
    image: "editorial-interior",
    sections: [
      {
        heading: "Compare like with like, in the same area",
        blocks: [
          {
            kind: "paragraph",
            text: "A price on its own tells you nothing. The only useful question is what else the same money buys in the same area this month. Delala's filters exist for exactly this: set your area, set the number of bedrooms, sort by price, and look at what is at each end.",
          },
          {
            kind: "paragraph",
            text: "Do this before you view anything. Ten minutes of comparison gives you a sense of the range, and after that you can recognise both a bargain and an overpriced listing on sight.",
          },
        ],
      },
      {
        heading: "What legitimately moves the price",
        blocks: [
          {
            kind: "list",
            items: [
              "Area, and specifically how long it takes to get from there to where you need to be at rush hour.",
              "Floor area, which is often a better guide than bedroom count — two flats with three bedrooms can differ enormously.",
              "Condition and how recently the property was worked on.",
              "Whether it is furnished, and to what standard.",
              "A standby generator, a reserve water tank and dedicated parking, all of which command a real premium.",
              "Floor level, and whether there is a working lift.",
            ],
          },
        ],
      },
      {
        heading: "Look at the total, not the headline",
        blocks: [
          {
            kind: "paragraph",
            text: "Two properties advertised at the same rent can cost very different amounts to live in. Before comparing, add up everything: rent, any service or maintenance charge, water, electricity, internet, parking if charged separately, and the cost of getting to work from each.",
          },
          {
            kind: "paragraph",
            text: "A slightly more expensive place that includes utilities and sits near your work is frequently cheaper in practice than a cheaper one that does not.",
          },
        ],
      },
      {
        heading: "Treat an outlier as a question, not an opportunity",
        blocks: [
          {
            kind: "callout",
            tone: "warning",
            text: "If a listing is far below everything comparable, assume there is a reason and find out what it is before you get attached. Sometimes it is a genuine motivated seller. Often it is a problem with the property, the paperwork, or the listing itself.",
          },
        ],
      },
    ],
  },
  {
    slug: "moving-in-checklist",
    title: "Moving in: a checklist for the first week",
    summary:
      "What to do on handover day and in the days after, in the order that saves the most trouble later.",
    category: "Renting",
    readingMinutes: 4,
    updatedAt: "2026-07-14",
    image: "guide-handover",
    sections: [
      {
        heading: "On the day you get the keys",
        blocks: [
          {
            kind: "checklist",
            items: [
              "Photograph every room before you bring anything in — an empty property photographs honestly.",
              "Photograph the water and electricity meter readings.",
              "Check every key you have been given actually works, including any gate, post box and parking.",
              "Confirm who to contact for repairs, and get it in writing rather than as a verbal name.",
              "Locate the water shut-off and the electrical distribution board before you need them urgently.",
            ],
          },
        ],
      },
      {
        heading: "In the first week",
        blocks: [
          {
            kind: "list",
            items: [
              "Send the landlord your condition photographs in writing and keep their acknowledgement.",
              "Confirm how and when rent is to be paid, and keep a record of every payment from the first one.",
              "Arrange internet early — installation is rarely as quick as anyone expects.",
              "Find out when refuse is collected and where it goes.",
              "Introduce yourself to whoever manages the building. It is the cheapest maintenance investment available.",
            ],
          },
        ],
      },
      {
        heading: "Worth doing before you forget",
        blocks: [
          {
            kind: "paragraph",
            text: "Put the notice period from your agreement into your calendar, counted back from the end of the term. The most expensive avoidable mistake in renting is discovering the required notice a fortnight too late.",
          },
        ],
      },
    ],
  },
];

export const getGuide = (slug: string): Guide | undefined =>
  GUIDES.find((guide) => guide.slug === slug);

/** Categories that actually have guides in them, in a stable order. */
export const GUIDE_CATEGORIES = Array.from(new Set(GUIDES.map((g) => g.category)));
