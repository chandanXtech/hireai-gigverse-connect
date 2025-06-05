import { candidateService, type Candidate } from './candidateService';

interface SearchAnalysis {
  skills: string[];
  location?: string;
  experience?: string;
  role?: string;
  availability?: string;
}

interface CandidateMatch extends Candidate {
  matchPercentage: number;
  aiAnalysis: {
    summary: string;
    skillsMatch: number;
    experienceMatch: number;
    locationMatch: number;
    availabilityMatch: number;
    reasons: string[];
  };
}

interface RoadmapResource {
  title: string;
  type: 'video' | 'course' | 'book' | 'practice';
  url: string;
  description: string;
}

interface RoadmapPhase {
  phase: string;
  duration: string;
  skills: string[];
  resources: RoadmapResource[];
}

interface LearningRoadmap {
  roadmap: RoadmapPhase[];
  totalDuration: string;
  description: string;
}

export const aiSearchService = {
  searchCandidates: (query: string): CandidateMatch[] => {
    const analysis = analyzeQuery(query);
    const allCandidates = candidateService.getAllCandidates();
    
    const matchedCandidates = allCandidates
      .map(candidate => calculateMatch(candidate, analysis, query))
      .filter(match => match.matchPercentage > 20)
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

    return matchedCandidates;
  },

  generateLearningRoadmap: async (goal: string): Promise<LearningRoadmap> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return generateDynamicRoadmap(goal);
  }
};

function generateDynamicRoadmap(goal: string): LearningRoadmap {
  const goalLower = goal.toLowerCase();
  
  // Predefined roadmaps for common goals
  if (goalLower.includes('data scientist') || goalLower.includes('data science')) {
    return getDataScienceRoadmap();
  }
  
  if (goalLower.includes('machine learning') || goalLower.includes('ml engineer')) {
    return getMachineLearningRoadmap();
  }
  
  if (goalLower.includes('frontend') || goalLower.includes('react') || goalLower.includes('web develop')) {
    return getFrontendRoadmap();
  }
  
  if (goalLower.includes('ai') || goalLower.includes('artificial intelligence') || goalLower.includes('deep learning')) {
    return getAIRoadmap();
  }

  // Trading roadmap
  if (goalLower.includes('trading') || goalLower.includes('trader') || goalLower.includes('stock')) {
    return getTradingRoadmap();
  }

  // Betting/Gambling roadmap
  if (goalLower.includes('betting') || goalLower.includes('gambling') || goalLower.includes('poker')) {
    return getBettingRoadmap();
  }

  // Digital Marketing roadmap
  if (goalLower.includes('digital marketing') || goalLower.includes('marketing') || goalLower.includes('seo')) {
    return getDigitalMarketingRoadmap();
  }

  // Blockchain roadmap
  if (goalLower.includes('blockchain') || goalLower.includes('crypto') || goalLower.includes('web3')) {
    return getBlockchainRoadmap();
  }

  // Photography roadmap
  if (goalLower.includes('photography') || goalLower.includes('photographer')) {
    return getPhotographyRoadmap();
  }

  // Music production roadmap
  if (goalLower.includes('music production') || goalLower.includes('music producer') || goalLower.includes('beat making')) {
    return getMusicProductionRoadmap();
  }

  // Fitness/Personal Training roadmap
  if (goalLower.includes('fitness') || goalLower.includes('personal trainer') || goalLower.includes('gym')) {
    return getFitnessRoadmap();
  }

  // Cooking roadmap
  if (goalLower.includes('cooking') || goalLower.includes('chef') || goalLower.includes('culinary')) {
    return getCookingRoadmap();
  }

  // Default dynamic roadmap for any other goal
  return getGenericRoadmap(goal);
}

