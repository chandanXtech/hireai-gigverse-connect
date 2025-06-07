
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Play, CheckCircle, Target, Zap, Bell } from 'lucide-react';

interface MicroModule {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'quiz' | 'flashcard' | 'infographic' | 'exercise';
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  points: number;
  completed: boolean;
  thumbnail?: string;
  content: any;
}

interface LearningStreak {
  current: number;
  longest: number;
  lastCompletedDate: string;
}

export const MicrolearningHub = () => {
  const [modules, setModules] = useState<MicroModule[]>([]);
  const [currentModule, setCurrentModule] = useState<MicroModule | null>(null);
  const [streak, setStreak] = useState<LearningStreak>({ current: 7, longest: 15, lastCompletedDate: new Date().toISOString() });
  const [dailyGoal, setDailyGoal] = useState(3);
  const [completedToday, setCompletedToday] = useState(2);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadMicroModules();
  }, []);

  const loadMicroModules = () => {
    const mockModules: MicroModule[] = [
      {
        id: '1',
        title: 'React Hooks Basics',
        description: 'Quick intro to useState and useEffect',
        type: 'video',
        duration: 5,
        difficulty: 'beginner',
        category: 'React',
        points: 50,
        completed: true,
        content: { videoUrl: 'react-hooks-intro', transcript: 'useState allows...' }
      },
      {
        id: '2',
        title: 'CSS Flexbox Quiz',
        description: 'Test your flexbox knowledge',
        type: 'quiz',
        duration: 3,
        difficulty: 'intermediate',
        category: 'CSS',
        points: 75,
        completed: false,
        content: {
          questions: [
            {
              question: 'Which property centers items horizontally in flexbox?',
              options: ['align-items', 'justify-content', 'flex-direction', 'flex-wrap'],
              correct: 1
            }
          ]
        }
      },
      {
        id: '3',
        title: 'JavaScript Array Methods',
        description: 'Flashcards for map, filter, reduce',
        type: 'flashcard',
        duration: 4,
        difficulty: 'intermediate',
        category: 'JavaScript',
        points: 60,
        completed: false,
        content: {
          cards: [
            { front: 'map()', back: 'Creates new array with results of calling function on every element' },
            { front: 'filter()', back: 'Creates new array with elements that pass a test function' }
          ]
        }
      },
      {
        id: '4',
        title: 'Git Workflow',
        description: 'Visual guide to git branching',
        type: 'infographic',
        duration: 6,
        difficulty: 'beginner',
        category: 'Git',
        points: 40,
        completed: false,
        content: { imageUrl: 'git-workflow.png', annotations: ['main branch', 'feature branch'] }
      },
      {
        id: '5',
        title: 'Build a Todo Component',
        description: 'Quick coding exercise',
        type: 'exercise',
        duration: 8,
        difficulty: 'intermediate',
        category: 'React',
        points: 100,
        completed: false,
        content: {
          prompt: 'Create a todo list component with add/remove functionality',
          starterCode: 'import React from "react";',
          solution: 'Complete solution here...'
        }
      }
    ];
    setModules(mockModules);
  };

  const categories = ['all', ...Array.from(new Set(modules.map(m => m.category)))];
  const filteredModules = selectedCategory === 'all' 
    ? modules 
    : modules.filter(m => m.category === selectedCategory);

  const completeModule = (moduleId: string) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId ? { ...module, completed: true } : module
    ));
    setCompletedToday(prev => prev + 1);
    
    // Update streak if completing for the first time today
    const today = new Date().toDateString();
    const lastCompleted = new Date(streak.lastCompletedDate).toDateString();
    
    if (today !== lastCompleted) {
      setStreak(prev => ({
        current: prev.current + 1,
        longest: Math.max(prev.longest, prev.current + 1),
        lastCompletedDate: new Date().toISOString()
      }));
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'quiz': return <Target className="w-4 h-4" />;
      case 'flashcard': return <Zap className="w-4 h-4" />;
      case 'infographic': return <CheckCircle className="w-4 h-4" />;
      case 'exercise': return <Clock className="w-4 h-4" />;
      default: return <Play className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Learning Streak</p>
                <p className="text-2xl font-bold text-orange-600">{streak.current} days</p>
              </div>
              <div className="text-orange-500">
                <Zap className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Progress</p>
                <p className="text-2xl font-bold text-blue-600">{completedToday}/{dailyGoal}</p>
              </div>
              <div className="text-blue-500">
                <Target className="w-8 h-8" />
              </div>
            </div>
            <Progress value={(completedToday / dailyGoal) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Points</p>
                <p className="text-2xl font-bold text-green-600">
                  {modules.filter(m => m.completed).reduce((sum, m) => sum + m.points, 0)}
                </p>
              </div>
              <div className="text-green-500">
                <CheckCircle className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Next Reminder</p>
                <p className="text-lg font-semibold">In 2 hours</p>
              </div>
              <div className="text-purple-500">
                <Bell className="w-8 h-8" />
              </div>
            </div>
            <Button size="sm" variant="outline" className="mt-2 w-full">
              Set Schedule
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Microlearning Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredModules.map(module => (
          <Card key={module.id} className={`hover:shadow-lg transition-all cursor-pointer ${
            module.completed ? 'bg-green-50 border-green-200' : 'hover:border-blue-300'
          }`}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(module.type)}
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                </div>
                {module.completed && <CheckCircle className="w-5 h-5 text-green-600" />}
              </div>
              <CardDescription className="text-sm">{module.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{module.duration} min</span>
                </div>
                <Badge className={getDifficultyColor(module.difficulty)}>
                  {module.difficulty}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-purple-600">
                  +{module.points} points
                </span>
                <Button 
                  size="sm" 
                  onClick={() => completeModule(module.id)}
                  disabled={module.completed}
                  className={module.completed ? 'bg-green-100 text-green-800' : ''}
                >
                  {module.completed ? 'Completed' : 'Start'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Learning Options */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Jump into bite-sized learning sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-20 flex-col">
              <Play className="w-6 h-6 mb-2" />
              <span>5-min Video</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Target className="w-6 h-6 mb-2" />
              <span>Quick Quiz</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Zap className="w-6 h-6 mb-2" />
              <span>Flashcards</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Clock className="w-6 h-6 mb-2" />
              <span>2-min Review</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Daily Challenge */}
      <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Daily Challenge</h3>
              <p className="text-purple-100 mb-3">
                Complete any 3 modules to maintain your streak and earn bonus points!
              </p>
              <div className="flex items-center gap-2">
                <Progress value={(completedToday / dailyGoal) * 100} className="w-32" />
                <span className="text-sm">{completedToday}/{dailyGoal}</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">+50</div>
              <div className="text-purple-100">Bonus Points</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
