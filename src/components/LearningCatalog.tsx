import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, BookOpen, Clock, Users, Star, TrendingUp, Award, Code, Palette, Dumbbell, ChefHat, Briefcase, Heart, Camera, Music, Gamepad2, TreePine } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  modules: number;
  enrolledUsers: number;
  rating: number;
  icon: React.ReactNode;
  skills: string[];
  prerequisites?: string[];
  certification: boolean;
  trending?: boolean;
}

const learningPaths: LearningPath[] = [
  // Technology & Programming
  {
    id: 'fullstack-dev',
    title: 'Full Stack Web Development',
    description: 'Master modern web development with React, Node.js, and databases. Build production-ready applications.',
    category: 'Technology',
    level: 'Intermediate',
    duration: '12 weeks',
    modules: 24,
    enrolledUsers: 15420,
    rating: 4.8,
    icon: <Code className="w-6 h-6" />,
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'API Design'],
    certification: true,
    trending: true
  },
  {
    id: 'ai-ml',
    title: 'Artificial Intelligence & Machine Learning',
    description: 'Learn AI fundamentals, machine learning algorithms, and deep learning with hands-on projects.',
    category: 'Technology',
    level: 'Advanced',
    duration: '16 weeks',
    modules: 32,
    enrolledUsers: 12890,
    rating: 4.9,
    icon: <Code className="w-6 h-6" />,
    skills: ['Python', 'TensorFlow', 'Neural Networks', 'Data Science', 'NLP'],
    prerequisites: ['Programming Basics', 'Statistics'],
    certification: true,
    trending: true
  },
  {
    id: 'mobile-dev',
    title: 'Mobile App Development',
    description: 'Create iOS and Android apps using React Native and Flutter. Deploy to app stores.',
    category: 'Technology',
    level: 'Intermediate',
    duration: '10 weeks',
    modules: 20,
    enrolledUsers: 8750,
    rating: 4.7,
    icon: <Code className="w-6 h-6" />,
    skills: ['React Native', 'Flutter', 'Dart', 'Mobile UI/UX', 'App Store Deployment'],
    certification: true
  },

  // Design & Creative Arts
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design Mastery',
    description: 'Design beautiful and functional user interfaces. Learn user research, prototyping, and design systems.',
    category: 'Design',
    level: 'Beginner',
    duration: '8 weeks',
    modules: 16,
    enrolledUsers: 11230,
    rating: 4.6,
    icon: <Palette className="w-6 h-6" />,
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Usability Testing'],
    certification: true,
    trending: true
  },
  {
    id: 'digital-art',
    title: 'Digital Art & Illustration',
    description: 'Master digital painting, character design, and concept art using industry-standard tools.',
    category: 'Design',
    level: 'Intermediate',
    duration: '12 weeks',
    modules: 24,
    enrolledUsers: 6540,
    rating: 4.8,
    icon: <Palette className="w-6 h-6" />,
    skills: ['Photoshop', 'Procreate', 'Character Design', 'Color Theory', 'Digital Painting'],
    certification: true
  },
  {
    id: 'photography',
    title: 'Professional Photography',
    description: 'Learn composition, lighting, and post-processing. From portraits to landscapes and commercial work.',
    category: 'Design',
    level: 'Beginner',
    duration: '6 weeks',
    modules: 12,
    enrolledUsers: 9870,
    rating: 4.7,
    icon: <Camera className="w-6 h-6" />,
    skills: ['Camera Settings', 'Composition', 'Lightroom', 'Portrait Photography', 'Street Photography'],
    certification: true
  },

  // Health & Fitness
  {
    id: 'fitness-training',
    title: 'Personal Fitness & Nutrition',
    description: 'Complete fitness guide with workout plans, nutrition science, and habit formation strategies.',
    category: 'Health & Fitness',
    level: 'Beginner',
    duration: '8 weeks',
    modules: 16,
    enrolledUsers: 18950,
    rating: 4.5,
    icon: <Dumbbell className="w-6 h-6" />,
    skills: ['Strength Training', 'Cardio', 'Nutrition Planning', 'Meal Prep', 'Recovery'],
    certification: true,
    trending: true
  },
  {
    id: 'yoga-meditation',
    title: 'Yoga & Mindfulness',
    description: 'Practice yoga, meditation, and breathing techniques for physical and mental wellness.',
    category: 'Health & Fitness',
    level: 'Beginner',
    duration: '4 weeks',
    modules: 8,
    enrolledUsers: 14230,
    rating: 4.8,
    icon: <Heart className="w-6 h-6" />,
    skills: ['Yoga Poses', 'Meditation', 'Breathing Techniques', 'Mindfulness', 'Stress Management'],
    certification: false
  },

  // Culinary Arts
  {
    id: 'culinary-arts',
    title: 'Culinary Arts Mastery',
    description: 'Professional cooking techniques, knife skills, and cuisine from around the world.',
    category: 'Culinary',
    level: 'Intermediate',
    duration: '10 weeks',
    modules: 20,
    enrolledUsers: 7650,
    rating: 4.7,
    icon: <ChefHat className="w-6 h-6" />,
    skills: ['Knife Skills', 'French Techniques', 'Baking', 'Food Safety', 'Menu Planning'],
    certification: true
  },
  {
    id: 'baking-pastry',
    title: 'Professional Baking & Pastry',
    description: 'Master bread making, pastries, cakes, and dessert presentation for professional kitchens.',
    category: 'Culinary',
    level: 'Advanced',
    duration: '12 weeks',
    modules: 24,
    enrolledUsers: 4320,
    rating: 4.9,
    icon: <ChefHat className="w-6 h-6" />,
    skills: ['Bread Making', 'Pastry Arts', 'Cake Decorating', 'Chocolate Work', 'Sugar Art'],
    prerequisites: ['Basic Cooking'],
    certification: true
  },

  // Business & Finance
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Analytics',
    description: 'Complete digital marketing strategy including SEO, social media, content marketing, and analytics.',
    category: 'Business',
    level: 'Intermediate',
    duration: '8 weeks',
    modules: 16,
    enrolledUsers: 13540,
    rating: 4.6,
    icon: <Briefcase className="w-6 h-6" />,
    skills: ['SEO', 'Google Ads', 'Social Media Marketing', 'Content Strategy', 'Analytics'],
    certification: true,
    trending: true
  },
  {
    id: 'trading-finance',
    title: 'Stock Trading & Financial Markets',
    description: 'Learn technical analysis, fundamental analysis, risk management, and trading strategies.',
    category: 'Business',
    level: 'Advanced',
    duration: '12 weeks',
    modules: 24,
    enrolledUsers: 9870,
    rating: 4.4,
    icon: <TrendingUp className="w-6 h-6" />,
    skills: ['Technical Analysis', 'Risk Management', 'Options Trading', 'Portfolio Management', 'Market Psychology'],
    prerequisites: ['Basic Finance'],
    certification: true
  },

  // Music & Entertainment
  {
    id: 'music-production',
    title: 'Music Production & Audio Engineering',
    description: 'Create professional music tracks, learn mixing, mastering, and music theory.',
    category: 'Music',
    level: 'Intermediate',
    duration: '10 weeks',
    modules: 20,
    enrolledUsers: 6780,
    rating: 4.8,
    icon: <Music className="w-6 h-6" />,
    skills: ['DAW', 'Mixing', 'Mastering', 'Music Theory', 'Sound Design'],
    certification: true
  },
  {
    id: 'game-development',
    title: 'Game Development',
    description: 'Build 2D and 3D games using Unity and Unreal Engine. Learn game design principles.',
    category: 'Technology',
    level: 'Advanced',
    duration: '16 weeks',
    modules: 32,
    enrolledUsers: 8920,
    rating: 4.7,
    icon: <Gamepad2 className="w-6 h-6" />,
    skills: ['Unity', 'C#', 'Game Design', '3D Modeling', 'Game Physics'],
    prerequisites: ['Programming Basics'],
    certification: true
  },

  // Outdoor & Sports
  {
    id: 'outdoor-survival',
    title: 'Outdoor Survival & Wilderness Skills',
    description: 'Essential wilderness survival skills, navigation, shelter building, and emergency preparedness.',
    category: 'Outdoor',
    level: 'Intermediate',
    duration: '6 weeks',
    modules: 12,
    enrolledUsers: 3450,
    rating: 4.9,
    icon: <TreePine className="w-6 h-6" />,
    skills: ['Navigation', 'Shelter Building', 'Fire Making', 'Water Purification', 'Emergency First Aid'],
    certification: true
  }
];

