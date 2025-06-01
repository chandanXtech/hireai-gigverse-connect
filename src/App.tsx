
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import PostGig from '@/pages/PostGig';
import GigMarketplace from '@/pages/GigMarketplace';
import GigDetail from '@/pages/GigDetail';
import MyApplications from '@/pages/MyApplications';
import RecruiterAnalytics from '@/pages/RecruiterAnalytics';
import TalentSearch from '@/pages/TalentSearch';
import AITalentSearch from '@/pages/AITalentSearch';
import CandidateProfile from '@/pages/CandidateProfile';
import Analytics from '@/pages/Analytics';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/post-gig" element={
                <ProtectedRoute allowedRoles={['recruiter', 'founder', 'admin']}>
                  <PostGig />
                </ProtectedRoute>
              } />
              <Route path="/gigs" element={<GigMarketplace />} />
              <Route path="/gigs/:id" element={<GigDetail />} />
              <Route path="/my-applications" element={
                <ProtectedRoute allowedRoles={['student']}>
                  <MyApplications />
                </ProtectedRoute>
              } />
              <Route path="/recruiter-analytics" element={
                <ProtectedRoute allowedRoles={['recruiter', 'founder', 'admin']}>
                  <RecruiterAnalytics />
                </ProtectedRoute>
              } />
              <Route path="/talent-search" element={
                <ProtectedRoute allowedRoles={['recruiter', 'founder', 'admin']}>
                  <TalentSearch />
                </ProtectedRoute>
              } />
              <Route path="/ai-search" element={
                <ProtectedRoute allowedRoles={['recruiter', 'founder', 'admin']}>
                  <AITalentSearch />
                </ProtectedRoute>
              } />
              <Route path="/profile/:id" element={<CandidateProfile />} />
              <Route path="/analytics" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Analytics />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Toaster />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
