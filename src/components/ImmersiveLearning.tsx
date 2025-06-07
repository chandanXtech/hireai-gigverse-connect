import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Headphones, Monitor, Gamepad2, Brain, Code, Users, Star, Play, Pause, RotateCcw } from 'lucide-react';

interface ImmersiveExperience {
  id: string;
  title: string;
  type: 'vr' | 'ar' | 'simulation' | 'gamified' | '3d';
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  category: string;
  prerequisites: string[];
  learning_objectives: string[];
  technologies: string[];
  isUnlocked: boolean;
  progress: number;
  rating: number;
  participants: number;
}

interface VREnvironment {
  id: string;
  name: string;
  description: string;
  type: 'office' | 'lab' | 'classroom' | 'conference' | 'workshop';
  capacity: number;
  features: string[];
}

// Type definitions for WebXR
interface XRSystem {
  isSessionSupported(mode: string): Promise<boolean>;
  requestSession(mode: string): Promise<any>;
}

declare global {
  interface Navigator {
    xr?: XRSystem;
  }
}

export const ImmersiveLearning = () => {
  const [experiences, setExperiences] = useState<ImmersiveExperience[]>([]);
  const [vrEnvironments, setVREnvironments] = useState<VREnvironment[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<ImmersiveExperience | null>(null);
  const [isVRSupported, setIsVRSupported] = useState(false);
  const [isARSupported, setIsARSupported] = useState(false);
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    checkVRARSupport();
    loadImmersiveExperiences();
    loadVREnvironments();
  }, []);

  const checkVRARSupport = async () => {
    // Check for WebXR support
    if ('xr' in navigator && navigator.xr) {
      try {
        const vrSupported = await navigator.xr.isSessionSupported('immersive-vr');
        const arSupported = await navigator.xr.isSessionSupported('immersive-ar');
        setIsVRSupported(vrSupported);
        setIsARSupported(arSupported);
      } catch (error) {
        console.log('WebXR not supported:', error);
        setIsVRSupported(false);
        setIsARSupported(false);
      }
    }
  };

  const loadImmersiveExperiences = () => {
    const mockExperiences: ImmersiveExperience[] = [
      {
        id: '1',
        title: 'Virtual React Development Lab',
        type: 'vr',
        description: 'Code React components in a 3D virtual workspace with AI assistance',
        difficulty: 'intermediate',
        duration: '45 minutes',
        category: 'Frontend Development',
        prerequisites: ['Basic React knowledge', 'JavaScript fundamentals'],
        learning_objectives: [
          'Build React components in VR environment',
          'Debug code using 3D visualization',
          'Collaborate with virtual team members'
        ],
        technologies: ['React', 'WebXR', 'Three.js'],
        isUnlocked: true,
        progress: 65,
        rating: 4.8,
        participants: 234
      },
      {
        id: '2',
        title: 'AR Code Review Simulator',
        type: 'ar',
        description: 'Review and annotate code in augmented reality with spatial annotations',
        difficulty: 'advanced',
        duration: '30 minutes',
        category: 'Software Engineering',
        prerequisites: ['Programming experience', 'Code review fundamentals'],
        learning_objectives: [
          'Perform efficient code reviews in AR',
          'Use spatial annotations for feedback',
          'Navigate complex codebases in 3D'
        ],
        technologies: ['AR.js', 'WebXR', 'Git'],
        isUnlocked: true,
        progress: 0,
        rating: 4.6,
        participants: 156
      },
      {
        id: '3',
        title: 'Database Design in 3D Space',
        type: '3d',
        description: 'Visualize and design database schemas in interactive 3D environment',
        difficulty: 'intermediate',
        duration: '60 minutes',
        category: 'Database Management',
        prerequisites: ['SQL basics', 'Database concepts'],
        learning_objectives: [
          'Design ER diagrams in 3D space',
          'Visualize data relationships',
          'Optimize database performance'
        ],
        technologies: ['Three.js', 'SQL', 'MongoDB'],
        isUnlocked: false,
        progress: 0,
        rating: 4.7,
        participants: 89
      },
      {
        id: '4',
        title: 'Gamified Algorithm Challenges',
        type: 'gamified',
        description: 'Solve coding challenges in a game-like environment with rewards',
        difficulty: 'beginner',
        duration: '20 minutes',
        category: 'Algorithms',
        prerequisites: ['Basic programming'],
        learning_objectives: [
          'Master sorting algorithms through gameplay',
          'Understand time complexity visually',
          'Compete with peers in real-time'
        ],
        technologies: ['JavaScript', 'Canvas API', 'WebGL'],
        isUnlocked: true,
        progress: 80,
        rating: 4.9,
        participants: 567
      },
      {
        id: '5',
        title: 'Virtual Job Interview Practice',
        type: 'simulation',
        description: 'Practice technical interviews with AI interviewers in realistic settings',
        difficulty: 'intermediate',
        duration: '40 minutes',
        category: 'Interview Preparation',
        prerequisites: ['Programming skills', 'Communication basics'],
        learning_objectives: [
          'Handle technical interview questions',
          'Improve communication skills',
          'Build confidence through practice'
        ],
        technologies: ['WebRTC', 'AI/ML', 'Speech Recognition'],
        isUnlocked: true,
        progress: 25,
        rating: 4.5,
        participants: 345
      }
    ];

    setExperiences(mockExperiences);
  };

  const loadVREnvironments = () => {
    const mockEnvironments: VREnvironment[] = [
      {
        id: '1',
        name: 'Modern Tech Office',
        description: 'Sleek modern office environment with dual monitors and whiteboards',
        type: 'office',
        capacity: 8,
        features: ['Dual monitors', 'Interactive whiteboards', 'Virtual coffee machine', 'Collaboration spaces']
      },
      {
        id: '2',
        name: 'AI Research Lab',
        description: 'High-tech laboratory with quantum computers and AI visualization tools',
        type: 'lab',
        capacity: 6,
        features: ['Quantum computer simulation', 'Neural network visualizer', 'Data flow diagrams', 'Advanced terminals']
      },
      {
        id: '3',
        name: 'Interactive Classroom',
        description: 'Virtual classroom with 360° learning environments and holographic displays',
        type: 'classroom',
        capacity: 30,
        features: ['Holographic projectors', '360° screens', 'Interactive simulations', 'Group workstations']
      },
      {
        id: '4',
        name: 'Conference Room',
        description: 'Professional meeting space for team discussions and presentations',
        type: 'conference',
        capacity: 12,
        features: ['Presentation screens', 'Video conferencing', 'Document sharing', 'Virtual whiteboards']
      }
    ];

    setVREnvironments(mockEnvironments);
  };

  const startImmersiveSession = (experienceId: string) => {
    setActiveSession(experienceId);
    const experience = experiences.find(exp => exp.id === experienceId);
    setSelectedExperience(experience || null);
    
    if (experience?.type === 'vr' && isVRSupported) {
      initializeVRSession();
    } else if (experience?.type === 'ar' && isARSupported) {
      initializeARSession();
    } else {
      initialize3DSession();
    }
  };

  const initializeVRSession = async () => {
    try {
      if ('xr' in navigator && navigator.xr) {
        const session = await navigator.xr.requestSession('immersive-vr');
        console.log('VR session started:', session);
        // Initialize VR environment
        setupVREnvironment();
      }
    } catch (error) {
      console.error('Failed to start VR session:', error);
      // Fallback to 3D session
      initialize3DSession();
    }
  };

  const initializeARSession = async () => {
    try {
      if ('xr' in navigator && navigator.xr) {
        const session = await navigator.xr.requestSession('immersive-ar');
        console.log('AR session started:', session);
        // Initialize AR environment
        setupAREnvironment();
      }
    } catch (error) {
      console.error('Failed to start AR session:', error);
      // Fallback to 3D session
      initialize3DSession();
    }
  };

  const initialize3DSession = () => {
    console.log('Starting 3D session');
    setup3DEnvironment();
  };

  const setupVREnvironment = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Mock VR environment setup
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw VR environment mockup
      ctx.fillStyle = '#16213e';
      ctx.fillRect(50, 100, 700, 400);
      
      ctx.fillStyle = '#0f3460';
      ctx.fillRect(100, 150, 200, 300);
      ctx.fillRect(350, 150, 200, 300);
      ctx.fillRect(600, 150, 100, 300);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '20px Arial';
      ctx.fillText('VR Development Environment', 250, 75);
      ctx.font = '14px Arial';
      ctx.fillText('Code Editor', 120, 180);
      ctx.fillText('3D Visualization', 380, 180);
      ctx.fillText('Tools', 620, 180);
    }
  };

  const setupAREnvironment = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#f0f8ff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw AR overlay mockup
      ctx.strokeStyle = '#00ff00';
      ctx.lineWidth = 2;
      ctx.strokeRect(100, 100, 600, 300);
      
      ctx.fillStyle = '#00ff0020';
      ctx.fillRect(150, 150, 500, 200);
      
      ctx.fillStyle = '#000000';
      ctx.font = '18px Arial';
      ctx.fillText('AR Code Overlay', 300, 75);
      ctx.font = '12px Arial';
      ctx.fillText('// React Component', 170, 180);
      ctx.fillText('function MyComponent() {', 170, 200);
      ctx.fillText('  return <div>Hello World</div>;', 170, 220);
      ctx.fillText('}', 170, 240);
    }
  };

  const setup3DEnvironment = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#2c3e50';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw 3D space mockup
      ctx.fillStyle = '#34495e';
      ctx.fillRect(100, 150, 600, 250);
      
      // Draw 3D objects
      ctx.fillStyle = '#3498db';
      ctx.fillRect(150, 200, 100, 100);
      ctx.fillRect(300, 180, 120, 120);
      ctx.fillRect(500, 220, 80, 80);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '18px Arial';
      ctx.fillText('3D Learning Environment', 280, 75);
      ctx.font = '12px Arial';
      ctx.fillText('Interactive Objects', 320, 400);
    }
  };

  const endSession = () => {
    setActiveSession(null);
    setSelectedExperience(null);
    
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
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
      case 'vr': return <Eye className="w-5 h-5" />;
      case 'ar': return <Monitor className="w-5 h-5" />;
      case 'simulation': return <Brain className="w-5 h-5" />;
      case 'gamified': return <Gamepad2 className="w-5 h-5" />;
      case '3d': return <Code className="w-5 h-5" />;
      default: return <Monitor className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Immersive Learning Experiences</h1>
        <p className="text-gray-600">Learn through VR, AR, and interactive 3D environments</p>
        
        <div className="flex items-center justify-center gap-4 mt-4">
          <Badge variant={isVRSupported ? "default" : "secondary"}>
            VR {isVRSupported ? 'Supported' : 'Not Available'}
          </Badge>
          <Badge variant={isARSupported ? "default" : "secondary"}>
            AR {isARSupported ? 'Supported' : 'Not Available'}
          </Badge>
        </div>
      </div>

      {/* Active Session */}
      {activeSession && selectedExperience && (
        <Card className="border-2 border-blue-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getTypeIcon(selectedExperience.type)}
                <div>
                  <CardTitle>{selectedExperience.title}</CardTitle>
                  <CardDescription>Active Session - {selectedExperience.type.toUpperCase()}</CardDescription>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Pause className="w-4 h-4 mr-1" />
                  Pause
                </Button>
                <Button variant="outline" size="sm" onClick={endSession}>
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Exit
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <canvas 
              ref={canvasRef} 
              width={800} 
              height={500} 
              className="w-full border rounded-lg bg-gray-900"
            />
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Progress value={selectedExperience.progress} className="w-32" />
                  <span className="text-sm">{selectedExperience.progress}%</span>
                </div>
                <Badge>
                  {selectedExperience.participants} participants
                </Badge>
              </div>
              <Button>
                Continue Learning
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="experiences" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="experiences">Experiences</TabsTrigger>
          <TabsTrigger value="environments">VR Environments</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="experiences" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map(experience => (
              <Card key={experience.id} className={`hover:shadow-lg transition-all ${
                !experience.isUnlocked ? 'opacity-60' : ''
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(experience.type)}
                      <div>
                        <CardTitle className="text-lg">{experience.title}</CardTitle>
                        <CardDescription className="text-sm">{experience.category}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getDifficultyColor(experience.difficulty)}>
                      {experience.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{experience.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {experience.rating}
                    </span>
                    <span>{experience.duration}</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {experience.participants}
                    </span>
                  </div>
                  
                  {experience.progress > 0 && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{experience.progress}%</span>
                      </div>
                      <Progress value={experience.progress} />
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-1">
                    {experience.technologies.map(tech => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => startImmersiveSession(experience.id)}
                    disabled={!experience.isUnlocked}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {experience.progress > 0 ? 'Continue' : 'Start'} Experience
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="environments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vrEnvironments.map(env => (
              <Card key={env.id} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    {env.name}
                  </CardTitle>
                  <CardDescription>{env.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{env.type}</Badge>
                    <span className="text-sm text-gray-600">Capacity: {env.capacity}</span>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {env.features.map(feature => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    Enter Environment
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-blue-600">
                    {experiences.filter(e => e.progress > 0).length}
                  </h3>
                  <p className="text-gray-600">Experiences Started</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-600">
                    {experiences.filter(e => e.progress === 100).length}
                  </h3>
                  <p className="text-gray-600">Completed</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-purple-600">
                    {Math.round(experiences.reduce((sum, e) => sum + e.progress, 0) / experiences.length)}%
                  </h3>
                  <p className="text-gray-600">Average Progress</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>Your progress across different immersive experiences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {experiences.filter(e => e.progress > 0).map(experience => (
                  <div key={experience.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(experience.type)}
                      <div>
                        <p className="font-medium">{experience.title}</p>
                        <p className="text-sm text-gray-600">{experience.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={experience.progress} className="w-24" />
                      <span className="text-sm font-medium w-12">{experience.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
