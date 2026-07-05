import type { FaqItem } from "../lib/schema";

export interface Program {
  slug: string;
  name: string;
  ages: string;
  tag: string;
  short: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  sessionLooksLike: string[];
  details: { label: string; value: string }[];
  cta: { label: string; whatsapp: string };
  faq: FaqItem[];
}

export const programs: Program[] = [
  {
    slug: "kids-rugby",
    name: "Kids Rugby",
    ages: "Ages 4–10",
    tag: "Fun first",
    short:
      "Tag rugby, games and small wins. No tackling, no pressure — just kids learning to pass, run and back each other up.",
    seoTitle: "Kids Rugby Classes Koh Samui (Ages 4–10) | Coconut Samui Rugby Academy",
    seoDescription:
      "Fun-first tag rugby for kids aged 4–10 on Koh Samui. No contact, no experience needed. Small groups, French- and English-speaking pro coaches, free trial session.",
    h1: "Kids Rugby — Ages 4 to 10",
    intro:
      "At this age, rugby is a game of chase, laughter and tiny victories. Our youngest players learn to catch, pass and run with the ball through games they don't want to stop playing. There is no tackling — it's tag rugby only — and no child ever sits out because they're 'not good enough'. Every kid gets ball-in-hand time, every single session.",
    sessionLooksLike: [
      "Warm-up games that don't feel like warm-ups",
      "Ball skills in pairs and small groups",
      "Tag rugby mini-matches — everyone plays",
      "Team huddle: one value, one high-five, home",
    ],
    details: [
      { label: "Format", value: "Tag rugby (non-contact)" },
      { label: "Group size", value: "Max 12 kids per coach" },
      { label: "Duration", value: "60-minute sessions, weekly" },
      { label: "Experience", value: "None needed — most of our kids started at zero" },
      { label: "Language", value: "French & English coaching" },
      { label: "Bring", value: "Water bottle, trainers or boots, sunscreen" },
    ],
    cta: {
      label: "Book a Free Trial",
      whatsapp: "Hi! I'd like to book a free trial for the Kids program (ages 4-10).",
    },
    faq: [
      {
        q: "Is rugby safe for a 4-year-old?",
        a: "At this age we play tag rugby only — no tackling, no scrums. Sessions are built around running, catching and evasion games, coached at a max ratio of 12 kids per coach.",
      },
      {
        q: "My child has never played any sport. Is that a problem?",
        a: "Not at all — most of our kids started with zero experience. The first month is entirely about confidence with the ball and having fun with the group.",
      },
      {
        q: "Do you coach in French or English?",
        a: "Both — sessions run bilingual French–English, so francophone, anglophone and international-school kids are all at home from day one.",
      },
    ],
  },
  {
    slug: "teens-rugby",
    name: "Teens Rugby",
    ages: "Ages 11–17",
    tag: "The pathway",
    short:
      "Real rugby: contact skills taught progressively, positions, game sense — and a pathway to camps and inter-school competition.",
    seoTitle: "Teen Rugby Training Koh Samui (Ages 11–17) | Coconut Samui Rugby Academy",
    seoDescription:
      "Structured rugby for teens on Koh Samui: progressive contact skills, positional play and a competitive pathway to camps and the island's first inter-school tournament.",
    h1: "Teens Rugby — Ages 11 to 17",
    intro:
      "This is where the game gets real. Teens learn contact skills the safe way — technique first, always progressive, never rushed — plus positional play, defensive structure and how to read a game. They train for something: our intensive camps and Koh Samui's first inter-school tournament. But the bigger win is off the pitch: teenagers who show up on time, look people in the eye and back their mates.",
    sessionLooksLike: [
      "Structured warm-up and movement prep",
      "Skill block: handling, kicking, contact technique",
      "Unit work: attack shapes, defensive line",
      "Conditioned games and match play",
    ],
    details: [
      { label: "Format", value: "Contact rugby, introduced progressively by age and readiness" },
      { label: "Duration", value: "90-minute sessions, weekly" },
      { label: "Pathway", value: "Camps, inter-school tournament, touring sides visiting Samui" },
      { label: "Experience", value: "Beginners welcome — a separate skills track gets them up to speed" },
      { label: "Bring", value: "Boots, mouthguard, water — we provide the rest" },
    ],
    cta: {
      label: "Book a Free Trial",
      whatsapp: "Hi! I'd like to book a free trial for the Teens program (ages 11-17).",
    },
    faq: [
      {
        q: "How do you introduce contact safely?",
        a: "Contact is taught in stages — body position and falling technique on pads before any live contact, and players only progress when the coach signs off. World Rugby's age-grade guidelines set our ceiling.",
      },
      {
        q: "Can a complete beginner join at 14 or 15?",
        a: "Yes. Beginners run a parallel skills track inside the same session until they're ready to join full drills — usually within 4–6 weeks.",
      },
      {
        q: "Is there real competition?",
        a: "Yes — intensive holiday camps, our inter-school tournament, and fixtures against visiting touring sides as the island's rugby community grows.",
      },
    ],
  },
  {
    slug: "adults-touch-rugby",
    name: "Adults Touch Rugby",
    ages: "18+",
    tag: "Sunset sessions",
    short:
      "Social touch rugby for residents and visitors. Show up, play, stay for the crew. All levels, genuinely.",
    seoTitle: "Adult Touch Rugby Koh Samui | Social Sessions — Coconut Samui Rugby Academy",
    seoDescription:
      "Social touch rugby on Koh Samui for adults — residents, expats and travellers. All levels welcome, no membership needed. Just show up and play.",
    h1: "Adults Touch Rugby — Sunset Sessions",
    intro:
      "Played before? Great. Haven't touched a ball since school — or ever? Also great. Our adult sessions are touch rugby: fast, non-contact, and easy to pick up in one evening. Residents get a weekly game and a crew; travellers get the best hour of their trip. No membership, no commitment, no ego.",
    sessionLooksLike: [
      "Quick skills refresher for newcomers",
      "Pick-up teams — mixed every week",
      "Touch rugby until the light goes",
      "Cold drinks and plans for next week",
    ],
    details: [
      { label: "Format", value: "Touch rugby (non-contact), mixed teams" },
      { label: "Who", value: "Residents, expats, travellers — all levels" },
      { label: "Commitment", value: "None. Pay per session, come when you can" },
      { label: "On holiday?", value: "Drop in — visiting players are how island rugby grows" },
    ],
    cta: {
      label: "Join a Session",
      whatsapp: "Hi! I'd like to join an adults touch rugby session.",
    },
    faq: [
      {
        q: "I'm only on Samui for a week. Can I play?",
        a: "Absolutely — drop-in players are welcome every week. Message us on WhatsApp and just turn up with trainers and water.",
      },
      {
        q: "I've never played rugby. Will I slow everyone down?",
        a: "No — touch rugby takes about ten minutes to learn, teams are mixed by the coaches, and the vibe is social first.",
      },
    ],
  },
  {
    slug: "corporate-team-building",
    name: "Corporate Team-Building",
    ages: "Companies & teams",
    tag: "Build your crew",
    short:
      "Half-day rugby-based team events for hotels, agencies and island businesses. Communication, trust, and a story your team retells.",
    seoTitle: "Team Building Koh Samui | Rugby Corporate Events — Coconut Samui Rugby Academy",
    seoDescription:
      "Rugby-based corporate team-building on Koh Samui. Half-day and full-day formats for hotels, agencies and companies — zero experience needed, run by academy coaches.",
    h1: "Corporate Team-Building, Rugby Style",
    intro:
      "Rugby is the most collective sport on earth — nobody scores alone. We turn that into half-day and full-day events for companies on Samui: communication drills disguised as games, problem-solving under pressure, and a touch tournament your team will still be talking about at the next off-site. Zero rugby experience needed. Every event also funds kids' scholarships at the academy — your team-building day puts island kids on the pitch.",
    sessionLooksLike: [
      "Ice-breakers and communication games",
      "Team challenges built on rugby fundamentals",
      "Touch rugby tournament with commentary",
      "Debrief, awards and photos",
    ],
    details: [
      { label: "Formats", value: "Half-day (3h) or full-day with catering options" },
      { label: "Group size", value: "8 to 60 people" },
      { label: "Location", value: "Our ground, your venue, or the beach" },
      { label: "Impact", value: "Every event funds academy scholarships for local kids" },
    ],
    cta: {
      label: "Get a Quote",
      whatsapp: "Hi! I'd like a quote for a corporate team-building event.",
    },
    faq: [
      {
        q: "Our team has never played rugby. Does that matter?",
        a: "Not at all — events are built for complete beginners. Everything is non-contact and coached step by step.",
      },
      {
        q: "Can you run the event at our resort?",
        a: "Yes. We bring all equipment and can run events at your venue, on the beach, or at our ground.",
      },
    ],
  },
];
