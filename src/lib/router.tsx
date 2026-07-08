/**
 * SSR-safe, API-compatible replacement for the bits of `react-router-dom`
 * the components used. The site is now a static multi-page app (Astro), so
 * `Link` is just an anchor and navigation is real page loads.
 *
 * Route params that used to come from `useParams` are passed in as props from
 * the `.astro` route files (via getStaticPaths), so `useParams` returns {}.
 */
import { useEffect, useState, type AnchorHTMLAttributes, type ReactNode } from 'react';

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string;
  children?: ReactNode;
};

export function Link({ to, children, ...rest }: LinkProps) {
  return (
    <a href={to} {...rest}>
      {children}
    </a>
  );
}

// react-router alias — same behaviour as Link for this codebase.
export const NavLink = Link;

interface Location {
  pathname: string;
  search: string;
  hash: string;
}

/** Reads the real URL after hydration; falls back to "/" during SSR. */
export function useLocation(): Location {
  const [loc, setLoc] = useState<Location>({ pathname: '/', search: '', hash: '' });
  useEffect(() => {
    const read = () =>
      setLoc({
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash,
      });
    read();
    window.addEventListener('popstate', read);
    return () => window.removeEventListener('popstate', read);
  }, []);
  return loc;
}

/** Params now arrive as props from Astro getStaticPaths. */
export function useParams<T extends Record<string, string | undefined>>(): T {
  return {} as T;
}

/** Client-side redirect shim (unknown routes are handled by 404 at build). */
export function Navigate({ to, replace }: { to: string; replace?: boolean }) {
  useEffect(() => {
    if (replace) window.location.replace(to);
    else window.location.assign(to);
  }, [to, replace]);
  return null;
}

export function Outlet() {
  return null;
}
