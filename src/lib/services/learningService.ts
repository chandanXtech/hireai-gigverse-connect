import { adaptiveLearningService, type PersonalizedRecommendation } from './adaptiveLearningService';

export interface CareerGoal {
  id: string;
  title: string;
  description: string;
  category: string;
  estimatedDuration: string;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'text' | 'interactive';
  content: ModuleContent[];
  estimatedTime: string;
  prerequisites?: string[];
  skills: string[];
  quiz?: QuizQuestion[];
}

export interface ModuleContent {
  id: string;
  title: string;
  type: 'youtube' | 'article' | 'podcast' | 'quiz' | 'exercise';
  url?: string;
  description: string;
  duration?: string;
  videoProgress?: number;
  isBookmarked?: boolean;
  rating?: number;
  timestamps?: VideoTimestamp[];
}

export interface VideoTimestamp {
  time: string;
  label: string;
  description: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface StudentProgress {
  studentId: string;
  careerGoalId: string;
  completedModules: string[];
  inProgressModules: string[];
  skillsAcquired: string[];
  totalProgress: number;
  lastActivity: string;
  badges: Badge[];
  videoProgress: Record<string, number>;
  bookmarkedVideos: string[];
  quizScores: Record<string, number>;
  watchTime: number;
  streak: number;
  lastStreakDate?: string;
  tokensEarned?: number;
  profileViews?: number;
  personalizedRecommendations?: PersonalizedRecommendation[];
  adaptivePath?: Module[];
  learningInsights?: string[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

// Enhanced mock data with video content and quizzes
const mockCareerGoals: CareerGoal[] = [
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    description: 'Master machine learning, deep learning, and AI application development',
    category: 'AI/ML',
    estimatedDuration: '6-8 months',
    modules: [
      {
        id: 'python-fundamentals',
        title: 'Python Programming Fundamentals',
        description: 'Learn Python basics, data structures, and programming concepts',
        type: 'interactive',
        estimatedTime: '4 weeks',
        skills: ['Python', 'Programming', 'Data Structures'],
        content: [
          {
            id: 'python-intro',
            title: 'Introduction to Python',
            type: 'youtube',
            url: 'https://www.youtube.com/watch?v=kqtD5dpn9C8',
            description: 'Complete Python tutorial for beginners',
            duration: '4 hours',
            timestamps: [
              { time: '0:00', label: 'Introduction', description: 'What is Python and why learn it?' },
              { time: '15:30', label: 'Variables', description: 'Working with variables and data types' },
              { time: '45:20', label: 'Control Flow', description: 'If statements and loops' },
              { time: '1:20:15', label: 'Functions', description: 'Creating and using functions' }
            ]
          },
          {
            id: 'data-structures',
            title: 'Python Data Structures',
            type: 'article',
            url: 'https://realpython.com/python-data-structures/',
            description: 'Comprehensive guide to Python data structures',
            duration: '2 hours'
          }
        ],
        quiz: [
          {
            id: 'q1',
            question: 'Which of the following is a mutable data type in Python?',
            options: ['tuple', 'string', 'list', 'integer'],
            correctAnswer: 2,
            explanation: 'Lists are mutable, meaning you can change their contents after creation.'
          },
          {
            id: 'q2',
            question: 'What does the len() function return?',
            options: ['The last element', 'The first element', 'The number of elements', 'The sum of elements'],
            correctAnswer: 2,
            explanation: 'The len() function returns the number of items in an object.'
          }
        ]
      },
      {
        id: 'machine-learning',
        title: 'Machine Learning Fundamentals',
        description: 'Understand ML algorithms, training, and evaluation',
        type: 'video',
        estimatedTime: '6 weeks',
        prerequisites: ['python-fundamentals'],
        skills: ['Machine Learning', 'Scikit-learn', 'Data Analysis'],
        content: [
          {
            id: 'ml-intro',
            title: 'Introduction to Machine Learning',
            type: 'youtube',
            url: 'https://www.youtube.com/watch?v=aircAruvnKk',
            description: 'Neural networks explained visually',
            duration: '19 minutes',
            timestamps: [
              { time: '0:00', label: 'What is ML?', description: 'Basic concepts and definitions' },
              { time: '4:30', label: 'Types of Learning', description: 'Supervised vs Unsupervised learning' },
              { time: '9:15', label: 'Neural Networks', description: 'How neural networks work' },
              { time: '15:20', label: 'Applications', description: 'Real-world ML applications' }
            ]
          },
          {
            id: 'sklearn-tutorial',
            title: 'Scikit-learn Tutorial',
            type: 'youtube',
            url: 'https://www.youtube.com/watch?v=pqNCD_5r0IU',
            description: 'Hands-on machine learning with scikit-learn',
            duration: '45 minutes'
          }
        ],
        quiz: [
          {
            id: 'ml-q1',
            question: 'What is the main difference between supervised and unsupervised learning?',
            options: [
              'Supervised learning uses labeled data',
              'Unsupervised learning uses labeled data',
              'Unsupervised learning is faster',
              'Supervised learning is more accurate',
              'There is no difference'
            ],
            correctAnswer: 0,
            explanation: 'Supervised learning uses labeled training data to learn patterns, while unsupervised learning finds patterns in unlabeled data.'
          }
        ]
      }
    ]
  },
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    description: 'Master React, TypeScript, and modern web development',
    category: 'Web Development',
    estimatedDuration: '4-6 months',
    modules: [
      {
        id: 'html-css',
        title: 'HTML & CSS Mastery',
        description: 'Build responsive, accessible web pages',
        type: 'interactive',
        estimatedTime: '3 weeks',
        skills: ['HTML', 'CSS', 'Responsive Design'],
        content: [
          {
            id: 'html-basics',
            title: 'HTML Fundamentals',
            type: 'youtube',
            url: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
            description: 'Complete HTML course for beginners',
            duration: '3 hours',
            timestamps: [
              { time: '0:00', label: 'HTML Basics', description: 'Structure and syntax' },
              { time: '30:00', label: 'Forms', description: 'Creating interactive forms' },
              { time: '1:30:00', label: 'Semantic HTML', description: 'Modern HTML5 elements' }
            ]
          }
        ],
        quiz: [
          {
            id: 'html-q1',
            question: 'Which HTML element is used for the largest heading?',
            options: ['<h6>', '<h1>', '<header>', '<big>'],
            correctAnswer: 1,
            explanation: '<h1> represents the largest heading, with <h6> being the smallest.'
          }
        ]
      }
    ]
  }
];

// Mock progress data with enhanced video tracking
let mockProgress: StudentProgress[] = [];

export const learningService = {
  // Enhanced with AI-powered personalization
  getCareerGoals: (): Promise<CareerGoal[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockCareerGoals]), 200);
    });
  },

  // AI-enhanced career goal setting
  setCareerGoal: async (studentId: string, careerGoalId: string): Promise<void> => {
    return new Promise(async (resolve) => {
      setTimeout(async () => {
        const existingIndex = mockProgress.findIndex(p => p.studentId === studentId);
        const careerGoal = mockCareerGoals.find(cg => cg.id === careerGoalId);
        
        // Create adaptive learning profile
        const learningProfile = await adaptiveLearningService.createLearningProfile(studentId);
        
        // Generate personalized path
        const personalizedPath = await adaptiveLearningService.generatePersonalizedPath(studentId, careerGoalId);
        
        const newProgress: StudentProgress = {
          studentId,
          careerGoalId,
          completedModules: [],
          inProgressModules: [],
          skillsAcquired: [],
          totalProgress: 0,
          lastActivity: new Date().toISOString(),
          badges: [],
          videoProgress: {},
          bookmarkedVideos: [],
          quizScores: {},
          watchTime: 0,
          streak: 0,
          lastStreakDate: undefined,
          personalizedRecommendations: personalizedPath.recommendations,
          adaptivePath: personalizedPath.modules,
          learningInsights: personalizedPath.adaptations
        };

        if (existingIndex >= 0) {
          mockProgress[existingIndex] = newProgress;
        } else {
          mockProgress.push(newProgress);
        }
        resolve();
      }, 300);
    });
  },

  // Enhanced progress tracking with AI analytics
  getStudentProgress: async (studentId: string): Promise<StudentProgress | null> => {
    return new Promise(async (resolve) => {
      setTimeout(async () => {
        let progress = mockProgress.find(p => p.studentId === studentId);
        
        if (progress) {
          // Generate fresh AI insights and recommendations
          const analytics = await adaptiveLearningService.generateLearningAnalytics(studentId);
          const recommendations = await adaptiveLearningService.generatePersonalizedPath(studentId, progress.careerGoalId);
          
          progress = {
            ...progress,
            tokensEarned: progress.tokensEarned || 150,
            profileViews: progress.profileViews || 45,
            personalizedRecommendations: recommendations.recommendations,
            learningInsights: [
              `Learning velocity: ${analytics.learningVelocity.toFixed(1)} modules/week`,
              `Engagement score: ${analytics.engagementScore}%`,
              `Strongest skills: ${analytics.strongestSkills.join(', ')}`,
              ...analytics.predictedOutcomes
            ]
          };
        }
        
        resolve(progress || null);
      }, 200);
    });
  },

  getRoadmap: (careerGoalId: string): Promise<CareerGoal | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const roadmap = mockCareerGoals.find(cg => cg.id === careerGoalId);
        resolve(roadmap || null);
      }, 200);
    });
  },

  // Enhanced with adaptive difficulty adjustment
  updateModuleProgress: async (studentId: string, moduleId: string, status: 'completed' | 'in-progress', performance?: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const progressIndex = mockProgress.findIndex(p => p.studentId === studentId);
        if (progressIndex >= 0) {
          const progress = mockProgress[progressIndex];
          
          if (status === 'completed') {
            progress.completedModules = [...new Set([...progress.completedModules, moduleId])];
            progress.inProgressModules = progress.inProgressModules.filter(id => id !== moduleId);
            
            // AI-powered difficulty adjustment
            if (performance !== undefined) {
              const adjustment = adaptiveLearningService.adjustDifficulty(studentId, moduleId, performance);
              if (adjustment.recommendations.length > 0) {
                progress.learningInsights = [
                  ...progress.learningInsights || [],
                  `Module ${moduleId}: ${adjustment.recommendations[0]}`
                ];
              }
            }
            
            // Add skills from completed module
            const careerGoal = mockCareerGoals.find(cg => cg.id === progress.careerGoalId);
            const module = careerGoal?.modules.find(m => m.id === moduleId);
            if (module) {
              progress.skillsAcquired = [...new Set([...progress.skillsAcquired, ...module.skills])];
            }
            
            // Update streak
            const today = new Date().toDateString();
            const lastDate = progress.lastStreakDate;
            if (lastDate !== today) {
              const yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              
              if (lastDate === yesterday.toDateString()) {
                progress.streak += 1;
              } else {
                progress.streak = 1;
              }
              progress.lastStreakDate = today;
            }
            
            // Award new badges
            if (progress.completedModules.length === 1) {
              progress.badges.push({
                id: 'first-module',
                title: 'First Steps',
                description: 'Completed your first learning module',
                icon: '🎯',
                unlockedAt: new Date().toISOString()
              });
            }
            
            if (progress.streak >= 7) {
              const hasStreakBadge = progress.badges.find(b => b.id === 'week-streak');
              if (!hasStreakBadge) {
                progress.badges.push({
                  id: 'week-streak',
                  title: 'Week Warrior',
                  description: 'Maintained a 7-day learning streak',
                  icon: '🔥',
                  unlockedAt: new Date().toISOString()
                });
              }
            }
            
            if (progress.watchTime >= 3600) { // 1 hour
              const hasWatchBadge = progress.badges.find(b => b.id === 'video-enthusiast');
              if (!hasWatchBadge) {
                progress.badges.push({
                  id: 'video-enthusiast',
                  title: 'Video Enthusiast',
                  description: 'Watched over 1 hour of learning videos',
                  icon: '🎬',
                  unlockedAt: new Date().toISOString()
                });
              }
            }
          } else {
            progress.inProgressModules = [...new Set([...progress.inProgressModules, moduleId])];
          }
          
          // Calculate total progress
          const totalModules = mockCareerGoals.find(cg => cg.id === progress.careerGoalId)?.modules.length || 1;
          progress.totalProgress = Math.round((progress.completedModules.length / totalModules) * 100);
          progress.lastActivity = new Date().toISOString();
        }
        resolve();
      }, 300);
    });
  },

  // Update video progress
  updateVideoProgress: (studentId: string, videoId: string, progress: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const progressIndex = mockProgress.findIndex(p => p.studentId === studentId);
        if (progressIndex >= 0) {
          const studentProgress = mockProgress[progressIndex];
          studentProgress.videoProgress = studentProgress.videoProgress || {};
          studentProgress.videoProgress[videoId] = progress;
          
          // Estimate watch time (assuming progress relates to duration)
          const previousProgress = studentProgress.videoProgress[videoId] || 0;
          if (progress > previousProgress) {
            studentProgress.watchTime += (progress - previousProgress) * 10; // rough estimate
          }
        }
        resolve();
      }, 100);
    });
  },

  // Bookmark video
  toggleVideoBookmark: (studentId: string, videoId: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const progressIndex = mockProgress.findIndex(p => p.studentId === studentId);
        if (progressIndex >= 0) {
          const progress = mockProgress[progressIndex];
          progress.bookmarkedVideos = progress.bookmarkedVideos || [];
          
          const bookmarkIndex = progress.bookmarkedVideos.indexOf(videoId);
          if (bookmarkIndex >= 0) {
            progress.bookmarkedVideos.splice(bookmarkIndex, 1);
          } else {
            progress.bookmarkedVideos.push(videoId);
          }
        }
        resolve();
      }, 100);
    });
  },

  // Save quiz score
  saveQuizScore: (studentId: string, moduleId: string, score: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const progressIndex = mockProgress.findIndex(p => p.studentId === studentId);
        if (progressIndex >= 0) {
          const progress = mockProgress[progressIndex];
          progress.quizScores = progress.quizScores || {};
          progress.quizScores[moduleId] = score;
          
          // Award quiz badges
          if (score >= 90) {
            const hasPerfectBadge = progress.badges.find(b => b.id === 'quiz-master');
            if (!hasPerfectBadge) {
              progress.badges.push({
                id: 'quiz-master',
                title: 'Quiz Master',
                description: 'Scored 90% or higher on a quiz',
                icon: '🧠',
                unlockedAt: new Date().toISOString()
              });
            }
          }
        }
        resolve();
      }, 100);
    });
  },

  // Get recommended gigs based on skills
  getRecommendedGigs: (studentId: string): Promise<any[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const progress = mockProgress.find(p => p.studentId === studentId);
        if (!progress || progress.skillsAcquired.length === 0) {
          resolve([]);
          return;
        }

        // Mock recommended gigs based on acquired skills
        const recommendedGigs = [
          {
            id: 'ml-intern',
            title: 'Machine Learning Intern',
            company: 'AI Startup',
            skills: ['Python', 'Machine Learning'],
            match: 85,
            unlocked: progress.skillsAcquired.includes('Python') && progress.skillsAcquired.includes('Machine Learning')
          },
          {
            id: 'react-dev',
            title: 'React Developer',
            company: 'Tech Corp',
            skills: ['React', 'JavaScript'],
            match: 90,
            unlocked: progress.skillsAcquired.includes('React') && progress.skillsAcquired.includes('JavaScript')
          }
        ].filter(gig => gig.unlocked);

        resolve(recommendedGigs);
      }, 200);
    });
  }
};
