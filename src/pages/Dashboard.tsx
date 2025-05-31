
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Users, TrendingUp, Briefcase, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getWelcomeMessage = () => {
    switch (user?.role) {
      case 'recruiter':
        return 'Ready to find your next hire?';
      case 'founder':
        return 'Build your dream team today!';
      case 'student':
        return 'Discover amazing gig opportunities!';
      case 'admin':
        return 'Monitor platform performance';
      default:
        return 'Welcome to HireAI+GigHub';
    }
  };

  const getQuickActions = () => {
    const baseActions = [
      {
        title: 'Browse Gigs',
        description: 'Find exciting opportunities',
        icon: Briefcase,
        action: () => navigate('/gigs'),
        color: 'from-green-500 to-emerald-600'
      }
    ];

    if (user?.role === 'recruiter' || user?.role === 'founder' || user?.role === 'admin') {
      return [
        {
          title: 'Search Talent',
          description: 'Find the perfect candidates',
          icon: Search,
          action: () => navigate('/search'),
          color: 'from-blue-500 to-purple-600'
        },
        {
          title: 'View Analytics',
          description: 'Track hiring metrics',
          icon: TrendingUp,
          action: () => navigate('/analytics'),
          color: 'from-orange-500 to-red-600'
        },
        ...baseActions
      ];
    }

    return baseActions;
  };

  const stats = [
    { label: 'Active Candidates', value: '12,543', change: '+12%' },
    { label: 'Open Gigs', value: '1,234', change: '+8%' },
    { label: 'Successful Hires', value: '456', change: '+23%' },
    { label: 'Platform Users', value: '25,678', change: '+15%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 text-lg">{getWelcomeMessage()}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-green-600">{stat.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {getQuickActions().map((action, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group" onClick={action.action}>
              <CardHeader>
                <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">{action.title}</CardTitle>
                <CardDescription className="text-gray-600">{action.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="ghost" className="group-hover:bg-gray-100 w-full justify-between">
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
            <CardTitle className="text-xl font-semibold text-gray-900">Recent Activity</CardTitle>
            <CardDescription>Your latest interactions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'New candidate match', detail: 'Sarah Chen - Senior ML Engineer', time: '2 hours ago', type: 'match' },
                { action: 'Gig application received', detail: 'Frontend Developer - TechCorp', time: '4 hours ago', type: 'application' },
                { action: 'Interview scheduled', detail: 'John Doe - Data Scientist', time: '1 day ago', type: 'interview' },
                { action: 'Profile updated', detail: 'Your recruiter profile', time: '2 days ago', type: 'update' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'match' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'application' ? 'bg-green-100 text-green-600' :
                    activity.type === 'interview' ? 'bg-purple-100 text-purple-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {activity.type === 'match' && <Users className="w-5 h-5" />}
                    {activity.type === 'application' && <Briefcase className="w-5 h-5" />}
                    {activity.type === 'interview' && <Star className="w-5 h-5" />}
                    {activity.type === 'update' && <TrendingUp className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.detail}</p>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
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
