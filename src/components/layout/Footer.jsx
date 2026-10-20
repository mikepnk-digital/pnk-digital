import { motion } from 'framer-motion';
import { Link } from '@/lib/router';
import logo from '../../assets/pnk-digital-logo.svg?url';
import { EMAIL, EMAIL_HREF, LINKEDIN_URL, LOCATION, PHONE_DISPLAY, PHONE_HREF } from '../../config/site';
import { staggerContainer, fadeInUp } from '../../utils/animations';

const footerLinks = {
  Services: [
    { name: 'Tech Support', to: '/tech-support' },
    { name: 'AI Consulting', to: '/ai-consulting' },
    { name: 'Web App Development', to: '/services#web-application-development' },
    { name: 'AWS Integration', to: '/services#aws-infrastructure' },
    { name: 'AI-Powered MVPs', to: '/services#ai-mvps' },
  ],
  Navigation: [
    { name: 'Home', to: '/' },
    { name: 'About', to: '/about' },
    { name: 'Blog', to: '/blog' },
    { name: 'Contact', to: '/contact' },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-void border-t border-white/5 overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-neon-cyan/5 via-transparent to-transparent pointer-events-none" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <motion.div variants={fadeInUp} className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img
                src={logo}
                alt="PNK Digital"
                className="h-10 w-auto"
              />
              <span className="text-white font-semibold text-xl tracking-tight">
                PNK Digital
              </span>
            </Link>
            <p className="text-text-secondary max-w-xs mb-8 leading-relaxed">
              Senior full-stack development, accelerated by AI.
            </p>
          </motion.div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div
              key={category}
              variants={fadeInUp}
              className="lg:col-span-2"
            >
              <h3 className="font-semibold text-text-primary mb-5 text-sm uppercase tracking-wider">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      className="
                        text-text-secondary text-sm
                        hover:text-neon-cyan
                        transition-colors duration-300
                        inline-block
                      "
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Column */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <h3 className="font-semibold text-text-primary mb-5 text-sm uppercase tracking-wider">
              Get in Touch
            </h3>
            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href={PHONE_HREF}
                  className="text-text-secondary text-sm hover:text-neon-cyan transition-colors duration-300"
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={EMAIL_HREF}
                  className="text-text-secondary text-sm hover:text-neon-cyan transition-colors duration-300"
                >
                  {EMAIL}
                </a>
              </li>
              <li className="text-text-secondary text-sm">
                {LOCATION}
              </li>
              {LINKEDIN_URL && (
                <li>
                  <a
                    href={LINKEDIN_URL}
                    rel="me noopener"
                    target="_blank"
                    className="text-text-secondary text-sm hover:text-neon-cyan transition-colors duration-300"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeInUp}
          className="
            mt-16 pt-8 border-t border-white/5
            flex flex-col sm:flex-row justify-between items-center gap-4
          "
        >
          <div>
            <p className="text-text-muted text-sm">
              &copy; {new Date().getFullYear()} PNK Digital. All rights reserved.
            </p>
            <p className="text-text-muted text-xs mt-1">
              PNK Digital is a trading name of Mike Pink Ltd.<br />Registered in England &amp; Wales &middot; Company No. 09029124 &middot; Registered Office: 7 Jubilee Lane, Farnham, Surrey GU104SZ
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="text-text-muted text-sm hover:text-text-secondary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-text-muted text-sm hover:text-text-secondary transition-colors">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