function getDataScienceRoadmap(): LearningRoadmap {
  return {
    description: "Complete pathway to becoming a professional Data Scientist with hands-on projects and industry-relevant skills",
    totalDuration: "8-12 months",
    roadmap: [
      {
        phase: "Foundation - Python & Statistics",
        duration: "2-3 months",
        skills: ["Python Programming", "Statistics", "Data Analysis", "Pandas", "NumPy"],
        resources: [
          {
            title: "Python for Data Science - Complete Course",
            type: "video",
            url: "https://www.youtube.com/watch?v=LHBE6Q9XlzI",
            description: "12-hour comprehensive Python course covering all data science fundamentals"
          },
          {
            title: "Statistics Fundamentals",
            type: "video", 
            url: "https://www.youtube.com/watch?v=xxpc-HPKN28",
            description: "Essential statistics concepts for data science"
          }
        ]
      },
      {
        phase: "Machine Learning Fundamentals",
        duration: "2-3 months", 
        skills: ["Machine Learning", "Scikit-learn", "Supervised Learning", "Unsupervised Learning"],
        resources: [
          {
            title: "Machine Learning Course - Andrew Ng",
            type: "course",
            url: "https://www.youtube.com/watch?v=PPLop4L2eGk",
            description: "Stanford's famous ML course by Andrew Ng"
          }
        ]
      }
    ]
  };
}

function getMachineLearningRoadmap(): LearningRoadmap {
  return {
    description: "Comprehensive pathway to becoming a Machine Learning Engineer with focus on production systems",
    totalDuration: "6-9 months",
    roadmap: [
      {
        phase: "Programming & Math Foundations",
        duration: "2 months",
        skills: ["Python", "Linear Algebra", "Calculus", "Statistics", "Git"],
        resources: [
          {
            title: "Python Programming Full Course",
            type: "video",
            url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
            description: "Complete Python course for beginners"
          }
        ]
      }
    ]
  };
}

function getFrontendRoadmap(): LearningRoadmap {
  return {
    description: "Modern frontend development pathway with React, TypeScript, and latest tools",
    totalDuration: "4-6 months",
    roadmap: [
      {
        phase: "Web Fundamentals",
        duration: "1-2 months",
        skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Git"],
        resources: [
          {
            title: "HTML & CSS Full Course",
            type: "video",
            url: "https://www.youtube.com/watch?v=mU6anWqZJcc",
            description: "Complete web development fundamentals"
          }
        ]
      }
    ]
  };
}

function getAIRoadmap(): LearningRoadmap {
  return {
    description: "Comprehensive AI and Deep Learning pathway for modern AI applications",
    totalDuration: "8-12 months",
    roadmap: [
      {
        phase: "Programming & Math Foundation",
        duration: "2 months",
        skills: ["Python", "Linear Algebra", "Calculus", "Statistics", "NumPy"],
        resources: [
          {
            title: "Python for AI - Complete Course",
            type: "video",
            url: "https://www.youtube.com/watch?v=t8pPdKYpowI",
            description: "Python programming specifically for AI"
          }
        ]
      }
    ]
  };
}

function getTradingRoadmap(): LearningRoadmap {
  return {
    description: "Complete trading education from basics to advanced strategies with risk management",
    totalDuration: "6-9 months",
    roadmap: [
      {
        phase: "Trading Fundamentals",
        duration: "2 months",
        skills: ["Market Basics", "Chart Reading", "Risk Management", "Trading Psychology"],
        resources: [
          {
            title: "Trading 101 - Complete Beginner Course",
            type: "video",
            url: "https://www.youtube.com/watch?v=p7Hj4pvfCy0",
            description: "Comprehensive introduction to stock market trading"
          },
          {
            title: "Technical Analysis Masterclass",
            type: "video",
            url: "https://www.youtube.com/watch?v=08c8uDM-SsA",
            description: "Learn to read charts and identify trading opportunities"
          }
        ]
      },
      {
        phase: "Advanced Strategies",
        duration: "2-3 months",
        skills: ["Options Trading", "Swing Trading", "Day Trading", "Portfolio Management"],
        resources: [
          {
            title: "Options Trading Explained",
            type: "video",
            url: "https://www.youtube.com/watch?v=7PM4rNDr4oI",
            description: "Complete guide to options trading strategies"
          },
          {
            title: "Day Trading Strategies",
            type: "video",
            url: "https://www.youtube.com/watch?v=2CV_KuT1zZE",
            description: "Proven day trading techniques and setups"
          }
        ]
      },
      {
        phase: "Risk Management & Psychology",
        duration: "2-4 months",
        skills: ["Position Sizing", "Stop Losses", "Trading Discipline", "Emotional Control"],
        resources: [
          {
            title: "Trading Psychology Mastery",
            type: "video",
            url: "https://www.youtube.com/watch?v=ShSFj6SrKGE",
            description: "Master the mental game of trading"
          }
        ]
      }
    ]
  };
}

