
import { Navigation } from '@/components/Navigation';
import { AdvancedAnalyticsDashboard } from '@/components/AdvancedAnalyticsDashboard';
import { useAuth } from '@/contexts/AuthContext';

const AdvancedAnalyticsPage = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <Navigation />
      <AdvancedAnalyticsDashboard userType={user?.role === 'recruiter' ? 'recruiter' : 'student'} />
    </div>
  );
};

export default AdvancedAnalyticsPage;
