import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';

// Lazy-load non-critical pages for better initial load
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
// Temporarily disabled until example application is ready
// const WorkPage = lazy(() => import('./pages/WorkPage').then(m => ({ default: m.WorkPage })));
// const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage').then(m => ({ default: m.CaseStudyPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then(m => ({ default: m.BlogPostPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import('./pages/TermsOfService').then(m => ({ default: m.TermsOfService })));
const AIEmployeesPage = lazy(() => import('./pages/AIEmployeesPage').then(m => ({ default: m.AIEmployeesPage })));
const WebDeveloperSurreyPage = lazy(() => import('./pages/landing/WebDeveloperSurreyPage').then(m => ({ default: m.WebDeveloperSurreyPage })));
const AuditLandingPage = lazy(() => import('./pages/audit/AuditLandingPage').then(m => ({ default: m.AuditLandingPage })));
const AuditReportPage = lazy(() => import('./pages/audit/AuditReportPage').then(m => ({ default: m.AuditReportPage })));

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        {/* Landing pages — no Layout (no nav/footer for conversion focus) */}
        <Route path="/landing/web-developer-surrey" element={<WebDeveloperSurreyPage />} />
        <Route path="/audit" element={<AuditLandingPage />} />
        <Route path="/audit/:slug" element={<AuditReportPage />} />

        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/ai-employees" element={<AIEmployeesPage />} />
          {/* Temporarily disabled until example application is ready */}
          {/* <Route path="/work" element={<WorkPage />} /> */}
          {/* <Route path="/work/:slug" element={<CaseStudyPage />} /> */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
