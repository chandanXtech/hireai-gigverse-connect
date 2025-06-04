import { candidateService, type Candidate } from './candidateService';

export interface SearchQuery {
  query: string;
  location?: string;
  experience?: string;
  skills?: string[];
  availability?: string;
  role?: string;
}

export interface ScoredCandidate extends Candidate {
  relevanceScore: number;
  matchReasons: string[];
  aiAnalysis: {
    skillMatch: number;
    experienceMatch: number;
    locationMatch: number;
    availabilityMatch: number;
    roleMatch: number;
  };
}

export interface AISearchResponse {
  candidates: ScoredCandidate[];
  totalFound: number;
  searchTime: number;
  parsedQuery: {
    role: string;
    skills: string[];
    location: string;
    experience: string;
    workType: string;
  };
}

class AISearchService {
  // Enhanced AI-powered natural language query parsing
  private parseNaturalLanguageQuery(query: string): SearchQuery {
    const normalizedQuery = query.toLowerCase();
    
    // Enhanced skill extraction with better matching
    const skillKeywords = [
      'react', 'vue', 'angular', 'javascript', 'typescript', 'python', 'java',
      'node.js', 'express', 'django', 'flask', 'tensorflow', 'pytorch', 'opencv',
      'langchain', 'rag', 'llm', 'gpt', 'bert', 'transformers', 'huggingface',
      'machine learning', 'deep learning', 'nlp', 'computer vision', 'ai',
      'sql', 'mongodb', 'postgresql', 'redis', 'docker', 'kubernetes', 'aws',
      'gcp', 'azure', 'devops', 'ci/cd', 'microservices', 'blockchain', 'solidity',
      'gen-ai', 'generative ai', 'vector databases', 'faiss', 'pinecone', 'chroma',
      'openai', 'claude', 'prompt engineering', 'fine-tuning', 'embeddings',
      'retrieval augmented generation', 'semantic search', 'vector search',
      'fastapi', 'streamlit', 'data science', 'analytics', 'visualization'
    ];
    
    const extractedSkills = skillKeywords.filter(skill => 
      normalizedQuery.includes(skill) || 
      normalizedQuery.includes(skill.replace(/[.\-\s]/g, ''))
    );

    // Enhanced location extraction
    const locationKeywords = [
      // Indian cities
      'bangalore', 'mumbai', 'delhi', 'chennai', 'hyderabad', 'pune', 'kolkata', 'ahmedabad',
      'jaipur', 'indore', 'bhopal', 'gurgaon', 'noida', 'kochi', 'trivandrum', 'coimbatore',
      'india', 'indian',
      // European cities and countries
      'europe', 'european', 'eu', 'uk', 'united kingdom', 'germany', 'france', 'spain', 
      'italy', 'netherlands', 'poland', 'sweden', 'norway', 'denmark', 'finland', 
      'austria', 'switzerland', 'belgium', 'portugal', 'greece', 'czech republic', 
      'hungary', 'romania', 'bulgaria', 'croatia', 'slovenia', 'slovakia', 
      'estonia', 'latvia', 'lithuania', 'london', 'berlin', 'paris', 'madrid', 
      'barcelona', 'milan', 'amsterdam', 'stockholm', 'oslo', 'copenhagen', 
      'helsinki', 'vienna', 'zurich', 'brussels', 'lisbon', 'prague', 'budapest', 
      'warsaw', 'dublin', 'tallinn',
      // US cities
      'us', 'usa', 'america', 'american', 'san francisco', 'new york', 'seattle', 
      'austin', 'boston', 'chicago', 'los angeles', 'silicon valley',
      // Others
      'remote', 'canada', 'toronto', 'vancouver', 'australia', 'sydney', 'melbourne'
    ];
    
    let location = '';
    for (const loc of locationKeywords) {
      if (normalizedQuery.includes(loc)) {
        location = loc;
        break;
      }
    }

    // Enhanced role extraction
    const roleKeywords = [
      'software engineer', 'software developer', 'full stack developer', 'frontend developer',
      'backend developer', 'ai engineer', 'machine learning engineer', 'data scientist',
      'devops engineer', 'mobile developer', 'react developer', 'python developer',
      'java developer', 'nodejs developer', 'gen-ai engineer', 'ml engineer',
      'lead engineer', 'senior engineer', 'principal engineer', 'staff engineer',
      'architect', 'tech lead', 'engineering manager', 'data analyst'
    ];

    let role = '';
    for (const r of roleKeywords) {
      if (normalizedQuery.includes(r)) {
        role = r;
        break;
      }
    }

    // Enhanced experience level detection
    let experience = '';
    if (normalizedQuery.includes('senior') || normalizedQuery.includes('lead') || 
        normalizedQuery.includes('principal') || normalizedQuery.includes('staff')) {
      experience = 'senior';
    } else if (normalizedQuery.includes('junior') || normalizedQuery.includes('entry') || 
               normalizedQuery.includes('graduate') || normalizedQuery.includes('intern')) {
      experience = 'junior';
    } else if (normalizedQuery.includes('mid') || normalizedQuery.includes('intermediate')) {
      experience = 'mid';
    }

    // Enhanced availability detection
    let availability = '';
    if (normalizedQuery.includes('contract') || normalizedQuery.includes('freelance') || 
        normalizedQuery.includes('consulting') || normalizedQuery.includes('project')) {
      availability = 'contract';
    } else if (normalizedQuery.includes('full-time') || normalizedQuery.includes('permanent') || 
               normalizedQuery.includes('full time')) {
      availability = 'full-time';
    }

    return {
      query: normalizedQuery,
      location,
      experience,
      skills: extractedSkills,
      availability,
      role
    };
  }

