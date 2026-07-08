import { Link } from 'react-router-dom';
import logo from '../../assets/pnk-digital-logo.svg';

export function AuditFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-void border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="PNK Digital" className="h-6 w-auto" />
            <span className="text-text-muted text-sm">
              © {year} PNK Digital. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-text-muted">
            <Link to="/" className="hover:text-neon-cyan transition-colors">
              Main Site
            </Link>
            <Link to="/privacy-policy" className="hover:text-neon-cyan transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
