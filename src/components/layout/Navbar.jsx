import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useHashNavigation, useScrollState, useResponsiveClose } from '../../hooks';
import logo from '../../assets/pnk-digital-logo.svg';

const navLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'Services', href: '/#services' },
  { name: 'About', href: '/#about' },
  { name: 'Build Your Project', href: '/#project-builder' },
  { name: 'Contact', href: '/#contact' },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Use shared hooks for common functionality
  const isScrolled = useScrollState(50);
  const { navigateToHash, createHashClickHandler } = useHashNavigation();

  // Close mobile menu on desktop resize
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  useResponsiveClose(768, closeMobileMenu);

  // Handler for desktop nav clicks
  const handleNavClick = createHashClickHandler;

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
              <span className="text-white font-semibold text-xl tracking-tight">
                PNK Digital
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={handleNavClick(link.href)}
                className="
                  relative text-text-secondary
                  hover:text-brand-pink
                  transition-colors duration-300
                  py-2
                  group
                "
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                {link.name}
                <span className="
                  absolute bottom-0 left-0 w-full h-0.5
                  bg-gradient-to-r from-brand-pink to-neon-purple
                  scale-x-0 origin-left
                  transition-transform duration-300
                  group-hover:scale-x-100
                " />
              </motion.a>
            ))}
            <a
              href="/#project-builder"
              onClick={handleNavClick('/#project-builder')}
            >
              <Button size="sm">Get Your Quote</Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="
              md:hidden p-3 rounded-lg
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
            className="md:hidden bg-void/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="
                      block text-text-secondary
                      hover:text-brand-pink
                      hover:bg-brand-pink/5
                      active:bg-brand-pink/10
                      transition-all duration-300
                      py-3 px-4 rounded-lg
                      cursor-pointer
                      touch-action-manipulation
                    "
                    onClick={(e) => {
                      e.preventDefault();
                      closeMobileMenu();
                      navigateToHash(link.href, { delay: 300 });
                    }}
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="pt-4"
              >
                <a
                  href="/#project-builder"
                  className="block touch-action-manipulation"
                  onClick={(e) => {
                    e.preventDefault();
                    closeMobileMenu();
                    navigateToHash('/#project-builder', { delay: 300 });
                  }}
                >
                  <Button size="md" className="w-full">
                    Get Your Quote
                  </Button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
