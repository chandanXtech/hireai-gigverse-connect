
import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GamificationPanel } from '@/components/GamificationPanel';
import { AIRoadmapGenerator } from '@/components/AIRoadmapGenerator';
import { AIAssistantChat } from '@/components/AIAssistantChat';
import { LearningCatalog } from '@/components/LearningCatalog';
import { BookOpen, Target, TrendingUp, Clock, Award, Brain, Zap, Users, Star, PlayCircle, Library } from 'lucide-react';
import { learningService, type CareerGoal, type StudentProgress } from '@/lib/services/learningService';
import { useToast } from '@/hooks/use-toast';

const LearningDashboard = () => {
  const [careerGoals, setCareerGoals] = useState<CareerGoal[]>([]);
  const [progress, setProgress] = useState<StudentProgress | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<CareerGoal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const studentId = 'student-1'; // Mock student ID

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [goals, studentProgress] = await Promise.all([
        learningService.getCareerGoals(),
        learningService.getStudentProgress(studentId)
      ]);

      setCareerGoals(goals);
      setProgress(studentProgress);

      if (studentProgress?.careerGoalId) {
        const roadmap = await learningService.getRoadmap(studentProgress.careerGoalId);
        setSelectedGoal(roadmap);
      }
    } catch (error) {
      toast({
        title: "Error loading data",
        description: "Failed to load learning data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetGoal = async (goalId: string) => {
    try {
      await learningService.setCareerGoal(studentId, goalId);
      const roadmap = await learningService.getRoadmap(goalId);
      setSelectedGoal(roadmap);
      
      // Reload progress
      const updatedProgress = await learningService.getStudentProgress(studentId);
      setProgress(updatedProgress);

      toast({
        title: "🎯 Career Goal Set!",
        description: `You've started your journey to become ${roadmap?.title}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to set career goal. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleStartModule = async (moduleId: string) => {
    try {
      await learningService.updateModuleProgress(studentId, moduleId, 'in-progress');
      
      // Reload progress
      const updatedProgress = await learningService.getStudentProgress(studentId);
      setProgress(updatedProgress);

      toast({
        title: "📚 Module Started!",
        description: "Great! You've started a new learning module.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start module. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Clock className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
            <p className="text-gray-600">Loading your learning dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Dashboard</h1>
          <p className="text-gray-600">Track your progress and continue your AI learning journey</p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              AI Roadmap
            </TabsTrigger>
            <TabsTrigger value="catalog" className="flex items-center gap-2">
              <Library className="w-4 h-4" />
              Learning Catalog
            </TabsTrigger>
            <TabsTrigger value="explore" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Career Paths
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Progress Overview */}
            {progress && selectedGoal ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Progress */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-blue-600" />
                        Your Learning Path: {selectedGoal.title}
                      </CardTitle>
                      <CardDescription>{selectedGoal.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Overall Progress</span>
                            <span>{progress.totalProgress}%</span>
                          </div>
                          <Progress value={progress.totalProgress} className="h-3" />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="bg-white/50 p-3 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{progress.completedModules.length}</div>
                            <div className="text-xs text-gray-600">Completed</div>
                          </div>
                          <div className="bg-white/50 p-3 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{progress.inProgressModules.length}</div>
                            <div className="text-xs text-gray-600">In Progress</div>
                          </div>
                          <div className="bg-white/50 p-3 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">{progress.skillsAcquired.length}</div>
                            <div className="text-xs text-gray-600">Skills Learned</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Learning Modules */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Learning Modules</CardTitle>
                      <CardDescription>Continue your learning journey</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedGoal.modules.map((module) => {
                          const isCompleted = progress.completedModules.includes(module.id);
                          const isInProgress = progress.inProgressModules.includes(module.id);
                          
                          return (
                            <div key={module.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                isCompleted ? 'bg-green-500 text-white' : 
                                isInProgress ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                              }`}>
                                {isCompleted ? '✓' : isInProgress ? '●' : '○'}
                              </div>
                              
                              <div className="flex-1">
                                <h4 className="font-semibold">{module.title}</h4>
                                <p className="text-sm text-gray-600">{module.description}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge variant="outline" className="text-xs">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {module.estimatedTime}
                                  </Badge>
                                  {module.skills.map((skill) => (
                                    <Badge key={skill} variant="secondary" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="flex gap-2">
                                {!isCompleted && (
                                  <Button 
                                    size="sm"
                                    variant={isInProgress ? "default" : "outline"}
                                    onClick={() => handleStartModule(module.id)}
                                    asChild
                                  >
                                    <a href={`/module/${module.id}`}>
                                      <PlayCircle className="w-4 h-4 mr-1" />
                                      {isInProgress ? 'Continue' : 'Start'}
                                    </a>
                                  </Button>
                                )}
                                {isCompleted && (
                                  <Button size="sm" variant="ghost" asChild>
                                    <a href={`/module/${module.id}`}>
                                      Review
                                    </a>
                                  </Button>
                                )}
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
                  <GamificationPanel 
                    tokensEarned={progress.tokensEarned || 0}
                    badges={progress.badges?.map(b => b.title) || []}
                    profileViews={progress.profileViews || 0}
                  />
                  
                  {/* Skills Acquired */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        Skills Acquired
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {progress.skillsAcquired.map((skill) => (
                          <Badge key={skill} className="bg-blue-100 text-blue-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              // No goal selected
              <Card className="text-center py-12">
                <CardContent>
                  <Target className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">Choose Your Learning Path</h3>
                  <p className="text-gray-600 mb-6">Select a career goal to start your personalized learning journey</p>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                    Explore Career Goals
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="roadmap" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                <Brain className="w-6 h-6 text-purple-600" />
                AI-Powered Learning Roadmap
              </h2>
              <p className="text-gray-600">Get a personalized learning path based on your career goals</p>
            </div>
            <AIRoadmapGenerator />
          </TabsContent>

          <TabsContent value="catalog" className="space-y-6">
            <LearningCatalog />
          </TabsContent>

          <TabsContent value="explore" className="space-y-6">
            {/* Career Goals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careerGoals.map((goal) => (
                <Card key={goal.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                        {goal.title.charAt(0)}
                      </div>
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
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        {goal.category}
                      </div>
                      <Button 
                        className="w-full mt-4" 
                        onClick={() => handleSetGoal(goal.id)}
                        disabled={progress?.careerGoalId === goal.id}
                      >
                        {progress?.careerGoalId === goal.id ? (
                          <>
                            <Zap className="w-4 h-4 mr-2" />
                            Current Goal
                          </>
                        ) : (
                          'Start Learning'
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            {progress && progress.badges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {progress.badges.map((badge) => (
                  <Card key={badge.id} className="text-center">
                    <CardContent className="p-6">
                      <div className="text-4xl mb-4">{badge.icon}</div>
                      <h3 className="font-semibold text-lg mb-2">{badge.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                      <Badge variant="secondary" className="text-xs">
                        Unlocked {new Date(badge.unlockedAt).toLocaleDateString()}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Award className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">No Achievements Yet</h3>
                  <p className="text-gray-600">Start learning to unlock your first badge!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Assistant Chat */}
      <AIAssistantChat />
    </div>
  );
};

export default LearningDashboard;
