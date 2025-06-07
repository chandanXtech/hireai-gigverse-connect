
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Brain, Target, Users, Clock, Eye, Star, Zap, Award, Calendar, MessageSquare, Video } from 'lucide-react';

interface AnalyticsData {
  studentAnalytics: StudentAnalytics;
  recruiterAnalytics: RecruiterAnalytics;
  platformMetrics: PlatformMetrics;
  predictiveInsights: PredictiveInsights;
}

interface StudentAnalytics {
  learningVelocity: number[];
  skillProgress: { skill: string; progress: number; predicted: number }[];
  engagementMetrics: { date: string; engagement: number; focusTime: number }[];
  behavioralInsights: string[];
  careerReadiness: number;
  jobMarketFit: { role: string; match: number }[];
}

interface RecruiterAnalytics {
  hiringFunnel: { stage: string; count: number; conversionRate: number }[];
  candidateQuality: { month: string; qualityScore: number; hires: number }[];
  sourceEffectiveness: { source: string; candidates: number; hires: number; cost: number }[];
  timeToHire: number[];
  successPrediction: { candidateId: string; successProbability: number }[];
}

interface PlatformMetrics {
  userGrowth: { month: string; students: number; recruiters: number }[];
  engagement: { metric: string; value: number; change: number }[];
  revenue: { stream: string; amount: number; growth: number }[];
  satisfaction: { userType: string; score: number; feedback: string[] }[];
}

interface PredictiveInsights {
  marketTrends: { skill: string; demand: number; growth: number }[];
  salaryPredictions: { role: string; current: number; predicted: number }[];
  hiringForecasts: { industry: string; demand: number; timeline: string }[];
  learningRecommendations: { type: string; impact: number; confidence: number }[];
}

