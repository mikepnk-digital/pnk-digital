// JSON-LD builders shared by layouts and pages. Everything here must describe
// what is visible on the page it's emitted on, and nothing that isn't true:
// no Review / AggregateRating markup (self-serving reviews can trigger a
// Google manual action). Values come from src/config/site.ts.
import {
  EMAIL,
  LINKEDIN_URL,
  LOCATION,
  OPENING_HOURS,
  PHONE_HREF,
  POSTCODE,
  STREET_ADDRESS,
} from '@/config/site';
import type { Faq, Plan } from '@/data/tech-support';

export const SITE_URL = 'https://pnk-digital.com';
/** One entity: the site-wide Organization and the footer's LocalBusiness share this id, so Google merges them. */
export const ORG_ID = `${SITE_URL}/#organization`;

const [town, county] = LOCATION.split(',').map((s) => s.trim());
const telephone = PHONE_HREF.replace(/^tel:/, '');
const sameAs = LINKEDIN_URL ? [LINKEDIN_URL] : undefined;
const logo = `${SITE_URL}/icon-512x512.png`;

/** Site-wide (HeadMeta): who publishes the site. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'PNK Digital',
    legalName: 'Mike Pink Ltd',
    url: SITE_URL,
    logo,
    email: EMAIL,
    telephone,
    ...(sameAs && { sameAs }),
  };
}

/** The footer NAP block (LandingFooter.astro). */
export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': ORG_ID,
    name: 'PNK Digital',
    url: SITE_URL,
    image: logo,
    telephone,
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      ...(STREET_ADDRESS ? { streetAddress: STREET_ADDRESS } : {}),
      addressLocality: town,
      addressRegion: county,
      ...(POSTCODE ? { postalCode: POSTCODE } : {}),
      addressCountry: 'GB',
    },
    // SERVICE_AREA: the town, the county, remote across the UK.
    areaServed: [
      { '@type': 'City', name: town },
      { '@type': 'AdministrativeArea', name: county },
      { '@type': 'Country', name: 'United Kingdom' },
    ],
    ...(OPENING_HOURS.length > 0 && { openingHours: OPENING_HOURS.map((h) => h.spec) }),
    ...(sameAs && { sameAs }),
  };
}

export function faqPageJsonLd(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/**
 * A Service with one Offer per pricing card (GBP). "from" prices are minimums;
 * plans without a priceSuffix are billed monthly. Pass `vatIncluded` only
 * where the page says how VAT is treated.
 */
export function serviceJsonLd({
  name,
  serviceType,
  description,
  url,
  pricingAnchor,
  plans,
  vatIncluded,
}: {
  name: string;
  serviceType: string;
  description: string;
  url: string;
  pricingAnchor: string;
  plans: Plan[];
  vatIncluded?: boolean;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    serviceType,
    description,
    url,
    provider: { '@type': 'Organization', '@id': ORG_ID, name: 'PNK Digital', url: SITE_URL },
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
    offers: plans.map((p) => ({
      '@type': 'Offer',
      name: p.name,
      description: p.tagline,
      url: `${url}#${pricingAnchor}`,
      price: p.price,
      priceCurrency: 'GBP',
      priceSpecification: {
        '@type': p.priceSuffix ? 'PriceSpecification' : 'UnitPriceSpecification',
        ...(p.from ? { minPrice: p.price } : { price: p.price }),
        priceCurrency: 'GBP',
        ...(vatIncluded !== undefined && { valueAddedTaxIncluded: vatIncluded }),
        ...(p.priceSuffix ? {} : { unitCode: 'MON', unitText: 'month' }),
      },
    })),
  };
}