  // Completely rewritten scoring algorithm for accurate matching
  private scoreCandidate(candidate: Candidate, searchQuery: SearchQuery): ScoredCandidate {
    const analysis = {
      skillMatch: 0,
      experienceMatch: 0,
      locationMatch: 0,
      availabilityMatch: 0,
      roleMatch: 0
    };

    const matchReasons: string[] = [];

    // Skill matching with exact requirements
    if (searchQuery.skills && searchQuery.skills.length > 0) {
      const candidateSkillsLower = candidate.skills.map(s => s.toLowerCase());
      let matchedSkillsCount = 0;
      const matchedSkills: string[] = [];
      
      searchQuery.skills.forEach(searchSkill => {
        const found = candidateSkillsLower.find(candidateSkill => 
          candidateSkill.includes(searchSkill.toLowerCase()) ||
          searchSkill.toLowerCase().includes(candidateSkill)
        );
        if (found) {
          matchedSkillsCount++;
          matchedSkills.push(searchSkill);
        }
      });
      
      analysis.skillMatch = (matchedSkillsCount / searchQuery.skills.length) * 100;
      
      if (matchedSkills.length > 0) {
        matchReasons.push(`Expert in ${matchedSkills.slice(0, 3).join(', ')}`);
      }
    } else {
      analysis.skillMatch = 50; // Neutral when no skills specified
    }

    // Exact location matching
    if (searchQuery.location) {
      const candidateLocation = candidate.location.toLowerCase();
      const searchLocation = searchQuery.location.toLowerCase();
      
      if (searchLocation === 'bangalore' || searchLocation === 'bengaluru') {
        if (candidateLocation.includes('bangalore') || candidateLocation.includes('bengaluru')) {
          analysis.locationMatch = 100;
          matchReasons.push('Located in Bangalore');
        } else {
          analysis.locationMatch = 0;
        }
      } else if (searchLocation === 'europe' || searchLocation === 'european') {
        const europeanCities = [
          'madrid', 'london', 'berlin', 'paris', 'milan', 'amsterdam', 'stockholm',
          'oslo', 'copenhagen', 'helsinki', 'vienna', 'zurich', 'brussels',
          'lisbon', 'prague', 'budapest', 'warsaw', 'dublin', 'tallinn',
          'spain', 'uk', 'germany', 'france', 'italy', 'netherlands', 'sweden',
          'norway', 'denmark', 'finland', 'austria', 'switzerland', 'belgium',
          'portugal', 'czech', 'hungary', 'poland', 'ireland', 'estonia'
        ];
        
        const isInEurope = europeanCities.some(city => candidateLocation.includes(city));
        analysis.locationMatch = isInEurope ? 100 : 0;
        
        if (isInEurope) {
          matchReasons.push('Located in Europe');
        }
      } else if (candidateLocation.includes(searchLocation)) {
        analysis.locationMatch = 100;
        matchReasons.push(`Located in ${searchQuery.location}`);
      } else {
        analysis.locationMatch = 0;
      }
    } else {
      analysis.locationMatch = 50;
    }

    // Role matching
    if (searchQuery.role) {
      const candidateTitle = `${candidate.tagline} ${candidate.year}`.toLowerCase();
      const searchRole = searchQuery.role.toLowerCase();
      
      if (searchRole.includes('software engineer') || searchRole.includes('software developer')) {
        if (candidateTitle.includes('software') || candidateTitle.includes('engineer') || 
            candidateTitle.includes('developer')) {
          analysis.roleMatch = 100;
          matchReasons.push('Software engineering role match');
        } else {
          analysis.roleMatch = 30;
        }
      } else if (searchRole.includes('data scientist')) {
        if (candidateTitle.includes('data scientist') || candidateTitle.includes('data science')) {
          analysis.roleMatch = 100;
          matchReasons.push('Data science role match');
        } else {
          analysis.roleMatch = 20;
        }
      } else if (searchRole.includes('ai engineer') || searchRole.includes('gen-ai')) {
        if (candidateTitle.includes('ai') || candidateTitle.includes('gen-ai') ||
            candidateTitle.includes('artificial intelligence')) {
          analysis.roleMatch = 100;
          matchReasons.push('AI engineering specialization');
        } else {
          analysis.roleMatch = 25;
        }
      } else {
        const roleMatch = candidateTitle.includes(searchRole);
        analysis.roleMatch = roleMatch ? 100 : 40;
        if (roleMatch) {
          matchReasons.push(`${searchQuery.role} role match`);
        }
      }
    } else {
      analysis.roleMatch = 50;
    }

    // Experience level matching
    if (searchQuery.experience) {
      const candidateExp = `${candidate.experience} ${candidate.tagline}`.toLowerCase();
      
      if (searchQuery.experience === 'senior') {
        const isSenior = candidateExp.includes('senior') || candidateExp.includes('lead') || 
                        candidateExp.includes('5+') || candidateExp.includes('6+') || 
                        candidateExp.includes('7+') || candidateExp.includes('8+');
        analysis.experienceMatch = isSenior ? 100 : 20;
        if (isSenior) {
          matchReasons.push('Senior-level expertise confirmed');
        }
      } else if (searchQuery.experience === 'junior') {
        const isJunior = candidateExp.includes('junior') || candidateExp.includes('entry') || 
                        candidateExp.includes('1-2') || candidateExp.includes('intern');
        analysis.experienceMatch = isJunior ? 100 : 30;
        if (isJunior) {
          matchReasons.push('Junior-level experience match');
        }
      } else {
        analysis.experienceMatch = 70;
      }
    } else {
      analysis.experienceMatch = 50;
    }

    // Availability matching
    if (searchQuery.availability) {
      const candidateAvailability = candidate.availability.toLowerCase();
      
      if (searchQuery.availability === 'contract') {
        const isContractAvailable = candidateAvailability.includes('contract') || 
                                   candidateAvailability.includes('freelance');
        analysis.availabilityMatch = isContractAvailable ? 100 : 20;
        if (isContractAvailable) {
          matchReasons.push('Available for contract work');
        }
      } else if (searchQuery.availability === 'full-time') {
        const isFullTimeAvailable = candidateAvailability.includes('full-time') || 
                                   candidateAvailability.includes('permanent');
        analysis.availabilityMatch = isFullTimeAvailable ? 100 : 30;
        if (isFullTimeAvailable) {
          matchReasons.push('Available for full-time role');
        }
      }
    } else {
      analysis.availabilityMatch = 50;
    }

    // Calculate weighted relevance score
    const relevanceScore = Math.round(
      (analysis.skillMatch * 0.30 +
       analysis.experienceMatch * 0.20 +
       analysis.locationMatch * 0.25 +
       analysis.availabilityMatch * 0.15 +
       analysis.roleMatch * 0.10)
    );

    // Add quality indicators
    if (candidate.rating >= 4.7) {
      matchReasons.push('Highly rated professional');
    }
    if (candidate.isVerified) {
      matchReasons.push('Verified profile');
    }

    console.log(`Scoring ${candidate.name}:`, {
      query: searchQuery,
      scores: analysis,
      relevanceScore,
      matchReasons
    });

    return {
      ...candidate,
      relevanceScore,
      matchReasons,
      aiAnalysis: analysis
    };
  }

