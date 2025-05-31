
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, GraduationCap, Star, Download, Share2, MessageCircle, UserPlus, Eye, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Candidate } from '@/lib/services/candidateService';

interface ProfileHeaderProps {
  candidate: Candidate;
  isOwner?: boolean;
}

export const ProfileHeader = ({ candidate, isOwner = false }: ProfileHeaderProps) => {
  const { toast } = useToast();

  const handleShareProfile = () => {
    const profileUrl = `${window.location.origin}/profile/${candidate.profileSlug}`;
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: "Profile URL Copied!",
      description: "Profile link has been copied to clipboard",
    });
  };

  const handleDownloadResume = () => {
    toast({
      title: "Resume Downloaded",
      description: "Resume has been downloaded successfully",
    });
  };

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="relative">
            <img
              src={candidate.profileImage}
              alt={candidate.name}
              className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white shadow-lg"
            />
            {candidate.isVerified && (
              <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2">
                <Star className="w-4 h-4 fill-current" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{candidate.name}</h1>
                  {candidate.isVerified && (
                    <Badge className="bg-green-500 text-white">✓ Verified</Badge>
                  )}
                </div>
                <p className="text-xl text-gray-600 mb-2">{candidate.tagline}</p>
                <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {candidate.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" />
                    {candidate.university} • {candidate.year}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {candidate.profileViews} views
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-medium">{candidate.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={handleShareProfile}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" onClick={handleDownloadResume}>
                  <Download className="w-4 h-4 mr-2" />
                  Resume
                </Button>
                {!isOwner && (
                  <>
                    <Button variant="outline">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Shortlist
                    </Button>
                  </>
                )}
              </div>
            </div>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-4">{candidate.bio}</p>
            
            <div className="flex flex-wrap gap-2">
              {candidate.badges.map((badge) => (
                <Badge key={badge} variant="secondary" className="text-sm">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
