// Scroll reveals for every page: fade up, staggered children, once.
//
// The hidden state is CSS-only and applies only under html.lp-motion, which
// the inline head script in LandingLayout sets when IntersectionObserver
// exists and reduced motion isn't requested. Without JS, or if this module
// never runs, everything stays visible (the head script drops the class
// after 3s unless `__lpMotion` is set).
//
// Targets: every `.lp-intro`, anything marked `data-reveal`, and each child
// of a `data-reveal-stagger` container. Elements that enter the viewport in
// the same frame are staggered 100ms apart, so a grid arriving together
// cascades and a long stacked list on a phone reveals card by card.
declare global {
  interface Window {
    __lpMotion?: boolean;
  }
}

const SELECTOR = '.lp-intro, [data-reveal], [data-reveal-stagger] > *';
const DURATION = 600;
const STAGGER = 100;

export function initLandingMotion() {
  const root = document.documentElement;
  window.__lpMotion = true;
  if (!root.classList.contains('lp-motion')) return;

  const reveal = (el: HTMLElement, delay: number) => {
    el.style.setProperty('--lp-delay', `${delay}ms`);
    el.classList.add('lp-anim');
    // Next frame, so the transition runs from the hidden state.
    requestAnimationFrame(() => el.classList.add('is-in'));
    // Drop the transition afterwards so components keep their own
    // (hover) transitions.
    window.setTimeout(() => el.classList.remove('lp-anim'), DURATION + delay + 50);
  };

  const io = new IntersectionObserver(
    (entries) => {
      let n = 0;
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        reveal(e.target as HTMLElement, n++ * STAGGER);
      }
    },
    { rootMargin: '0px 0px -8% 0px' }
  );
  document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => io.observe(el));
}
