import { SITE_URL } from "@/lib/seo";

/**
 * Site-wide schema.org nodes.
 *
 * These used to live inside the root layout. They are extracted here because
 * the root layout now lives under `[locale]` (so that <html lang> carries the
 * real content language), and because per-page schema needs to reference the
 * same `@id` values rather than re-declaring a second Organization node.
 */

// Entity block. Search engines and answer engines both resolve "루다큐어" /
// "RudaCure" through this node, so it carries the alternate names, the legal
// address, the founder and the outbound identity links rather than a bare name.
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "Corporation", "MedicalOrganization"],
  "@id": `${SITE_URL}/#organization`,
  name: "RudaCure",
  legalName: "RudaCure Inc.",
  alternateName: ["루다큐어", "루다큐어 주식회사", "Ruda Cure", "RudaCure Inc."],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/images/logo_full.png`,
  },
  image: `${SITE_URL}/og-image.jpg`,
  description:
    "RudaCure is a biopharmaceutical company targeting membrane proteins — ion channels such as TRPV1/TRPV4 and GPCRs — with the AI-driven RuCIA platform, developing therapeutics for dry eye disease, chronic pain, psoriasis and rare neurological disease.",
  // The company was founded in 2018 out of an ion-channel research laboratory
  // (see the About page timeline). The previous "2024" value was wrong and was
  // being served to every crawler as the company's age.
  foundingDate: "2018",
  founder: {
    "@type": "Person",
    name: "Yong Ho Kim",
    alternateName: "김용호",
    jobTitle: "Founder & CEO",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "1001, 145 Gasandigital 1-ro, Geumcheon-gu",
    addressLocality: "Seoul",
    addressCountry: "KR",
  },
  telephone: "+82-32-724-9070",
  email: "sh.kim@rudacure.com",
  sameAs: ["https://kr.linkedin.com/company/rudacure"],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "Business Development",
      email: "sh.kim@rudacure.com",
      availableLanguage: ["Korean", "English"],
    },
    {
      "@type": "ContactPoint",
      contactType: "Scientific Inquiries",
      email: "science@rudacure.com",
      availableLanguage: ["Korean", "English"],
    },
  ],
  knowsAbout: [
    "Membrane protein drug discovery",
    "Ion channel modulators",
    "TRPV1",
    "TRPV4",
    "GPCR drug discovery",
    "Dry eye disease",
    "Non-opioid analgesia",
    "Psoriasis",
    "Charcot-Marie-Tooth disease type 2C",
    "Electrophysiology",
    "Patch clamp",
    "Structure-based drug design",
  ],
};

// A WebSite node gives the site an addressable identity of its own and declares
// every language edition, which is what an answer engine reads when deciding
// which locale of a page to quote.
export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "RudaCure",
  alternateName: "루다큐어",
  inLanguage: ["ko", "en", "zh", "ja", "es", "fr", "ar"],
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const BREADCRUMB_HOME: Record<string, string> = {
  ko: "홈",
  en: "Home",
  zh: "首页",
  ja: "ホーム",
  es: "Inicio",
  fr: "Accueil",
  ar: "الرئيسية",
};

/**
 * BreadcrumbList for a second-level page. Search results render this as the
 * path line under the title instead of a bare URL, and answer engines use it to
 * place a quoted page inside the site's hierarchy.
 */
export function breadcrumbSchema(
  locale: string,
  trail: { name: string; path: string }[],
) {
  const home = BREADCRUMB_HOME[locale] ?? BREADCRUMB_HOME.en;
  const items = [{ name: home, path: "" }, ...trail];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}/${locale}${item.path}`,
    })),
  };
}
