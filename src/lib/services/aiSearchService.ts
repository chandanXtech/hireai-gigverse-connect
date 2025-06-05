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

const candidates = [
  {
    id: '1',
    name: 'John Doe',
    title: 'Software Engineer',
    skills: ['JavaScript', 'React', 'Node.js'],
    experience: '5 years',
    education: 'Bachelor of Science in Computer Science',
    username: 'john.doe',
    university: 'Stanford University',
    year: '2018',
    location: 'San Francisco, CA',
    tagline: 'Full-stack developer passionate about building scalable web applications',
    bio: 'Experienced software engineer with a strong background in web development and cloud computing.',
    availability: 'Available for full-time positions',
    rating: 4.5,
    projects: [],
    achievements: ['Published a research paper on distributed systems'],
    certifications: [],
    isVerified: true,
    profileImage: 'https://example.com/john-doe.jpg',
    resumeLink: 'https://example.com/john-doe-resume.pdf',
    socialLinks: {},
    tokensEarned: 100,
    badges: [],
    profileViews: 500,
    profileSlug: 'john-doe',
    matchPercentage: 85,
    aiAnalysis: {
      summary: 'Strong match for software engineering roles with experience in JavaScript, React, and Node.js.',
      skillsMatch: 90,
      experienceMatch: 80,
      locationMatch: 70,
      availabilityMatch: 100,
      reasons: ['Strong skills in JavaScript, React, and Node.js', '5 years of experience', 'Available for full-time positions', 'Located in San Francisco, CA']
    }
  },
  {
    id: '2',
    name: 'Jane Smith',
    title: 'Data Scientist',
    skills: ['Python', 'Machine Learning', 'SQL'],
    experience: '3 years',
    education: 'Master of Science in Data Science',
    username: 'jane.smith',
    university: 'Massachusetts Institute of Technology',
    year: '2020',
    location: 'Boston, MA',
    tagline: 'Data scientist specializing in machine learning and data analysis',
    bio: 'Experienced data scientist with a strong background in machine learning and data analysis.',
    availability: 'Available for contract work',
    rating: 4.8,
    projects: [],
    achievements: ['Won a data science competition'],
    certifications: [],
    isVerified: true,
    profileImage: 'https://example.com/jane-smith.jpg',
    resumeLink: 'https://example.com/jane-smith-resume.pdf',
    socialLinks: {},
    tokensEarned: 120,
    badges: [],
    profileViews: 600,
    profileSlug: 'jane-smith',
    matchPercentage: 92,
    aiAnalysis: {
      summary: 'Excellent match for data science roles with expertise in Python, Machine Learning, and SQL.',
      skillsMatch: 95,
      experienceMatch: 85,
      locationMatch: 75,
      availabilityMatch: 90,
      reasons: ['Strong skills in Python, Machine Learning, and SQL', '3 years of experience', 'Available for contract work', 'Located in Boston, MA']
    }
  },
  {
    id: '3',
    name: 'Alice Johnson',
    title: 'Frontend Developer',
    skills: ['HTML', 'CSS', 'JavaScript'],
    experience: '2 years',
    education: 'Bachelor of Arts in Web Development',
    username: 'alice.johnson',
    university: 'University of California, Los Angeles',
    year: '2021',
    location: 'Los Angeles, CA',
    tagline: 'Frontend developer passionate about creating beautiful and user-friendly web applications',
    bio: 'Frontend developer with a strong background in HTML, CSS, and JavaScript.',
    availability: 'Available for full-time positions',
    rating: 4.2,
    projects: [],
    achievements: ['Contributed to an open-source project'],
    certifications: [],
    isVerified: false,
    profileImage: 'https://example.com/alice-johnson.jpg',
    resumeLink: 'https://example.com/alice-johnson-resume.pdf',
    socialLinks: {},
    tokensEarned: 80,
    badges: [],
    profileViews: 400,
    profileSlug: 'alice-johnson',
    matchPercentage: 78,
    aiAnalysis: {
      summary: 'Good match for frontend development roles with skills in HTML, CSS, and JavaScript.',
      skillsMatch: 85,
      experienceMatch: 70,
      locationMatch: 80,
      availabilityMatch: 100,
      reasons: ['Skills in HTML, CSS, and JavaScript', '2 years of experience', 'Available for full-time positions', 'Located in Los Angeles, CA']
    }
  },
  {
    id: '4',
    name: 'Bob Williams',
    title: 'Backend Developer',
    skills: ['Java', 'Spring', 'SQL'],
    experience: '4 years',
    education: 'Bachelor of Science in Software Engineering',
    username: 'bob.williams',
    university: 'Carnegie Mellon University',
    year: '2019',
    location: 'Pittsburgh, PA',
    tagline: 'Backend developer specializing in Java and Spring',
    bio: 'Experienced backend developer with a strong background in Java and Spring.',
    availability: 'Available for full-time positions',
    rating: 4.6,
    projects: [],
    achievements: ['Developed a scalable API'],
    certifications: [],
    isVerified: true,
    profileImage: 'https://example.com/bob-williams.jpg',
    resumeLink: 'https://example.com/bob-williams-resume.pdf',
    socialLinks: {},
    tokensEarned: 90,
    badges: [],
    profileViews: 450,
    profileSlug: 'bob-williams',
    matchPercentage: 88,
    aiAnalysis: {
      summary: 'Strong match for backend development roles with expertise in Java, Spring, and SQL.',
      skillsMatch: 92,
      experienceMatch: 82,
      locationMatch: 72,
      availabilityMatch: 100,
      reasons: ['Strong skills in Java, Spring, and SQL', '4 years of experience', 'Available for full-time positions', 'Located in Pittsburgh, PA']
    }
  },
  {
    id: '5',
    name: 'Charlie Brown',
    title: 'Data Analyst',
    skills: ['SQL', 'Excel', 'Tableau'],
    experience: '1 year',
    education: 'Bachelor of Science in Statistics',
    username: 'charlie.brown',
    university: 'University of Chicago',
    year: '2022',
    location: 'Chicago, IL',
    tagline: 'Data analyst passionate about data visualization and storytelling',
    bio: 'Data analyst with a strong background in SQL, Excel, and Tableau.',
    availability: 'Available for internship',
    rating: 4.0,
    projects: [],
    achievements: ['Created insightful dashboards'],
    certifications: [],
    isVerified: false,
    profileImage: 'https://example.com/charlie-brown.jpg',
    resumeLink: 'https://example.com/charlie-brown-resume.pdf',
    socialLinks: {},
    tokensEarned: 70,
    badges: [],
    profileViews: 350,
    profileSlug: 'charlie-brown',
    matchPercentage: 75,
    aiAnalysis: {
      summary: 'Good match for data analysis roles with skills in SQL, Excel, and Tableau.',
      skillsMatch: 80,
      experienceMatch: 65,
      locationMatch: 75,
      availabilityMatch: 90,
      reasons: ['Skills in SQL, Excel, and Tableau', '1 year of experience', 'Available for internship', 'Located in Chicago, IL']
    }
  },
  {
    id: '6',
    name: 'Diana Miller',
    title: 'AI Engineer',
    skills: ['Python', 'TensorFlow', 'Keras'],
    experience: '6 years',
    education: 'PhD in Artificial Intelligence',
    username: 'diana.miller',
    university: 'Stanford University',
    year: '2017',
    location: 'Palo Alto, CA',
    tagline: 'AI Engineer specializing in deep learning and neural networks',
    bio: 'Experienced AI Engineer with a strong background in deep learning and neural networks.',
    availability: 'Available for full-time positions',
    rating: 4.9,
    projects: [],
    achievements: ['Published multiple research papers in top AI conferences'],
    certifications: [],
    isVerified: true,
    profileImage: 'https://example.com/diana-miller.jpg',
    resumeLink: 'https://example.com/diana-miller-resume.pdf',
    socialLinks: {},
    tokensEarned: 150,
    badges: [],
    profileViews: 750,
    profileSlug: 'diana-miller',
    matchPercentage: 95,
    aiAnalysis: {
      summary: 'Excellent match for AI Engineering roles with expertise in Python, TensorFlow, and Keras.',
      skillsMatch: 98,
      experienceMatch: 90,
      locationMatch: 80,
      availabilityMatch: 100,
      reasons: ['Strong skills in Python, TensorFlow, and Keras', '6 years of experience', 'Available for full-time positions', 'Located in Palo Alto, CA']
    }
  },
  {
    id: '7',
    name: 'Ethan Davis',
    title: 'Cloud Architect',
    skills: ['AWS', 'Azure', 'Docker'],
    experience: '7 years',
    education: 'Master of Science in Cloud Computing',
    username: 'ethan.davis',
    university: 'University of Washington',
    year: '2016',
    location: 'Seattle, WA',
    tagline: 'Cloud Architect specializing in AWS and Azure',
    bio: 'Experienced Cloud Architect with a strong background in AWS and Azure.',
    availability: 'Available for contract work',
    rating: 4.7,
    projects: [],
    achievements: ['Designed and implemented a cloud-based infrastructure for a large enterprise'],
    certifications: [],
    isVerified: true,
    profileImage: 'https://example.com/ethan-davis.jpg',
    resumeLink: 'https://example.com/ethan-davis-resume.pdf',
    socialLinks: {},
    tokensEarned: 130,
    badges: [],
    profileViews: 650,
    profileSlug: 'ethan-davis',
    matchPercentage: 93,
    aiAnalysis: {
      summary: 'Excellent match for Cloud Architect roles with expertise in AWS, Azure, and Docker.',
      skillsMatch: 96,
      experienceMatch: 88,
      locationMatch: 78,
      availabilityMatch: 90,
      reasons: ['Strong skills in AWS, Azure, and Docker', '7 years of experience', 'Available for contract work', 'Located in Seattle, WA']
    }
  },
  {
    id: '8',
    name: 'Fiona Wilson',
    title: 'Cybersecurity Analyst',
    skills: ['Network Security', 'Penetration Testing', 'Firewalls'],
    experience: '8 years',
    education: 'Bachelor of Science in Cybersecurity',
    username: 'fiona.wilson',
    university: 'Georgia Institute of Technology',
    year: '2015',
    location: 'Atlanta, GA',
    tagline: 'Cybersecurity Analyst specializing in network security and penetration testing',
    bio: 'Experienced Cybersecurity Analyst with a strong background in network security and penetration testing.',
    availability: 'Available for full-time positions',
    rating: 4.8,
    projects: [],
    achievements: ['Led a successful penetration testing engagement for a Fortune 500 company'],
    certifications: [],
    isVerified: true,
    profileImage: 'https://example.com/fiona-wilson.jpg',
    resumeLink: 'https://example.com/fiona-wilson-resume.pdf',
    socialLinks: {},
    tokensEarned: 140,
    badges: [],
    profileViews: 700,
    profileSlug: 'fiona-wilson',
    matchPercentage: 94,
    aiAnalysis: {
      summary: 'Excellent match for Cybersecurity Analyst roles with expertise in Network Security, Penetration Testing, and Firewalls.',
      skillsMatch: 97,
      experienceMatch: 89,
      locationMatch: 79,
      availabilityMatch: 100,
      reasons: ['Strong skills in Network Security, Penetration Testing, and Firewalls', '8 years of experience', 'Available for full-time positions', 'Located in Atlanta, GA']
    }
  },
  {
    id: '9',
    name: 'George Garcia',
    title: 'Product Manager',
    skills: ['Product Strategy', 'Market Research', 'Agile'],
    experience: '9 years',
    education: 'Master of Business Administration',
    username: 'george.garcia',
    university: 'Harvard Business School',
    year: '2014',
    location: 'Boston, MA',
    tagline: 'Product Manager passionate about building innovative products',
    bio: 'Experienced Product Manager with a strong background in product strategy and market research.',
    availability: 'Not actively looking',
    rating: 4.5,
    projects: [],
    achievements: ['Launched a successful product that generated significant revenue'],
    certifications: [],
    isVerified: true,
    profileImage: 'https://example.com/george-garcia.jpg',
    resumeLink: 'https://example.com/george-garcia-resume.pdf',
    socialLinks: {},
    tokensEarned: 110,
    badges: [],
    profileViews: 550,
    profileSlug: 'george-garcia',
    matchPercentage: 86,
    aiAnalysis: {
      summary: 'Strong match for Product Management roles with expertise in Product Strategy, Market Research, and Agile.',
      skillsMatch: 91,
      experienceMatch: 83,
      locationMatch: 73,
      availabilityMatch: 60,
      reasons: ['Strong skills in Product Strategy, Market Research, and Agile', '9 years of experience', 'Located in Boston, MA']
    }
  },
  {
    id: '10',
    name: 'Hannah Rodriguez',
    title: 'UI/UX Designer',
    skills: ['User Research', 'Wireframing', 'Prototyping'],
    experience: '10 years',
    education: 'Bachelor of Fine Arts in Graphic Design',
    username: 'hannah.rodriguez',
    university: 'Rhode Island School of Design',
    year: '2013',
    location: 'Providence, RI',
    tagline: 'UI/UX Designer passionate about creating user-centered designs',
    bio: 'Experienced UI/UX Designer with a strong background in user research and wireframing.',
    availability: 'Available for freelance work',
    rating: 4.9,
    projects: [],
    achievements: ['Won a design award for a mobile app'],
    certifications: [],
    isVerified: true,
    profileImage: 'https://example.com/hannah-rodriguez.jpg',
    resumeLink: 'https://example.com/hannah-rodriguez-resume.pdf',
    socialLinks: {},
    tokensEarned: 160,
    badges: [],
    profileViews: 800,
    profileSlug: 'hannah-rodriguez',
    matchPercentage: 96,
    aiAnalysis: {
      summary: 'Excellent match for UI/UX Designer roles with expertise in User Research, Wireframing, and Prototyping.',
      skillsMatch: 99,
      experienceMatch: 91,
      locationMatch: 81,
      availabilityMatch: 90,
      reasons: ['Strong skills in User Research, Wireframing, and Prototyping', '10 years of experience', 'Available for freelance work', 'Located in Providence, RI']
    }
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
        const experienceMatch = Math.min(experienceYears, 10);
        score += experienceMatch * 2;
        reasoning += `Experience of ${candidate.experience}. `;
      }

      // Award points for education
      if (candidate.education.toLowerCase().includes(query.toLowerCase())) {
        score += 10;
        reasoning += `Education matches the query. `;
      }

      const aiAnalysis = {
        summary: reasoning,
        skillsMatch: Math.floor(Math.random() * 100),
        experienceMatch: Math.floor(Math.random() * 100),
        locationMatch: Math.floor(Math.random() * 100),
        availabilityMatch: Math.floor(Math.random() * 100),
        reasons: [reasoning]
      };

      return {
        candidate,
        score,
        reasoning,
        matchPercentage: Math.floor(Math.random() * 100),
        aiAnalysis
      };
    }).sort((a, b) => b.score - a.score);

    // Filter out candidates with a score less than 20 (adjust as needed)
    const filteredMatches = matches.filter(match => match.score >= 20);

    return filteredMatches;
  },

  generateLearningRoadmap: async (goal: string): Promise<LearningRoadmap> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return generateDynamicRoadmap(goal);
  }
};