function getBettingRoadmap(): LearningRoadmap {
  return {
    description: "Responsible gambling education focusing on probability, bankroll management, and risk awareness",
    totalDuration: "3-6 months",
    roadmap: [
      {
        phase: "Probability & Math Fundamentals",
        duration: "1-2 months",
        skills: ["Probability Theory", "Statistics", "Expected Value", "Variance"],
        resources: [
          {
            title: "Probability for Beginners",
            type: "video",
            url: "https://www.youtube.com/watch?v=uzkc-qNVoOk",
            description: "Understanding probability and odds in gambling"
          },
          {
            title: "Statistics in Gambling",
            type: "video",
            url: "https://www.youtube.com/watch?v=A8VGQ46T4ks",
            description: "How statistics work in betting and casinos"
          }
        ]
      },
      {
        phase: "Bankroll Management",
        duration: "1-2 months",
        skills: ["Kelly Criterion", "Unit Betting", "Risk of Ruin", "Discipline"],
        resources: [
          {
            title: "Bankroll Management Guide",
            type: "video",
            url: "https://www.youtube.com/watch?v=A2Q2Q2Q2Q2Q",
            description: "Essential bankroll management for responsible gambling"
          }
        ]
      },
      {
        phase: "Responsible Gaming & Awareness",
        duration: "1-2 months",
        skills: ["Problem Gambling Recognition", "Self-Control", "Addiction Prevention"],
        resources: [
          {
            title: "Responsible Gambling Education",
            type: "video",
            url: "https://www.youtube.com/watch?v=gambling-awareness",
            description: "Understanding the risks and maintaining control"
          }
        ]
      }
    ]
  };
}

function getDigitalMarketingRoadmap(): LearningRoadmap {
  return {
    description: "Complete digital marketing mastery from social media to SEO and paid advertising",
    totalDuration: "4-6 months",
    roadmap: [
      {
        phase: "Digital Marketing Foundations",
        duration: "1-2 months",
        skills: ["Marketing Strategy", "Customer Personas", "Content Marketing", "Analytics"],
        resources: [
          {
            title: "Digital Marketing Full Course",
            type: "video",
            url: "https://www.youtube.com/watch?v=bixR-KIJKYM",
            description: "Complete introduction to digital marketing"
          }
        ]
      },
      {
        phase: "SEO & Content Marketing",
        duration: "1-2 months",
        skills: ["SEO", "Keyword Research", "Content Creation", "Google Analytics"],
        resources: [
          {
            title: "SEO Tutorial for Beginners",
            type: "video",
            url: "https://www.youtube.com/watch?v=DvwS7cV9GmQ",
            description: "Complete SEO course from basics to advanced"
          }
        ]
      }
    ]
  };
}

function getBlockchainRoadmap(): LearningRoadmap {
  return {
    description: "Comprehensive blockchain development pathway from basics to DeFi and NFTs",
    totalDuration: "6-8 months",
    roadmap: [
      {
        phase: "Blockchain Fundamentals",
        duration: "2 months",
        skills: ["Blockchain Basics", "Cryptocurrency", "Wallets", "Decentralization"],
        resources: [
          {
            title: "Blockchain Explained",
            type: "video",
            url: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
            description: "Complete blockchain fundamentals course"
          }
        ]
      }
    ]
  };
}

function getPhotographyRoadmap(): LearningRoadmap {
  return {
    description: "Professional photography skills from camera basics to advanced techniques",
    totalDuration: "4-6 months",
    roadmap: [
      {
        phase: "Camera Fundamentals",
        duration: "1-2 months",
        skills: ["Camera Settings", "Exposure", "Composition", "Lighting"],
        resources: [
          {
            title: "Photography Basics for Beginners",
            type: "video",
            url: "https://www.youtube.com/watch?v=LxO-6rlihSg",
            description: "Complete photography course for beginners"
          }
        ]
      }
    ]
  };
}

function getMusicProductionRoadmap(): LearningRoadmap {
  return {
    description: "Music production mastery from DAW basics to professional mixing and mastering",
    totalDuration: "6-9 months",
    roadmap: [
      {
        phase: "DAW & Production Basics",
        duration: "2-3 months",
        skills: ["DAW Navigation", "MIDI", "Audio Recording", "Basic Mixing"],
        resources: [
          {
            title: "Music Production Complete Course",
            type: "video",
            url: "https://www.youtube.com/watch?v=MEzb_hmwCpw",
            description: "Complete music production course for beginners"
          }
        ]
      }
    ]
  };
}

