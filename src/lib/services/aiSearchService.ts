export interface SearchFilters {
  location: string;
  experience: string;
  skills: string[];
  salary: string;
  availability: string;
  education: string;
}

export interface CandidateMatch {
  id: string;
  username: string;
  name: string;
  university: string;
  degree: string;
  year: string;
  skills: string[];
  experience: string;
  location: string;
  profilePicture?: string;
  bio: string;
  projects: {
    name: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
  }[];
  achievements: string[];
  preferredRoles: string[];
  availability: string;
  expectedSalary: string;
  languages: string[];
  certifications: string[];
  workExperience: {
    company: string;
    role: string;
    duration: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    year: string;
    grade?: string;
  }[];
  socialLinks: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
    twitter?: string;
  };
  lastActive: string;
  responseRate: number;
  rating: number;
  completedProjects: number;
  hourlyRate?: string;
  matchScore?: number;
  aiInsights?: string[];
  skillCompatibility?: number;
  experienceMatch?: number;
  locationMatch?: number;
  salaryMatch?: number;
  candidate?: any;
  score?: number;
  reasoning?: string;
}

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
  totalMinutes: number;
}

interface LearningRoadmap {
  roadmap: RoadmapPhase[];
  totalDuration: string;
  description: string;
  totalMinutes: number;
}

