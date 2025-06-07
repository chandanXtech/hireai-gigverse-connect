
import { Navigation } from '@/components/Navigation';
import { MicrolearningHub } from '@/components/MicrolearningHub';

const MicrolearningPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      <MicrolearningHub />
    </div>
  );
};

export default MicrolearningPage;
