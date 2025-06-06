
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
import { BookOpen, Target, TrendingUp, Clock, Award, Brain, Zap, Users, Star, PlayCircle, Library, Trophy, Coins, MessageCircle, BarChart3, Shield, Smartphone, Gamepad2, Headphones, Camera, Mic, Globe, CheckCircle2, UserCheck, Calendar, Video, FileText, Lightbulb } from 'lucide-react';
import { learningService, type CareerGoal, type StudentProgress } from '@/lib/services/learningService';
import { useToast } from '@/hooks/use-toast';

const LearningDashboard = () => {
  const [careerGoals, setCareerGoals] = useState<CareerGoal[]>([]);
  const [progress, setProgress] = useState<StudentProgress | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<CareerGoal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeStreak, setActiveStreak] = useState(7);
  const [virtualCoins, setVirtualCoins] = useState(250);
  const [microcredentials, setMicrocredentials] = useState<string[]>([]);
  const [engagementLevel, setEngagementLevel] = useState(85);
  const [studyTime, setStudyTime] = useState(30);
  const [mentorshipSessions, setMentorshipSessions] = useState(3);
  const [skillGaps, setSkillGaps] = useState(['API Design', 'Testing', 'DevOps']);
  const [offlineContent, setOfflineContent] = useState(5);
  const [achievements, setAchievements] = useState([
    {
      id: '1',
      title: 'First Steps',
      description: 'Started your learning journey',
      icon: '🎯',
      unlockedAt: '2024-01-15',
      category: 'milestone'
    },
    {
      id: '2',
      title: 'Quick Learner',
      description: 'Completed first module in under 2 hours',
      icon: '⚡',
      unlockedAt: '2024-01-16',
      category: 'speed'
    },
    {
      id: '3',
      title: 'Week Warrior',
      description: 'Maintained 7-day learning streak',
      icon: '🔥',
      unlockedAt: '2024-01-22',
      category: 'consistency'
    },
    {
      id: '4',
      title: 'Python Master',
      description: 'Completed Python fundamentals course',
      icon: '🐍',
      unlockedAt: '2024-02-01',
      category: 'skill'
    },
    {
      id: '5',
      title: 'Team Player',
      description: 'Helped 5 fellow learners in discussion forums',
      icon: '🤝',
      unlockedAt: '2024-02-10',
      category: 'social'
    },
    {
      id: '6',
      title: 'Code Creator',
      description: 'Built and deployed first web application',
      icon: '💻',
      unlockedAt: '2024-02-15',
      category: 'project'
    },
    {
      id: '7',
      title: 'Knowledge Seeker',
      description: 'Enrolled in 5 different courses',
      icon: '📚',
      unlockedAt: '2024-02-20',
      category: 'exploration'
    },
    {
      id: '8',
      title: 'Perfect Score',
      description: 'Achieved 100% on final assessment',
      icon: '🏆',
      unlockedAt: '2024-03-01',
      category: 'achievement'
    },
    {
      id: '9',
      title: 'AI Enthusiast',
      description: 'Completed Machine Learning basics',
      icon: '🤖',
      unlockedAt: '2024-03-10',
      category: 'skill'
    },
    {
      id: '10',
      title: 'Mentor',
      description: 'Provided peer reviews for 10 projects',
      icon: '🎓',
      unlockedAt: '2024-03-15',
      category: 'social'
    },
    {
      id: '11',
      title: 'Skill Gap Analyzer',
      description: 'Used AI to identify learning gaps',
      icon: '🎯',
      unlockedAt: '2024-03-20',
      category: 'smart'
    },
    {
      id: '12',
      title: 'Study Group Leader',
      description: 'Hosted 3 live study sessions',
      icon: '👥',
      unlockedAt: '2024-03-25',
      category: 'community'
    },
    {
      id: '13',
      title: 'Offline Learner',
      description: 'Downloaded and completed offline modules',
      icon: '📱',
      unlockedAt: '2024-04-01',
      category: 'accessibility'
    },
    {
      id: '14',
      title: 'Resume Builder',
      description: 'Created professional resume with AI',
      icon: '📄',
      unlockedAt: '2024-04-05',
      category: 'career'
    },
    {
      id: '15',
      title: 'Multilingual Learner',
      description: 'Accessed content in multiple languages',
      icon: '🌍',
      unlockedAt: '2024-04-10',
      category: 'accessibility'
    }
  ]);
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
      
      // Enhanced progress with achievements - fix the date conversion
      if (studentProgress) {
        const enhancedProgress = {
          ...studentProgress,
          badges: achievements.map(achievement => ({
            ...achievement,
            unlockedAt: achievement.unlockedAt // Already a string
          }))
        };
        setProgress(enhancedProgress);
        setActiveStreak(studentProgress?.streak || 7);
        setMicrocredentials(['Web Development Basics', 'Python Fundamentals', 'Data Analysis', 'React Development']);

        if (studentProgress?.careerGoalId) {
          const roadmap = await learningService.getRoadmap(studentProgress.careerGoalId);
          setSelectedGoal(roadmap);
        }
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

  const analyzeSkillGaps = () => {
    toast({
      title: "🎯 Skill Gap Analysis",
      description: `Found ${skillGaps.length} skill gaps. Check recommendations!`,
    });
  };

  const generateDailyPlan = () => {
    toast({
      title: "📅 Daily Plan Generated",
      description: `Your ${studyTime}-minute learning plan is ready!`,
    });
  };

  const downloadOfflineContent = () => {
    setOfflineContent(prev => prev + 1);
    toast({
      title: "📱 Content Downloaded",
      description: "Module downloaded for offline learning!",
    });
  };

  const startMentorshipSession = () => {
    toast({
      title: "👨‍🏫 Mentorship Session",
      description: "Connecting you with a mentor...",
    });
  };

  const generateResume = () => {
    toast({
      title: "📄 AI Resume Builder",
      description: "Your professional resume is being generated!",
    });
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
          <TabsList className="grid w-full grid-cols-8 bg-white shadow-sm h-auto p-1">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 text-xs sm:text-sm px-2 py-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
              <span className="sm:hidden">Home</span>
            </TabsTrigger>
            <TabsTrigger value="smart-learning" className="flex items-center gap-2 text-xs sm:text-sm px-2 py-2">
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">Smart Learning</span>
              <span className="sm:hidden">Smart</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2 text-xs sm:text-sm px-2 py-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Community</span>
              <span className="sm:hidden">Social</span>
            </TabsTrigger>
            <TabsTrigger value="career" className="flex items-center gap-2 text-xs sm:text-sm px-2 py-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Career</span>
              <span className="sm:hidden">Jobs</span>
            </TabsTrigger>
            <TabsTrigger value="ai-tools" className="flex items-center gap-2 text-xs sm:text-sm px-2 py-2">
              <Lightbulb className="w-4 h-4" />
              <span className="hidden sm:inline">AI Tools</span>
              <span className="sm:hidden">AI</span>
            </TabsTrigger>
            <TabsTrigger value="catalog" className="flex items-center gap-2 text-xs sm:text-sm px-2 py-2">
              <Library className="w-4 h-4" />
              <span className="hidden sm:inline">Catalog</span>
              <span className="sm:hidden">Learn</span>
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

          <TabsContent value="smart-learning" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                <Brain className="w-6 h-6 text-purple-600" />
                Smart Learning & Personalization
              </h2>
              <p className="text-gray-600">AI-powered tools to enhance your learning experience</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Skill Gap Analyzer */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-red-500" />
                    Skill Gap Analyzer
                  </CardTitle>
                  <CardDescription>Identify missing skills for your career goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {skillGaps.map((gap, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm font-medium">{gap}</span>
                        <Badge variant="outline" className="text-xs">Missing</Badge>
                      </div>
                    ))}
                    <Button onClick={analyzeSkillGaps} className="w-full mt-4">
                      <Brain className="w-4 h-4 mr-2" />
                      Analyze Skills
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Daily Learning Plan */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    AI Daily Learning Plan
                  </CardTitle>
                  <CardDescription>Get personalized daily study schedules</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Daily study time:</span>
                      <Badge className="bg-blue-500">{studyTime} minutes</Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Today's Plan:</p>
                      <div className="p-3 bg-blue-50 rounded-lg text-sm">
                        ⏰ 10:00 AM - Python Loops (10 min)<br />
                        ⏰ 2:00 PM - Quiz Review (10 min)<br />
                        ⏰ 6:00 PM - Practice Project (10 min)
                      </div>
                    </div>
                    <Button onClick={generateDailyPlan} className="w-full">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Generate New Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Adaptive Learning Engine */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    Adaptive Learning Engine
                  </CardTitle>
                  <CardDescription>Content difficulty adjusts to your performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Current Difficulty</span>
                      <Badge className="bg-green-500">Intermediate</Badge>
                    </div>
                    <Progress value={75} className="h-3" />
                    <div className="text-xs text-gray-600">
                      Engine has adjusted content based on your 85% quiz performance
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Offline Mode */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-purple-500" />
                    Offline Learning
                  </CardTitle>
                  <CardDescription>Download content for offline access</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Downloaded Modules</span>
                      <Badge className="bg-purple-500">{offlineContent}</Badge>
                    </div>
                    <Button onClick={downloadOfflineContent} className="w-full">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Download More Content
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                <Users className="w-6 h-6 text-blue-600" />
                Community & Mentorship
              </h2>
              <p className="text-gray-600">Connect, collaborate, and learn from peers and mentors</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Live Study Rooms */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-blue-500" />
                    Live Study Rooms
                  </CardTitle>
                  <CardDescription>Join virtual study sessions with peers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-sm">Python Study Group</span>
                        <Badge className="bg-green-500 text-xs">Live</Badge>
                      </div>
                      <p className="text-xs text-gray-600">8 participants • Loops & Functions</p>
                    </div>
                    <Button className="w-full">
                      <Video className="w-4 h-4 mr-2" />
                      Join Study Room
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Mentorship */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-purple-500" />
                    Mentorship Marketplace
                  </CardTitle>
                  <CardDescription>Connect with industry professionals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Sessions Completed</span>
                      <Badge className="bg-purple-500">{mentorshipSessions}</Badge>
                    </div>
                    <Button onClick={startMentorshipSession} className="w-full">
                      <UserCheck className="w-4 h-4 mr-2" />
                      Book Mentor Session
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Peer Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    Peer Review System
                  </CardTitle>
                  <CardDescription>Get feedback on your projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">Portfolio Review</span>
                        <Badge className="bg-orange-500 text-xs">Pending</Badge>
                      </div>
                      <p className="text-xs text-gray-600">3 reviews requested</p>
                    </div>
                    <Button className="w-full">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Submit for Review
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Discussion Forums */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                    Discussion Forums
                  </CardTitle>
                  <CardDescription>Ask questions and help others</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">24</div>
                      <p className="text-sm text-gray-600">Active discussions</p>
                    </div>
                    <Button className="w-full">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Join Discussions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="career" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                <Target className="w-6 h-6 text-green-600" />
                Career & Employability
              </h2>
              <p className="text-gray-600">Prepare for your dream career with practical tools</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Resume Builder */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-500" />
                    AI Resume Builder
                  </CardTitle>
                  <CardDescription>Create professional resumes with AI feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium">Resume Score: 85/100</p>
                      <p className="text-xs text-gray-600">Add GitHub links to improve</p>
                    </div>
                    <Button onClick={generateResume} className="w-full">
                      <FileText className="w-4 h-4 mr-2" />
                      Build Resume
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Internship Simulator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gamepad2 className="w-5 h-5 text-purple-500" />
                    Internship Simulator
                  </CardTitle>
                  <CardDescription>Practice real-world work scenarios</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium text-sm">Bug Fix Challenge</p>
                      <p className="text-xs text-gray-600">Debug React component</p>
                      <Badge className="bg-red-500 text-xs mt-1">Urgent</Badge>
                    </div>
                    <Button className="w-full">
                      <Gamepad2 className="w-4 h-4 mr-2" />
                      Start Simulation
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Talent Showcase */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Talent Showcase
                  </CardTitle>
                  <CardDescription>Display your projects to recruiters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">156</div>
                      <p className="text-sm text-gray-600">Profile views this month</p>
                    </div>
                    <Button className="w-full">
                      <Star className="w-4 h-4 mr-2" />
                      Submit Project
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Skill Certificates */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    Verified Certificates
                  </CardTitle>
                  <CardDescription>QR-verified skill certificates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Certificates Earned</span>
                      <Badge className="bg-green-500">{microcredentials.length}</Badge>
                    </div>
                    <Button className="w-full">
                      <Shield className="w-4 h-4 mr-2" />
                      View Certificates
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai-tools" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                <Lightbulb className="w-6 h-6 text-orange-600" />
                Advanced AI Tools
              </h2>
              <p className="text-gray-600">Cutting-edge AI features to supercharge your learning</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* AI Video Summarizer */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-red-500" />
                    AI Video Summarizer
                  </CardTitle>
                  <CardDescription>Auto-generate notes from videos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <p className="text-sm font-medium">Last Summary:</p>
                      <p className="text-xs text-gray-600">"Python loops: for, while, break, continue..."</p>
                    </div>
                    <Button className="w-full">
                      <Video className="w-4 h-4 mr-2" />
                      Summarize Video
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Voice-to-Text Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mic className="w-5 h-5 text-blue-500" />
                    Voice-to-Text Notes
                  </CardTitle>
                  <CardDescription>Speak your thoughts, get text notes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-gray-600">🎤 Recording ready</p>
                    </div>
                    <Button className="w-full">
                      <Mic className="w-4 h-4 mr-2" />
                      Start Recording
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* AI Career Forecasting */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    Career Forecasting
                  </CardTitle>
                  <CardDescription>AI predicts your career trajectory</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium">Prediction:</p>
                      <p className="text-xs text-gray-600">"Ready for junior developer roles in 2 months"</p>
                    </div>
                    <Button className="w-full">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Get Forecast
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Multi-language Support */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-purple-500" />
                    Multi-language Learning
                  </CardTitle>
                  <CardDescription>Content in your preferred language</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Badge variant="outline">English</Badge>
                      <Badge variant="outline">Hindi</Badge>
                      <Badge variant="outline">Kannada</Badge>
                    </div>
                    <Button className="w-full">
                      <Globe className="w-4 h-4 mr-2" />
                      Switch Language
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="catalog" className="space-y-6">
            <LearningCatalog />
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
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                Your Achievements
              </h2>
              <p className="text-gray-600">Celebrate your learning milestones and accomplishments</p>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-blue-600">{achievements.length}</div>
                  <div className="text-sm text-gray-600">Total Badges</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-green-600">{achievements.filter(a => a.category === 'skill').length}</div>
                  <div className="text-sm text-gray-600">Skill Badges</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-purple-600">{achievements.filter(a => a.category === 'social').length}</div>
                  <div className="text-sm text-gray-600">Social Badges</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-orange-600">{achievements.filter(a => a.category === 'milestone').length}</div>
                  <div className="text-sm text-gray-600">Milestones</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-red-600">{achievements.filter(a => a.category === 'smart').length}</div>
                  <div className="text-sm text-gray-600">Smart Features</div>
                </CardContent>
              </Card>
            </div>

            {achievements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((badge) => (
                  <Card key={badge.id} className="text-center hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="text-4xl mb-4">{badge.icon}</div>
                      <h3 className="font-semibold text-lg mb-2">{badge.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            badge.category === 'skill' ? 'bg-green-100 text-green-700' :
                            badge.category === 'social' ? 'bg-purple-100 text-purple-700' :
                            badge.category === 'milestone' ? 'bg-orange-100 text-orange-700' :
                            badge.category === 'consistency' ? 'bg-red-100 text-red-700' :
                            badge.category === 'smart' ? 'bg-indigo-100 text-indigo-700' :
                            badge.category === 'community' ? 'bg-pink-100 text-pink-700' :
                            badge.category === 'accessibility' ? 'bg-cyan-100 text-cyan-700' :
                            badge.category === 'career' ? 'bg-emerald-100 text-emerald-700' :
                            'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {badge.category}
                        </Badge>
                      </div>
                      <Badge variant="outline" className="text-xs">
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
                  <p className="text-gray-600 mb-4">Start learning to unlock your first badge!</p>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                    Explore Courses
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Next Achievements */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  Next Achievements to Unlock
                </CardTitle>
                <CardDescription>Keep learning to earn these badges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg opacity-75">
                    <div className="text-2xl mb-2">🎨</div>
                    <h4 className="font-semibold text-sm">Design Enthusiast</h4>
                    <p className="text-xs text-gray-600">Complete a UI/UX course</p>
                    <Progress value={30} className="mt-2 h-2" />
                  </div>
                  <div className="p-4 border rounded-lg opacity-75">
                    <div className="text-2xl mb-2">⭐</div>
                    <h4 className="font-semibold text-sm">Rising Star</h4>
                    <p className="text-xs text-gray-600">Get 50 likes on projects</p>
                    <Progress value={60} className="mt-2 h-2" />
                  </div>
                  <div className="p-4 border rounded-lg opacity-75">
                    <div className="text-2xl mb-2">🚀</div>
                    <h4 className="font-semibold text-sm">Speed Demon</h4>
                    <p className="text-xs text-gray-600">Complete 3 courses in one month</p>
                    <Progress value={66} className="mt-2 h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <AIAssistantChat />
    </div>
  );
};

export default LearningDashboard;
