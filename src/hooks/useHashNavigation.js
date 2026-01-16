import { useEffect, useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Custom hook for handling hash-based navigation with smooth scrolling
 * Consolidates duplicate navigation logic from Navbar and Footer
 */
export function useHashNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * Navigate to a hash target, handling cross-page navigation
   * @param {string} href - The href containing a hash (e.g., "/#services")
   * @param {Object} options - Navigation options
   * @param {number} options.delay - Delay before scrolling (useful for mobile menu close)
   * @param {function} options.onBeforeNavigate - Callback before navigation
   */
  const navigateToHash = useCallback((href, options = {}) => {
    const { delay = 0, onBeforeNavigate } = options;

    if (onBeforeNavigate) {
      onBeforeNavigate();
    }

    const hash = href.split('#')[1];
    if (!hash) return;

    const scrollToTarget = () => {
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (location.pathname === '/') {
      // Already on home page, just scroll
      if (delay > 0) {
        setTimeout(scrollToTarget, delay);
      } else {
        scrollToTarget();
      }
    } else {
      // Navigate to home page with hash
      navigate('/', { state: { scrollTo: hash } });
    }
  }, [location.pathname, navigate]);

  /**
   * Create a click handler for hash navigation links
   * @param {string} href - The href to navigate to
   * @param {Object} options - Navigation options
   */
  const createHashClickHandler = useCallback((href, options = {}) => {
    return (e) => {
      if (href.startsWith('/#')) {
        e.preventDefault();
        navigateToHash(href, options);
      }
    };
  }, [navigateToHash]);

  // Handle scroll after navigation from subpage
  useEffect(() => {
    if (location.state?.scrollTo) {
      const hash = location.state.scrollTo;
      // Small delay to ensure page is rendered
      setTimeout(() => {
        const target = document.getElementById(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      // Clear the state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return {
    navigateToHash,
    createHashClickHandler,
    currentPath: location.pathname,
  };
}

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

