
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/Navigation';
import { 
  ArrowLeft, 
  Play, 
  Book, 
  Headphones, 
  FileText,
  CheckCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { learningService, type Module, type ModuleContent } from '@/lib/services/learningService';

const ModuleDetail = () => {
  const { moduleId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);
  const [completedContent, setCompletedContent] = useState<string[]>([]);

  useEffect(() => {
    loadModule();
  }, [moduleId]);

  const loadModule = async () => {
    // In a real app, you'd fetch the specific module
    // For now, we'll find it from the career goals
    try {
      const careerGoals = await learningService.getCareerGoals();
      const foundModule = careerGoals
        .flatMap(goal => goal.modules)
        .find(m => m.id === moduleId);
      
      setModule(foundModule || null);
    } catch (error) {
      console.error('Error loading module:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteContent = (contentId: string) => {
    setCompletedContent(prev => [...prev, contentId]);
  };

  const handleCompleteModule = async () => {
    if (!user?.id || !moduleId) return;
    
    try {
      await learningService.updateModuleProgress(user.id, moduleId, 'completed');
      navigate('/learning');
    } catch (error) {
      console.error('Error completing module:', error);
    }
  };

  const getContentIcon = (type: ModuleContent['type']) => {
    switch (type) {
      case 'youtube': return <Play className="w-5 h-5 text-red-600" />;
      case 'article': return <FileText className="w-5 h-5 text-blue-600" />;
      case 'podcast': return <Headphones className="w-5 h-5 text-purple-600" />;
      case 'quiz': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'exercise': return <Book className="w-5 h-5 text-orange-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Module Not Found</h1>
            <Button onClick={() => navigate('/learning')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Learning
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const allContentCompleted = completedContent.length === module.content.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/learning')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Learning Dashboard
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {module.title}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {module.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {module.estimatedTime}
                </span>
                <span>{module.content.length} resources</span>
                <Badge variant="outline">{module.type}</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {module.skills.map((skill) => (
                  <Badge key={skill} className="bg-blue-100 text-blue-800">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            {allContentCompleted && (
              <Button onClick={handleCompleteModule} size="lg">
                <CheckCircle className="w-5 h-5 mr-2" />
                Complete Module
              </Button>
            )}
          </div>
        </div>

        {/* Prerequisites */}
        {module.prerequisites && module.prerequisites.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Prerequisites</CardTitle>
              <CardDescription>
                Make sure you've completed these modules first
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {module.prerequisites.map((prereq) => (
                  <Badge key={prereq} variant="outline">
                    {prereq}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Learning Content */}
        <Card>
          <CardHeader>
            <CardTitle>Learning Resources</CardTitle>
            <CardDescription>
              Complete all resources to finish this module
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {module.content.map((content, index) => {
                const isCompleted = completedContent.includes(content.id);
                
                return (
                  <div 
                    key={content.id}
                    className={`border rounded-lg p-4 ${
                      isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">
                          {getContentIcon(content.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold mb-1 ${
                            isCompleted ? 'text-green-900' : 'text-gray-900'
                          }`}>
                            {content.title}
                          </h3>
                          <p className={`text-sm mb-2 ${
                            isCompleted ? 'text-green-700' : 'text-gray-600'
                          }`}>
                            {content.description}
                          </p>
                          {content.duration && (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              {content.duration}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        {content.url && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(content.url, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Open
                          </Button>
                        )}
                        
                        {isCompleted ? (
                          <Button variant="outline" size="sm" disabled>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Completed
                          </Button>
                        ) : (
                          <Button 
                            onClick={() => handleCompleteContent(content.id)}
                            size="sm"
                          >
                            Mark Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {allContentCompleted && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">All resources completed!</span>
                </div>
                <p className="text-green-700 mt-1">
                  Great job! Click "Complete Module" to finish this module and unlock the next one.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModuleDetail;
