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
    
    const goalLower = goal.toLowerCase();
    
    // Data Scientist roadmap
    if (goalLower.includes('data scientist') || goalLower.includes('data science')) {
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
              },
              {
                title: "Pandas Complete Tutorial",
                type: "video",
                url: "https://www.youtube.com/watch?v=vmEHCJofslg",
                description: "Master data manipulation with Pandas"
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
              },
              {
                title: "Scikit-learn Crash Course",
                type: "video",
                url: "https://www.youtube.com/watch?v=pqNCD_5r0IU",
                description: "Hands-on machine learning with Python"
              },
              {
                title: "100 Days of ML Code",
                type: "practice",
                url: "https://github.com/Avik-Jain/100-Days-Of-ML-Code",
                description: "Daily ML coding challenges and projects"
              }
            ]
          },
          {
            phase: "Deep Learning & Advanced ML",
            duration: "2-3 months",
            skills: ["Deep Learning", "Neural Networks", "TensorFlow", "PyTorch", "Computer Vision", "NLP"],
            resources: [
              {
                title: "Deep Learning Specialization",
                type: "video",
                url: "https://www.youtube.com/watch?v=CS4cs9xVecg",
                description: "Complete deep learning course by Andrew Ng"
              },
              {
                title: "PyTorch for Deep Learning",
                type: "video",
                url: "https://www.youtube.com/watch?v=V_xro1bcAuA",
                description: "Learn PyTorch from scratch"
              },
              {
                title: "Natural Language Processing",
                type: "video",
                url: "https://www.youtube.com/watch?v=fNxaJsNG3-s",
                description: "NLP fundamentals and applications"
              }
            ]
          },
          {
            phase: "Data Engineering & MLOps",
            duration: "1-2 months",
            skills: ["SQL", "Data Pipelines", "MLOps", "Docker", "Cloud Platforms", "Model Deployment"],
            resources: [
              {
                title: "SQL for Data Science",
                type: "video",
                url: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
                description: "Complete SQL course for data analysis"
              },
              {
                title: "MLOps Course",
                type: "video",
                url: "https://www.youtube.com/watch?v=NgWujOrCZFo",
                description: "Machine Learning Operations and deployment"
              },
              {
                title: "Docker for Data Science",
                type: "video",
                url: "https://www.youtube.com/watch?v=0qG_0CPQhpg",
                description: "Containerization for ML projects"
              }
            ]
          },
          {
            phase: "Portfolio Projects & Career Prep",
            duration: "1-2 months",
            skills: ["Portfolio Development", "GitHub", "Project Management", "Communication", "Interview Prep"],
            resources: [
              {
                title: "Data Science Portfolio Projects",
                type: "video",
                url: "https://www.youtube.com/watch?v=MpF9HENQjDo",
                description: "Build impressive portfolio projects"
              },
              {
                title: "Data Science Interview Questions",
                type: "video",
                url: "https://www.youtube.com/watch?v=fE1TF0mekN0",
                description: "Common interview questions and answers"
              },
              {
                title: "Kaggle Competitions Guide",
                type: "practice",
                url: "https://www.kaggle.com/learn",
                description: "Participate in real data science competitions"
              }
            ]
          }
        ]
      };
    }
    
    // Machine Learning Engineer roadmap
    if (goalLower.includes('machine learning') || goalLower.includes('ml engineer')) {
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
              },
              {
                title: "Linear Algebra for ML",
                type: "video",
                url: "https://www.youtube.com/watch?v=fNk_zzaMoSs",
                description: "Essential math concepts for machine learning"
              }
            ]
          },
          {
            phase: "Core Machine Learning",
            duration: "2-3 months",
            skills: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Feature Engineering"],
            resources: [
              {
                title: "Machine Learning A-Z",
                type: "video",
                url: "https://www.youtube.com/watch?v=Gv9_4yMHFhI",
                description: "Comprehensive ML algorithms course"
              },
              {
                title: "Feature Engineering Techniques",
                type: "video",
                url: "https://www.youtube.com/watch?v=6WDFfaYtN6s",
                description: "Advanced feature engineering methods"
              }
            ]
          },
          {
            phase: "MLOps & Production",
            duration: "2-3 months",
            skills: ["Model Deployment", "Docker", "Kubernetes", "CI/CD", "Monitoring"],
            resources: [
              {
                title: "MLOps Complete Guide",
                type: "video",
                url: "https://www.youtube.com/watch?v=NgWujOrCZFo",
                description: "Production ML systems and operations"
              },
              {
                title: "Docker & Kubernetes for ML",
                type: "video",
                url: "https://www.youtube.com/watch?v=0qG_0CPQhpg",
                description: "Containerization and orchestration"
              }
            ]
          }
        ]
      };
    }
    
    // Frontend Developer roadmap
    if (goalLower.includes('frontend') || goalLower.includes('react') || goalLower.includes('web develop')) {
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
              },
              {
                title: "JavaScript Crash Course",
                type: "video",
                url: "https://www.youtube.com/watch?v=hdI2bqOjy3c",
                description: "Modern JavaScript ES6+ features"
              }
            ]
          },
          {
            phase: "React Development",
            duration: "2-3 months",
            skills: ["React", "TypeScript", "State Management", "React Router", "Hooks"],
            resources: [
              {
                title: "React Complete Course",
                type: "video",
                url: "https://www.youtube.com/watch?v=bMknfKXIFA8",
                description: "Full React development course"
              },
              {
                title: "TypeScript for React",
                type: "video",
                url: "https://www.youtube.com/watch?v=TiSGujM22OI",
                description: "TypeScript integration with React"
              }
            ]
          },
          {
            phase: "Advanced Tools & Deployment",
            duration: "1 month",
            skills: ["Next.js", "Testing", "Performance", "Deployment", "Build Tools"],
            resources: [
              {
                title: "Next.js Complete Guide",
                type: "video",
                url: "https://www.youtube.com/watch?v=mTz0GXj8NN0",
                description: "Full-stack React with Next.js"
              },
              {
                title: "React Testing Library",
                type: "video",
                url: "https://www.youtube.com/watch?v=3e1GHCA3GP0",
                description: "Testing React applications"
              }
            ]
          }
        ]
      };
    }
    
    // AI/Deep Learning roadmap
    if (goalLower.includes('ai') || goalLower.includes('artificial intelligence') || goalLower.includes('deep learning')) {
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
              },
              {
                title: "Mathematics for AI",
                type: "video",
                url: "https://www.youtube.com/watch?v=fNk_zzaMoSs",
                description: "Essential mathematical foundations"
              }
            ]
          },
          {
            phase: "Deep Learning Fundamentals",
            duration: "3-4 months",
            skills: ["Neural Networks", "TensorFlow", "PyTorch", "Computer Vision", "NLP"],
            resources: [
              {
                title: "Deep Learning Specialization",
                type: "video",
                url: "https://www.youtube.com/watch?v=CS4cs9xVecg",
                description: "Andrew Ng's deep learning course"
              },
              {
                title: "PyTorch Deep Learning",
                type: "video",
                url: "https://www.youtube.com/watch?v=V_xro1bcAuA",
                description: "Hands-on deep learning with PyTorch"
              }
            ]
          },
          {
            phase: "Advanced AI & LLMs",
            duration: "2-3 months",
            skills: ["Transformers", "LLMs", "Generative AI", "LangChain", "RAG"],
            resources: [
              {
                title: "Large Language Models Course",
                type: "video",
                url: "https://www.youtube.com/watch?v=kCc8FmEb1nY",
                description: "Understanding and building LLMs"
              },
              {
                title: "LangChain Complete Guide",
                type: "video",
                url: "https://www.youtube.com/watch?v=_v_fgW2SkkQ",
                description: "Building AI applications with LangChain"
              }
            ]
          },
          {
            phase: "AI Applications & Deployment",
            duration: "1-2 months",
            skills: ["Model Deployment", "API Development", "Cloud AI Services", "Production AI"],
            resources: [
              {
                title: "Deploying AI Models",
                type: "video",
                url: "https://www.youtube.com/watch?v=mrExsjcvF4o",
                description: "Production deployment of AI models"
              },
              {
                title: "Building AI Applications",
                type: "video",
                url: "https://www.youtube.com/watch?v=tcqEUSNCn8I",
                description: "End-to-end AI application development"
              }
            ]
          }
        ]
      };
    }
    
    // Default roadmap for general goals
    return {
      description: "Customized learning pathway based on your specific goals and interests",
      totalDuration: "6-8 months",
      roadmap: [
        {
          phase: "Foundation & Planning",
          duration: "1 month",
          skills: ["Goal Setting", "Learning Strategy", "Time Management", "Resource Planning"],
          resources: [
            {
              title: "How to Learn Anything Fast",
              type: "video",
              url: "https://www.youtube.com/watch?v=O96fE1E-rf8",
              description: "Effective learning strategies and techniques"
            },
            {
              title: "Building Learning Habits",
              type: "video",
              url: "https://www.youtube.com/watch?v=V3UhXOUpI8U",
              description: "Creating sustainable learning routines"
            }
          ]
        },
        {
          phase: "Core Skills Development",
          duration: "3-4 months",
          skills: ["Programming", "Problem Solving", "Critical Thinking", "Project Management"],
          resources: [
            {
              title: "Programming Fundamentals",
              type: "video",
              url: "https://www.youtube.com/watch?v=zOjov-2OZ0E",
              description: "Core programming concepts and practices"
            },
            {
              title: "Problem Solving Techniques",
              type: "video",
              url: "https://www.youtube.com/watch?v=MS2aHDfRNYE",
              description: "Analytical thinking and problem-solving"
            }
          ]
        },
        {
          phase: "Practical Application",
          duration: "2-3 months",
          skills: ["Project Building", "Portfolio Development", "Real-world Experience"],
          resources: [
            {
              title: "Building Your First Project",
              type: "video",
              url: "https://www.youtube.com/watch?v=41ek1j0Xr1Y",
              description: "Step-by-step project development guide"
            },
            {
              title: "Portfolio Showcase",
              type: "video",
              url: "https://www.youtube.com/watch?v=n50_7SktIpY",
              description: "Creating an impressive portfolio"
            }
          ]
        }
      ]
    };
  }
};

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
  const candidateHash = candidate.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
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
