import { PubMockup } from './PubMockup';
import { DentalMockup } from './DentalMockup';
import { MenswearMockup } from './MenswearMockup';
import { CoffeeMockup } from './CoffeeMockup';
import { GinChocolateMockup } from './GinChocolateMockup';
import { DanceMockup } from './DanceMockup';

interface MockupRendererProps {
  slug: string;
  name: string;
}

export function MockupRenderer({ slug, name }: MockupRendererProps) {
  switch (slug) {
    case 'the-wheatsheaf-farnham':
      return <PubMockup name={name} variant="gastropub" />;
    case 'queens-head-farnham':
      return <PubMockup name={name} variant="classic" />;
    case 'barley-mow-tilford':
      return <PubMockup name={name} variant="village" />;
    case 'woolpack-elstead':
      return <PubMockup name={name} variant="country" />;
    case 'holistic-dental-centre':
      return <DentalMockup />;
    case 'john-goodridge-menswear':
      return <MenswearMockup />;
    case 'olivers-coffee-haslemere':
      return <CoffeeMockup />;
    case 'gin-and-chocolate-shop':
      return <GinChocolateMockup />;
    case 'birdies-farnham':
      return <PubMockup name={name} variant="golf" />;
    case 'farnham-dance':
      return <DanceMockup />;
    default:
      return <div style={{ padding: 40, textAlign: 'center', color: '#666' }}>Mockup not available</div>;
  }
}
