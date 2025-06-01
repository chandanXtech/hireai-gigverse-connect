
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, MapPin, Building, Calendar, CheckCircle, XCircle, AlertCircle, Trophy } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { applicationService } from '@/lib/services/applicationService';
import { gigService } from '@/lib/services/gigService';
import { useNavigate } from 'react-router-dom';

const MyApplications = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['studentApplications', user?.id],
    queryFn: () => applicationService.getStudentApplications(user?.id || ''),
    enabled: !!user?.id,
  });

  const { data: allGigs = [] } = useQuery({
    queryKey: ['gigs'],
    queryFn: gigService.getAllGigs,
  });

  const applicationsWithGigData = applications.map(application => {
    const gig = allGigs.find(g => g.id.toString() === application.gigId.toString());
    return { ...application, gig };
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied':
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'shortlisted':
        return <CheckCircle className="w-4 h-4 text-yellow-500" />;
      case 'hired':
        return <Trophy className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shortlisted':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hired':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filterApplicationsByStatus = (status?: string) => {
    if (!status) return applicationsWithGigData;
    return applicationsWithGigData.filter(app => app.status === status);
  };

  const stats = {
    total: applications.length,
    applied: applications.filter(app => app.status === 'applied').length,
    shortlisted: applications.filter(app => app.status === 'shortlisted').length,
    hired: applications.filter(app => app.status === 'hired').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="animate-pulse space-y-6">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="h-48 bg-gray-200"></Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
          <p className="text-gray-600">Track your gig applications and their status</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-blue-700">Total</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{stats.applied}</div>
              <div className="text-sm text-gray-700">Applied</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.shortlisted}</div>
              <div className="text-sm text-yellow-700">Shortlisted</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.hired}</div>
              <div className="text-sm text-green-700">Hired</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
              <div className="text-sm text-red-700">Rejected</div>
            </CardContent>
          </Card>
        </div>

        {/* Applications Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-6 h-auto p-1">
            <TabsTrigger value="all" className="text-xs sm:text-sm">All ({stats.total})</TabsTrigger>
            <TabsTrigger value="applied" className="text-xs sm:text-sm">Applied ({stats.applied})</TabsTrigger>
            <TabsTrigger value="shortlisted" className="text-xs sm:text-sm">Shortlisted ({stats.shortlisted})</TabsTrigger>
            <TabsTrigger value="hired" className="text-xs sm:text-sm">Hired ({stats.hired})</TabsTrigger>
            <TabsTrigger value="rejected" className="text-xs sm:text-sm">Rejected ({stats.rejected})</TabsTrigger>
          </TabsList>

          {['all', 'applied', 'shortlisted', 'hired', 'rejected'].map((status) => (
            <TabsContent key={status} value={status} className="space-y-4">
              {filterApplicationsByStatus(status === 'all' ? undefined : status).length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No {status === 'all' ? '' : status} applications found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {status === 'all' 
                        ? "You haven't applied to any gigs yet. Start exploring opportunities!"
                        : `No applications with ${status} status.`
                      }
                    </p>
                    {status === 'all' && (
                      <Button 
                        onClick={() => navigate('/gigs')}
                        className="bg-gradient-to-r from-green-500 to-blue-600"
                      >
                        Browse Gigs
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                filterApplicationsByStatus(status === 'all' ? undefined : status).map((application) => (
                  <Card 
                    key={application.id} 
                    className="hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => application.gig && navigate(`/gigs/${application.gig.id}`)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex-1">
                          <CardTitle className="text-lg sm:text-xl mb-1">
                            {application.gig?.title || 'Gig Title Not Found'}
                          </CardTitle>
                          <CardDescription className="flex flex-wrap items-center gap-2 text-sm">
                            <Building className="w-4 h-4" />
                            {application.gig?.company || 'Company Not Found'}
                            <span>•</span>
                            <Calendar className="w-4 h-4" />
                            Applied {new Date(application.appliedAt).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <Badge 
                          className={`${getStatusColor(application.status)} flex items-center gap-1 px-3 py-1`}
                        >
                          {getStatusIcon(application.status)}
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      {application.gig && (
                        <>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 flex-wrap">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {application.gig.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {application.gig.duration}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {application.gig.skills.slice(0, 5).map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {application.gig.skills.length > 5 && (
                              <Badge variant="outline" className="text-xs">
                                +{application.gig.skills.length - 5} more
                              </Badge>
                            )}
                          </div>
                        </>
                      )}
                      
                      {application.recruiterNotes && (
                        <div className="bg-blue-50 p-3 rounded-lg mb-4">
                          <h4 className="font-medium text-blue-900 text-sm mb-1">Recruiter Notes:</h4>
                          <p className="text-blue-800 text-sm">{application.recruiterNotes}</p>
                        </div>
                      )}
                      
                      {application.coverLetter && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <h4 className="font-medium text-gray-900 text-sm mb-1">Your Cover Letter:</h4>
                          <p className="text-gray-700 text-sm line-clamp-3">{application.coverLetter}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default MyApplications;
