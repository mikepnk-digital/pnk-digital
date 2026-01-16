import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Dribbble } from 'lucide-react';
import logo from '../../assets/pnk-digital-logo.svg';
import { useHashNavigation } from '../../hooks/useHashNavigation';
import { staggerContainer, fadeInUp } from '../../utils/animations';

const footerLinks = {
  Services: [
    { name: 'Website Development', href: '/#services' },
    { name: 'Application Development', href: '/#services' },
    { name: 'Software Tools', href: '/#services' },
    { name: 'AI Consulting', href: '/#services' },
    { name: 'AI Integration', href: '/#services' },
    { name: 'Ongoing Support', href: '/#services' },
  ],
  Navigation: [
    { name: 'Home', href: '/#home' },
    { name: 'About Us', href: '/#about' },
    { name: 'Build Your Project', href: '/#project-builder' },
    { name: 'Contact', href: '/#contact' },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter / X' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Dribbble, href: '#', label: 'Dribbble' },
];

function FooterLink({ href, children, className }) {
  const { createHashClickHandler } = useHashNavigation();

  return (
    <a href={href} onClick={createHashClickHandler(href)} className={className}>
      {children}
    </a>
  );
}

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
              AI-powered development for companies that refuse to wait.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    w-10 h-10 rounded-xl
                    bg-midnight/50 border border-white/5
                    flex items-center justify-center
                    text-text-secondary
                    hover:text-neon-cyan hover:border-neon-cyan/30
                    hover:bg-neon-cyan/10
                    hover:shadow-[0_0_20px_rgba(0,245,255,0.2)]
                    transition-all duration-300
                  "
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
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
                    <FooterLink
                      href={link.href}
                      className="
                        text-text-secondary text-sm
                        hover:text-neon-cyan
                        transition-colors duration-300
                        inline-block
                      "
                    >
                      {link.name}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* CTA Column */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <h3 className="font-semibold text-text-primary mb-5 text-sm uppercase tracking-wider">
              Ready to Start?
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              Let's build something amazing together.
            </p>
            <FooterLink
              href="/#project-builder"
              className="
                inline-flex items-center text-sm text-neon-cyan
                hover:text-neon-purple
                transition-colors duration-300
              "
            >
              Get your quote
              <span className="ml-2">-&gt;</span>
            </FooterLink>
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
          <p className="text-text-muted text-sm">
            &copy; {new Date().getFullYear()} PNK Digital. All rights reserved.
          </p>
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
