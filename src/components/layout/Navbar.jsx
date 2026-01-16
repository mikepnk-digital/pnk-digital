import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import logo from '../../assets/pnk-digital-logo.svg';

const navLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'Services', href: '/#services' },
  { name: 'About', href: '/#about' },
  { name: 'Build Your Project', href: '/#project-builder' },
  { name: 'Contact', href: '/#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const hash = href.split('#')[1];

    if (location.pathname === '/') {
      // Already on home page, just scroll
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page with hash
      navigate('/', { state: { scrollTo: hash } });
    }
  };

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
                onClick={(e) => handleNavClick(e, link.href)}
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
              onClick={(e) => handleNavClick(e, '/#project-builder')}
            >
              <Button size="sm">Get Your Quote</Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="
              md:hidden p-2 rounded-lg
              text-text-primary
              hover:bg-white/5
              transition-colors duration-300
            "
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
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
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="
                    block text-text-secondary
                    hover:text-brand-pink
                    hover:bg-brand-pink/5
                    transition-all duration-300
                    py-3 px-4 rounded-lg
                  "
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    const hash = link.href.split('#')[1];

                    if (location.pathname === '/') {
                      const target = document.getElementById(hash);
                      if (target) {
                        setTimeout(() => {
                          target.scrollIntoView({ behavior: 'smooth' });
                        }, 300);
                      }
                    } else {
                      navigate('/', { state: { scrollTo: hash } });
                    }
                  }}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="pt-4"
              >
                <a
                  href="/#project-builder"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);

                    if (location.pathname === '/') {
                      const target = document.getElementById('project-builder');
                      if (target) {
                        setTimeout(() => {
                          target.scrollIntoView({ behavior: 'smooth' });
                        }, 300);
                      }
                    } else {
                      navigate('/', { state: { scrollTo: 'project-builder' } });
                    }
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
