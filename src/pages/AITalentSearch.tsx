import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResumeParser } from '@/components/ResumeParser';
import { MessageCandidateModal } from '@/components/MessageCandidateModal';
import { Search, Zap, Star, MapPin, Calendar, Mail, Github, Award, Brain, FileText, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { aiSearchService } from '@/lib/services/aiSearchService';
import { useSearchParams } from 'react-router-dom';

// Local interface that matches the aiSearchService types
interface LocalCandidateMatch {
  id: number;
  username: string;
  name: string;
  university: string;
  year: string;
  skills: string[];
  location: string;
  tagline: string;
  bio: string;
  experience: string;
  availability: string;
  rating: number;
  projects: any[];
  achievements: string[];
  certifications: any[];
  isVerified: boolean;
  profileImage: string;
  resumeLink: string;
  socialLinks: any;
  tokensEarned: number;
  badges: string[];
  profileViews: number;
  profileSlug: string;
  matchPercentage: number;
  aiAnalysis: {
    summary: string;
    skillsMatch: number;
    experienceMatch: number;
    locationMatch: number;
    availabilityMatch: number;
    reasons: string[];
  };
}

const AITalentSearch = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [candidates, setCandidates] = useState<LocalCandidateMatch[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<LocalCandidateMatch | null>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTime, setSearchTime] = useState(0);

  const exampleQueries = [
    "Find senior Gen-AI engineers with LangChain + RAG experience in Europe open to contract work",
    "Looking for Python developers with machine learning experience in Bangalore",
    "Need React developers with TypeScript experience available for full-time",
    "Find AI researchers with NLP background for remote work"
  ];

  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    }
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    const startTime = Date.now();

    // Simulate search delay for realism
    await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 300));

    const results = aiSearchService.searchCandidates(searchQuery) as LocalCandidateMatch[];
    setCandidates(results);
    
    const endTime = Date.now();
    setSearchTime(endTime - startTime);
    setIsSearching(false);
  };

  const handleMessageCandidate = (candidate: LocalCandidateMatch) => {
    setSelectedCandidate(candidate);
    setIsMessageModalOpen(true);
  };

  const handleExampleQuery = (query: string) => {
    setSearchQuery(query);
    setTimeout(() => handleSearch(), 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Brain className="w-10 h-10 text-blue-600" />
            AI-Powered Talent Search
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Use natural language to find, rank, and connect with top AI talent instantly. 
            Powered by advanced LLMs for precision matching.
          </p>
        </div>

        <Tabs defaultValue="search" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              AI Search
            </TabsTrigger>
            <TabsTrigger value="parser" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Resume Parser
            </TabsTrigger>
            <TabsTrigger value="screening" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              AI Screening
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-8">
            {/* Search Section */}
            <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Natural Language Talent Search</h2>
                    <p className="text-gray-600">Describe exactly what you're looking for in plain English</p>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        placeholder="Find senior Gen-AI engineers with LangChain + RAG experience in Europe open to contract work"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        className="pl-12 text-lg py-6 border-2 border-gray-200 focus:border-blue-500"
                      />
                    </div>
                    <Button 
                      size="lg" 
                      onClick={handleSearch} 
                      disabled={isSearching || !searchQuery.trim()}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8"
                    >
                      {isSearching ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Searching...
                        </span>
                      ) : (
                        <>
                          <Zap className="w-5 h-5 mr-2" />
                          AI Search
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Example Queries */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-700">Try these examples:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {exampleQueries.map((query, index) => (
                        <button
                          key={index}
                          onClick={() => handleExampleQuery(query)}
                          className="text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-sm text-gray-700 hover:text-blue-700"
                        >
                          {query}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            {candidates.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      🎯 Found {candidates.length} candidates in {searchTime}ms
                    </h2>
                    <p className="text-gray-600">Ranked by AI relevance score</p>
                  </div>
                  <Badge variant="default" className="bg-green-500 text-white">
                    AI Powered
                  </Badge>
                </div>

                {/* Search Analysis */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-blue-900">AI Search Analysis</h3>
                        <p className="text-sm text-blue-700 mt-1">
                          Looking for: <strong>Gen-AI Engineer</strong> • 
                          Skills: <strong>langchain, rag, ai</strong> • 
                          Location: <strong>europe</strong> • 
                          Experience: <strong>senior</strong>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Candidates List */}
                <div className="grid gap-6">
                  {candidates.map((candidate) => (
                    <Card key={candidate.id} className="hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01] border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <img
                            src={candidate.profileImage}
                            alt={candidate.name}
                            className="w-16 h-16 rounded-full bg-gray-200"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-xl font-semibold text-gray-900">{candidate.name}</h3>
                                  {candidate.isVerified && (
                                    <Badge variant="default" className="bg-green-500 text-xs">Verified</Badge>
                                  )}
                                  <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold">
                                    {candidate.matchPercentage}% Match
                                  </Badge>
                                </div>
                                <p className="text-gray-600 font-medium">{candidate.tagline}</p>
                                <p className="text-sm text-gray-500">{candidate.university} • {candidate.year}</p>
                              </div>
                              <div className="flex items-center gap-1 text-yellow-500">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="text-sm font-medium">{candidate.rating}</span>
                              </div>
                            </div>

                            {/* AI Analysis */}
                            <Card className="mb-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                              <CardContent className="p-3">
                                <div className="flex items-start gap-2">
                                  <Brain className="w-4 h-4 text-blue-600 mt-0.5" />
                                  <div className="flex-1">
                                    <h4 className="text-sm font-medium text-blue-900 mb-1">🤖 AI Analysis:</h4>
                                    <div className="text-sm text-blue-800 space-y-1">
                                      {candidate.aiAnalysis.reasons.slice(0, 6).map((reason, index) => (
                                        <div key={index}>• {reason}</div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Match Breakdown */}
                            <div className="grid grid-cols-4 gap-4 mb-4">
                              <div className="text-center">
                                <div className="text-lg font-bold text-blue-600">{candidate.aiAnalysis.skillsMatch}%</div>
                                <div className="text-xs text-gray-600">Skills Match</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-green-600">{candidate.aiAnalysis.experienceMatch}%</div>
                                <div className="text-xs text-gray-600">Experience</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-purple-600">{candidate.aiAnalysis.locationMatch}%</div>
                                <div className="text-xs text-gray-600">Location</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-orange-600">{candidate.aiAnalysis.availabilityMatch}%</div>
                                <div className="text-xs text-gray-600">Availability</div>
                              </div>
                            </div>
                            
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
                              {candidate.skills.slice(0, 8).map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs hover:bg-blue-50 transition-colors">
                                  {skill}
                                </Badge>
                              ))}
                            </div>

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
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleMessageCandidate(candidate)}
                              className="transform hover:scale-105 transition-all"
                            >
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
            )}
          </TabsContent>

          <TabsContent value="parser">
            <ResumeParser />
          </TabsContent>

          <TabsContent value="screening" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Screening (Coming Soon)</CardTitle>
                <CardDescription>
                  Automated candidate screening with AI-powered interviews and assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">This feature is under development and will be available soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Message Modal */}
      {selectedCandidate && (
        <MessageCandidateModal
          isOpen={isMessageModalOpen}
          onClose={() => {
            setIsMessageModalOpen(false);
            setSelectedCandidate(null);
          }}
          candidateEmail={`${selectedCandidate.username}@example.com`}
          candidateName={selectedCandidate.name}
        />
      )}
    </div>
  );
};

export default AITalentSearch;
