/**
 * The page's Cal.com booking modal (BookingEmbed), when it can open in place.
 * BookingEmbed opens it for every [data-book] control; BookingForm checks it
 * so it skips its scroll-to-form when the calendar opens instead. Returns null
 * without a CAL_LINK (no embed) or without <dialog> support, so [data-book]
 * links fall back to scrolling to #book.
 */
export function calEmbedWithDialog(): HTMLElement | null {
  const el = document.querySelector<HTMLElement>('[data-cal-embed]');
  const dialog = el?.querySelector<HTMLDialogElement>('[data-cal-dialog]');
  return el && dialog && typeof dialog.showModal === 'function' ? el : null;
}
