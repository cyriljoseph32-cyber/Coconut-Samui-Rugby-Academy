// Single source of truth for contact details and site metadata.
// Replace the placeholder values below before going live.

export const SITE = {
  name: "Coconut Samui Rugby Academy",
  shortName: "CSRA",
  tagline: "Grow Strong Together.",
  domain: "https://coconutsamuirugby.com",
  // WhatsApp number in international format, digits only (e.g. "66812345678").
  whatsappNumber: "66000000000",
  email: "coconutrugbyacademy@gmail.com",
  instagram: "https://www.instagram.com/coconut_samui_rugby",
  instagramHandle: "@coconut_samui_rugby",
  // Training ground — replace with the real venue.
  location: {
    venue: "Training Ground, Koh Samui",
    area: "Koh Samui, Surat Thani",
    country: "Thailand",
    mapsUrl: "https://maps.google.com/?q=Koh+Samui+Thailand",
    // Approximate island centre until the real pitch is confirmed.
    lat: 9.512,
    lng: 100.014,
  },
} as const;

// Forms are handled by FormSubmit (https://formsubmit.co) — no API key needed.
// Submissions are emailed to SITE.email. The very first submission triggers a
// one-time activation email to that inbox: click "Activate" once and the form
// is live for good.
export const FORM_ENDPOINT = `https://formsubmit.co/${SITE.email}`;

export function waLink(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
