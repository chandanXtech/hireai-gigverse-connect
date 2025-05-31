
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Star, MapPin, Calendar, Mail, Github, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import { candidateService, type Candidate } from '@/lib/services/candidateService';
import { useSearchParams } from 'react-router-dom';

const TalentSearch = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    if (searchQuery) {
      const results = candidateService.searchCandidates(searchQuery);
      setCandidates(results);
    } else {
      setCandidates(candidateService.getAllCandidates());
    }
  }, [searchQuery]);

  const handleSearch = () => {
    const results = candidateService.searchCandidates(searchQuery);
    setCandidates(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Talent Search</h1>
          <p className="text-gray-600">Find and connect with top AI professionals using natural language queries</p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8 shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for 'Senior ML Engineer with NLP experience in SF' or 'Python developer with 5+ years'"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10 text-lg py-6"
                />
              </div>
              <Button size="lg" onClick={handleSearch} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
              <Button variant="outline" size="lg">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {candidates.length} AI Professionals Found
            </h2>
            <div className="flex gap-2">
              <Badge variant="secondary">Relevance</Badge>
              <Badge variant="outline">Rating</Badge>
              <Badge variant="outline">Availability</Badge>
            </div>
          </div>

          {candidates.map((candidate) => (
            <Card key={candidate.id} className="hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={candidate.profileImage}
                    alt={candidate.name}
                    className="w-16 h-16 rounded-full bg-gray-200"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-semibold text-gray-900">{candidate.name}</h3>
                          {candidate.isVerified && (
                            <Badge variant="default" className="bg-green-500 text-xs">Verified</Badge>
                          )}
                        </div>
                        <p className="text-gray-600">{candidate.tagline}</p>
                        <p className="text-sm text-gray-500">{candidate.university} • {candidate.year}</p>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{candidate.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3 text-sm">{candidate.bio}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {candidate.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {candidate.experience}
                      </div>
                      <Badge variant={candidate.availability.includes('Available') ? 'default' : 'secondary'} className="text-xs">
                        {candidate.availability}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {candidate.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs hover:bg-blue-50 transition-colors">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* Achievements */}
                    {candidate.achievements.length > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center gap-1 mb-1">
                          <Award className="w-4 h-4 text-yellow-500" />
                          <span className="text-xs font-medium text-gray-700">Achievements</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {candidate.achievements.slice(0, 2).map((achievement, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 transform hover:scale-105 transition-all" asChild>
                      <a href={`/profile/${candidate.profileSlug}`}>
                        View Profile
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" className="transform hover:scale-105 transition-all">
                      <Mail className="w-4 h-4 mr-1" />
                      Message
                    </Button>
                    {candidate.projects.length > 0 && (
                      <Button variant="ghost" size="sm" className="text-xs">
                        <Github className="w-4 h-4 mr-1" />
                        Projects
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TalentSearch;
