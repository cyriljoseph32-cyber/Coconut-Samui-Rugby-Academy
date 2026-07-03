import { SITE } from "../config/site";

export interface FaqItem {
  q: string;
  a: string;
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function courseSchema(opts: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: opts.name,
    description: opts.description,
    url: `${SITE.domain}${opts.url}`,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.domain },
  };
}

export function eventSchema(opts: {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: opts.name,
    description: opts.description,
    startDate: opts.startDate,
    endDate: opts.endDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: SITE.location.venue,
      address: { "@type": "PostalAddress", addressLocality: "Koh Samui", addressCountry: "TH" },
    },
    organizer: { "@type": "Organization", name: SITE.name, url: SITE.domain },
  };
}
