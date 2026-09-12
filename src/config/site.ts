// Single source of truth for contact details and site metadata.
// Replace the placeholder values below before going live.

export const SITE = {
  name: "Coconut Samui Rugby Academy",
  shortName: "CSRA",
  tagline: "Grow Strong Together.",
  domain: "https://coconutsamuirugby.com",
  // WhatsApp number in international format, digits only (e.g. "66812345678").
  whatsappNumber: "66633753316",
  email: "coconutrugbyacademy@gmail.com",
  instagram: "https://www.instagram.com/coconut_samui_rugby",
  instagramHandle: "@coconut_samui_rugby",
  // Primary training ground — used for the Organization schema (JSON-LD).
  location: {
    venue: "Koh's 33 Stadium, Lamai",
    area: "Koh Samui, Surat Thani",
    country: "Thailand",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Koh%27s+33+Stadium+Lamai+Koh+Samui",
    lat: 9.474,
    lng: 100.0472,
  },
  // All training grounds, shown wherever we link to Google Maps.
  venues: [
    {
      name: "Koh's 33 Stadium — Lamai",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Koh%27s+33+Stadium+Lamai+Koh+Samui",
    },
  ],
} as const;

// Forms post to our own serverless endpoint (api/lead.js). It records the lead
// in COCO COMMAND — the single lead base — and mirrors it to SITE.email through
// FormSubmit, so the inbox copy Cyril is used to keeps arriving.
//
// Native (no-JS) submissions work: the endpoint answers 303 → /thanks/.
export const LEAD_ENDPOINT = "/api/lead";

// Kept as the fallback used server-side by api/lead.js, and as the emergency
// action if the serverless function is ever unavailable. FormSubmit emails to
// SITE.email; the very first submission triggers a one-time activation email to
// that inbox — click "Activate" once and it is live for good.
export const FORM_ENDPOINT = `https://formsubmit.co/${SITE.email}`;

export function waLink(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
