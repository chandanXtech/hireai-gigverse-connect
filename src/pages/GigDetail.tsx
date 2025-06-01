
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Clock, DollarSign, Star, ArrowLeft, Users, Calendar, Building, Award } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { gigService } from '@/lib/services/gigService';
import { useAuth } from '@/contexts/AuthContext';
import { ApplyModal } from '@/components/ApplyModal';
import { useState } from 'react';

const GigDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showApplyModal, setShowApplyModal] = useState(false);

  const { data: gig, isLoading } = useQuery({
    queryKey: ['gig', id],
    queryFn: () => gigService.getGigById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <Card className="h-96 bg-gray-200"></Card>
          </div>
        </div>
      </div>
    );
  }

  if (!gig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Gig Not Found</h1>
              <p className="text-gray-600 mb-6">The gig you're looking for doesn't exist.</p>
              <Button onClick={() => navigate('/gigs')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Gigs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/gigs')}
          className="mb-6 hover:bg-white/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Gigs
        </Button>

        {/* Main Gig Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-3xl mb-2 flex items-center gap-3">
                  {gig.title}
                  {gig.isUrgent && (
                    <Badge variant="destructive">URGENT</Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-lg">
                  {gig.company} • Posted {gig.postedTime}
                </CardDescription>
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-lg font-medium">{gig.rating}</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {/* Key Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{gig.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>{gig.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign className="w-5 h-5" />
                <span>{gig.budget || gig.hourlyRate || gig.stipend}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span>{gig.applicants} applied</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              {user?.role === 'student' && (
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                  onClick={() => setShowApplyModal(true)}
                >
                  Apply Now
                </Button>
              )}
              <Button variant="outline" size="lg">
                Save Gig
              </Button>
              <Button variant="outline" size="lg">
                Share
              </Button>
            </div>

            <Separator className="my-6" />

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">About this Gig</h3>
              <p className="text-gray-700 leading-relaxed">{gig.description}</p>
            </div>

            {/* Skills Required */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Skills Required</h3>
              <div className="flex flex-wrap gap-2">
                {gig.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Requirements */}
            {gig.requirements && gig.requirements.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Requirements</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {gig.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Perks */}
            {gig.perks && gig.perks.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Perks & Benefits</h3>
                <div className="flex flex-wrap gap-2">
                  {gig.perks.map((perk, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1">
                      <Award className="w-3 h-3 mr-1" />
                      {perk}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Separator className="my-6" />

            {/* Company Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                <span>Company Size: {gig.companySize}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Industry: {gig.industry}</span>
              </div>
              {gig.deadline && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Deadline: {gig.deadline}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {user?.role === 'student' && (
        <ApplyModal 
          isOpen={showApplyModal}
          onClose={() => setShowApplyModal(false)}
          gig={gig}
        />
      )}
    </div>
  );
};

export default GigDetail;
