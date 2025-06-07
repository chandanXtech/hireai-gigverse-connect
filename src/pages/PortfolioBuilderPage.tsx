
import { Navigation } from '@/components/Navigation';
import { PortfolioBuilder } from '@/components/PortfolioBuilder';

const PortfolioBuilderPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      <PortfolioBuilder />
    </div>
  );
};

export default PortfolioBuilderPage;