  // Enhanced main search with stricter filtering
  async searchTalent(naturalLanguageQuery: string): Promise<AISearchResponse> {
    const startTime = Date.now();
    
    console.log('🔍 AI Search Query:', naturalLanguageQuery);
    
    const parsedQuery = this.parseNaturalLanguageQuery(naturalLanguageQuery);
    console.log('📊 Parsed Query:', parsedQuery);

    const allCandidates = candidateService.getAllCandidates();
    console.log(`📋 Total candidates in database: ${allCandidates.length}`);
    
    // Score all candidates
    const scoredCandidates = allCandidates
      .map(candidate => this.scoreCandidate(candidate, parsedQuery))
      .filter(candidate => {
        // Apply strict filtering based on query specificity
        let shouldInclude = true;
        
        // Location filter - if location specified, must match closely
        if (parsedQuery.location) {
          if (candidate.aiAnalysis.locationMatch < 80) {
            shouldInclude = false;
          }
        }
        
        // Role filter - if role specified, must have reasonable match
        if (parsedQuery.role && candidate.aiAnalysis.roleMatch < 60) {
          shouldInclude = false;
        }
        
        // Skills filter - if specific skills mentioned, must have some match
        if (parsedQuery.skills.length > 0 && candidate.aiAnalysis.skillMatch < 30) {
          shouldInclude = false;
        }
        
        // Overall relevance threshold
        if (candidate.relevanceScore < 40) {
          shouldInclude = false;
        }
        
        return shouldInclude;
      })
      .sort((a, b) => {
        // Primary sort by relevance score
        if (b.relevanceScore !== a.relevanceScore) {
          return b.relevanceScore - a.relevanceScore;
        }
        // Secondary sort by rating
        return b.rating - a.rating;
      });

    const searchTime = Date.now() - startTime;

    console.log(`✅ Found ${scoredCandidates.length} matching candidates`);
    console.log('🏆 Top matches:', scoredCandidates.slice(0, 5).map(c => ({
      name: c.name,
      score: c.relevanceScore,
      location: c.location,
      analysis: c.aiAnalysis
    })));

    return {
      candidates: scoredCandidates,
      totalFound: scoredCandidates.length,
      searchTime,
      parsedQuery: {
        role: this.extractRole(naturalLanguageQuery),
        skills: parsedQuery.skills || [],
        location: parsedQuery.location || 'Any',
        experience: parsedQuery.experience || 'Any level',
        workType: parsedQuery.availability || 'Any'
      }
    };
  }

