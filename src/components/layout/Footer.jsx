import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Dribbble, Zap } from 'lucide-react';
import { GradientText } from '../ui/GradientText';

const footerLinks = {
  Services: [
    { name: 'Custom Development', href: '#services' },
    { name: 'Machine Learning', href: '#services' },
    { name: 'AI Integration', href: '#services' },
    { name: 'Consulting', href: '#services' },
    { name: 'Data Engineering', href: '#services' },
    { name: 'Support', href: '#services' },
  ],
  Company: [
    { name: 'About Us', href: '#about' },
    { name: 'Our Work', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Blog', href: '#' },
  ],
  Resources: [
    { name: 'Case Studies', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'AI Readiness Guide', href: '#' },
    { name: 'Contact', href: '#contact' },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter / X' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Dribbble, href: '#', label: 'Dribbble' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Footer() {
  return (
    <footer className="relative bg-void border-t border-white/5 overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-neon-cyan/5 via-transparent to-transparent pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <a href="#" className="flex items-center gap-2 text-2xl font-bold group mb-6">
              <div className="
                w-10 h-10 rounded-lg
                bg-gradient-to-br from-neon-cyan to-neon-purple
                flex items-center justify-center
                shadow-[0_0_20px_rgba(0,245,255,0.3)]
                group-hover:shadow-[0_0_30px_rgba(0,245,255,0.5)]
                transition-shadow duration-300
              ">
                <Zap className="w-5 h-5 text-void" strokeWidth={2.5} />
              </div>
              <GradientText>NeuralForge</GradientText>
            </a>
            <p className="text-text-secondary max-w-xs mb-8 leading-relaxed">
              Turning ambitious ideas into intelligent systems.
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
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              variants={itemVariants}
              className="lg:col-span-2"
            >
              <h3 className="font-semibold text-text-primary mb-5 text-sm uppercase tracking-wider">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="
                        text-text-secondary text-sm
                        hover:text-neon-cyan
                        transition-colors duration-300
                        inline-block
                      "
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter / CTA Column */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="font-semibold text-text-primary mb-5 text-sm uppercase tracking-wider">
              Stay Updated
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              Get insights on AI trends and opportunities.
            </p>
            <a
              href="#contact"
              className="
                inline-flex items-center text-sm text-neon-cyan
                hover:text-neon-purple
                transition-colors duration-300
              "
            >
              Subscribe to updates
              <span className="ml-2">-&gt;</span>
            </a>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="
            mt-16 pt-8 border-t border-white/5
            flex flex-col sm:flex-row justify-between items-center gap-4
          "
        >
          <p className="text-text-muted text-sm">
            &copy; {new Date().getFullYear()} NeuralForge. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-text-muted text-sm hover:text-text-secondary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-text-muted text-sm hover:text-text-secondary transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
