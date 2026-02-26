import { Helmet } from '@dr.pogodin/react-helmet';
import { Hero } from '../components/sections/Hero';
import { ServicesOverview } from '../components/sections/ServicesOverview';
import { BlogHighlights } from '../components/sections/BlogHighlights';
import { CredibilitySection } from '../components/sections/CredibilitySection';
import { CtaBanner } from '../components/sections/CtaBanner';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>PNK Digital - Mike Pink | Senior Full-Stack Developer</title>
        <meta name="description" content="I'm Mike, a senior full-stack developer with 25 years experience. React, Node.js, AWS. AI-accelerated delivery in weeks, not months. Work directly with me - no agency layers." />
        <meta property="og:title" content="PNK Digital - Mike Pink | Senior Full-Stack Developer" />
        <meta property="og:description" content="Senior full-stack developer with 25 years experience. AI-accelerated delivery in weeks, not months. Work directly with me - no agency layers." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pnk-digital.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PNK Digital - Full-Stack Web Applications & Service Architecture" />
        <meta name="twitter:description" content="Senior full-stack developer specialising in web applications and service architecture. AI-accelerated delivery in weeks, not months." />
      </Helmet>
      <Hero />
      <ServicesOverview />
      <CredibilitySection />
      <BlogHighlights />
      <CtaBanner />
    </>
  );
}