function getFitnessRoadmap(): LearningRoadmap {
  return {
    description: "Complete fitness and personal training education pathway",
    totalDuration: "4-6 months",
    roadmap: [
      {
        phase: "Fitness Fundamentals",
        duration: "1-2 months",
        skills: ["Exercise Physiology", "Anatomy", "Nutrition Basics", "Training Principles"],
        resources: [
          {
            title: "Fitness Trainer Certification Course",
            type: "video",
            url: "https://www.youtube.com/watch?v=fitness-course",
            description: "Complete personal trainer education"
          }
        ]
      }
    ]
  };
}

function getCookingRoadmap(): LearningRoadmap {
  return {
    description: "Culinary arts mastery from basic techniques to advanced cuisine",
    totalDuration: "6-12 months",
    roadmap: [
      {
        phase: "Cooking Fundamentals",
        duration: "2-3 months",
        skills: ["Knife Skills", "Basic Techniques", "Food Safety", "Recipe Reading"],
        resources: [
          {
            title: "Cooking Basics - Complete Course",
            type: "video",
            url: "https://www.youtube.com/watch?v=cooking-basics",
            description: "Essential cooking techniques and skills"
          }
        ]
      }
    ]
  };
}

function getGenericRoadmap(goal: string): LearningRoadmap {
  // Extract key words from the goal for a more personalized approach
  const keywords = goal.toLowerCase().split(' ').filter(word => word.length > 2);
  const mainTopic = keywords[0] || 'skill';
  
  return {
    description: `Customized learning pathway to master ${goal}`,
    totalDuration: "4-8 months",
    roadmap: [
      {
        phase: "Foundation & Basics",
        duration: "1-2 months",
        skills: ["Fundamentals", "Basic Concepts", "Terminology", "Getting Started"],
        resources: [
          {
            title: `${goal} - Complete Beginner Guide`,
            type: "video",
            url: `https://www.youtube.com/results?search_query=${encodeURIComponent(goal + ' tutorial')}`,
            description: `Comprehensive introduction to ${goal}`
          },
          {
            title: `Understanding ${mainTopic} Basics`,
            type: "video",
            url: `https://www.youtube.com/results?search_query=${encodeURIComponent(mainTopic + ' basics')}`,
            description: `Essential concepts and fundamentals`
          }
        ]
      },
      {
        phase: "Intermediate Skills",
        duration: "2-3 months",
        skills: ["Practical Application", "Hands-on Practice", "Problem Solving", "Skill Building"],
        resources: [
          {
            title: `Intermediate ${goal} Course`,
            type: "course",
            url: `https://www.youtube.com/results?search_query=${encodeURIComponent(goal + ' intermediate')}`,
            description: `Building on the basics with practical exercises`
          },
          {
            title: `${goal} Practice Projects`,
            type: "practice",
            url: `https://www.youtube.com/results?search_query=${encodeURIComponent(goal + ' projects')}`,
            description: `Hands-on projects to reinforce learning`
          }
        ]
      },
      {
        phase: "Advanced Mastery",
        duration: "1-3 months",
        skills: ["Advanced Techniques", "Professional Level", "Specialization", "Mastery"],
        resources: [
          {
            title: `Advanced ${goal} Techniques`,
            type: "video",
            url: `https://www.youtube.com/results?search_query=${encodeURIComponent(goal + ' advanced')}`,
            description: `Professional-level skills and techniques`
          },
          {
            title: `Mastering ${goal}`,
            type: "book",
            url: `https://www.youtube.com/results?search_query=${encodeURIComponent(goal + ' mastery')}`,
            description: `Achieving expertise and professional competency`
          }
        ]
      }
    ]
  };
}

