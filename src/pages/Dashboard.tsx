
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Users, TrendingUp, Briefcase, Star, ArrowRight, Brain, Mail, Target, BookOpen, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getWelcomeMessage = () => {
    switch (user?.role) {
      case 'recruiter':
        return 'Ready to find your next AI hire with our copilot?';
      case 'founder':
        return 'Build your AI dream team in minutes, not months!';
      case 'student':
        return 'Accelerate your career with personalized learning paths!';
      case 'admin':
        return 'Monitor platform performance & insights';
      default:
        return 'Welcome to HireAI+GigHub - The AI-Powered Hiring Revolution';
    }
  };

  const getQuickActions = () => {
    const baseActions = [
      {
        title: 'Browse Gigs',
        description: 'Find exciting AI & tech opportunities',
        icon: Briefcase,
        action: () => navigate('/gigs'),
        color: 'from-green-500 to-emerald-600'
      }
    ];

    if (user?.role === 'recruiter' || user?.role === 'founder' || user?.role === 'admin') {
      return [
        {
          title: 'AI Talent Search',
          description: 'Find candidates with natural language',
          icon: Brain,
          action: () => navigate('/ai-search'),
          color: 'from-purple-500 to-pink-600',
          featured: true
        },
        {
          title: 'Browse Talent Pool',
          description: 'Traditional candidate search',
          icon: Search,
          action: () => navigate('/talent-search'),
          color: 'from-blue-500 to-indigo-600'
        },
        {
          title: 'Post New Gig',
          description: 'Create and publish opportunities',
          icon: Target,
          action: () => navigate('/post-gig'),
          color: 'from-orange-500 to-red-600'
        },
        {
          title: 'Analytics Dashboard',
          description: 'Track hiring metrics & insights',
          icon: TrendingUp,
          action: () => navigate('/recruiter-analytics'),
          color: 'from-teal-500 to-cyan-600'
        },
        ...baseActions
      ];
    }

    if (user?.role === 'student') {
      return [
        {
          title: 'Learning Dashboard',
          description: 'Access your personalized learning roadmap',
          icon: BookOpen,
          action: () => navigate('/learning'),
          color: 'from-purple-500 to-pink-600',
          featured: true
        },
        ...baseActions,
        {
          title: 'My Applications',
          description: 'Track your gig applications',
          icon: Star,
          action: () => navigate('/my-applications'),
          color: 'from-indigo-500 to-purple-600'
        }
      ];
    }

    return baseActions;
  };

  const stats = [
    { label: 'Active AI Candidates', value: '12,543', change: '+12%', icon: Users },
    { label: 'Open Tech Gigs', value: '1,234', change: '+8%', icon: Briefcase },
    { label: 'Successful AI Hires', value: '456', change: '+23%', icon: Star },
    { label: 'Avg. Time-to-Hire', value: '3.2 days', change: '-89%', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 text-base sm:text-lg">{getWelcomeMessage()}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <p className="font-medium">{user?.role}</p>
                {user?.company && <p className="text-xs">{user.company}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Banner for AI Features */}
        {(user?.role === 'recruiter' || user?.role === 'founder') && (
          <Card className="mb-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="mb-4 sm:mb-0">
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">🚀 AI-Powered Hiring Copilot</h2>
                  <p className="text-purple-100 text-sm sm:text-base">
                    Type: "Find senior Gen-AI engineers with LangChain + RAG experience in Europe" 
                    <br className="hidden sm:block" />
                    Get instant, ranked candidates in seconds!
                  </p>
                </div>
                <Button 
                  onClick={() => navigate('/ai-search')} 
                  variant="secondary" 
                  className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
                >
                  Try AI Search <Brain className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Learning Banner for Students */}
        {user?.role === 'student' && (
          <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="mb-4 sm:mb-0">
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">📚 Personalized Learning Journey</h2>
                  <p className="text-blue-100 text-sm sm:text-base">
                    Set your career goals and follow curated learning paths 
                    <br className="hidden sm:block" />
                    Unlock gigs as you build skills and complete modules!
                  </p>
                </div>
                <Button 
                  onClick={() => navigate('/learning')} 
                  variant="secondary" 
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                >
                  Start Learning <BookOpen className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mb-1" />
                    <span className="text-xs font-medium text-green-600">{stat.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {getQuickActions().map((action, index) => (
            <Card 
              key={index} 
              className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group ${
                action.featured ? 'ring-2 ring-purple-500 ring-opacity-50' : ''
              }`} 
              onClick={action.action}
            >
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
                  {action.title}
                  {action.featured && <span className="ml-2 text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">NEW</span>}
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm">{action.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="ghost" className="group-hover:bg-gray-100 w-full justify-between text-sm">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">Recent Activity</CardTitle>
            <CardDescription>Your latest interactions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                user?.role === 'student' ? 
                  { action: 'Learning Module Completed', detail: 'Python Fundamentals - Earned 3 new skills', time: '2 hours ago', type: 'learning' } :
                  { action: 'AI Search Match Found', detail: 'Sarah Chen - Senior ML Engineer with LangChain expertise', time: '2 hours ago', type: 'ai-match' },
                { action: 'New Application Received', detail: 'Frontend Developer - TechCorp Gig', time: '4 hours ago', type: 'application' },
                user?.role === 'student' ?
                  { action: 'Badge Unlocked', detail: 'First Steps - Completed your first learning module', time: '1 day ago', type: 'achievement' } :
                  { action: 'Candidate Auto-Screened', detail: 'John Doe - Data Scientist passed AI screening', time: '1 day ago', type: 'screening' },
                { action: 'Outreach Email Sent', detail: 'Personalized email to 5 candidates', time: '2 days ago', type: 'outreach' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 sm:p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'ai-match' ? 'bg-purple-100 text-purple-600' :
                    activity.type === 'application' ? 'bg-green-100 text-green-600' :
                    activity.type === 'screening' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'outreach' ? 'bg-orange-100 text-orange-600' :
                    activity.type === 'learning' ? 'bg-indigo-100 text-indigo-600' :
                    activity.type === 'achievement' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {activity.type === 'ai-match' && <Brain className="w-4 h-4 sm:w-5 sm:h-5" />}
                    {activity.type === 'application' && <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />}
                    {activity.type === 'screening' && <Users className="w-4 h-4 sm:w-5 sm:h-5" />}
                    {activity.type === 'outreach' && <Mail className="w-4 h-4 sm:w-5 sm:h-5" />}
                    {activity.type === 'learning' && <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />}
                    {activity.type === 'achievement' && <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{activity.action}</p>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{activity.detail}</p>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
