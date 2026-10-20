// Single source of truth for contact details and claims repeated across the
// site (main pages, landing pages, footers). Change a value here, not in copy.
// An empty string means "not supplied yet": the element that uses it is hidden.

export const PHONE_DISPLAY = '01252 279059';
export const PHONE_HREF = 'tel:+441252279059';

export const EMAIL = 'hello@pnk-digital.com';
export const EMAIL_HREF = `mailto:${EMAIL}`;

/** Cal.com event for the free call. Assumed in the site-update plan; confirm once the account exists. */
export const CAL_LINK = 'https://cal.com/pnk-digital/30min';

export const YEARS_EXPERIENCE = 27;

export const LOCATION = 'Farnham, Surrey';
export const SERVICE_AREA = 'Farnham, Surrey and the surrounding area, remote across the UK';

/** Completes "We'll reply …" / "Response time: …". */
export const RESPONSE_PROMISE = 'within one business day';

/** Label on every button that books the free call. */
export const CALL_LABEL = 'Book a free 30-minute call';

/** Not supplied yet: the footer link is hidden while empty. */
export const LINKEDIN_URL = '';

/* ---- Local SEO (NAP block in both footers + LocalBusiness JSON-LD) ------- */

/** Public street address and postcode for the NAP block. Not supplied yet: only LOCATION shows. */
export const STREET_ADDRESS = '';
export const POSTCODE = '';

/**
 * Opening hours. Not supplied yet: hidden in the footer and left out of the
 * LocalBusiness markup. `spec` is schema.org openingHours format, e.g.
 * { label: 'Monday to Friday, 9am–5.30pm', spec: 'Mo-Fr 09:00-17:30' }.
 */
export const OPENING_HOURS: { label: string; spec: string }[] = [];

/** Google Business Profile reviews link for /contact. Not supplied yet: hidden while empty. */
export const GOOGLE_REVIEWS_URL = '';

/** The footer map link: a Google Maps search for the NAP address (swap in the Business Profile's Maps link once it exists). */
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  ['PNK Digital', STREET_ADDRESS, LOCATION, POSTCODE].filter(Boolean).join(', ')
)}`;
