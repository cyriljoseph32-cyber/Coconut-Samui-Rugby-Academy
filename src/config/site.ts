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
  instagram: "https://www.instagram.com/CoconutRugby",
  instagramHandle: "@CoconutRugby",
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
  // Web3Forms access key — create one free at https://web3forms.com and paste it here.
  web3formsKey: "REPLACE_WITH_WEB3FORMS_KEY",
} as const;

export function waLink(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
