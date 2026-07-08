import { Link } from '@/lib/router';
import logo from '../../assets/pnk-digital-logo.svg?url';

export function AuditHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-void/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link to="/audit" className="flex items-center gap-3">
          <img src={logo} alt="PNK Digital" className="h-8 w-auto" />
          <span className="text-lg font-semibold text-text-primary">PNK Digital</span>
        </Link>
        <span className="text-xs sm:text-sm font-medium text-neon-cyan bg-neon-cyan/10 border border-neon-cyan/20 px-3 py-1 rounded-full">
          Free Website Audit
        </span>
      </div>
    </header>
  );
}
