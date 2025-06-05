
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Target, Clock, ExternalLink, Play, BookOpen, Code, Award, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { aiSearchService } from '@/lib/services/aiSearchService';
import { roadmapProgressService } from '@/lib/services/roadmapProgressService';

interface RoadmapResource {
  title: string;
  type: 'video' | 'course' | 'book' | 'practice';
  url: string;
  description: string;
  duration: string;
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
  totalMinutes: number;
}

export const AIRoadmapGenerator: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<LearningRoadmap | null>(null);
  const [roadmapId, setRoadmapId] = useState<string>('');
  const [progress, setProgress] = useState<any>(null);
  const { toast } = useToast();

  const studentId = 'student-1';

  const exampleGoals = useMemo(() => [
    "I want to become a Data Scientist",
    "I want to learn Machine Learning",
    "I want to become a Frontend Developer",
    "I want to learn Trading",
    "I want to learn Cooking",
    "I want to learn Digital Marketing"
  ], []);

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
      
      const newRoadmapId = roadmapProgressService.saveRoadmap(studentId, goal, generatedRoadmap);
      setRoadmapId(newRoadmapId);
      
      const initialProgress = roadmapProgressService.getRoadmapProgress(studentId, newRoadmapId);
      setProgress(initialProgress);
      
      toast({
        title: "🎯 Roadmap Generated!",
        description: `Your personalized learning path is ready with ${Math.floor(generatedRoadmap.totalMinutes / 60)} hours of content`,
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

  const handleResourceComplete = (phaseIndex: number, resourceTitle: string, resourceDuration: string) => {
    const phaseId = `phase_${phaseIndex + 1}`;
    const timeSpent = parseInt(resourceDuration) || 0;
    
    roadmapProgressService.markResourceComplete(studentId, roadmapId, phaseId, resourceTitle, timeSpent);
    
    const updatedProgress = roadmapProgressService.getRoadmapProgress(studentId, roadmapId);
    setProgress(updatedProgress);
    
    toast({
      title: "✅ Resource Completed!",
      description: `You've completed "${resourceTitle}". Keep up the great work!`,
    });
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
            Tell us your career goal and get a personalized learning path with real YouTube videos and progress tracking
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
      {roadmap && progress && (
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
              
              <Progress value={progress.overallProgress} className="w-full" />
              <p className="text-sm text-green-600 mt-2">
                {progress.overallProgress}% complete • {Math.floor(progress.totalTimeSpent / 60)}h {progress.totalTimeSpent % 60}m spent
              </p>
            </CardContent>
          </Card>

          {/* Roadmap Phases */}
          <div className="space-y-4">
            {roadmap.roadmap.map((phase, index) => {
              const phaseProgress = progress.phases[index];
              return (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          phaseProgress?.completed ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                        }`}>
                          {phaseProgress?.completed ? <CheckCircle className="w-4 h-4" /> : index + 1}
                        </div>
                        {phase.phase}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{phase.duration}</Badge>
                        <Badge className={phaseProgress?.completed ? 'bg-green-500' : 'bg-blue-500'}>
                          {phaseProgress?.percentage || 0}%
                        </Badge>
                      </div>
                    </div>
                    {phaseProgress && (
                      <Progress value={phaseProgress.percentage} className="mt-2" />
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
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

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Resources ({phase.resources.length} videos):</h4>
                      <div className="space-y-3">
                        {phase.resources.map((resource, resourceIndex) => {
                          const isCompleted = phaseProgress?.completedResources.includes(resource.title) || false;
                          return (
                            <div 
                              key={resourceIndex} 
                              className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                                isCompleted ? 'bg-green-50 border-green-200' : 'border-gray-200 hover:bg-gray-50'
                              }`}
                            >
                              <div className={`p-2 rounded-full ${
                                isCompleted ? 'bg-green-500 text-white' : getResourceColor(resource.type)
                              }`}>
                                {isCompleted ? <CheckCircle className="w-4 h-4" /> : getResourceIcon(resource.type)}
                              </div>
                              <div className="flex-1">
                                <h5 className={`font-medium ${isCompleted ? 'text-green-700' : 'text-gray-900'}`}>
                                  {resource.title}
                                </h5>
                                <p className="text-sm text-gray-600">{resource.description}</p>
                                <p className="text-xs text-gray-500 mt-1">Duration: {resource.duration}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  asChild
                                  className="hover:bg-blue-50"
                                >
                                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                    <Play className="w-4 h-4 mr-1" />
                                    Watch
                                  </a>
                                </Button>
                                {!isCompleted && (
                                  <Button 
                                    size="sm" 
                                    onClick={() => handleResourceComplete(index, resource.title, resource.duration.split(' ')[0])}
                                    className="bg-green-500 hover:bg-green-600"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Complete
                                  </Button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
