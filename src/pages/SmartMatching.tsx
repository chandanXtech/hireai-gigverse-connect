
import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Target, TrendingUp, Users, Zap, CheckCircle } from 'lucide-react';
import { matchingService, type SmartMatch, type MatchingCriteria } from '@/lib/services/matchingService';
import { candidateService } from '@/lib/services/candidateService';

const SmartMatching = () => {
  const [matches, setMatches] = useState<SmartMatch[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedGig, setSelectedGig] = useState<any>(null);

  useEffect(() => {
    // Mock gig data
    const mockGig = {
      id: 'gig-1',
      title: 'Senior React Developer',
      company: 'TechStart Inc.',
      description: 'Looking for an experienced React developer to join our growing team.',
      location: 'Bangalore, India',
      workType: 'hybrid',
      salaryRange: { min: 800000, max: 1200000 }
    };
    
    setSelectedGig(mockGig);
    runSmartMatching(mockGig);
  }, []);

  const runSmartMatching = async (gig: any) => {
    setIsAnalyzing(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const criteria: MatchingCriteria = {
      requiredSkills: ['React', 'JavaScript', 'TypeScript'],
      preferredSkills: ['Node.js', 'MongoDB', 'AWS'],
      experienceLevel: 'senior',
      location: gig.location,
      salaryRange: gig.salaryRange,
      workType: gig.workType,
      availability: 'within-month'
    };
    
    const candidates = candidateService.getAllCandidates();
    const smartMatches = matchingService.findBestMatches(candidates, gig, criteria, 15);
    
    setMatches(smartMatches);
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Great';
    if (score >= 70) return 'Good';
    return 'Fair';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">AI-Powered Smart Matching</h1>
          </div>
          <p className="text-gray-600">Advanced candidate-job matching using machine learning algorithms</p>
        </div>

        {/* Job Overview */}
        {selectedGig && (
          <Card className="mb-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedGig.title}</h2>
                  <p className="text-purple-100">{selectedGig.company} • {selectedGig.location}</p>
                  <p className="text-purple-100 mt-2">{selectedGig.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{matches.length}</div>
                  <div className="text-purple-100">Smart Matches</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Matching Status */}
        {isAnalyzing && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="animate-spin">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">AI Analysis in Progress...</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Analyzing candidate profiles, skills compatibility, and cultural fit
                  </p>
                  <Progress value={75} className="w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Matching Results */}
        {!isAnalyzing && matches.length > 0 && (
          <Tabs defaultValue="matches" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
              <TabsTrigger value="matches">Smart Matches ({matches.length})</TabsTrigger>
              <TabsTrigger value="analytics">Match Analytics</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="matches" className="space-y-4">
              {matches.map((match) => {
                const candidate = candidateService.getCandidateById(parseInt(match.candidateId));
                if (!candidate) return null;

                return (
                  <Card key={match.candidateId} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6">
                        <img
                          src={candidate.profileImage}
                          alt={candidate.name}
                          className="w-16 h-16 rounded-full bg-gray-200"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900">{candidate.name}</h3>
                              <p className="text-gray-600">{candidate.tagline}</p>
                              <p className="text-sm text-gray-500">{candidate.location} • {candidate.experience}</p>
                            </div>
                            <div className="text-right">
                              <div className={`text-3xl font-bold ${getScoreColor(match.overallScore)}`}>
                                {match.overallScore}%
                              </div>
                              <Badge variant="secondary">
                                {getScoreBadge(match.overallScore)} Match
                              </Badge>
                            </div>
                          </div>

                          {/* Detailed Scores */}
                          <div className="grid grid-cols-5 gap-4 mb-4">
                            <div className="text-center">
                              <div className="text-lg font-semibold text-blue-600">{match.skillMatch}%</div>
                              <div className="text-xs text-gray-500">Skills</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-semibold text-green-600">{match.experienceMatch}%</div>
                              <div className="text-xs text-gray-500">Experience</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-semibold text-purple-600">{match.locationMatch}%</div>
                              <div className="text-xs text-gray-500">Location</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-semibold text-yellow-600">{match.salaryMatch}%</div>
                              <div className="text-xs text-gray-500">Salary</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-semibold text-indigo-600">{match.availabilityMatch}%</div>
                              <div className="text-xs text-gray-500">Available</div>
                            </div>
                          </div>

                          {/* AI Reasoning */}
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-900 mb-2">AI Analysis:</h4>
                            <ul className="space-y-1">
                              {match.reasoning.map((reason, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  {reason}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Recommendations */}
                          {match.recommendations.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-medium text-gray-900 mb-2">Recommendations:</h4>
                              <ul className="space-y-1">
                                {match.recommendations.map((rec, index) => (
                                  <li key={index} className="flex items-center gap-2 text-sm text-yellow-600">
                                    <Target className="w-4 h-4" />
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Skills */}
                          <div className="flex flex-wrap gap-1 mb-4">
                            {candidate.skills.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-gradient-to-r from-purple-500 to-blue-500">
                              <Zap className="w-4 h-4 mr-1" />
                              Quick Contact
                            </Button>
                            <Button variant="outline" size="sm">
                              View Full Profile
                            </Button>
                            <Button variant="ghost" size="sm">
                              Save for Later
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Match Quality
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Excellent (90%+)</span>
                        <span className="font-semibold">{matches.filter(m => m.overallScore >= 90).length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Great (80-89%)</span>
                        <span className="font-semibold">{matches.filter(m => m.overallScore >= 80 && m.overallScore < 90).length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Good (70-79%)</span>
                        <span className="font-semibold">{matches.filter(m => m.overallScore >= 70 && m.overallScore < 80).length}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Skill Coverage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">React</span>
                          <span className="text-sm">95%</span>
                        </div>
                        <Progress value={95} />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">JavaScript</span>
                          <span className="text-sm">88%</span>
                        </div>
                        <Progress value={88} />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">TypeScript</span>
                          <span className="text-sm">72%</span>
                        </div>
                        <Progress value={72} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Experience Levels
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Senior (6+ years)</span>
                        <span className="font-semibold">8</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mid (3-6 years)</span>
                        <span className="font-semibold">5</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Junior (1-3 years)</span>
                        <span className="font-semibold">2</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Insights</CardTitle>
                    <CardDescription>AI-generated hiring recommendations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Strong candidate pool</p>
                        <p className="text-sm text-gray-600">67% of matches exceed 80% compatibility score</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Skill alignment</p>
                        <p className="text-sm text-gray-600">Most candidates have core React and JavaScript skills</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-purple-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Market demand</p>
                        <p className="text-sm text-gray-600">TypeScript knowledge adds 15% to match scores</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Optimization Tips</CardTitle>
                    <CardDescription>Improve your matching results</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <p className="font-medium">Expand location range</p>
                      <p className="text-sm text-gray-600">Consider remote candidates to increase pool by 40%</p>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-4">
                      <p className="font-medium">Flexible experience requirements</p>
                      <p className="text-sm text-gray-600">Mid-level candidates show 95% skill compatibility</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <p className="font-medium">Interview top 5 matches</p>
                      <p className="text-sm text-gray-600">85%+ scores typically lead to successful hires</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default SmartMatching;
