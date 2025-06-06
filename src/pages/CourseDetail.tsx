
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Clock, Users, Star, PlayCircle, CheckCircle, ArrowLeft, Award, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  // Mock course data - in a real app this would come from an API
  const courseData = {
    'fullstack-dev': {
      title: 'Full Stack Web Development',
      description: 'Master modern web development with React, Node.js, and databases. Build production-ready applications.',
      level: 'Intermediate',
      duration: '12 weeks',
      modules: 24,
      enrolledUsers: 15420,
      rating: 4.8,
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'API Design'],
      certification: true,
      instructor: 'Sarah Johnson',
      price: 'Free',
      modules_list: [
        { id: 1, title: 'Introduction to Full Stack Development', duration: '45 min', completed: false },
        { id: 2, title: 'Setting up Development Environment', duration: '30 min', completed: false },
        { id: 3, title: 'HTML5 & CSS3 Fundamentals', duration: '90 min', completed: false },
        { id: 4, title: 'JavaScript ES6+ Features', duration: '120 min', completed: false },
        { id: 5, title: 'React Components and JSX', duration: '90 min', completed: false },
        { id: 6, title: 'State Management with Hooks', duration: '75 min', completed: false },
        { id: 7, title: 'Node.js and Express Setup', duration: '60 min', completed: false },
        { id: 8, title: 'Database Design with MongoDB', duration: '90 min', completed: false },
        { id: 9, title: 'API Development and Testing', duration: '120 min', completed: false },
        { id: 10, title: 'Authentication & Authorization', duration: '90 min', completed: false },
      ]
    }
  };

  const course = courseData[courseId as keyof typeof courseData];

  useEffect(() => {
    if (!course) {
      navigate('/dashboard');
      return;
    }
  }, [course, navigate]);

  const handleEnroll = () => {
    setIsEnrolled(true);
    toast({
      title: "🎉 Successfully Enrolled!",
      description: `Welcome to ${course.title}. Let's start your learning journey!`,
    });
  };

  const handleStartModule = (moduleId: number) => {
    toast({
      title: "📚 Module Started!",
      description: `Starting module ${moduleId}. Good luck with your learning!`,
    });
    // Update progress
    setProgress(prev => Math.min(100, prev + 10));
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-600">Course not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')}
          className="mb-6 hover:bg-white/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Course Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{course.title}</CardTitle>
                    <CardDescription className="text-base">{course.description}</CardDescription>
                    <div className="flex items-center gap-4 mt-4">
                      <Badge variant="outline">{course.level}</Badge>
                      {course.certification && (
                        <Badge className="bg-green-500">Certified</Badge>
                      )}
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Clock className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                    <div className="text-sm font-medium">{course.duration}</div>
                    <div className="text-xs text-gray-600">Duration</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <BookOpen className="w-5 h-5 mx-auto mb-1 text-green-600" />
                    <div className="text-sm font-medium">{course.modules}</div>
                    <div className="text-xs text-gray-600">Modules</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <Users className="w-5 h-5 mx-auto mb-1 text-purple-600" />
                    <div className="text-sm font-medium">{course.enrolledUsers.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Students</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <Award className="w-5 h-5 mx-auto mb-1 text-orange-600" />
                    <div className="text-sm font-medium">{course.price}</div>
                    <div className="text-xs text-gray-600">Price</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Skills you'll learn:</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.skills.map(skill => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enrollment Card */}
          <div>
            <Card className="border-0 shadow-lg sticky top-6">
              <CardHeader>
                <CardTitle className="text-center">Ready to Start?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isEnrolled ? (
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    size="lg"
                    onClick={handleEnroll}
                  >
                    Enroll Now - Free
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-3" />
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500"
                      size="lg"
                    >
                      Continue Learning
                    </Button>
                  </div>
                )}
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>24/7 support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Course Content */}
        <Tabs defaultValue="curriculum" className="space-y-6">
          <TabsList>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="curriculum">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Course Curriculum</CardTitle>
                <CardDescription>
                  {course.modules} modules • {course.duration} total duration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {course.modules_list.map((module, index) => (
                    <div key={module.id} className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        module.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {module.completed ? <CheckCircle className="w-4 h-4" /> : index + 1}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{module.title}</h4>
                        <p className="text-xs text-gray-600">{module.duration}</p>
                      </div>
                      
                      {isEnrolled && (
                        <Button 
                          size="sm"
                          variant={module.completed ? "outline" : "default"}
                          onClick={() => handleStartModule(module.id)}
                        >
                          <PlayCircle className="w-4 h-4 mr-1" />
                          {module.completed ? 'Review' : 'Start'}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructor">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Meet Your Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    SJ
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{course.instructor}</h3>
                    <p className="text-gray-600 mb-3">Senior Full Stack Developer & Tech Educator</p>
                    <p className="text-sm text-gray-700">
                      Sarah has over 8 years of experience in web development and has taught thousands of students 
                      worldwide. She specializes in modern JavaScript frameworks and cloud technologies.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Student Reviews</CardTitle>
                <CardDescription>{course.rating} stars • {course.enrolledUsers.toLocaleString()} reviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Alex M.', rating: 5, comment: 'Excellent course! Very practical and well-structured.' },
                    { name: 'Jessica L.', rating: 5, comment: 'Great instructor and comprehensive content.' },
                    { name: 'Mike R.', rating: 4, comment: 'Good course, learned a lot about full stack development.' }
                  ].map((review, index) => (
                    <div key={index} className="border-b pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{review.name}</span>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CourseDetail;
