
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Target, Clock, ExternalLink, Play, BookOpen, Code, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { aiSearchService } from '@/lib/services/aiSearchService';

interface RoadmapResource {
  title: string;
  type: 'video' | 'course' | 'book' | 'practice';
  url: string;
  description: string;
}

interface RoadmapPhase {
  phase: string;
  duration: string;
  skills: string[];
  resources: RoadmapResource[];
}

interface LearningRoadmap {
  roadmap: RoadmapPhase[];
  totalDuration: string;
  description: string;
}

export const AIRoadmapGenerator: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<LearningRoadmap | null>(null);
  const { toast } = useToast();

  const exampleGoals = [
    "I want to become a Data Scientist",
    "I want to learn Machine Learning",
    "I want to become a Frontend Developer",
    "I want to learn AI and Deep Learning"
  ];

  const handleGenerateRoadmap = async () => {
    if (!goal.trim()) {
      toast({
        title: "Please specify your goal",
        description: "Enter what you want to learn or become",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const generatedRoadmap = await aiSearchService.generateLearningRoadmap(goal);
      setRoadmap(generatedRoadmap);
      
      toast({
        title: "🎯 Roadmap Generated!",
        description: `Your personalized learning path is ready`,
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate roadmap. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="w-4 h-4" />;
      case 'course':
        return <BookOpen className="w-4 h-4" />;
      case 'book':
        return <BookOpen className="w-4 h-4" />;
      case 'practice':
        return <Code className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'course':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'book':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'practice':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Generator Interface */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            AI-Powered Learning Roadmap
          </CardTitle>
          <CardDescription>
            Tell us your career goal and get a personalized learning path with curated resources
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="e.g., I want to become a Data Scientist"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGenerateRoadmap()}
                className="text-lg py-6"
              />
            </div>
            <Button 
              size="lg" 
              onClick={handleGenerateRoadmap} 
              disabled={isGenerating}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              {isGenerating ? (
                <>
                  <Clock className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Target className="w-5 h-5 mr-2" />
                  Generate Roadmap
                </>
              )}
            </Button>
          </div>

          {/* Example Goals */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {exampleGoals.map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setGoal(example)}
                  className="text-xs hover:bg-purple-50"
                >
                  {example}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generated Roadmap */}
      {roadmap && (
        <div className="space-y-6">
          {/* Roadmap Overview */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-green-800 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Your Personalized Learning Path
                  </h3>
                  <p className="text-green-600">{roadmap.description}</p>
                </div>
                <Badge className="bg-green-500 text-white px-4 py-2">
                  <Clock className="w-3 h-3 mr-1" />
                  {roadmap.totalDuration}
                </Badge>
              </div>
              
              <Progress value={0} className="w-full" />
              <p className="text-sm text-green-600 mt-2">Ready to start your journey!</p>
            </CardContent>
          </Card>

          {/* Roadmap Phases */}
          <div className="space-y-4">
            {roadmap.roadmap.map((phase, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      {phase.phase}
                    </CardTitle>
                    <Badge variant="outline">{phase.duration}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Skills to Learn */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Skills you'll learn:</h4>
                    <div className="flex flex-wrap gap-2">
                      {phase.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="bg-blue-100 text-blue-700">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Learning Resources */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Recommended Resources:</h4>
                    <div className="space-y-3">
                      {phase.resources.map((resource, resourceIndex) => (
                        <div 
                          key={resourceIndex} 
                          className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <div className={`p-2 rounded-full ${getResourceColor(resource.type)}`}>
                            {getResourceIcon(resource.type)}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900">{resource.title}</h5>
                            <p className="text-sm text-gray-600">{resource.description}</p>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            asChild
                            className="hover:bg-blue-50"
                          >
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-1" />
                              View
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
