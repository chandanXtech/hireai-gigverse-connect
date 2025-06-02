
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/Navigation';
import { 
  BookOpen, 
  Target, 
  Trophy, 
  Clock, 
  Play, 
  CheckCircle, 
  Lock,
  TrendingUp,
  Star,
  Briefcase
} from 'lucide-react';
import { learningService, type CareerGoal, type StudentProgress } from '@/lib/services/learningService';
import { useNavigate } from 'react-router-dom';

const LearningDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [careerGoals, setCareerGoals] = useState<CareerGoal[]>([]);
  const [studentProgress, setStudentProgress] = useState<StudentProgress | null>(null);
  const [currentRoadmap, setCurrentRoadmap] = useState<CareerGoal | null>(null);
  const [recommendedGigs, setRecommendedGigs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [user?.id]);

  const loadData = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const [goals, progress] = await Promise.all([
        learningService.getCareerGoals(),
        learningService.getStudentProgress(user.id)
      ]);
      
      setCareerGoals(goals);
      setStudentProgress(progress);
      
      if (progress?.careerGoalId) {
        const [roadmap, gigs] = await Promise.all([
          learningService.getRoadmap(progress.careerGoalId),
          learningService.getRecommendedGigs(user.id)
        ]);
        setCurrentRoadmap(roadmap);
        setRecommendedGigs(gigs);
      }
    } catch (error) {
      console.error('Error loading learning data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetCareerGoal = async (careerGoalId: string) => {
    if (!user?.id) return;
    
    try {
      await learningService.setCareerGoal(user.id, careerGoalId);
      await loadData();
    } catch (error) {
      console.error('Error setting career goal:', error);
    }
  };

  const handleModuleAction = async (moduleId: string, action: 'start' | 'complete') => {
    if (!user?.id) return;
    
    try {
      const status = action === 'start' ? 'in-progress' : 'completed';
      await learningService.updateModuleProgress(user.id, moduleId, status);
      await loadData();
    } catch (error) {
      console.error('Error updating module progress:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  // Career Goal Selection Screen
  if (!studentProgress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              🎯 What do you want to become?
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose your career path and get a personalized learning roadmap to achieve your goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerGoals.map((goal) => (
              <Card 
                key={goal.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleSetCareerGoal(goal.id)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    {goal.title}
                  </CardTitle>
                  <CardDescription>{goal.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      {goal.estimatedDuration}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BookOpen className="w-4 h-4" />
                      {goal.modules.length} modules
                    </div>
                    <Badge variant="outline">{goal.category}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Learning Dashboard
          </h1>
          <p className="text-gray-600">
            Your journey to becoming a {currentRoadmap?.title}
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overall Progress</p>
                  <p className="text-2xl font-bold text-gray-900">{studentProgress.totalProgress}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <Progress value={studentProgress.totalProgress} className="mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed Modules</p>
                  <p className="text-2xl font-bold text-gray-900">{studentProgress.completedModules.length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Skills Acquired</p>
                  <p className="text-2xl font-bold text-gray-900">{studentProgress.skillsAcquired.length}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Badges Earned</p>
                  <p className="text-2xl font-bold text-gray-900">{studentProgress.badges.length}</p>
                </div>
                <Trophy className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Modules */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Learning Roadmap
                </CardTitle>
                <CardDescription>
                  Complete modules to unlock new skills and opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentRoadmap?.modules.map((module, index) => {
                    const isCompleted = studentProgress.completedModules.includes(module.id);
                    const isInProgress = studentProgress.inProgressModules.includes(module.id);
                    const canStart = !module.prerequisites || 
                      module.prerequisites.every(prereq => studentProgress.completedModules.includes(prereq));
                    const isLocked = !canStart && !isCompleted && !isInProgress;

                    return (
                      <div 
                        key={module.id} 
                        className={`border rounded-lg p-4 ${
                          isCompleted ? 'bg-green-50 border-green-200' :
                          isInProgress ? 'bg-blue-50 border-blue-200' :
                          isLocked ? 'bg-gray-50 border-gray-200' :
                          'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {isCompleted && <CheckCircle className="w-5 h-5 text-green-600" />}
                              {isInProgress && <Play className="w-5 h-5 text-blue-600" />}
                              {isLocked && <Lock className="w-5 h-5 text-gray-400" />}
                              <h3 className={`font-semibold ${isLocked ? 'text-gray-400' : 'text-gray-900'}`}>
                                {module.title}
                              </h3>
                            </div>
                            <p className={`text-sm mb-3 ${isLocked ? 'text-gray-400' : 'text-gray-600'}`}>
                              {module.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                              <span>⏱️ {module.estimatedTime}</span>
                              <span>📚 {module.content.length} resources</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {module.skills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="ml-4">
                            {isCompleted ? (
                              <Button variant="outline" size="sm" disabled>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Completed
                              </Button>
                            ) : isInProgress ? (
                              <Button 
                                onClick={() => handleModuleAction(module.id, 'complete')}
                                size="sm"
                              >
                                Mark Complete
                              </Button>
                            ) : canStart ? (
                              <Button 
                                onClick={() => handleModuleAction(module.id, 'start')}
                                size="sm"
                              >
                                <Play className="w-4 h-4 mr-2" />
                                Start
                              </Button>
                            ) : (
                              <Button variant="outline" size="sm" disabled>
                                <Lock className="w-4 h-4 mr-2" />
                                Locked
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills Acquired */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Skills Acquired
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {studentProgress.skillsAcquired.map((skill) => (
                    <Badge key={skill} className="bg-blue-100 text-blue-800">
                      {skill}
                    </Badge>
                  ))}
                  {studentProgress.skillsAcquired.length === 0 && (
                    <p className="text-sm text-gray-500">
                      Complete modules to acquire new skills
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studentProgress.badges.map((badge) => (
                    <div key={badge.id} className="flex items-center gap-3 p-2 bg-yellow-50 rounded-lg">
                      <span className="text-2xl">{badge.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900">{badge.title}</p>
                        <p className="text-sm text-gray-600">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                  {studentProgress.badges.length === 0 && (
                    <p className="text-sm text-gray-500">
                      Earn badges by completing modules and milestones
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recommended Gigs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Unlocked Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendedGigs.map((gig) => (
                    <div key={gig.id} className="border rounded-lg p-3 hover:bg-gray-50">
                      <h4 className="font-medium text-gray-900 mb-1">{gig.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{gig.company}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {gig.match}% match
                        </Badge>
                        <Button size="sm" variant="outline">
                          Apply
                        </Button>
                      </div>
                    </div>
                  ))}
                  {recommendedGigs.length === 0 && (
                    <p className="text-sm text-gray-500">
                      Complete more modules to unlock gig opportunities
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningDashboard;