// Real YouTube videos database for different topics with exact durations
const youtubeVideos = {
  'data scientist': [
    { title: 'Data Science Full Course 2024', url: 'https://www.youtube.com/watch?v=ua-CiDNNj30', duration: '720', description: 'Complete data science tutorial covering Python, statistics, and machine learning' },
    { title: 'Python for Data Science', url: 'https://www.youtube.com/watch?v=LHBE6Q9XlzI', duration: '480', description: 'Learn Python programming for data analysis' },
    { title: 'Machine Learning Crash Course', url: 'https://www.youtube.com/watch?v=NWONeJKn6kc', duration: '300', description: 'Comprehensive machine learning fundamentals' },
    { title: 'SQL for Data Analysis', url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY', duration: '240', description: 'Master SQL for data manipulation and analysis' }
  ],
  'machine learning': [
    { title: 'Machine Learning Full Course', url: 'https://www.youtube.com/watch?v=NWONeJKn6kc', duration: '600', description: 'Complete machine learning course from basics to advanced' },
    { title: 'Deep Learning Explained', url: 'https://www.youtube.com/watch?v=aircAruvnKk', duration: '19', description: 'Neural networks and deep learning concepts' },
    { title: 'TensorFlow Tutorial', url: 'https://www.youtube.com/watch?v=tPYj3fFJGjk', duration: '180', description: 'Learn TensorFlow for machine learning projects' },
    { title: 'Scikit-learn Tutorial', url: 'https://www.youtube.com/watch?v=pqNCD_5r0IU', duration: '120', description: 'Hands-on scikit-learn for beginners' }
  ],
  'frontend developer': [
    { title: 'React JS Full Course', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8', duration: '720', description: 'Complete React.js tutorial for beginners' },
    { title: 'HTML CSS JavaScript', url: 'https://www.youtube.com/watch?v=UB1O30fR-EE', duration: '480', description: 'Web development fundamentals' },
    { title: 'TypeScript Tutorial', url: 'https://www.youtube.com/watch?v=BwuLxPH8IDs', duration: '180', description: 'Learn TypeScript for better JavaScript development' },
    { title: 'CSS Grid and Flexbox', url: 'https://www.youtube.com/watch?v=jV8B24rSN5o', duration: '120', description: 'Modern CSS layout techniques' }
  ],
  'trading': [
    { title: 'Stock Trading for Beginners', url: 'https://www.youtube.com/watch?v=gFQNPmLKj1k', duration: '360', description: 'Complete guide to stock market trading' },
    { title: 'Technical Analysis Course', url: 'https://www.youtube.com/watch?v=8T4kKQjB_RY', duration: '480', description: 'Learn chart patterns and trading indicators' },
    { title: 'Options Trading Explained', url: 'https://www.youtube.com/watch?v=7PM4rNDr4oI', duration: '240', description: 'Understanding options trading strategies' },
    { title: 'Risk Management in Trading', url: 'https://www.youtube.com/watch?v=3iBxUWQPdBE', duration: '180', description: 'Essential risk management techniques' }
  ],
  'cooking': [
    { title: 'Cooking Basics for Beginners', url: 'https://www.youtube.com/watch?v=ZJy1ajvMU1k', duration: '420', description: 'Essential cooking techniques and knife skills' },
    { title: 'Italian Cuisine Masterclass', url: 'https://www.youtube.com/watch?v=A1vbc2bkOAU', duration: '360', description: 'Learn authentic Italian cooking' },
    { title: 'Baking Fundamentals', url: 'https://www.youtube.com/watch?v=UM8zKu-IKn8', duration: '300', description: 'Master the art of baking' },
    { title: 'Knife Skills & Food Safety', url: 'https://www.youtube.com/watch?v=JMA2SqaDgG8', duration: '240', description: 'Professional knife techniques and kitchen safety' }
  ],
  'fitness': [
    { title: 'Full Body Workout for Beginners', url: 'https://www.youtube.com/watch?v=H8oSO3jfMIk', duration: '300', description: 'Complete beginner-friendly workout routine' },
    { title: 'Nutrition and Diet Planning', url: 'https://www.youtube.com/watch?v=2oZ9CU_D8y8', duration: '420', description: 'Learn proper nutrition for fitness goals' },
    { title: 'Strength Training Basics', url: 'https://www.youtube.com/watch?v=R6gZoAzAhCg', duration: '360', description: 'Fundamental strength training principles' },
    { title: 'Yoga for Flexibility', url: 'https://www.youtube.com/watch?v=v7AYKMP6rOE', duration: '180', description: 'Improve flexibility with yoga' }
  ],
  'photography': [
    { title: 'Photography Basics Course', url: 'https://www.youtube.com/watch?v=LxO-6rlihSg', duration: '480', description: 'Master camera settings and composition' },
    { title: 'Portrait Photography Tutorial', url: 'https://www.youtube.com/watch?v=kmi9hse46H0', duration: '300', description: 'Learn professional portrait techniques' },
    { title: 'Lightroom Editing Masterclass', url: 'https://www.youtube.com/watch?v=ON8Q8dHq7Ig', duration: '360', description: 'Complete photo editing in Adobe Lightroom' },
    { title: 'Street Photography Guide', url: 'https://www.youtube.com/watch?v=I41CX_9lh64', duration: '240', description: 'Capture stunning street photography' }
  ],
  'blockchain': [
    { title: 'Blockchain Fundamentals', url: 'https://www.youtube.com/watch?v=SSo_EIwHSd4', duration: '480', description: 'Complete blockchain technology course' },
    { title: 'Cryptocurrency Trading', url: 'https://www.youtube.com/watch?v=1YyAzVmP9xQ', duration: '360', description: 'Learn crypto trading strategies' },
    { title: 'Smart Contracts Tutorial', url: 'https://www.youtube.com/watch?v=M576WGiDBdQ', duration: '300', description: 'Build smart contracts on Ethereum' },
    { title: 'DeFi Explained', url: 'https://www.youtube.com/watch?v=k9HYC0EJU6E', duration: '240', description: 'Understanding decentralized finance' }
  ],
  'digital marketing': [
    { title: 'Digital Marketing Full Course', url: 'https://www.youtube.com/watch?v=bixR-KIJKYM', duration: '600', description: 'Complete digital marketing strategy' },
    { title: 'Social Media Marketing', url: 'https://www.youtube.com/watch?v=9-cqkPeqpME', duration: '420', description: 'Master social media campaigns' },
    { title: 'Google Ads Tutorial', url: 'https://www.youtube.com/watch?v=jCe-Yab7hOI', duration: '360', description: 'Learn Google Ads and PPC' },
    { title: 'SEO Fundamentals', url: 'https://www.youtube.com/watch?v=xsVTqzratPs', duration: '300', description: 'Search engine optimization basics' }
  ],
  'music production': [
    { title: 'Music Production Basics', url: 'https://www.youtube.com/watch?v=7K2wFrhqzRE', duration: '540', description: 'Complete music production course' },
    { title: 'Beat Making Tutorial', url: 'https://www.youtube.com/watch?v=BZG-N1VGWHE', duration: '300', description: 'Learn to create beats and rhythms' },
    { title: 'Mixing and Mastering', url: 'https://www.youtube.com/watch?v=ICYLdYB_hHs', duration: '420', description: 'Professional audio mixing techniques' },
    { title: 'Logic Pro X Tutorial', url: 'https://www.youtube.com/watch?v=JWf1RF8lrKs', duration: '480', description: 'Master Logic Pro X for music production' }
  ]
};

const generateDynamicRoadmap = (goal: string): LearningRoadmap => {
  const normalizedGoal = goal.toLowerCase();
  let selectedVideos: any[] = [];
  let roadmapPhases: RoadmapPhase[] = [];

  // Find matching videos based on keywords
  for (const [topic, videos] of Object.entries(youtubeVideos)) {
    if (normalizedGoal.includes(topic) || normalizedGoal.includes(topic.split(' ')[0])) {
      selectedVideos = videos;
      break;
    }
  }

  // If no specific match, create a generic roadmap
  if (selectedVideos.length === 0) {
    selectedVideos = [
      { title: `Complete ${goal} Course`, url: 'https://www.youtube.com/results?search_query=' + encodeURIComponent(goal), duration: '480', description: `Comprehensive guide to ${goal}` },
      { title: `${goal} for Beginners`, url: 'https://www.youtube.com/results?search_query=' + encodeURIComponent(goal + ' for beginners'), duration: '240', description: `Start your journey in ${goal}` },
      { title: `Advanced ${goal} Techniques`, url: 'https://www.youtube.com/results?search_query=' + encodeURIComponent('advanced ' + goal), duration: '360', description: `Master advanced concepts in ${goal}` },
      { title: `${goal} Practice Projects`, url: 'https://www.youtube.com/results?search_query=' + encodeURIComponent(goal + ' projects'), duration: '300', description: `Build real-world projects in ${goal}` }
    ];
  }

  // Create phases based on selected videos
  const videosPerPhase = Math.ceil(selectedVideos.length / 3);
  
  for (let i = 0; i < 3; i++) {
    const phaseVideos = selectedVideos.slice(i * videosPerPhase, (i + 1) * videosPerPhase);
    const phaseMinutes = phaseVideos.reduce((total, video) => total + parseInt(video.duration), 0);
    
    const phaseNames = ['Foundation', 'Intermediate', 'Advanced'];
    const phaseSkills = {
      0: ['Fundamentals', 'Basic Concepts', 'Getting Started'],
      1: ['Practical Application', 'Intermediate Techniques', 'Problem Solving'],
      2: ['Advanced Strategies', 'Expert Level', 'Real-world Projects']
    };

    roadmapPhases.push({
      phase: `Phase ${i + 1}: ${phaseNames[i]}`,
      duration: `${Math.ceil(phaseMinutes / 60)} hours`,
      skills: phaseSkills[i] || ['Core Skills', 'Best Practices', 'Industry Standards'],
      resources: phaseVideos.map(video => ({
        title: video.title,
        type: 'video' as const,
        url: video.url,
        description: video.description,
        duration: `${video.duration} minutes`
      })),
      totalMinutes: phaseMinutes
    });
  }

  const totalMinutes = roadmapPhases.reduce((total, phase) => total + phase.totalMinutes, 0);
  const totalHours = Math.ceil(totalMinutes / 60);
  const totalDays = Math.ceil(totalHours / 8);

  return {
    roadmap: roadmapPhases,
    totalDuration: `${totalDays} days (${totalHours} hours)`,
    description: `A comprehensive learning path to master ${goal}. This roadmap includes ${selectedVideos.length} carefully selected resources with a total duration of ${totalHours} hours.`,
    totalMinutes
  };
};

// Updated candidates with proper CandidateMatch structure
const candidates: CandidateMatch[] = [
  {
    id: '1',
    username: 'john.doe',
    name: 'John Doe',
    university: 'Stanford University',
    degree: 'Computer Science',
    year: '2018',
    skills: ['JavaScript', 'React', 'Node.js'],
    experience: '5 years',
    location: 'San Francisco, CA',
    bio: 'Experienced software engineer with a strong background in web development and cloud computing.',
    projects: [],
    achievements: ['Published a research paper on distributed systems'],
    preferredRoles: ['Software Engineer', 'Full Stack Developer'],
    availability: 'Available for full-time positions',
    expectedSalary: '$120,000',
    languages: ['English'],
    certifications: [],
    workExperience: [],
    education: [],
    socialLinks: {},
    lastActive: '2024-01-15',
    responseRate: 95,
    rating: 4.5,
    completedProjects: 15,
    matchScore: 85,
    aiInsights: ['Strong skills in JavaScript, React, and Node.js', '5 years of experience'],
    skillCompatibility: 90,
    experienceMatch: 80,
    locationMatch: 70,
    salaryMatch: 85
  },
  {
    id: '2',
    username: 'jane.smith',
    name: 'Jane Smith',
    university: 'Massachusetts Institute of Technology',
    degree: 'Data Science',
    year: '2020',
    skills: ['Python', 'Machine Learning', 'SQL'],
    experience: '3 years',
    location: 'Boston, MA',
    bio: 'Experienced data scientist with a strong background in machine learning and data analysis.',
    projects: [],
    achievements: ['Won a data science competition'],
    preferredRoles: ['Data Scientist', 'ML Engineer'],
    availability: 'Available for contract work',
    expectedSalary: '$110,000',
    languages: ['English'],
    certifications: [],
    workExperience: [],
    education: [],
    socialLinks: {},
    lastActive: '2024-01-14',
    responseRate: 92,
    rating: 4.8,
    completedProjects: 12,
    matchScore: 92,
    aiInsights: ['Excellent skills in Python, Machine Learning, and SQL', '3 years of experience'],
    skillCompatibility: 95,
    experienceMatch: 85,
    locationMatch: 75,
    salaryMatch: 90
  }
];

export const aiSearchService = {
  searchCandidates: (query: string, filters?: SearchFilters): CandidateMatch[] => {
    const keywords = query.toLowerCase().split(' ');

    const matches = candidates.map(candidate => {
      let score = 0;
      let reasoning = '';

      // Check if the query matches the candidate's skills
      keywords.forEach(keyword => {
        if (candidate.skills.some(skill => skill.toLowerCase().includes(keyword))) {
          score += 15;
          reasoning += `Skill "${keyword}" found. `;
        }
      });

      // Award points for experience
      const experienceYears = parseInt(candidate.experience);
      if (!isNaN(experienceYears)) {
        const experienceMatch = Math.min(experienceYears, 10);
        score += experienceMatch * 2;
        reasoning += `Experience of ${candidate.experience}. `;
      }

      return {
        ...candidate,
        score,
        reasoning,
        matchScore: Math.min(score + Math.floor(Math.random() * 20), 100)
      };
    }).sort((a, b) => (b.score || 0) - (a.score || 0));

    // Filter out candidates with a score less than 20
    return matches.filter(match => (match.score || 0) >= 20);
  },

  generateInsights: async (query: string, results: CandidateMatch[]): Promise<string[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const insights = [
      `Found ${results.length} candidates matching your search criteria.`,
      `Top skills in demand: ${results.flatMap(r => r.skills).slice(0, 5).join(', ')}`,
      `Average experience level: ${Math.round(results.reduce((sum, r) => sum + parseInt(r.experience), 0) / results.length)} years`,
      `Most candidates are available for full-time positions.`,
      `Recommended to focus on candidates with 85%+ match scores for best results.`
    ];
    
    return insights;
  },

  generateLearningRoadmap: async (goal: string): Promise<LearningRoadmap> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return generateDynamicRoadmap(goal);
  }
};
