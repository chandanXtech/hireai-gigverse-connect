
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/Navigation';
import { VideoPlayer } from '@/components/VideoPlayer';
import { VideoQuiz } from '@/components/VideoQuiz';
import { 
  ArrowLeft, 
  Play, 
  Book, 
  Headphones, 
  FileText,
  CheckCircle,
  Clock,
  ExternalLink,
  Trophy,
  Flame,
  Target
} from 'lucide-react';
import { learningService, type Module } from '@/lib/services/learningService';
import { useToast } from '@/hooks/use-toast';

const ModuleDetail = () => {
  const { moduleId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);
  const [completedContent, setCompletedContent] = useState<string[]>([]);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [videoProgress, setVideoProgress] = useState<Record<string, number>>({});
  const [bookmarkedVideos, setBookmarkedVideos] = useState<string[]>([]);
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    loadModule();
  }, [moduleId]);

  const loadModule = async () => {
    try {
      const careerGoals = await learningService.getCareerGoals();
      const foundModule = careerGoals
        .flatMap(goal => goal.modules)
        .find(m => m.id === moduleId);
      
      setModule(foundModule || null);
      
      // Load student progress if available
      if (user?.id) {
        const progress = await learningService.getStudentProgress(user.id);
        if (progress) {
          setVideoProgress(progress.videoProgress || {});
          setBookmarkedVideos(progress.bookmarkedVideos || []);
          setQuizScores(progress.quizScores || {});
        }
      }
    } catch (error) {
      console.error('Error loading module:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteContent = (contentId: string) => {
    setCompletedContent(prev => [...prev, contentId]);
    toast({
      title: "Content Completed!",
      description: "Great job! Keep up the learning momentum.",
    });
  };

  const handleVideoProgress = async (videoId: string, progress: number) => {
    if (!user?.id) return;
    
    setVideoProgress(prev => ({ ...prev, [videoId]: progress }));
    
    try {
      await learningService.updateVideoProgress(user.id, videoId, progress);
      
      if (progress >= 90 && !completedContent.includes(videoId)) {
        handleCompleteContent(videoId);
      }
    } catch (error) {
      console.error('Error updating video progress:', error);
    }
  };

  const handleVideoBookmark = async (videoId: string) => {
    if (!user?.id) return;
    
    try {
      await learningService.toggleVideoBookmark(user.id, videoId);
      
      setBookmarkedVideos(prev => {
        const isBookmarked = prev.includes(videoId);
        if (isBookmarked) {
          toast({ title: "Bookmark removed" });
          return prev.filter(id => id !== videoId);
        } else {
          toast({ title: "Video bookmarked!" });
          return [...prev, videoId];
        }
      });
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const handleQuizComplete = async (score: number) => {
    if (!user?.id || !moduleId) return;
    
    try {
      await learningService.saveQuizScore(user.id, moduleId, score);
      setQuizScores(prev => ({ ...prev, [moduleId]: score }));
      
      toast({
        title: "Quiz Completed!",
        description: `You scored ${score}%${score >= 80 ? ' - Excellent work!' : score >= 60 ? ' - Good job!' : ' - Keep practicing!'}`,
      });
      
      if (score >= 60) {
        setShowQuiz(false);
      }
    } catch (error) {
      console.error('Error saving quiz score:', error);
    }
  };

  const handleCompleteModule = async () => {
    if (!user?.id || !moduleId) return;
    
    try {
      await learningService.updateModuleProgress(user.id, moduleId, 'completed');
      toast({
        title: "Module Completed! 🎉",
        description: "You've successfully completed this module. Your skills have been updated!",
      });
      navigate('/learning');
    } catch (error) {
      console.error('Error completing module:', error);
    }
  };

  const getContentIcon = (type: string) => {
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
  const hasQuiz = module.quiz && module.quiz.length > 0;
  const quizCompleted = hasQuiz && quizScores[moduleId] !== undefined;
  const canCompleteModule = allContentCompleted && (!hasQuiz || quizCompleted);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
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
          
          <div className="flex items-start justify-between mb-6">
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
            
            {canCompleteModule && (
              <Button onClick={handleCompleteModule} size="lg" className="bg-green-600 hover:bg-green-700">
                <Trophy className="w-5 h-5 mr-2" />
                Complete Module
              </Button>
            )}
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Target className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Progress</p>
                    <p className="text-lg font-semibold">
                      {completedContent.length}/{module.content.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Flame className="w-8 h-8 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Bookmarks</p>
                    <p className="text-lg font-semibold">
                      {bookmarkedVideos.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {hasQuiz && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Quiz Score</p>
                      <p className="text-lg font-semibold">
                        {quizScores[moduleId] !== undefined ? `${quizScores[moduleId]}%` : 'Not taken'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Video Player */}
            {activeVideoId && (
              <div className="mb-6">
                <VideoPlayer
                  videoId={activeVideoId}
                  title={module.content.find(c => c.id === activeVideoId)?.title || ''}
                  duration={module.content.find(c => c.id === activeVideoId)?.duration}
                  onProgress={(progress) => handleVideoProgress(activeVideoId, progress)}
                  onComplete={() => handleCompleteContent(activeVideoId)}
                  isCompleted={completedContent.includes(activeVideoId)}
                  isBookmarked={bookmarkedVideos.includes(activeVideoId)}
                  onBookmark={() => handleVideoBookmark(activeVideoId)}
                />
              </div>
            )}

            {/* Learning Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Resources</CardTitle>
                <CardDescription>
                  Complete all resources to finish this module
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {module.content.map((content) => {
                    const isCompleted = completedContent.includes(content.id);
                    const progress = videoProgress[content.id] || 0;
                    
                    return (
                      <div 
                        key={content.id}
                        className={`border rounded-lg p-4 ${
                          isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                        } ${activeVideoId === content.id ? 'ring-2 ring-blue-500' : ''}`}
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
                              
                              {/* Video Progress Bar */}
                              {content.type === 'youtube' && progress > 0 && (
                                <div className="mb-2">
                                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>Progress</span>
                                    <span>{Math.round(progress)}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-1">
                                    <div 
                                      className="bg-blue-600 h-1 rounded-full transition-all duration-300" 
                                      style={{ width: `${progress}%` }}
                                    />
                                  </div>
                                </div>
                              )}
                              
                              {content.duration && (
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Clock className="w-3 h-3" />
                                  {content.duration}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 ml-4">
                            {content.type === 'youtube' && (
                              <Button
                                variant={activeVideoId === content.id ? "default" : "outline"}
                                size="sm"
                                onClick={() => setActiveVideoId(
                                  activeVideoId === content.id ? null : content.id
                                )}
                              >
                                <Play className="w-4 h-4 mr-2" />
                                {activeVideoId === content.id ? 'Hide' : 'Watch'}
                              </Button>
                            )}
                            
                            {content.url && content.type !== 'youtube' && (
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
              </CardContent>
            </Card>

            {/* Module Quiz */}
            {hasQuiz && (
              <Card>
                <CardHeader>
                  <CardTitle>Module Assessment</CardTitle>
                  <CardDescription>
                    Test your understanding with this quiz
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!showQuiz ? (
                    <div className="text-center py-6">
                      <h3 className="text-lg font-semibold mb-2">Ready for the quiz?</h3>
                      <p className="text-gray-600 mb-4">
                        Complete the quiz to test your knowledge and earn your certificate.
                      </p>
                      {quizCompleted && (
                        <p className="text-green-600 mb-4">
                          Previous score: {quizScores[moduleId]}%
                        </p>
                      )}
                      <Button onClick={() => setShowQuiz(true)}>
                        {quizCompleted ? 'Retake Quiz' : 'Start Quiz'}
                      </Button>
                    </div>
                  ) : (
                    <VideoQuiz
                      questions={module.quiz!}
                      onComplete={handleQuizComplete}
                      isCompleted={quizCompleted}
                      lastScore={quizScores[moduleId]}
                    />
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Prerequisites */}
            {module.prerequisites && module.prerequisites.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Prerequisites</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {module.prerequisites.map((prereq) => (
                      <Badge key={prereq} variant="outline" className="block w-fit">
                        {prereq}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/learning')}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
                
                {hasQuiz && !showQuiz && (
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setShowQuiz(true)}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Take Quiz
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Completion Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Module Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Resources</span>
                      <span>{completedContent.length}/{module.content.length}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ 
                          width: `${(completedContent.length / module.content.length) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                  
                  {hasQuiz && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Quiz</span>
                        <span>{quizCompleted ? 'Completed' : 'Pending'}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            quizCompleted ? 'bg-green-600' : 'bg-gray-200'
                          }`} 
                          style={{ width: quizCompleted ? '100%' : '0%' }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                {allContentCompleted && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium">All resources completed!</span>
                    </div>
                    {hasQuiz && !quizCompleted && (
                      <p className="text-green-700 text-sm mt-1">
                        Complete the quiz to finish this module.
                      </p>
                    )}
                    {canCompleteModule && (
                      <p className="text-green-700 text-sm mt-1">
                        Ready to complete the module!
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetail;
