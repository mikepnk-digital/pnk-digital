// Conversion events, sent through the Google tag already on every page
// (HeadMeta). Every event carries the page path. Events:
// - call_booked: Cal.com `bookingSuccessful` (BookingEmbed)
// - form_submitted: a successful form send (ContactForm, BookingForm)
// - phone_clicked: any tel: link (HeadMeta, delegated)
export function track(name: string, params: Record<string, string | undefined> = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, { page_path: window.location.pathname, ...params });
}
