import { useState, useCallback } from 'react';
import { Link, useLocation } from '@/lib/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '../ui/Button';
import { useScrollState, useResponsiveClose } from '../../hooks';
import logo from '../../assets/pnk-digital-logo.svg?url';
import { CALL_LABEL, PHONE_DISPLAY, PHONE_HREF } from '../../config/site';

const navLinks = [
  { name: 'Services', to: '/services' },
  { name: 'Tech Support', to: '/tech-support' },
  { name: 'AI Consulting', to: '/ai-consulting' },
  { name: 'About', to: '/about' },
  { name: 'Blog', to: '/blog' },
];

export function Navbar({ currentPath }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  // Prefer the SSR-provided path so active state is correct before hydration.
  const pathname = currentPath ?? location.pathname;

  const isScrolled = useScrollState(50);

  // Close mobile menu on desktop resize
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  useResponsiveClose(1024, closeMobileMenu);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500
        border-b
        ${isScrolled
          ? 'bg-void/90 backdrop-blur-xl border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
          : 'bg-transparent border-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <img
                src={logo}
                alt="PNK Digital"
                className="h-10 w-auto"
              />
              <span className="text-white font-semibold text-xl tracking-tight whitespace-nowrap">
                PNK Digital
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation: from lg, where the five links, phone and call button fit. */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = link.to === '/'
                ? pathname === '/'
                : pathname.startsWith(link.to);
              return (
                <motion.div
                  key={link.name}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <Link
                    to={link.to}
                    className={`
                      relative py-2 group
                      transition-colors duration-300
                      ${isActive ? 'text-brand-pink' : 'text-text-secondary hover:text-brand-pink'}
                    `}
                  >
                    {link.name}
                    <span className={`
                      absolute bottom-0 left-0 w-full h-0.5
                      bg-gradient-to-r from-brand-pink to-neon-purple
                      origin-left
                      transition-transform duration-300
                      ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                    `} />
                  </Link>
                </motion.div>
              );
            })}
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 text-text-secondary hover:text-brand-pink transition-colors duration-300 whitespace-nowrap"
              aria-label={`Call ${PHONE_DISPLAY}`}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">{PHONE_DISPLAY}</span>
            </a>
            <Link to="/contact" data-book>
              <Button size="sm" className="whitespace-nowrap">{CALL_LABEL}</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="
              lg:hidden p-3 rounded-lg
              text-text-primary
              hover:bg-white/5
              active:bg-white/10
              transition-colors duration-300
              touch-action-manipulation
              select-none
            "
            style={{ WebkitTapHighlightColor: 'transparent' }}
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-void/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link, index) => {
                const isActive = link.to === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.to);
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      to={link.to}
                      onClick={closeMobileMenu}
                      className={`
                        block
                        hover:bg-brand-pink/5
                        active:bg-brand-pink/10
                        transition-all duration-300
                        py-3 px-4 rounded-lg
                        cursor-pointer
                        touch-action-manipulation
                        ${isActive ? 'text-brand-pink' : 'text-text-secondary hover:text-brand-pink'}
                      `}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="pt-4"
              >
                <Link
                  to="/contact"
                  data-book
                  onClick={closeMobileMenu}
                  className="block touch-action-manipulation"
                >
                  <Button size="md" className="w-full">
                    {CALL_LABEL}
                  </Button>
                </Link>
                <a
                  href={PHONE_HREF}
                  onClick={closeMobileMenu}
                  className="mt-3 flex items-center justify-center gap-2 py-3 text-text-secondary hover:text-brand-pink transition-colors duration-300"
                >
                  <Phone className="w-4 h-4" />
                  {PHONE_DISPLAY}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
