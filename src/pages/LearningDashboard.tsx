
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
import { BookOpen, Target, TrendingUp, Clock, Award, Brain, Zap, Users, Star, PlayCircle, Library, Trophy, Coins, MessageCircle, BarChart3, Shield, Smartphone, Gamepad2, Headphones } from 'lucide-react';
import { learningService, type CareerGoal, type StudentProgress } from '@/lib/services/learningService';
import { useToast } from '@/hooks/use-toast';

const LearningDashboard = () => {
  const [careerGoals, setCareerGoals] = useState<CareerGoal[]>([]);
  const [progress, setProgress] = useState<StudentProgress | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<CareerGoal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeStreak, setActiveStreak] = useState(0);
  const [virtualCoins, setVirtualCoins] = useState(250);
  const [microcredentials, setMicrocredentials] = useState<string[]>([]);
  const [engagementLevel, setEngagementLevel] = useState(85);
  const { toast } = useToast();

  const studentId = 'student-1';

  useEffect(() => {
    loadData();
    // Simulate real-time engagement tracking
    const interval = setInterval(() => {
      setEngagementLevel(prev => Math.min(100, prev + Math.random() * 2));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const [goals, studentProgress] = await Promise.all([
        learningService.getCareerGoals(),
        learningService.getStudentProgress(studentId)
      ]);

      setCareerGoals(goals);
      setProgress(studentProgress);
      setActiveStreak(studentProgress?.streak || 0);
      setMicrocredentials(['Web Development Basics', 'Python Fundamentals', 'Data Analysis']);

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
      
      const updatedProgress = await learningService.getStudentProgress(studentId);
      setProgress(updatedProgress);
      setVirtualCoins(prev => prev + 10);

      toast({
        title: "📚 Module Started!",
        description: "Great! You've started a new learning module. +10 coins earned!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start module. Please try again.",
        variant: "destructive",
      });
    }
  };

  const redeemReward = (cost: number, reward: string) => {
    if (virtualCoins >= cost) {
      setVirtualCoins(prev => prev - cost);
      toast({
        title: "🎁 Reward Redeemed!",
        description: `You've redeemed: ${reward}`,
      });
    } else {
      toast({
        title: "Insufficient Coins",
        description: "You need more coins to redeem this reward.",
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
            <p className="text-gray-600">Loading your personalized learning experience...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
        {/* Enhanced Header with Personalization */}
        <div className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, Learner! 🌟</h1>
              <p className="text-purple-100">Your personalized learning journey continues</p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm">{activeStreak} day streak</span>
                </div>
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm">{virtualCoins} coins</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm">{microcredentials.length} credentials</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{engagementLevel}%</div>
              <p className="text-purple-200 text-sm">Engagement Level</p>
              <Progress value={engagementLevel} className="w-24 mt-2" />
            </div>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-white shadow-sm h-auto p-1">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 text-xs sm:text-sm px-2 py-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
              <span className="sm:hidden">Home</span>
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="flex items-center gap-2 text-xs sm:text-sm px-2 py-2">
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">AI Roadmap</span>
              <span className="sm:hidden">AI</span>
            </TabsTrigger>
            <TabsTrigger value="catalog" className="flex items-center gap-2 text-xs sm:text-sm px-2 py-2">
              <Library className="w-4 h-4" />
              <span className="hidden sm:inline">Catalog</span>
              <span className="sm:hidden">Learn</span>
            </TabsTrigger>
            <TabsTrigger value="gamification" className="flex items-center gap-2 text-xs sm:text-sm px-2 py-2">
              <Gamepad2 className="w-4 h-4" />
              <span className="hidden sm:inline">Rewards</span>
              <span className="sm:hidden">Games</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2 text-xs sm:text-sm px-2 py-2">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Community</span>
              <span className="sm:hidden">Social</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 text-xs sm:text-sm px-2 py-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
              <span className="sm:hidden">Stats</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2 text-xs sm:text-sm px-2 py-2">
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Achievements</span>
              <span className="sm:hidden">Awards</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Adaptive Learning Recommendations */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-green-600" />
                  AI-Powered Recommendations
                </CardTitle>
                <CardDescription>Personalized content based on your learning style and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded-lg border">
                    <h4 className="font-semibold text-sm mb-2">📚 Recommended Module</h4>
                    <p className="text-xs text-gray-600 mb-2">Machine Learning Basics</p>
                    <Badge className="bg-green-500 text-xs">95% match</Badge>
                  </div>
                  <div className="p-4 bg-white rounded-lg border">
                    <h4 className="font-semibold text-sm mb-2">🎯 Skill Gap</h4>
                    <p className="text-xs text-gray-600 mb-2">Data Visualization</p>
                    <Badge variant="outline" className="text-xs">Suggested</Badge>
                  </div>
                  <div className="p-4 bg-white rounded-lg border">
                    <h4 className="font-semibold text-sm mb-2">⚡ Quick Win</h4>
                    <p className="text-xs text-gray-600 mb-2">Python Refresher</p>
                    <Badge className="bg-blue-500 text-xs">15 min</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Progress with Enhanced UX */}
            {progress && selectedGoal ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Target className="w-5 h-5 text-blue-600" />
                        Your Learning Path: {selectedGoal.title}
                      </CardTitle>
                      <CardDescription className="text-sm">{selectedGoal.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Overall Progress</span>
                            <span>{progress.totalProgress}%</span>
                          </div>
                          <Progress value={progress.totalProgress} className="h-3" />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-white/50 p-3 rounded-lg text-center hover:bg-white/70 transition-colors">
                            <div className="text-xl font-bold text-green-600">{progress.completedModules.length}</div>
                            <div className="text-xs text-gray-600">Completed</div>
                          </div>
                          <div className="bg-white/50 p-3 rounded-lg text-center hover:bg-white/70 transition-colors">
                            <div className="text-xl font-bold text-blue-600">{progress.inProgressModules.length}</div>
                            <div className="text-xs text-gray-600">In Progress</div>
                          </div>
                          <div className="bg-white/50 p-3 rounded-lg text-center hover:bg-white/70 transition-colors">
                            <div className="text-xl font-bold text-purple-600">{progress.skillsAcquired.length}</div>
                            <div className="text-xs text-gray-600">Skills Learned</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Microlearning Modules */}
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Microlearning Modules
                      </CardTitle>
                      <CardDescription className="text-sm">Bite-sized lessons for better retention</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {selectedGoal.modules.map((module) => {
                          const isCompleted = progress.completedModules.includes(module.id);
                          const isInProgress = progress.inProgressModules.includes(module.id);
                          
                          return (
                            <div key={module.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                isCompleted ? 'bg-green-500 text-white' : 
                                isInProgress ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                              }`}>
                                {isCompleted ? '✓' : isInProgress ? '●' : '○'}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-sm truncate">{module.title}</h4>
                                <p className="text-xs text-gray-600 line-clamp-2">{module.description}</p>
                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                  <Badge variant="outline" className="text-xs">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {module.estimatedTime}
                                  </Badge>
                                  {module.skills.slice(0, 2).map((skill) => (
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
                                    className="hover:scale-105 transition-transform"
                                  >
                                    <PlayCircle className="w-4 h-4 mr-1" />
                                    {isInProgress ? 'Continue' : 'Start'}
                                  </Button>
                                )}
                                {isCompleted && (
                                  <Button size="sm" variant="ghost">
                                    Review
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

                {/* Enhanced Sidebar */}
                <div className="space-y-6">
                  <GamificationPanel 
                    tokensEarned={virtualCoins}
                    badges={progress.badges?.map(b => b.title) || []}
                    profileViews={progress.profileViews || 0}
                  />
                  
                  {/* Microcredentials */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Shield className="w-5 h-5 text-blue-500" />
                        Digital Credentials
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        {microcredentials.map((credential, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                            <Award className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium">{credential}</span>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full mt-3" size="sm">
                        Share on LinkedIn
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Skills Acquired */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Star className="w-5 h-5 text-yellow-500" />
                        Skills Mastered
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2">
                        {progress.skillsAcquired.map((skill) => (
                          <Badge key={skill} className="bg-blue-100 text-blue-700 text-xs hover:bg-blue-200 transition-colors">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
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

          <TabsContent value="gamification" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Virtual Economy */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-yellow-500" />
                    Virtual Store
                  </CardTitle>
                  <CardDescription>Redeem your learning coins for rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Profile Theme</p>
                        <p className="text-xs text-gray-600">Customize your dashboard</p>
                      </div>
                      <Button size="sm" onClick={() => redeemReward(50, 'Profile Theme')}>
                        50 🪙
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Certificate Frame</p>
                        <p className="text-xs text-gray-600">Premium certificate design</p>
                      </div>
                      <Button size="sm" onClick={() => redeemReward(100, 'Certificate Frame')}>
                        100 🪙
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Study Buddy Access</p>
                        <p className="text-xs text-gray-600">AI learning companion</p>
                      </div>
                      <Button size="sm" onClick={() => redeemReward(200, 'Study Buddy Access')}>
                        200 🪙
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Leaderboard */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Weekly Leaderboard
                  </CardTitle>
                  <CardDescription>Top learners this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'Alex Chen', points: 2850, rank: 1 },
                      { name: 'Sarah Kim', points: 2720, rank: 2 },
                      { name: 'You', points: 2650, rank: 3 },
                      { name: 'Mike Johnson', points: 2580, rank: 4 },
                      { name: 'Emma Davis', points: 2510, rank: 5 }
                    ].map((user) => (
                      <div key={user.rank} className={`flex items-center gap-3 p-2 rounded-lg ${user.name === 'You' ? 'bg-blue-50 border border-blue-200' : ''}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          user.rank === 1 ? 'bg-yellow-500 text-white' :
                          user.rank === 2 ? 'bg-gray-400 text-white' :
                          user.rank === 3 ? 'bg-orange-500 text-white' : 'bg-gray-200'
                        }`}>
                          {user.rank}
                        </div>
                        <span className="flex-1 text-sm font-medium">{user.name}</span>
                        <span className="text-sm text-gray-600">{user.points} pts</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Discussion Forums */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                    Study Groups
                  </CardTitle>
                  <CardDescription>Connect with fellow learners</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">ML</div>
                        <span className="font-medium text-sm">Machine Learning Study Group</span>
                        <Badge className="bg-green-500 text-xs">Active</Badge>
                      </div>
                      <p className="text-xs text-gray-600">45 members • 12 discussions today</p>
                    </div>
                    <div className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">WD</div>
                        <span className="font-medium text-sm">Web Development Bootcamp</span>
                        <Badge variant="outline" className="text-xs">Join</Badge>
                      </div>
                      <p className="text-xs text-gray-600">123 members • Help each other code</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Peer Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-500" />
                    Peer Reviews
                  </CardTitle>
                  <CardDescription>Get feedback on your projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">Portfolio Website Review</span>
                        <Badge className="bg-orange-500 text-xs">Pending</Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">Submitted 2 hours ago</p>
                      <Button size="sm" variant="outline" className="text-xs">
                        View Feedback
                      </Button>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">Python Data Analysis</span>
                        <Badge className="bg-green-500 text-xs">Completed</Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">4.5/5 stars • Great work!</p>
                      <Button size="sm" variant="outline" className="text-xs">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Learning Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BarChart3 className="w-5 h-5 text-blue-500" />
                    Learning Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Weekly Study Time</span>
                        <span>12.5 hrs</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Retention Rate</span>
                        <span>89%</span>
                      </div>
                      <Progress value={89} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Quiz Performance</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mobile Usage */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Smartphone className="w-5 h-5 text-green-500" />
                    Mobile Learning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">65%</div>
                    <p className="text-sm text-gray-600">of your learning happens on mobile</p>
                    <Button size="sm" className="mt-3">
                      Download Mobile App
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Accessibility Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Headphones className="w-5 h-5 text-purple-500" />
                    Accessibility
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Audio Transcripts</span>
                      <Badge className="bg-green-500 text-xs">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Screen Reader</span>
                      <Badge variant="outline" className="text-xs">Available</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Closed Captions</span>
                      <Badge className="bg-green-500 text-xs">On</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            {progress && progress.badges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {progress.badges.map((badge) => (
                  <Card key={badge.id} className="text-center hover:shadow-lg transition-shadow">
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

      <AIAssistantChat />
    </div>
  );
};

export default LearningDashboard;
