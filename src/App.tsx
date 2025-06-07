
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import TalentSearch from '@/pages/TalentSearch';
import AITalentSearch from '@/pages/AITalentSearch';
import SmartMatching from '@/pages/SmartMatching';
import CommunityHub from '@/pages/CommunityHub';
import JobAlertsPage from '@/pages/JobAlertsPage';
import CandidateProfile from '@/pages/CandidateProfile';
import GigMarketplace from '@/pages/GigMarketplace';
import GigDetail from '@/pages/GigDetail';
import PostGig from '@/pages/PostGig';
import MyApplications from '@/pages/MyApplications';
import Analytics from '@/pages/Analytics';
import RecruiterAnalytics from '@/pages/RecruiterAnalytics';
import LearningDashboard from '@/pages/LearningDashboard';
import CourseDetail from '@/pages/CourseDetail';
import ModuleDetail from '@/pages/ModuleDetail';
import MicrolearningPage from '@/pages/MicrolearningPage';
import AdvancedAnalyticsPage from '@/pages/AdvancedAnalyticsPage';
import ImmersiveLearningPage from '@/pages/ImmersiveLearningPage';
import PortfolioBuilderPage from '@/pages/PortfolioBuilderPage';
import WellnessPage from '@/pages/WellnessPage';
import NotFound from '@/pages/NotFound';
import { ProtectedRoute } from '@/components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/talent-search" 
              element={
                <ProtectedRoute>
                  <TalentSearch />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/ai-talent-search" 
              element={
                <ProtectedRoute>
                  <AITalentSearch />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/ai-search" 
              element={
                <ProtectedRoute>
                  <AITalentSearch />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/smart-matching" 
              element={
                <ProtectedRoute>
                  <SmartMatching />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/community" 
              element={
                <ProtectedRoute>
                  <CommunityHub />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/job-alerts" 
              element={
                <ProtectedRoute>
                  <JobAlertsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile/:profileSlug" 
              element={
                <ProtectedRoute>
                  <CandidateProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/gigs" 
              element={
                <ProtectedRoute>
                  <GigMarketplace />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/gigs/:gigId" 
              element={
                <ProtectedRoute>
                  <GigDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/post-gig" 
              element={
                <ProtectedRoute>
                  <PostGig />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-applications" 
              element={
                <ProtectedRoute>
                  <MyApplications />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/advanced-analytics" 
              element={
                <ProtectedRoute>
                  <AdvancedAnalyticsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/recruiter-analytics" 
              element={
                <ProtectedRoute>
                  <RecruiterAnalytics />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/learning" 
              element={
                <ProtectedRoute>
                  <LearningDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/microlearning" 
              element={
                <ProtectedRoute>
                  <MicrolearningPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/immersive-learning" 
              element={
                <ProtectedRoute>
                  <ImmersiveLearningPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/portfolio-builder" 
              element={
                <ProtectedRoute>
                  <PortfolioBuilderPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/wellness" 
              element={
                <ProtectedRoute>
                  <WellnessPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/learning/course/:courseId" 
              element={
                <ProtectedRoute>
                  <CourseDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/learning/module/:moduleId" 
              element={
                <ProtectedRoute>
                  <ModuleDetail />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
