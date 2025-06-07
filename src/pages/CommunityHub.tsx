
import { Navigation } from '@/components/Navigation';
import { CommunityForum } from '@/components/CommunityForum';

const CommunityHub = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      <CommunityForum />
    </div>
  );
};

export default CommunityHub;
