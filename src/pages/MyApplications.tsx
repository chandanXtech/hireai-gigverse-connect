
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { applicationService } from '@/lib/services/applicationService';
import { gigService } from '@/lib/services/gigService';
import { useNavigate } from 'react-router-dom';
import { Calendar, ExternalLink, Filter } from 'lucide-react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MyApplications = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('');

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['student-applications', user?.id],
    queryFn: () => applicationService.getStudentApplications(user!.id),
    enabled: !!user,
  });

  const { data: gigsData = [] } = useQuery({
    queryKey: ['gigs-for-applications'],
    queryFn: gigService.getAllGigs,
  });

  const applicationsWithGigs = applications.map(app => ({
    ...app,
    gig: gigsData.find(gig => gig.id.toString() === app.gigId.toString()),
  }));

  const filteredApplications = statusFilter 
    ? applicationsWithGigs.filter(app => app.status === statusFilter)
    : applicationsWithGigs;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'shortlisted': return 'bg-yellow-100 text-yellow-800';
      case 'hired': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="animate-pulse space-y-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="h-32 bg-gray-200"></Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
            <p className="text-gray-600">Track your gig applications and their status</p>
          </div>
        </div>

        {/* Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <Filter className="w-4 h-4 text-gray-500" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Applications</SelectItem>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="shortlisted">Shortlisted</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className="space-y-6">
          {filteredApplications.map((application) => (
            <Card key={application.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-1">
                      {application.gig?.title || 'Gig Not Found'}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {application.gig?.company} • Applied {new Date(application.appliedAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(application.status)}>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                {application.gig && (
                  <>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {application.gig.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {application.gig.duration}
                      </div>
                      <span>{application.gig.location}</span>
                      <span>{application.gig.budget || application.gig.hourlyRate || application.gig.stipend}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {application.gig.skills.slice(0, 4).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {application.coverLetter && (
                      <div className="bg-gray-50 p-3 rounded-lg mb-4">
                        <p className="text-sm text-gray-700 italic">
                          "{application.coverLetter}"
                        </p>
                      </div>
                    )}

                    {application.recruiterNotes && (
                      <div className="bg-blue-50 p-3 rounded-lg mb-4">
                        <p className="text-sm font-medium text-blue-900 mb-1">Recruiter Notes:</p>
                        <p className="text-sm text-blue-800">{application.recruiterNotes}</p>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/gigs/${application.gig!.id}`)}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Gig
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {statusFilter ? 'No Applications Found' : 'No Applications Yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {statusFilter 
                  ? 'Try changing your filter or apply to more gigs.'
                  : 'Start applying to gigs to see your applications here.'
                }
              </p>
              <Button onClick={() => navigate('/gigs')}>
                Browse Gigs
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