const categories = [
  'All',
  'Technology',
  'Design',
  'Health & Fitness',
  'Culinary',
  'Business',
  'Music',
  'Outdoor'
];

const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export const LearningCatalog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredPaths = learningPaths.filter(path => {
    const matchesSearch = path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         path.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         path.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || path.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || path.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const trendingPaths = learningPaths.filter(path => path.trending);
  const popularPaths = learningPaths.sort((a, b) => b.enrolledUsers - a.enrolledUsers).slice(0, 6);

  const handleStartLearning = (pathId: string, pathTitle: string) => {
    // Simulate enrollment
    toast({
      title: "🚀 Course Started!",
      description: `You've successfully enrolled in ${pathTitle}. Let's begin your learning journey!`,
    });
    
    // Navigate to a course detail page or learning module
    navigate(`/learning/course/${pathId}`);
  };

  const handlePreview = (pathId: string, pathTitle: string) => {
    toast({
      title: "👀 Preview Available",
      description: `Opening preview for ${pathTitle}`,
    });
  };

  const handleProjectsView = (pathId: string) => {
    toast({
      title: "📁 Projects",
      description: "Opening project gallery for this course",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Learning Catalog</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Master new skills with our comprehensive learning platform. From coding to cooking, 
          fitness to finance - we have expertly crafted courses for every passion.
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for courses, skills, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-lg py-6"
              />
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Level</label>
                <div className="flex flex-wrap gap-2">
                  {levels.map(level => (
                    <Button
                      key={level}
                      variant={selectedLevel === level ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedLevel(level)}
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="popular">Most Popular</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredPaths.length} Learning Paths Available
            </h2>
            <Badge variant="secondary" className="text-sm">
              Updated Daily
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPaths.map(path => (
              <Card key={path.id} className="hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                        {path.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-tight">{path.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{path.level}</Badge>
                          {path.certification && (
                            <Badge className="bg-green-500 text-xs">Certified</Badge>
                          )}
                          {path.trending && (
                            <Badge className="bg-orange-500 text-xs">Trending</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-sm leading-relaxed">
                    {path.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {path.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {path.modules} modules
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {path.enrolledUsers.toLocaleString()} enrolled
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {path.rating}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-900">Skills you'll learn:</h4>
                    <div className="flex flex-wrap gap-1">
                      {path.skills.slice(0, 3).map(skill => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {path.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{path.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {path.prerequisites && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-900">Prerequisites:</h4>
                      <div className="flex flex-wrap gap-1">
                        {path.prerequisites.map(prereq => (
                          <Badge key={prereq} variant="outline" className="text-xs">
                            {prereq}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all"
                      onClick={() => handleStartLearning(path.id, path.title)}
                    >
                      Start Learning
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handlePreview(path.id, path.title)}
                      className="hover:scale-105 transition-all"
                    >
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="space-y-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-900">Trending Learning Paths</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingPaths.map(path => (
              <Card key={path.id} className="hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white">
                        {path.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-tight">{path.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{path.level}</Badge>
                          <Badge className="bg-orange-500 text-xs">🔥 Trending</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-sm leading-relaxed">
                    {path.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {path.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {path.enrolledUsers.toLocaleString()}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-900">Skills you'll learn:</h4>
                    <div className="flex flex-wrap gap-1">
                      {path.skills.slice(0, 3).map(skill => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 transform hover:scale-105 transition-all"
                    onClick={() => handleStartLearning(path.id, path.title)}
                  >
                    Join the Trend
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="space-y-6">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-bold text-gray-900">Most Popular Courses</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularPaths.map((path, index) => (
              <Card key={path.id} className="hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-white">
                        {index < 3 ? <Award className="w-6 h-6" /> : path.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-tight">{path.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{path.level}</Badge>
                          <Badge className="bg-yellow-500 text-xs">#{index + 1} Popular</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-sm leading-relaxed">
                    {path.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {path.enrolledUsers.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {path.rating}
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 transform hover:scale-105 transition-all"
                    onClick={() => handleStartLearning(path.id, path.title)}
                  >
                    Join {path.enrolledUsers.toLocaleString()}+ Students
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
