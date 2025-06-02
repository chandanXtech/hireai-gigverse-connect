
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
}

export interface ModuleContent {
  id: string;
  title: string;
  type: 'youtube' | 'article' | 'podcast' | 'quiz' | 'exercise';
  url?: string;
  description: string;
  duration?: string;
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
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

// Mock data for career goals and learning paths
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
            duration: '4 hours'
          },
          {
            id: 'data-structures',
            title: 'Python Data Structures',
            type: 'article',
            url: 'https://realpython.com/python-data-structures/',
            description: 'Comprehensive guide to Python data structures',
            duration: '2 hours'
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
            duration: '3 hours'
          }
        ]
      },
      {
        id: 'deep-learning',
        title: 'Deep Learning with TensorFlow',
        description: 'Build neural networks and deep learning models',
        type: 'video',
        estimatedTime: '8 weeks',
        prerequisites: ['machine-learning'],
        skills: ['TensorFlow', 'Deep Learning', 'Neural Networks'],
        content: [
          {
            id: 'tensorflow-intro',
            title: 'TensorFlow Fundamentals',
            type: 'youtube',
            url: 'https://www.youtube.com/watch?v=tPYj3fFJGjk',
            description: 'Complete TensorFlow tutorial',
            duration: '6 hours'
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
            duration: '3 hours'
          }
        ]
      },
      {
        id: 'javascript',
        title: 'JavaScript ES6+',
        description: 'Master modern JavaScript and ES6+ features',
        type: 'interactive',
        estimatedTime: '5 weeks',
        prerequisites: ['html-css'],
        skills: ['JavaScript', 'ES6', 'DOM Manipulation'],
        content: [
          {
            id: 'js-basics',
            title: 'JavaScript Fundamentals',
            type: 'youtube',
            url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg',
            description: 'Complete JavaScript course',
            duration: '8 hours'
          }
        ]
      },
      {
        id: 'react-development',
        title: 'React Development',
        description: 'Build modern web applications with React',
        type: 'interactive',
        estimatedTime: '6 weeks',
        prerequisites: ['javascript'],
        skills: ['React', 'TypeScript', 'Component Architecture'],
        content: [
          {
            id: 'react-intro',
            title: 'React Complete Course',
            type: 'youtube',
            url: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
            description: 'Complete React tutorial for beginners',
            duration: '12 hours'
          }
        ]
      }
    ]
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Analyze data, build models, and derive insights',
    category: 'Data Science',
    estimatedDuration: '8-10 months',
    modules: [
      {
        id: 'statistics',
        title: 'Statistics & Probability',
        description: 'Master statistical concepts and probability theory',
        type: 'text',
        estimatedTime: '4 weeks',
        skills: ['Statistics', 'Probability', 'Data Analysis'],
        content: [
          {
            id: 'stats-basics',
            title: 'Statistics Fundamentals',
            type: 'article',
            url: 'https://www.khanacademy.org/math/statistics-probability',
            description: 'Complete statistics course',
            duration: '20 hours'
          }
        ]
      },
      {
        id: 'pandas-numpy',
        title: 'Data Manipulation with Pandas',
        description: 'Learn data cleaning, transformation, and analysis',
        type: 'interactive',
        estimatedTime: '5 weeks',
        prerequisites: ['statistics'],
        skills: ['Pandas', 'NumPy', 'Data Cleaning'],
        content: [
          {
            id: 'pandas-intro',
            title: 'Pandas Complete Tutorial',
            type: 'youtube',
            url: 'https://www.youtube.com/watch?v=vmEHCJofslg',
            description: 'Complete Pandas course',
            duration: '6 hours'
          }
        ]
      }
    ]
  }
];

// Mock progress data
let mockProgress: StudentProgress[] = [];

export const learningService = {
  // Get all available career goals
  getCareerGoals: (): Promise<CareerGoal[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockCareerGoals]), 200);
    });
  },

  // Set student's career goal
  setCareerGoal: (studentId: string, careerGoalId: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingIndex = mockProgress.findIndex(p => p.studentId === studentId);
        const careerGoal = mockCareerGoals.find(cg => cg.id === careerGoalId);
        
        const newProgress: StudentProgress = {
          studentId,
          careerGoalId,
          completedModules: [],
          inProgressModules: [],
          skillsAcquired: [],
          totalProgress: 0,
          lastActivity: new Date().toISOString(),
          badges: []
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

  // Get student's progress
  getStudentProgress: (studentId: string): Promise<StudentProgress | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const progress = mockProgress.find(p => p.studentId === studentId);
        resolve(progress || null);
      }, 200);
    });
  },

  // Get roadmap for a career goal
  getRoadmap: (careerGoalId: string): Promise<CareerGoal | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const roadmap = mockCareerGoals.find(cg => cg.id === careerGoalId);
        resolve(roadmap || null);
      }, 200);
    });
  },

  // Update module progress
  updateModuleProgress: (studentId: string, moduleId: string, status: 'completed' | 'in-progress'): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const progressIndex = mockProgress.findIndex(p => p.studentId === studentId);
        if (progressIndex >= 0) {
          const progress = mockProgress[progressIndex];
          
          if (status === 'completed') {
            progress.completedModules = [...new Set([...progress.completedModules, moduleId])];
            progress.inProgressModules = progress.inProgressModules.filter(id => id !== moduleId);
            
            // Add skills from completed module
            const careerGoal = mockCareerGoals.find(cg => cg.id === progress.careerGoalId);
            const module = careerGoal?.modules.find(m => m.id === moduleId);
            if (module) {
              progress.skillsAcquired = [...new Set([...progress.skillsAcquired, ...module.skills])];
            }
            
            // Check for new badges
            if (progress.completedModules.length === 1) {
              progress.badges.push({
                id: 'first-module',
                title: 'First Steps',
                description: 'Completed your first learning module',
                icon: '🎯',
                unlockedAt: new Date().toISOString()
              });
            }
            
            if (progress.completedModules.length >= 3) {
              progress.badges.push({
                id: 'dedicated-learner',
                title: 'Dedicated Learner',
                description: 'Completed 3 or more modules',
                icon: '📚',
                unlockedAt: new Date().toISOString()
              });
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
