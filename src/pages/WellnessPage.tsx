
import { Navigation } from '@/components/Navigation';
import { WellnessTools } from '@/components/WellnessTools';

const WellnessPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      <Navigation />
      <WellnessTools />
    </div>
  );
};

export default WellnessPage;
