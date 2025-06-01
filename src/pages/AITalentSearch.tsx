
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ContactCandidateModal } from '@/components/ContactCandidateModal';
import { Search, Brain, Zap, Star, MapPin, Calendar, Mail, FileText, Target, Clock, TrendingUp } from 'lucide-react';
import { aiSearchService, type AISearchResponse, type ScoredCandidate } from '@/lib/services/aiSearchService';
import { useToast } from '@/hooks/use-toast';

const AITalentSearch = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<AISearchResponse | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<ScoredCandidate | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [isParsingResume, setIsParsingResume] = useState(false);
  const { toast } = useToast();

  const exampleQueries = [
    "Find senior Gen-AI engineers with LangChain + RAG experience in Europe open to contract work",
    "Looking for Python developers with machine learning experience in San Francisco",
    "Need React developers with TypeScript experience available immediately",
    "Find AI researchers with NLP background for remote positions"
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const results = await aiSearchService.searchTalent(query);
      setSearchResults(results);
      
      toast({
        title: "🎯 AI Search Complete!",
        description: `Found ${results.totalFound} candidates in ${results.searchTime}ms`,
      });
    } catch (error) {
      toast({
        title: "Search Error",
        description: "Failed to search candidates. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleContactCandidate = (candidate: ScoredCandidate) => {
    setSelectedCandidate(candidate);
    setIsContactModalOpen(true);
  };

  const handleResumeParser = async () => {
    if (!resumeText.trim()) return;

    setIsParsingResume(true);
    try {
      const result = await aiSearchService.parseResume(resumeText);
      toast({
        title: "✨ Resume Parsed Successfully!",
        description: `Extracted ${result.skills.length} skills with ${result.confidence}% confidence`,
      });
      console.log('Parsed Resume:', result);
    } catch (error) {
      toast({
        title: "Parsing Error",
        description: "Failed to parse resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsParsingResume(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              AI-Powered Talent Search
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Use natural language to find, rank, and connect with top AI talent instantly. 
            Powered by advanced LLMs for precision matching.
          </p>
        </div>

        <Tabs defaultValue="search" className="space-y-6">
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
              <Target className="w-4 h-4" />
              AI Screening
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            {/* AI Search Interface */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Natural Language Talent Search
                </CardTitle>
                <CardDescription>
                  Describe exactly what you're looking for in plain English
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="e.g., Find senior Gen-AI engineers with LangChain + RAG experience in Europe open to contract work"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className="pl-10 text-lg py-6"
                    />
                  </div>
                  <Button 
                    size="lg" 
                    onClick={handleSearch} 
                    disabled={isSearching}
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 hover:from-blue-600 hover:via-purple-600 hover:to-green-600"
                  >
                    {isSearching ? (
                      <>
                        <Clock className="w-5 h-5 mr-2 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Brain className="w-5 h-5 mr-2" />
                        AI Search
                      </>
                    )}
                  </Button>
                </div>

                {/* Example Queries */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Try these examples:</p>
                  <div className="flex flex-wrap gap-2">
                    {exampleQueries.map((example, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setQuery(example)}
                        className="text-xs hover:bg-blue-50"
                      >
                        {example.length > 50 ? `${example.substring(0, 50)}...` : example}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search Results */}
            {searchResults && (
              <div className="space-y-6">
                {/* Search Summary */}
                <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-green-800">
                          🎯 Found {searchResults.totalFound} candidates in {searchResults.searchTime}ms
                        </h3>
                        <p className="text-green-600">Ranked by AI relevance score</p>
                      </div>
                      <Badge className="bg-green-500 text-white">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        AI Powered
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="bg-white/50 p-3 rounded">
                        <strong>Role:</strong> {searchResults.parsedQuery.role}
                      </div>
                      <div className="bg-white/50 p-3 rounded">
                        <strong>Skills:</strong> {searchResults.parsedQuery.skills.join(', ') || 'Any'}
                      </div>
                      <div className="bg-white/50 p-3 rounded">
                        <strong>Location:</strong> {searchResults.parsedQuery.location}
                      </div>
                      <div className="bg-white/50 p-3 rounded">
                        <strong>Experience:</strong> {searchResults.parsedQuery.experience}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Candidates List */}
                <div className="space-y-4">
                  {searchResults.candidates.map((candidate) => (
                    <Card key={candidate.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
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
                                  <Badge className={`text-xs font-bold ${getScoreColor(candidate.relevanceScore)}`}>
                                    {candidate.relevanceScore}% Match
                                  </Badge>
                                </div>
                                <p className="text-gray-600">{candidate.tagline}</p>
                                <p className="text-sm text-gray-500">{candidate.university} • {candidate.year}</p>
                              </div>
                              <div className="flex items-center gap-1 text-yellow-500">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="text-sm font-medium">{candidate.rating}</span>
                              </div>
                            </div>
                            
                            {/* AI Match Reasons */}
                            <div className="mb-3">
                              <p className="text-xs font-medium text-purple-700 mb-1">🤖 AI Analysis:</p>
                              <div className="flex flex-wrap gap-1">
                                {candidate.matchReasons.map((reason, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                                    {reason}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Detailed Scores */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-xs">
                              <div>
                                <p className="font-medium">Skills Match</p>
                                <Progress value={candidate.aiAnalysis.skillMatch} className="h-2" />
                                <span className="text-gray-500">{Math.round(candidate.aiAnalysis.skillMatch)}%</span>
                              </div>
                              <div>
                                <p className="font-medium">Experience</p>
                                <Progress value={candidate.aiAnalysis.experienceMatch} className="h-2" />
                                <span className="text-gray-500">{Math.round(candidate.aiAnalysis.experienceMatch)}%</span>
                              </div>
                              <div>
                                <p className="font-medium">Location</p>
                                <Progress value={candidate.aiAnalysis.locationMatch} className="h-2" />
                                <span className="text-gray-500">{Math.round(candidate.aiAnalysis.locationMatch)}%</span>
                              </div>
                              <div>
                                <p className="font-medium">Availability</p>
                                <Progress value={candidate.aiAnalysis.availabilityMatch} className="h-2" />
                                <span className="text-gray-500">{Math.round(candidate.aiAnalysis.availabilityMatch)}%</span>
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
                              {candidate.skills.length > 8 && (
                                <Badge variant="outline" className="text-xs">
                                  +{candidate.skills.length - 8} more
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <Button 
                              size="sm" 
                              className="bg-gradient-to-r from-blue-500 to-purple-600 transform hover:scale-105 transition-all" 
                              asChild
                            >
                              <a href={`/profile/${candidate.profileSlug}`}>
                                View Profile
                              </a>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleContactCandidate(candidate)}
                              className="transform hover:scale-105 transition-all"
                            >
                              <Mail className="w-4 h-4 mr-1" />
                              Contact
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="parser" className="space-y-6">
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  AI Resume Parser
                </CardTitle>
                <CardDescription>
                  Upload or paste resume text to extract skills, experience, and insights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste resume text here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  rows={8}
                  className="resize-none"
                />
                <Button 
                  onClick={handleResumeParser} 
                  disabled={isParsingResume || !resumeText.trim()}
                  className="w-full"
                >
                  {isParsingResume ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Parsing Resume...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Parse with AI
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="screening" className="space-y-6">
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-500" />
                  AI-Powered Screening
                </CardTitle>
                <CardDescription>
                  Generate intelligent screening questions based on role requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">AI Screening Questions</p>
                  <p className="text-sm">Coming soon - Generate role-specific questions automatically</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Contact Modal */}
      {selectedCandidate && (
        <ContactCandidateModal
          isOpen={isContactModalOpen}
          onClose={() => {
            setIsContactModalOpen(false);
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