  private extractRole(query: string): string {
    // ... keep existing code (extractRole method)
    const roleKeywords = [
      'engineer', 'developer', 'scientist', 'analyst', 'manager', 'architect', 
      'researcher', 'consultant', 'specialist', 'expert', 'lead'
    ];
    
    const words = query.toLowerCase().split(' ');
    for (const word of words) {
      if (roleKeywords.includes(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    }
    
    if (query.toLowerCase().includes('software engineer')) {
      return 'Software Engineer';
    }
    if (query.toLowerCase().includes('data scientist')) {
      return 'Data Scientist';
    }
    if (query.toLowerCase().includes('gen-ai') || query.toLowerCase().includes('generative ai')) {
      return 'Gen-AI Engineer';
    }
    
    return 'Professional';
  }

  // AI-powered roadmap generation for students
  async generateLearningRoadmap(goal: string): Promise<{
    roadmap: Array<{
      phase: string;
      duration: string;
      skills: string[];
      resources: Array<{
        title: string;
        type: 'video' | 'course' | 'book' | 'practice';
        url: string;
        description: string;
      }>;
    }>;
    totalDuration: string;
    description: string;
  }> {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const normalizedGoal = goal.toLowerCase();
    
    if (normalizedGoal.includes('data scientist') || normalizedGoal.includes('data science')) {
      return {
        roadmap: [
          {
            phase: "Foundation (Months 1-2)",
            duration: "2 months",
            skills: ["Python", "Statistics", "SQL"],
            resources: [
              {
                title: "Python for Data Science Course",
                type: "video",
                url: "https://www.youtube.com/watch?v=LHBE6Q9XlzI",
                description: "Complete Python course for data science beginners"
              },
              {
                title: "Statistics Fundamentals",
                type: "video", 
                url: "https://www.youtube.com/watch?v=xxpc-HPKN28",
                description: "Essential statistics concepts for data science"
              },
              {
                title: "SQL Tutorial",
                type: "video",
                url: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
                description: "Learn SQL for data analysis"
              }
            ]
          },
          {
            phase: "Core Skills (Months 3-4)",
            duration: "2 months", 
            skills: ["Pandas", "NumPy", "Matplotlib", "Data Visualization"],
            resources: [
              {
                title: "Pandas Complete Tutorial",
                type: "video",
                url: "https://www.youtube.com/watch?v=vmEHCJofslg",
                description: "Master data manipulation with Pandas"
              },
              {
                title: "Data Visualization with Python",
                type: "video",
                url: "https://www.youtube.com/watch?v=UO98lJQ3QGI",
                description: "Create stunning visualizations"
              }
            ]
          },
          {
            phase: "Machine Learning (Months 5-6)",
            duration: "2 months",
            skills: ["Scikit-learn", "Machine Learning Algorithms", "Model Evaluation"],
            resources: [
              {
                title: "Machine Learning Course",
                type: "video",
                url: "https://www.youtube.com/watch?v=ukzFI9rgwfU",
                description: "Complete ML course by Andrew Ng"
              },
              {
                title: "Scikit-learn Tutorial",
                type: "video",
                url: "https://www.youtube.com/watch?v=pqNCD_5r0IU", 
                description: "Hands-on ML with scikit-learn"
              }
            ]
          },
          {
            phase: "Advanced Topics (Months 7-8)",
            duration: "2 months",
            skills: ["Deep Learning", "TensorFlow", "PyTorch", "NLP"],
            resources: [
              {
                title: "Deep Learning Specialization",
                type: "video",
                url: "https://www.youtube.com/watch?v=CS4cs9xVecg",
                description: "Advanced deep learning concepts"
              },
              {
                title: "Natural Language Processing",
                type: "video",
                url: "https://www.youtube.com/watch?v=fNxaJsNG3-s",
                description: "NLP fundamentals and applications"
              }
            ]
          }
        ],
        totalDuration: "8 months",
        description: "Complete roadmap to become a Data Scientist with hands-on projects and real-world applications"
      };
    }
    
    // Default roadmap for other goals
    return {
      roadmap: [
        {
          phase: "Getting Started",
          duration: "1 month",
          skills: ["Programming Basics", "Problem Solving"],
          resources: [
            {
              title: "Programming Fundamentals",
              type: "video",
              url: "https://www.youtube.com/watch?v=zOjov-2OZ0E",
              description: "Learn programming fundamentals"
            }
          ]
        }
      ],
      totalDuration: "Varies based on goal",
      description: "Customized learning path based on your career goals"
    };
  }

  // AI-powered resume parsing simulation
  async parseResume(resumeText: string): Promise<{
    skills: string[];
    experience: string;
    education: string[];
    summary: string;
    confidence: number;
  }> {
    // Simulate AI resume parsing
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      skills: ['React', 'TypeScript', 'Node.js', 'Python', 'Machine Learning'],
      experience: '5+ years in software development',
      education: ['BS Computer Science - MIT', 'MS AI - Stanford'],
      summary: 'Experienced AI engineer with strong background in LLMs and full-stack development.',
      confidence: 92
    };
  }

  // AI-powered candidate screening
  async generateScreeningQuestions(role: string, skills: string[]): Promise<{
    questions: Array<{
      question: string;
      type: 'technical' | 'behavioral' | 'situational';
      expectedKeywords: string[];
    }>;
    estimatedTime: number;
  }> {
    // Simulate AI question generation
    await new Promise(resolve => setTimeout(resolve, 500));

    const questions = [
      {
        question: "Describe your experience with LangChain and how you've implemented RAG (Retrieval-Augmented Generation) systems.",
        type: 'technical' as const,
        expectedKeywords: ['vector database', 'embeddings', 'retrieval', 'context']
      },
      {
        question: "Walk me through how you would design a scalable AI system for processing large documents.",
        type: 'technical' as const,
        expectedKeywords: ['chunking', 'pipeline', 'scalability', 'performance']
      },
      {
        question: "Tell me about a challenging AI project you worked on and how you overcame technical obstacles.",
        type: 'behavioral' as const,
        expectedKeywords: ['problem-solving', 'innovation', 'collaboration']
      }
    ];

    return {
      questions,
      estimatedTime: questions.length * 5
    };
  }
}

export const aiSearchService = new AISearchService();