function analyzeQuery(query: string): SearchAnalysis {
  const lowercaseQuery = query.toLowerCase();
  
  const skills: string[] = [];
  const skillKeywords = [
    'python', 'javascript', 'react', 'node', 'ai', 'ml', 'machine learning',
    'langchain', 'rag', 'gen-ai', 'generative ai', 'typescript', 'java',
    'c++', 'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'tensorflow',
    'pytorch', 'scikit-learn', 'pandas', 'numpy', 'sql', 'mongodb',
    'postgresql', 'redis', 'elasticsearch', 'nlp', 'computer vision',
    'deep learning', 'neural networks', 'transformers', 'bert', 'gpt',
    'llm', 'large language model', 'fastapi', 'django', 'flask', 'spring',
    'angular', 'vue', 'svelte', 'next.js', 'gatsby', 'express'
  ];
  
  skillKeywords.forEach(skill => {
    if (lowercaseQuery.includes(skill)) {
      skills.push(skill);
    }
  });

  let location: string | undefined;
  const locationKeywords = [
    'bangalore', 'mumbai', 'delhi', 'hyderabad', 'chennai', 'pune', 'kolkata',
    'madrid', 'barcelona', 'london', 'paris', 'berlin', 'munich', 'milan',
    'rome', 'amsterdam', 'copenhagen', 'stockholm', 'oslo', 'helsinki',
    'warsaw', 'prague', 'budapest', 'vienna', 'zurich', 'geneva',
    'europe', 'european', 'india', 'indian', 'remote', 'worldwide'
  ];
  
  locationKeywords.forEach(loc => {
    if (lowercaseQuery.includes(loc)) {
      location = loc;
    }
  });

  let experience: string | undefined;
  if (lowercaseQuery.includes('senior') || lowercaseQuery.includes('lead') || 
      lowercaseQuery.includes('principal') || lowercaseQuery.includes('5+') ||
      lowercaseQuery.includes('experienced')) {
    experience = 'senior';
  } else if (lowercaseQuery.includes('junior') || lowercaseQuery.includes('entry') ||
             lowercaseQuery.includes('fresher') || lowercaseQuery.includes('graduate')) {
    experience = 'junior';
  } else if (lowercaseQuery.includes('mid') || lowercaseQuery.includes('intermediate')) {
    experience = 'mid';
  }

  let role: string | undefined;
  const roleKeywords = [
    'engineer', 'developer', 'architect', 'researcher', 'scientist',
    'analyst', 'consultant', 'manager', 'lead', 'principal'
  ];
  
  roleKeywords.forEach(r => {
    if (lowercaseQuery.includes(r)) {
      role = r;
    }
  });

  let availability: string | undefined;
  if (lowercaseQuery.includes('contract') || lowercaseQuery.includes('freelance')) {
    availability = 'contract';
  } else if (lowercaseQuery.includes('full-time') || lowercaseQuery.includes('permanent')) {
    availability = 'full-time';
  } else if (lowercaseQuery.includes('part-time')) {
    availability = 'part-time';
  }

  return { skills, location, experience, role, availability };
}

