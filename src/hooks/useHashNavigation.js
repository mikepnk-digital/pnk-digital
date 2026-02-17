import { useState, useEffect } from 'react';

/**
 * Hook for scroll-based UI state (like navbar background change)
 * @param {number} threshold - Scroll threshold in pixels
 */
export function useScrollState(threshold = 50) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    // Set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}

/**
 * Hook for closing mobile menu on resize
 * @param {number} breakpoint - Width breakpoint in pixels
 * @param {function} onClose - Callback when window exceeds breakpoint
 */
export function useResponsiveClose(breakpoint = 768, onClose) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= breakpoint) {
        onClose?.();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint, onClose]);
}
