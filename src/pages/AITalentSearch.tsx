import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Search, MapPin, Calendar, Star, TrendingUp, Users, Award, Zap, Target, Filter, Sparkles, MessageCircle, Phone, Mail, Briefcase, GraduationCap, Clock, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { aiSearchService, type CandidateMatch, type SearchFilters } from '@/lib/services/aiSearchService';

const AITalentSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CandidateMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<SearchFilters>({
    location: '',
    experience: '',
    skills: [],
    salary: '',
    availability: '',
    education: ''
  });
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [savedSearches, setSavedSearches] = useState<string[]>([]);
  const { toast } = useToast();

  const handleAISearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Please enter a search query",
        description: "Describe the type of candidate you're looking for",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const results = aiSearchService.searchCandidates(searchQuery, selectedFilters);
      setSearchResults(results);
      
      const insights = await aiSearchService.generateInsights(searchQuery, results);
      setAiInsights(insights);
      
      // Add to search history
      if (!searchHistory.includes(searchQuery)) {
        setSearchHistory(prev => [searchQuery, ...prev.slice(0, 4)]);
      }

      toast({
        title: "🧠 AI Search Complete!",
        description: `Found ${results.length} matching candidates`,
      });
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Failed to search candidates. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveSearch = () => {
    if (searchQuery && !savedSearches.includes(searchQuery)) {
      setSavedSearches(prev => [...prev, searchQuery]);
      toast({
        title: "🔖 Search Saved",
        description: "You can access this search later",
      });
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-blue-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* AI Search Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Talent Search
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Describe your ideal candidate in natural language and let our AI find the perfect matches using advanced semantic search and intelligent filtering.
          </p>
        </div>

        <Tabs defaultValue="search" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Smart Search
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              AI Insights
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Search History
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            {/* AI Search Interface */}
            <Card className="border-2 border-purple-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  Intelligent Search Query
                </CardTitle>
                <CardDescription>
                  Describe your ideal candidate using natural language. Our AI understands context, skills, experience, and requirements.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="relative">
                    <Textarea
                      placeholder="Example: 'I need a senior full-stack developer with React and Node.js experience, preferably from top-tier universities, available for remote work, with strong problem-solving skills and experience in fintech...'"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="min-h-24 resize-none border-purple-200 focus:border-purple-400"
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                      {searchQuery.length}/500
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      onClick={handleAISearch}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Searching...
                        </>
                      ) : (
                        <>
                          <Brain className="w-4 h-4 mr-2" />
                          AI Search
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={saveSearch}>
                      <Star className="w-4 h-4 mr-2" />
                      Save Search
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Advanced Filters
                </CardTitle>
                <CardDescription>Fine-tune your search with specific criteria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <Select value={selectedFilters.location} onValueChange={(value) => 
                      setSelectedFilters(prev => ({ ...prev, location: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Any location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any location</SelectItem>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="pune">Pune</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Experience</label>
                    <Select value={selectedFilters.experience} onValueChange={(value) => 
                      setSelectedFilters(prev => ({ ...prev, experience: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Any experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any experience</SelectItem>
                        <SelectItem value="fresher">Fresher (0-1 years)</SelectItem>
                        <SelectItem value="junior">Junior (1-3 years)</SelectItem>
                        <SelectItem value="mid">Mid-level (3-5 years)</SelectItem>
                        <SelectItem value="senior">Senior (5+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Availability</label>
                    <Select value={selectedFilters.availability} onValueChange={(value) => 
                      setSelectedFilters(prev => ({ ...prev, availability: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Any availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any availability</SelectItem>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="2weeks">Within 2 weeks</SelectItem>
                        <SelectItem value="1month">Within 1 month</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">
                    Found {searchResults.length} matching candidates
                  </h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Sort by Match
                    </Button>
                    <Button variant="outline" size="sm">
                      Export Results
                    </Button>
                  </div>
                </div>

                <div className="grid gap-6">
                  {searchResults.map((candidate) => (
                    <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={candidate.profilePicture} />
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
                              {candidate.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="text-xl font-semibold">{candidate.name}</h4>
                                <p className="text-gray-600">{candidate.university} • {candidate.degree}</p>
                                <div className="flex items-center gap-4 mt-1">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-600">{candidate.location}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-600">{candidate.availability}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span className="text-sm font-medium">{candidate.rating}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="text-right">
                                {candidate.matchScore && (
                                  <div className="mb-2">
                                    <Badge className={`${getMatchScoreColor(candidate.matchScore)} text-white`}>
                                      {candidate.matchScore}% Match
                                    </Badge>
                                  </div>
                                )}
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline">
                                    <MessageCircle className="w-4 h-4 mr-1" />
                                    Message
                                  </Button>
                                  <Button size="sm">
                                    View Profile
                                  </Button>
                                </div>
                              </div>
                            </div>

                            <p className="text-gray-700 mb-3 line-clamp-2">{candidate.bio}</p>

                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-medium mb-1">Top Skills:</p>
                                <div className="flex flex-wrap gap-1">
                                  {candidate.skills.slice(0, 6).map(skill => (
                                    <Badge key={skill} variant="secondary" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                  {candidate.skills.length > 6 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{candidate.skills.length - 6} more
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              {candidate.matchScore && (
                                <div className="grid grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <p className="font-medium">Skills Match</p>
                                    <Progress value={candidate.skillCompatibility || 0} className="h-2 mt-1" />
                                  </div>
                                  <div>
                                    <p className="font-medium">Experience</p>
                                    <Progress value={candidate.experienceMatch || 0} className="h-2 mt-1" />
                                  </div>
                                  <div>
                                    <p className="font-medium">Location</p>
                                    <Progress value={candidate.locationMatch || 0} className="h-2 mt-1" />
                                  </div>
                                  <div>
                                    <p className="font-medium">Salary</p>
                                    <Progress value={candidate.salaryMatch || 0} className="h-2 mt-1" />
                                  </div>
                                </div>
                              )}

                              {candidate.aiInsights && candidate.aiInsights.length > 0 && (
                                <div className="bg-purple-50 p-3 rounded-lg">
                                  <p className="text-sm font-medium text-purple-800 mb-1">AI Insights:</p>
                                  <ul className="text-sm text-purple-700 space-y-1">
                                    {candidate.aiInsights.map((insight, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <Sparkles className="w-3 h-3 mt-0.5 text-purple-500" />
                                        {insight}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  AI-Generated Insights
                </CardTitle>
                <CardDescription>
                  Intelligent analysis of your search results and market trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                {aiInsights.length > 0 ? (
                  <div className="space-y-4">
                    {aiInsights.map((insight, index) => (
                      <div key={index} className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                        <div className="flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-purple-600 mt-0.5" />
                          <p className="text-gray-700">{insight}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Run an AI search to see intelligent insights about your results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Searches
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {searchHistory.length > 0 ? (
                    <div className="space-y-2">
                      {searchHistory.map((search, index) => (
                        <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                             onClick={() => setSearchQuery(search)}>
                          <p className="text-sm line-clamp-2">{search}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-8">No recent searches</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Saved Searches
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {savedSearches.length > 0 ? (
                    <div className="space-y-2">
                      {savedSearches.map((search, index) => (
                        <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                             onClick={() => setSearchQuery(search)}>
                          <p className="text-sm line-clamp-2">{search}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-8">No saved searches</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5 text-blue-500" />
                    Search Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Searches</span>
                      <span className="font-semibold">{searchHistory.length + 15}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Avg. Match Score</span>
                      <span className="font-semibold">78%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Candidates Contacted</span>
                      <span className="font-semibold">24</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    Success Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Response Rate</span>
                      <span className="font-semibold">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Interview Rate</span>
                      <span className="font-semibold">62%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Hire Rate</span>
                      <span className="font-semibold">35%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-500" />
                    Top Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {['React', 'Node.js', 'Python', 'JavaScript', 'AWS'].map((skill, index) => (
                      <div key={skill} className="flex justify-between">
                        <span className="text-sm">{skill}</span>
                        <span className="text-xs text-gray-500">{Math.max(50 - index * 8, 15)}% searches</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AITalentSearch;
