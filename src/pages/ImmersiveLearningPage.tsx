
import { Navigation } from '@/components/Navigation';
import { ImmersiveLearning } from '@/components/ImmersiveLearning';

const ImmersiveLearningPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <Navigation />
      <ImmersiveLearning />
    </div>
  );
};

export default ImmersiveLearningPage;
