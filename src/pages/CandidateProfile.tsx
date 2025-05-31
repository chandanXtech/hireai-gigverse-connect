
import { Navigation } from '@/components/Navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileHeader } from '@/components/ProfileHeader';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsList } from '@/components/ProjectsList';
import { AchievementsTimeline } from '@/components/AchievementsTimeline';
import { GamificationPanel } from '@/components/GamificationPanel';
import { useParams, Navigate } from 'react-router-dom';
import { candidateService } from '@/lib/services/candidateService';

const CandidateProfile = () => {
  const { id } = useParams();
  
  // Try to get candidate by ID first, then by username
  let candidate = candidateService.getCandidateById(Number(id));
  
  // If not found by ID, try by username/slug
  if (!candidate && id) {
    candidate = candidateService.getCandidateByUsername(id);
  }

  if (!candidate) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <ProfileHeader candidate={candidate} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <SkillsSection skills={candidate.skills} />
                
                <div className="grid gap-6">
                  <ProjectsList projects={candidate.projects.slice(0, 2)} />
                </div>
              </TabsContent>

              <TabsContent value="projects" className="space-y-6">
                <ProjectsList projects={candidate.projects} />
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <AchievementsTimeline 
                  achievements={candidate.achievements} 
                  certifications={candidate.certifications}
                />
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <div className="text-center py-12 text-gray-500">
                  <p>Activity feed coming soon...</p>
                  <p className="text-sm">Track contributions, projects updates, and more!</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <GamificationPanel 
              tokensEarned={candidate.tokensEarned}
              badges={candidate.badges}
              profileViews={candidate.profileViews}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
