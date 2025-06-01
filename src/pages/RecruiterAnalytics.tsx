
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { applicationService } from '@/lib/services/applicationService';
import { gigService } from '@/lib/services/gigService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Briefcase, UserCheck, TrendingUp, Clock, Eye } from 'lucide-react';

const RecruiterAnalytics = () => {
  const { user } = useAuth();

  const { data: allApplications = [] } = useQuery({
    queryKey: ['all-applications'],
    queryFn: applicationService.getAllApplications,
  });

  const { data: allGigs = [] } = useQuery({
    queryKey: ['recruiter-gigs'],
    queryFn: gigService.getAllGigs,
  });

  // Calculate metrics
  const totalGigsPosted = allGigs.length;
  const totalApplications = allApplications.length;
  const shortlistedCount = allApplications.filter(app => app.status === 'shortlisted').length;
  const hiredCount = allApplications.filter(app => app.status === 'hired').length;

  // Gig performance data
  const gigPerformanceData = allGigs.map(gig => {
    const applications = allApplications.filter(app => app.gigId.toString() === gig.id.toString());
    return {
      name: gig.title.length > 20 ? gig.title.substring(0, 20) + '...' : gig.title,
      applications: applications.length,
      shortlisted: applications.filter(app => app.status === 'shortlisted').length,
      hired: applications.filter(app => app.status === 'hired').length,
    };
  });

  // Application status distribution
  const statusData = [
    { name: 'Applied', value: allApplications.filter(app => app.status === 'applied').length, color: '#3B82F6' },
    { name: 'Shortlisted', value: shortlistedCount, color: '#F59E0B' },
    { name: 'Hired', value: hiredCount, color: '#10B981' },
    { name: 'Rejected', value: allApplications.filter(app => app.status === 'rejected').length, color: '#EF4444' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Recruiter Analytics</h1>
          <p className="text-gray-600">Track your hiring pipeline and gig performance</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gigs Posted</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalGigsPosted}</div>
              <p className="text-xs text-muted-foreground">Active opportunities</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalApplications}</div>
              <p className="text-xs text-muted-foreground">Candidates interested</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{shortlistedCount}</div>
              <p className="text-xs text-muted-foreground">In review process</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hired</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hiredCount}</div>
              <p className="text-xs text-muted-foreground">Successful placements</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gig Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Gig Performance</CardTitle>
              <CardDescription>Applications per gig</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gigPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="applications" fill="#3B82F6" name="Applications" />
                  <Bar dataKey="shortlisted" fill="#F59E0B" name="Shortlisted" />
                  <Bar dataKey="hired" fill="#10B981" name="Hired" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Application Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Application Status Distribution</CardTitle>
              <CardDescription>Current pipeline overview</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest applications and status changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allApplications.slice(0, 5).map((application) => {
                const gig = allGigs.find(g => g.id.toString() === application.gigId.toString());
                return (
                  <div key={application.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">New application for {gig?.title || 'Unknown Gig'}</p>
                      <p className="text-sm text-gray-600">
                        Applied {new Date(application.appliedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        application.status === 'applied' ? 'bg-blue-100 text-blue-800' :
                        application.status === 'shortlisted' ? 'bg-yellow-100 text-yellow-800' :
                        application.status === 'hired' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {application.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecruiterAnalytics;
