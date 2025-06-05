export interface CandidateMatch {
  candidate: any;
  score: number;
  reasoning: string;
}

interface RoadmapResource {
  title: string;
  type: 'video' | 'course' | 'book' | 'practice';
  url: string;
  description: string;
  duration: string; // in minutes
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

// Real YouTube videos database for different topics
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
  'digital marketing': [
    { title: 'Digital Marketing Full Course', url: 'https://www.youtube.com/watch?v=nU-IIXBWlS4', duration: '720', description: 'Complete digital marketing strategy guide' },
    { title: 'Google Ads Tutorial', url: 'https://www.youtube.com/watch?v=HvKI1n7YnLs', duration: '300', description: 'Master Google Ads for effective advertising' },
    { title: 'Social Media Marketing', url: 'https://www.youtube.com/watch?v=H5a2WvA4D48', duration: '240', description: 'Social media strategy and content creation' },
    { title: 'SEO Course 2024', url: 'https://www.youtube.com/watch?v=xsVTqzratPs', duration: '360', description: 'Search engine optimization fundamentals' }
  ]
};

const generateDynamicRoadmap = (goal: string): LearningRoadmap => {
  const normalizedGoal = goal.toLowerCase();
  let selectedVideos: any[] = [];
  let roadmapPhases: RoadmapPhase[] = [];
  let description = '';

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
  const totalDays = Math.ceil(totalHours / 8); // 8 hours per day

  return {
    roadmap: roadmapPhases,
    totalDuration: `${totalDays} days (${totalHours} hours)`,
    description: `A comprehensive learning path to master ${goal}. This roadmap includes ${selectedVideos.length} carefully selected resources with a total duration of ${totalHours} hours.`,
    totalMinutes
  };
};

const candidates = [
  {
    id: '1',
    name: 'John Doe',
    title: 'Software Engineer',
    skills: ['JavaScript', 'React', 'Node.js'],
    experience: '5 years',
    education: 'Bachelor of Science in Computer Science'
  },
  {
    id: '2',
    name: 'Jane Smith',
    title: 'Data Scientist',
    skills: ['Python', 'Machine Learning', 'SQL'],
    experience: '3 years',
    education: 'Master of Science in Data Science'
  },
  {
    id: '3',
    name: 'Alice Johnson',
    title: 'Frontend Developer',
    skills: ['HTML', 'CSS', 'JavaScript'],
    experience: '2 years',
    education: 'Bachelor of Arts in Web Development'
  },
  {
    id: '4',
    name: 'Bob Williams',
    title: 'Backend Developer',
    skills: ['Java', 'Spring', 'SQL'],
    experience: '4 years',
    education: 'Bachelor of Science in Software Engineering'
  },
  {
    id: '5',
    name: 'Charlie Brown',
    title: 'Data Analyst',
    skills: ['SQL', 'Excel', 'Tableau'],
    experience: '1 year',
    education: 'Bachelor of Science in Statistics'
  },
  {
    id: '6',
    name: 'Diana Miller',
    title: 'AI Engineer',
    skills: ['Python', 'TensorFlow', 'Keras'],
    experience: '6 years',
    education: 'PhD in Artificial Intelligence'
  },
  {
    id: '7',
    name: 'Ethan Davis',
    title: 'Cloud Architect',
    skills: ['AWS', 'Azure', 'Docker'],
    experience: '7 years',
    education: 'Master of Science in Cloud Computing'
  },
  {
    id: '8',
    name: 'Fiona Wilson',
    title: 'Cybersecurity Analyst',
    skills: ['Network Security', 'Penetration Testing', 'Firewalls'],
    experience: '8 years',
    education: 'Bachelor of Science in Cybersecurity'
  },
  {
    id: '9',
    name: 'George Garcia',
    title: 'Product Manager',
    skills: ['Product Strategy', 'Market Research', 'Agile'],
    experience: '9 years',
    education: 'Master of Business Administration'
  },
  {
    id: '10',
    name: 'Hannah Rodriguez',
    title: 'UI/UX Designer',
    skills: ['User Research', 'Wireframing', 'Prototyping'],
    experience: '10 years',
    education: 'Bachelor of Fine Arts in Graphic Design'
  }
];

export const aiSearchService = {
  searchCandidates: (query: string): CandidateMatch[] => {
    const keywords = query.toLowerCase().split(' ');

    const matches = candidates.map(candidate => {
      let score = 0;
      let reasoning = '';

      // Check if the query matches the candidate's title
      if (candidate.title.toLowerCase().includes(query.toLowerCase())) {
        score += 50;
        reasoning += `Title matches the query. `;
      }

      // Award points for each keyword found in the candidate's skills
      keywords.forEach(keyword => {
        if (candidate.skills.some(skill => skill.toLowerCase().includes(keyword))) {
          score += 15;
          reasoning += `Skill "${keyword}" found. `;
        }
      });

      // Award points for experience
      const experienceYears = parseInt(candidate.experience);
      if (!isNaN(experienceYears)) {
        const experienceMatch = Math.min(experienceYears, 10); // Cap at 10 years for scoring
        score += experienceMatch * 2;
        reasoning += `Experience of ${candidate.experience}. `;
      }

      // Award points for education
      if (candidate.education.toLowerCase().includes(query.toLowerCase())) {
        score += 10;
        reasoning += `Education matches the query. `;
      }

      return {
        candidate,
        score,
        reasoning
      };
    }).sort((a, b) => b.score - a.score); // Sort by score descending

    // Filter out candidates with a score less than 20 (adjust as needed)
    const filteredMatches = matches.filter(match => match.score >= 20);

    return filteredMatches;
  },

  generateLearningRoadmap: async (goal: string): Promise<LearningRoadmap> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return generateDynamicRoadmap(goal);
  }
};
