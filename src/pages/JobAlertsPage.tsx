
import { Navigation } from '@/components/Navigation';
import { JobAlerts } from '@/components/JobAlerts';

const JobAlertsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      <JobAlerts />
    </div>
  );
};

export default JobAlertsPage;
