
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Brain, Clock, Target, Play, Pause, RotateCcw, Lightbulb, Smile, Activity } from 'lucide-react';

interface PomodoroSession {
  id: string;
  type: 'work' | 'break' | 'long-break';
  duration: number; // in minutes
  completed: boolean;
  startTime?: Date;
}

interface WellnessMetric {
  date: string;
  focusScore: number;
  stressLevel: number;
  energyLevel: number;
  productivityScore: number;
}

interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  category: 'focus' | 'stress-relief' | 'motivation' | 'sleep' | 'breathing';
  audioUrl: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  type: 'stretching' | 'cardio' | 'strength' | 'flexibility' | 'eye-care';
  instructions: string[];
  benefits: string[];
}

export const WellnessTools = () => {
  const [currentTimer, setCurrentTimer] = useState<{
    timeLeft: number;
    isRunning: boolean;
    type: 'pomodoro' | 'break' | 'meditation' | 'exercise';
    sessionId?: string;
  }>({
    timeLeft: 25 * 60, // 25 minutes in seconds
    isRunning: false,
    type: 'pomodoro'
  });

  const [pomodoroSessions, setPomodoroSessions] = useState<PomodoroSession[]>([]);
  const [wellnessMetrics, setWellnessMetrics] = useState<WellnessMetric[]>([]);
  const [meditations, setMeditations] = useState<Meditation[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedMeditation, setSelectedMeditation] = useState<Meditation | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [dailyGoals, setDailyGoals] = useState({
    pomodoroSessions: 8,
    meditationMinutes: 10,
    exerciseMinutes: 15,
    stressLevel: 3 // max acceptable level
  });

  useEffect(() => {
    loadWellnessData();
    loadMeditations();
    loadExercises();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (currentTimer.isRunning && currentTimer.timeLeft > 0) {
      interval = setInterval(() => {
        setCurrentTimer(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);
    } else if (currentTimer.timeLeft === 0 && currentTimer.isRunning) {
      // Timer completed
      handleTimerComplete();
    }

    return () => clearInterval(interval);
  }, [currentTimer.isRunning, currentTimer.timeLeft]);

  const loadWellnessData = () => {
    const mockMetrics: WellnessMetric[] = [
      { date: '2024-01-01', focusScore: 85, stressLevel: 3, energyLevel: 7, productivityScore: 82 },
      { date: '2024-01-02', focusScore: 78, stressLevel: 4, energyLevel: 6, productivityScore: 75 },
      { date: '2024-01-03', focusScore: 92, stressLevel: 2, energyLevel: 8, productivityScore: 88 },
      { date: '2024-01-04', focusScore: 87, stressLevel: 3, energyLevel: 7, productivityScore: 85 },
      { date: '2024-01-05', focusScore: 90, stressLevel: 2, energyLevel: 9, productivityScore: 91 }
    ];
    setWellnessMetrics(mockMetrics);

    const mockSessions: PomodoroSession[] = [
      { id: '1', type: 'work', duration: 25, completed: true },
      { id: '2', type: 'break', duration: 5, completed: true },
      { id: '3', type: 'work', duration: 25, completed: true },
      { id: '4', type: 'break', duration: 5, completed: true },
      { id: '5', type: 'work', duration: 25, completed: false }
    ];
    setPomodoroSessions(mockSessions);
  };

  const loadMeditations = () => {
    const mockMeditations: Meditation[] = [
      {
        id: '1',
        title: 'Focus Booster',
        description: 'Enhance concentration and mental clarity for better learning',
        duration: 10,
        category: 'focus',
        audioUrl: '/audio/focus-meditation.mp3',
        difficulty: 'beginner'
      },
      {
        id: '2',
        title: 'Stress Relief',
        description: 'Release tension and anxiety to improve mental well-being',
        duration: 15,
        category: 'stress-relief',
        audioUrl: '/audio/stress-relief.mp3',
        difficulty: 'intermediate'
      },
      {
        id: '3',
        title: 'Motivation Boost',
        description: 'Increase motivation and drive for achieving your goals',
        duration: 8,
        category: 'motivation',
        audioUrl: '/audio/motivation.mp3',
        difficulty: 'beginner'
      },
      {
        id: '4',
        title: 'Deep Breathing',
        description: 'Simple breathing exercises to calm the mind',
        duration: 5,
        category: 'breathing',
        audioUrl: '/audio/breathing.mp3',
        difficulty: 'beginner'
      }
    ];
    setMeditations(mockMeditations);
  };

  const loadExercises = () => {
    const mockExercises: Exercise[] = [
      {
        id: '1',
        name: 'Desk Stretches',
        description: 'Simple stretches to relieve tension from prolonged sitting',
        duration: 5,
        type: 'stretching',
        instructions: [
          'Neck rolls: Slowly roll your head in a circle',
          'Shoulder shrugs: Lift shoulders to ears, hold for 5 seconds',
          'Spinal twist: Rotate your torso left and right',
          'Wrist circles: Rotate wrists clockwise and counterclockwise'
        ],
        benefits: ['Reduces muscle tension', 'Improves circulation', 'Prevents stiffness']
      },
      {
        id: '2',
        name: 'Eye Care Routine',
        description: 'Exercises to reduce eye strain from screen time',
        duration: 3,
        type: 'eye-care',
        instructions: [
          '20-20-20 rule: Look at something 20 feet away for 20 seconds',
          'Blink rapidly 20 times to refresh your eyes',
          'Palming: Cover eyes with palms for 30 seconds',
          'Focus shifting: Look at near and far objects alternately'
        ],
        benefits: ['Reduces eye strain', 'Prevents dry eyes', 'Improves focus']
      },
      {
        id: '3',
        name: 'Energy Boost Cardio',
        description: 'Quick cardio to increase energy and alertness',
        duration: 10,
        type: 'cardio',
        instructions: [
          'Jumping jacks: 30 seconds',
          'High knees: 30 seconds',
          'Desk push-ups: 10 repetitions',
          'Calf raises: 20 repetitions',
          'Repeat circuit 2 times'
        ],
        benefits: ['Increases energy', 'Improves circulation', 'Boosts mood']
      }
    ];
    setExercises(mockExercises);
  };

  const startTimer = (type: 'pomodoro' | 'break' | 'meditation' | 'exercise', duration?: number) => {
    let timeInSeconds;
    
    switch (type) {
      case 'pomodoro':
        timeInSeconds = 25 * 60; // 25 minutes
        break;
      case 'break':
        timeInSeconds = 5 * 60; // 5 minutes
        break;
      case 'meditation':
        timeInSeconds = duration ? duration * 60 : 10 * 60; // custom or 10 minutes
        break;
      case 'exercise':
        timeInSeconds = duration ? duration * 60 : 5 * 60; // custom or 5 minutes
        break;
      default:
        timeInSeconds = 25 * 60;
    }

    setCurrentTimer({
      timeLeft: timeInSeconds,
      isRunning: true,
      type,
      sessionId: Date.now().toString()
    });
  };

  const pauseTimer = () => {
    setCurrentTimer(prev => ({ ...prev, isRunning: false }));
  };

  const resumeTimer = () => {
    setCurrentTimer(prev => ({ ...prev, isRunning: true }));
  };

  const resetTimer = () => {
    setCurrentTimer({
      timeLeft: 25 * 60,
      isRunning: false,
      type: 'pomodoro'
    });
  };

  const handleTimerComplete = () => {
    setCurrentTimer(prev => ({ ...prev, isRunning: false }));
    
    // Play completion sound (would be implemented)
    console.log('Timer completed!');
    
    // Update session data
    if (currentTimer.type === 'pomodoro') {
      const newSession: PomodoroSession = {
        id: Date.now().toString(),
        type: 'work',
        duration: 25,
        completed: true,
        startTime: new Date()
      };
      setPomodoroSessions(prev => [...prev, newSession]);
    }
    
    // Show notification (would be implemented)
    if ('Notification' in window) {
      new Notification('Timer Complete!', {
        body: `Your ${currentTimer.type} session is finished.`,
        icon: '/icon.png'
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTodayStats = () => {
    const completedPomodoros = pomodoroSessions.filter(s => s.completed && s.type === 'work').length;
    const completedBreaks = pomodoroSessions.filter(s => s.completed && s.type === 'break').length;
    
    return {
      pomodoros: completedPomodoros,
      breaks: completedBreaks,
      focusTime: completedPomodoros * 25, // minutes
      totalSessions: completedPomodoros + completedBreaks
    };
  };

  const todayStats = getTodayStats();
  const latestMetrics = wellnessMetrics[wellnessMetrics.length - 1];

  const PomodoroTimer = () => (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Clock className="w-6 h-6" />
          Pomodoro Timer
        </CardTitle>
        <CardDescription>Stay focused with time-boxed work sessions</CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="text-6xl font-mono font-bold text-blue-600">
          {formatTime(currentTimer.timeLeft)}
        </div>
        
        <div className="flex items-center justify-center gap-2">
          <Badge variant={currentTimer.type === 'pomodoro' ? 'default' : 'outline'}>
            {currentTimer.type.charAt(0).toUpperCase() + currentTimer.type.slice(1)}
          </Badge>
          {currentTimer.isRunning && (
            <Badge variant="secondary" className="animate-pulse">
              Running
            </Badge>
          )}
        </div>

        <Progress 
          value={(1 - currentTimer.timeLeft / (25 * 60)) * 100} 
          className="w-full"
        />

        <div className="flex items-center justify-center gap-3">
          {!currentTimer.isRunning ? (
            <Button onClick={() => startTimer('pomodoro')} size="lg">
              <Play className="w-5 h-5 mr-2" />
              Start Focus
            </Button>
          ) : (
            <Button onClick={pauseTimer} variant="outline" size="lg">
              <Pause className="w-5 h-5 mr-2" />
              Pause
            </Button>
          )}
          
          {!currentTimer.isRunning && currentTimer.timeLeft < 25 * 60 && (
            <Button onClick={resumeTimer} size="lg">
              <Play className="w-5 h-5 mr-2" />
              Resume
            </Button>
          )}
          
          <Button onClick={resetTimer} variant="outline" size="lg">
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <Button 
            variant="outline" 
            onClick={() => startTimer('break')}
            disabled={currentTimer.isRunning}
          >
            Short Break (5min)
          </Button>
          <Button 
            variant="outline" 
            onClick={() => startTimer('break', 15)}
            disabled={currentTimer.isRunning}
          >
            Long Break (15min)
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const WellnessStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Focus</p>
              <p className="text-2xl font-bold text-blue-600">{todayStats.pomodoros}</p>
              <p className="text-xs text-blue-500">/ {dailyGoals.pomodoroSessions} sessions</p>
            </div>
            <Target className="w-8 h-8 text-blue-500" />
          </div>
          <Progress value={(todayStats.pomodoros / dailyGoals.pomodoroSessions) * 100} className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Focus Score</p>
              <p className="text-2xl font-bold text-green-600">{latestMetrics?.focusScore || 0}</p>
              <p className="text-xs text-green-500">/ 100 points</p>
            </div>
            <Brain className="w-8 h-8 text-green-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Stress Level</p>
              <p className="text-2xl font-bold text-yellow-600">{latestMetrics?.stressLevel || 0}</p>
              <p className="text-xs text-yellow-500">/ 10 scale</p>
            </div>
            <Heart className="w-8 h-8 text-yellow-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Energy Level</p>
              <p className="text-2xl font-bold text-purple-600">{latestMetrics?.energyLevel || 0}</p>
              <p className="text-xs text-purple-500">/ 10 scale</p>
            </div>
            <Activity className="w-8 h-8 text-purple-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const MeditationLibrary = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Guided Meditations</h3>
        <Badge>{meditations.length} sessions available</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {meditations.map(meditation => (
          <Card key={meditation.id} className="hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium">{meditation.title}</h4>
                  <p className="text-sm text-gray-600">{meditation.description}</p>
                </div>
                <Badge variant="outline">{meditation.category}</Badge>
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">{meditation.duration} minutes</span>
                <Badge variant="secondary">{meditation.difficulty}</Badge>
              </div>
              
              <Button 
                className="w-full" 
                size="sm"
                onClick={() => {
                  setSelectedMeditation(meditation);
                  startTimer('meditation', meditation.duration);
                }}
              >
                <Play className="w-4 h-4 mr-2" />
                Start Session
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const ExerciseLibrary = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Wellness Exercises</h3>
        <Badge>{exercises.length} exercises available</Badge>
      </div>
      
      <div className="space-y-4">
        {exercises.map(exercise => (
          <Card key={exercise.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium">{exercise.name}</h4>
                  <p className="text-sm text-gray-600">{exercise.description}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline">{exercise.type}</Badge>
                  <p className="text-sm text-gray-500 mt-1">{exercise.duration} min</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <h5 className="text-sm font-medium mb-2">Instructions:</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {exercise.instructions.slice(0, 2).map((instruction, index) => (
                      <li key={index}>• {instruction}</li>
                    ))}
                    {exercise.instructions.length > 2 && (
                      <li className="text-blue-600">+ {exercise.instructions.length - 2} more steps</li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium mb-2">Benefits:</h5>
                  <div className="flex flex-wrap gap-1">
                    {exercise.benefits.map(benefit => (
                      <Badge key={benefit} variant="secondary" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full" 
                size="sm"
                onClick={() => {
                  setSelectedExercise(exercise);
                  startTimer('exercise', exercise.duration);
                }}
              >
                <Play className="w-4 h-4 mr-2" />
                Start Exercise
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const MotivationalContent = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Lightbulb className="w-8 h-8 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold mb-2">Daily Inspiration</h3>
              <p className="text-blue-100 mb-4">
                "Success is not final, failure is not fatal: it is the courage to continue that counts." 
                - Winston Churchill
              </p>
              <Button variant="secondary" size="sm">
                <Smile className="w-4 h-4 mr-2" />
                Get New Quote
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-3">Today's Wellness Tips</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Take regular breaks every 25 minutes</li>
              <li>• Stay hydrated - drink water hourly</li>
              <li>• Practice the 20-20-20 rule for eye health</li>
              <li>• Do 5 minutes of stretching every hour</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-3">Productivity Insights</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Peak focus time</span>
                <span className="font-medium">9:00 - 11:00 AM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Average session length</span>
                <span className="font-medium">23 minutes</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Best day this week</span>
                <span className="font-medium">Wednesday</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Wellness & Productivity Hub</h1>
        <p className="text-gray-600">Tools for mental health, focus, and well-being</p>
      </div>

      {/* Wellness Stats */}
      <WellnessStats />

      <Tabs defaultValue="pomodoro" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
          <TabsTrigger value="meditation">Meditation</TabsTrigger>
          <TabsTrigger value="exercise">Exercise</TabsTrigger>
          <TabsTrigger value="motivation">Motivation</TabsTrigger>
        </TabsList>

        <TabsContent value="pomodoro">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PomodoroTimer />
            
            <Card>
              <CardHeader>
                <CardTitle>Today's Sessions</CardTitle>
                <CardDescription>Track your focus sessions and breaks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pomodoroSessions.slice(-5).map((session, index) => (
                    <div key={session.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          session.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                        <span className="text-sm capitalize">{session.type}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {session.duration} min
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 rounded">
                  <p className="text-sm text-blue-800">
                    🎯 Goal: Complete {dailyGoals.pomodoroSessions} focus sessions today
                  </p>
                  <Progress 
                    value={(todayStats.pomodoros / dailyGoals.pomodoroSessions) * 100} 
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="meditation">
          <MeditationLibrary />
        </TabsContent>

        <TabsContent value="exercise">
          <ExerciseLibrary />
        </TabsContent>

        <TabsContent value="motivation">
          <MotivationalContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};