export const AdvancedAnalyticsDashboard = ({ userType }: { userType: 'student' | 'recruiter' | 'admin' }) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [isVRMode, setIsVRMode] = useState(false);

  useEffect(() => {
    loadAnalyticsData();
  }, [selectedTimeframe, userType]);

  const loadAnalyticsData = async () => {
    // Simulate API call with comprehensive mock data
    const mockData: AnalyticsData = {
      studentAnalytics: {
        learningVelocity: [2.5, 3.1, 2.8, 3.5, 4.2, 3.9, 4.1, 4.8, 5.2, 4.9],
        skillProgress: [
          { skill: 'React', progress: 85, predicted: 92 },
          { skill: 'JavaScript', progress: 78, predicted: 88 },
          { skill: 'Python', progress: 65, predicted: 75 },
          { skill: 'SQL', progress: 45, predicted: 68 },
          { skill: 'AWS', progress: 32, predicted: 55 }
        ],
        engagementMetrics: [
          { date: '2024-01-01', engagement: 85, focusTime: 120 },
          { date: '2024-01-02', engagement: 92, focusTime: 150 },
          { date: '2024-01-03', engagement: 78, focusTime: 90 },
          { date: '2024-01-04', engagement: 95, focusTime: 180 },
          { date: '2024-01-05', engagement: 88, focusTime: 135 }
        ],
        behavioralInsights: [
          'Peak learning hours: 9-11 AM and 7-9 PM',
          'Prefers video content over text (70% vs 30%)',
          'Best performance on interactive exercises',
          'Requires breaks every 45 minutes for optimal focus'
        ],
        careerReadiness: 73,
        jobMarketFit: [
          { role: 'Frontend Developer', match: 87 },
          { role: 'Full Stack Developer', match: 72 },
          { role: 'React Developer', match: 91 },
          { role: 'JavaScript Developer', match: 84 }
        ]
      },
      recruiterAnalytics: {
        hiringFunnel: [
          { stage: 'Applied', count: 250, conversionRate: 100 },
          { stage: 'Screened', count: 125, conversionRate: 50 },
          { stage: 'Interviewed', count: 35, conversionRate: 28 },
          { stage: 'Offered', count: 8, conversionRate: 23 },
          { stage: 'Hired', count: 6, conversionRate: 75 }
        ],
        candidateQuality: [
          { month: 'Jan', qualityScore: 7.2, hires: 5 },
          { month: 'Feb', qualityScore: 7.8, hires: 7 },
          { month: 'Mar', qualityScore: 8.1, hires: 9 },
          { month: 'Apr', qualityScore: 8.5, hires: 12 }
        ],
        sourceEffectiveness: [
          { source: 'AI Search', candidates: 89, hires: 23, cost: 1200 },
          { source: 'Direct Applications', candidates: 156, hires: 18, cost: 800 },
          { source: 'Referrals', candidates: 34, hires: 12, cost: 600 },
          { source: 'LinkedIn', candidates: 67, hires: 8, cost: 2100 }
        ],
        timeToHire: [15, 12, 18, 9, 14, 11, 8, 13, 10, 16],
        successPrediction: [
          { candidateId: 'C001', successProbability: 92 },
          { candidateId: 'C002', successProbability: 78 },
          { candidateId: 'C003', successProbability: 85 }
        ]
      },
      platformMetrics: {
        userGrowth: [
          { month: 'Jan', students: 1200, recruiters: 89 },
          { month: 'Feb', students: 1450, recruiters: 112 },
          { month: 'Mar', students: 1780, recruiters: 134 },
          { month: 'Apr', students: 2100, recruiters: 156 }
        ],
        engagement: [
          { metric: 'Daily Active Users', value: 1247, change: 12.5 },
          { metric: 'Session Duration', value: 34, change: 8.2 },
          { metric: 'Course Completion', value: 78, change: 15.3 },
          { metric: 'Job Applications', value: 456, change: 22.1 }
        ],
        revenue: [
          { stream: 'Subscriptions', amount: 125000, growth: 18.5 },
          { stream: 'Job Placements', amount: 89000, growth: 25.2 },
          { stream: 'Assessments', amount: 34000, growth: 12.8 },
          { stream: 'Enterprise', amount: 67000, growth: 31.4 }
        ],
        satisfaction: [
          { userType: 'Students', score: 4.6, feedback: ['Great AI matching', 'Love the gamification'] },
          { userType: 'Recruiters', score: 4.4, feedback: ['Saves time', 'Quality candidates'] }
        ]
      },
      predictiveInsights: {
        marketTrends: [
          { skill: 'AI/ML', demand: 95, growth: 45.2 },
          { skill: 'React', demand: 88, growth: 23.1 },
          { skill: 'Python', demand: 92, growth: 34.8 },
          { skill: 'Cloud Computing', demand: 89, growth: 41.3 }
        ],
        salaryPredictions: [
          { role: 'AI Engineer', current: 1200000, predicted: 1450000 },
          { role: 'Full Stack Developer', current: 800000, predicted: 920000 },
          { role: 'Data Scientist', current: 1100000, predicted: 1300000 }
        ],
        hiringForecasts: [
          { industry: 'FinTech', demand: 85, timeline: 'Next 3 months' },
          { industry: 'HealthTech', demand: 92, timeline: 'Next 6 months' },
          { industry: 'EdTech', demand: 78, timeline: 'Next 9 months' }
        ],
        learningRecommendations: [
          { type: 'Microlearning modules', impact: 25, confidence: 89 },
          { type: 'Peer programming sessions', impact: 32, confidence: 76 },
          { type: 'Industry mentorship', impact: 41, confidence: 92 }
        ]
      }
    };

    setTimeout(() => setAnalyticsData(mockData), 500);
  };

  const renderStudentDashboard = () => (
    <div className="space-y-6">
      {/* Learning Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Career Readiness</p>
                <p className="text-2xl font-bold text-blue-600">
                  {analyticsData?.studentAnalytics.careerReadiness}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
            <Progress value={analyticsData?.studentAnalytics.careerReadiness} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Learning Velocity</p>
                <p className="text-2xl font-bold text-green-600">4.8</p>
                <p className="text-xs text-green-500">modules/week</p>
              </div>
              <Brain className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Focus Time</p>
                <p className="text-2xl font-bold text-purple-600">5.2h</p>
                <p className="text-xs text-purple-500">today</p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Job Market Fit</p>
                <p className="text-2xl font-bold text-orange-600">87%</p>
                <p className="text-xs text-orange-500">best match</p>
              </div>
              <Target className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skill Progress Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Skill Development Map</CardTitle>
          <CardDescription>Current progress vs predicted achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={analyticsData?.studentAnalytics.skillProgress}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar name="Current" dataKey="progress" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="Predicted" dataKey="predicted" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Learning Velocity & Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Learning Velocity Trend</CardTitle>
            <CardDescription>Modules completed per week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={analyticsData?.studentAnalytics.learningVelocity.map((v, i) => ({ week: i + 1, velocity: v }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="velocity" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Job Market Fit Analysis</CardTitle>
            <CardDescription>Your compatibility with different roles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyticsData?.studentAnalytics.jobMarketFit.map((job, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium">{job.role}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={job.match} className="w-24" />
                    <span className="text-sm font-medium">{job.match}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Behavioral Insights */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Learning Insights</CardTitle>
          <CardDescription>Personalized recommendations based on your behavior</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analyticsData?.studentAnalytics.behavioralInsights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
                <p className="text-sm text-blue-800">{insight}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRecruiterDashboard = () => (
    <div className="space-y-6">
      {/* Hiring Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Time to Hire</p>
                <p className="text-2xl font-bold text-blue-600">12.3</p>
                <p className="text-xs text-blue-500">days avg</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Candidate Quality</p>
                <p className="text-2xl font-bold text-green-600">8.5</p>
                <p className="text-xs text-green-500">/10 score</p>
              </div>
              <Star className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-purple-600">75%</p>
                <p className="text-xs text-purple-500">offer acceptance</p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cost per Hire</p>
                <p className="text-2xl font-bold text-orange-600">₹8.5K</p>
                <p className="text-xs text-orange-500">30% reduction</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hiring Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Hiring Funnel Analysis</CardTitle>
          <CardDescription>Candidate progression through hiring stages</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData?.recruiterAnalytics.hiringFunnel}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
              <Bar dataKey="conversionRate" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Source Effectiveness */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Source Effectiveness</CardTitle>
            <CardDescription>ROI by recruitment channel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData?.recruiterAnalytics.sourceEffectiveness.map((source, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{source.source}</p>
                    <p className="text-sm text-gray-600">{source.candidates} candidates, {source.hires} hires</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{(source.cost / source.hires).toLocaleString()}</p>
                    <p className="text-sm text-gray-600">per hire</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Candidate Quality Trend</CardTitle>
            <CardDescription>Quality score and hiring success over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={analyticsData?.recruiterAnalytics.candidateQuality}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="qualityScore" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="hires" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  if (!analyticsData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Advanced Analytics</h1>
          <p className="text-gray-600">AI-powered insights and predictions</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant={isVRMode ? "default" : "outline"}
            onClick={() => setIsVRMode(!isVRMode)}
          >
            <Eye className="w-4 h-4 mr-2" />
            {isVRMode ? 'Exit VR' : 'VR Mode'}
          </Button>
          
          <select 
            value={selectedTimeframe} 
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* VR Mode Indicator */}
      {isVRMode && (
        <Card className="mb-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Eye className="w-6 h-6" />
              <div>
                <p className="font-medium">VR Analytics Mode Active</p>
                <p className="text-sm text-purple-100">Immersive 3D data visualization ready</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Dashboard Content */}
      <Tabs value={selectedMetric} onValueChange={setSelectedMetric}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {userType === 'student' ? renderStudentDashboard() : renderRecruiterDashboard()}
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          {/* Performance metrics will be rendered here */}
          <div className="text-center py-12">
            <p className="text-gray-500">Performance analytics coming soon...</p>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="mt-6">
          {/* Market predictions and forecasts */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Trend Predictions</CardTitle>
                <CardDescription>AI forecasts for skill demand and salary trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {analyticsData.predictiveInsights.marketTrends.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{trend.skill}</p>
                        <p className="text-sm text-gray-600">Demand: {trend.demand}%</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={trend.growth > 30 ? "default" : "secondary"}>
                          +{trend.growth}% growth
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="mt-6">
          {/* AI-generated insights and recommendations */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Insights</CardTitle>
                <CardDescription>Machine learning recommendations for optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.predictiveInsights.learningRecommendations.map((rec, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-blue-900">{rec.type}</p>
                          <p className="text-sm text-blue-700">Potential impact: +{rec.impact}% improvement</p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {rec.confidence}% confidence
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
