import { Hero } from '../components/sections/Hero';
import { ServicesOverview } from '../components/sections/ServicesOverview';
import { BlogHighlights } from '../components/sections/BlogHighlights';
import { CredibilitySection } from '../components/sections/CredibilitySection';
import { CtaBanner } from '../components/sections/CtaBanner';

export function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <CredibilitySection />
      <BlogHighlights />
      <CtaBanner />
    </>
  );
}