function calculateMatch(candidate: Candidate, analysis: SearchAnalysis, originalQuery: string): CandidateMatch {
  let skillsMatch = 0;
  let experienceMatch = 0;
  let locationMatch = 0;
  let availabilityMatch = 0;
  const reasons: string[] = [];

  // Skills matching with better variation
  if (analysis.skills.length > 0) {
    const matchingSkills = analysis.skills.filter(skill => 
      candidate.skills.some(candidateSkill => 
        candidateSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(candidateSkill.toLowerCase())
      )
    );
    
    const skillMatchRatio = matchingSkills.length / analysis.skills.length;
    skillsMatch = Math.min(100, skillMatchRatio * 100);
    
    // Add variation based on candidate quality
    const qualityBonus = candidate.rating >= 4.5 ? 15 : candidate.rating >= 4.0 ? 10 : 5;
    skillsMatch = Math.min(100, skillsMatch + qualityBonus);
    
    if (matchingSkills.length > 0) {
      reasons.push(`Expert in ${matchingSkills.slice(0, 3).join(', ')}`);
    }
  } else {
    skillsMatch = 40 + Math.random() * 20; // 40-60% base when no specific skills
  }

  // Experience matching with variation
  if (analysis.experience) {
    const candidateExp = candidate.experience.toLowerCase();
    const candidateTitle = candidate.tagline.toLowerCase();
    
    if (analysis.experience === 'senior') {
      if (candidateExp.includes('5+') || candidateExp.includes('6+') || 
          candidateExp.includes('7+') || candidateExp.includes('8+') ||
          candidateTitle.includes('senior') || candidateTitle.includes('lead') ||
          candidateTitle.includes('principal')) {
        experienceMatch = 95 + Math.random() * 5; // 95-100%
        reasons.push('Senior-level expertise confirmed');
      } else if (candidateExp.includes('3+') || candidateExp.includes('4+')) {
        experienceMatch = 60 + Math.random() * 15; // 60-75%
      } else {
        experienceMatch = 25 + Math.random() * 15; // 25-40%
      }
    } else if (analysis.experience === 'junior') {
      if (candidateExp.includes('1+') || candidateExp.includes('2+') ||
          candidateTitle.includes('junior') || candidateTitle.includes('graduate')) {
        experienceMatch = 90 + Math.random() * 10; // 90-100%
        reasons.push('Perfect match for junior level');
      } else {
        experienceMatch = 50 + Math.random() * 20; // 50-70%
      }
    } else {
      experienceMatch = 70 + Math.random() * 20; // 70-90%
    }
  } else {
    experienceMatch = 60 + Math.random() * 25; // 60-85% default
  }

  // Location matching with better variation
  if (analysis.location) {
    const candidateLocation = candidate.location.toLowerCase();
    const searchLocation = analysis.location.toLowerCase();
    
    if (candidateLocation.includes(searchLocation) || 
        searchLocation.includes(candidateLocation)) {
      locationMatch = 95 + Math.random() * 5; // 95-100%
      reasons.push(`Located in ${analysis.location}`);
    } else if (searchLocation === 'europe' || searchLocation === 'european') {
      const europeanCountries = ['spain', 'germany', 'france', 'italy', 'uk', 'poland', 
                                'denmark', 'norway', 'netherlands', 'sweden', 'finland'];
      if (europeanCountries.some(country => candidateLocation.includes(country))) {
        locationMatch = 90 + Math.random() * 10; // 90-100%
        reasons.push('Located in Europe');
      } else {
        locationMatch = 15 + Math.random() * 15; // 15-30%
      }
    } else if (searchLocation === 'india' || searchLocation === 'indian') {
      if (candidateLocation.includes('bangalore') || candidateLocation.includes('mumbai') ||
          candidateLocation.includes('delhi') || candidateLocation.includes('hyderabad') ||
          candidateLocation.includes('chennai') || candidateLocation.includes('pune')) {
        locationMatch = 90 + Math.random() * 10; // 90-100%
        reasons.push('Located in India');
      } else {
        locationMatch = 15 + Math.random() * 15; // 15-30%
      }
    } else {
      locationMatch = 25 + Math.random() * 25; // 25-50%
    }
  } else {
    locationMatch = 65 + Math.random() * 20; // 65-85% default
  }

  // Availability matching
  if (analysis.availability) {
    const candidateAvailability = candidate.availability.toLowerCase();
    if (candidateAvailability.includes(analysis.availability)) {
      availabilityMatch = 95 + Math.random() * 5; // 95-100%
      reasons.push(`Available for ${analysis.availability} work`);
    } else {
      availabilityMatch = 30 + Math.random() * 20; // 30-50%
    }
  } else {
    availabilityMatch = 70 + Math.random() * 20; // 70-90% default
  }

  // Additional quality indicators
  if (candidate.isVerified) {
    reasons.push('Verified profile');
  }
  
  if (candidate.rating >= 4.5) {
    reasons.push('Highly rated professional');
  }

  // Role matching bonus
  if (analysis.role) {
    const candidateTitle = candidate.tagline.toLowerCase();
    if (candidateTitle.includes(analysis.role)) {
      reasons.push(`${analysis.role.charAt(0).toUpperCase() + analysis.role.slice(1)} specialization`);
      skillsMatch = Math.min(100, skillsMatch + 10);
    }
  }

  // Calculate weighted overall match with realistic variation
  const baseMatch = (skillsMatch * 0.4) + (experienceMatch * 0.25) + (locationMatch * 0.25) + (availabilityMatch * 0.1);
  
  // Add candidate-specific variation based on ID for consistency
  const candidateHash = candidate.id.toString().split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const variation = (candidateHash % 20) - 10; // -10 to +10 variation
  
  const finalMatch = Math.max(20, Math.min(100, Math.round(baseMatch + variation)));

  const summary = reasons.slice(0, 4).join('\n');

  return {
    ...candidate,
    matchPercentage: finalMatch,
    aiAnalysis: {
      summary,
      skillsMatch: Math.round(skillsMatch),
      experienceMatch: Math.round(experienceMatch),
      locationMatch: Math.round(locationMatch),
      availabilityMatch: Math.round(availabilityMatch),
      reasons
    }
  };
}
