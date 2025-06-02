import { candidateService, type Candidate } from './candidateService';

export interface SearchQuery {
  query: string;
  location?: string;
  experience?: string;
  skills?: string[];
  availability?: string;
}

export interface ScoredCandidate extends Candidate {
  relevanceScore: number;
  matchReasons: string[];
  aiAnalysis: {
    skillMatch: number;
    experienceMatch: number;
    locationMatch: number;
    availabilityMatch: number;
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
    
    // Enhanced skill extraction with Gen-AI specific terms
    const skillKeywords = [
      'react', 'vue', 'angular', 'javascript', 'typescript', 'python', 'java',
      'node.js', 'express', 'django', 'flask', 'tensorflow', 'pytorch', 'opencv',
      'langchain', 'rag', 'llm', 'gpt', 'bert', 'transformers', 'huggingface',
      'machine learning', 'deep learning', 'nlp', 'computer vision', 'ai',
      'sql', 'mongodb', 'postgresql', 'redis', 'docker', 'kubernetes', 'aws',
      'gcp', 'azure', 'devops', 'ci/cd', 'microservices', 'blockchain', 'solidity',
      'gen-ai', 'generative ai', 'vector databases', 'faiss', 'pinecone', 'chroma',
      'openai', 'claude', 'prompt engineering', 'fine-tuning', 'embeddings',
      'retrieval augmented generation', 'semantic search', 'vector search'
    ];
    
    const extractedSkills = skillKeywords.filter(skill => 
      normalizedQuery.includes(skill) || 
      normalizedQuery.includes(skill.replace(/[.\-\s]/g, ''))
    );

    // Enhanced location extraction for European focus
    const locationKeywords = [
      'europe', 'european', 'eu', 'us', 'usa', 'canada', 'uk', 'united kingdom',
      'germany', 'france', 'spain', 'italy', 'netherlands', 'poland', 'sweden',
      'norway', 'denmark', 'finland', 'austria', 'switzerland', 'belgium',
      'portugal', 'greece', 'czech republic', 'hungary', 'romania', 'bulgaria',
      'croatia', 'slovenia', 'slovakia', 'estonia', 'latvia', 'lithuania',
      'remote', 'san francisco', 'new york', 'london', 'berlin', 'paris',
      'madrid', 'barcelona', 'milan', 'amsterdam', 'stockholm', 'oslo',
      'copenhagen', 'helsinki', 'vienna', 'zurich', 'brussels', 'lisbon',
      'prague', 'budapest', 'warsaw', 'dublin'
    ];
    
    let location = '';
    for (const loc of locationKeywords) {
      if (normalizedQuery.includes(loc)) {
        location = loc;
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
      availability
    };
  }

  // Enhanced AI-powered candidate scoring with stricter matching
  private scoreCandidate(candidate: Candidate, searchQuery: SearchQuery): ScoredCandidate {
    const analysis = {
      skillMatch: 0,
      experienceMatch: 0,
      locationMatch: 0,
      availabilityMatch: 0
    };

    const matchReasons: string[] = [];

    // Enhanced skill matching with exact technology requirements
    if (searchQuery.skills && searchQuery.skills.length > 0) {
      const candidateSkillsLower = candidate.skills.map(s => s.toLowerCase());
      const matchedSkills = searchQuery.skills.filter(searchSkill => {
        return candidateSkillsLower.some(candidateSkill => 
          candidateSkill.includes(searchSkill.toLowerCase()) ||
          searchSkill.toLowerCase().includes(candidateSkill)
        );
      });
      
      analysis.skillMatch = (matchedSkills.length / searchQuery.skills.length) * 100;
      
      // Bonus for exact LangChain + RAG combination
      if (searchQuery.query.includes('langchain') && searchQuery.query.includes('rag')) {
        const hasLangChain = candidateSkillsLower.some(skill => skill.includes('langchain'));
        const hasRAG = candidateSkillsLower.some(skill => skill.includes('rag'));
        if (hasLangChain && hasRAG) {
          analysis.skillMatch = Math.min(100, analysis.skillMatch + 25);
          matchReasons.push('LangChain + RAG specialist');
        }
      }
      
      if (matchedSkills.length > 0) {
        matchReasons.push(`Expert in ${matchedSkills.slice(0, 3).join(', ')}`);
      }
    } else {
      analysis.skillMatch = 50;
    }

    // Enhanced experience matching with stricter senior requirements
    if (searchQuery.experience) {
      const candidateExp = candidate.experience.toLowerCase();
      const candidateTagline = candidate.tagline.toLowerCase();
      
      if (searchQuery.experience === 'senior') {
        if (candidateExp.includes('senior') || candidateExp.includes('lead') || 
            candidateExp.includes('8+') || candidateExp.includes('7+') || 
            candidateExp.includes('6+') || candidateExp.includes('5+') ||
            candidateTagline.includes('senior') || candidateTagline.includes('lead')) {
          analysis.experienceMatch = 100;
          matchReasons.push('Senior-level expertise confirmed');
        } else {
          analysis.experienceMatch = 20; // Stricter for senior roles
        }
      } else if (searchQuery.experience === 'junior') {
        if (candidateExp.includes('junior') || candidateExp.includes('entry') || 
            candidateExp.includes('1-2') || candidateExp.includes('intern')) {
          analysis.experienceMatch = 100;
          matchReasons.push('Junior-level experience match');
        } else {
          analysis.experienceMatch = 30;
        }
      } else if (searchQuery.experience === 'mid') {
        if (candidateExp.includes('3-4') || candidateExp.includes('3+') || candidateExp.includes('4+')) {
          analysis.experienceMatch = 100;
          matchReasons.push('Mid-level experience match');
        } else {
          analysis.experienceMatch = 30;
        }
      }
    } else {
      analysis.experienceMatch = 50;
    }

    // Enhanced location matching with European focus
    if (searchQuery.location) {
      const candidateLocation = candidate.location.toLowerCase();
      
      if (searchQuery.location === 'europe' || searchQuery.location === 'european' || searchQuery.location === 'eu') {
        const europeanCountries = [
          'spain', 'germany', 'france', 'italy', 'uk', 'united kingdom', 'netherlands',
          'poland', 'sweden', 'norway', 'denmark', 'finland', 'austria', 'switzerland',
          'belgium', 'portugal', 'greece', 'czech', 'hungary', 'romania', 'bulgaria',
          'croatia', 'slovenia', 'slovakia', 'estonia', 'latvia', 'lithuania'
        ];
        
        const europeanCities = [
          'london', 'berlin', 'paris', 'madrid', 'barcelona', 'milan', 'amsterdam',
          'stockholm', 'oslo', 'copenhagen', 'helsinki', 'vienna', 'zurich',
          'brussels', 'lisbon', 'prague', 'budapest', 'warsaw', 'dublin'
        ];
        
        const isInEurope = europeanCountries.some(country => candidateLocation.includes(country)) ||
                          europeanCities.some(city => candidateLocation.includes(city));
        
        if (isInEurope) {
          analysis.locationMatch = 100;
          matchReasons.push('Located in Europe');
        } else {
          analysis.locationMatch = 10; // Very low score for non-European candidates
        }
      } else if (candidateLocation.includes(searchQuery.location.toLowerCase())) {
        analysis.locationMatch = 100;
        matchReasons.push(`Located in ${searchQuery.location}`);
      } else if (searchQuery.location === 'remote' && candidate.availability.toLowerCase().includes('remote')) {
        analysis.locationMatch = 90;
        matchReasons.push('Remote work available');
      } else {
        analysis.locationMatch = 20;
      }
    } else {
      analysis.locationMatch = 50;
    }

    // Enhanced availability matching
    if (searchQuery.availability) {
      const candidateAvailability = candidate.availability.toLowerCase();
      
      if (searchQuery.availability === 'contract') {
        if (candidateAvailability.includes('contract') || candidateAvailability.includes('freelance') ||
            candidateAvailability.includes('available for contract')) {
          analysis.availabilityMatch = 100;
          matchReasons.push('Available for contract work');
        } else if (candidateAvailability.includes('available')) {
          analysis.availabilityMatch = 70; // Might be open to contract
        } else {
          analysis.availabilityMatch = 20;
        }
      } else if (searchQuery.availability === 'full-time') {
        if (candidateAvailability.includes('full-time') || candidateAvailability.includes('immediately') ||
            candidateAvailability.includes('permanent')) {
          analysis.availabilityMatch = 100;
          matchReasons.push('Available for full-time role');
        } else {
          analysis.availabilityMatch = 30;
        }
      }
    } else {
      analysis.availabilityMatch = 50;
    }

    // Calculate overall relevance score with weighted importance
    const relevanceScore = Math.round(
      (analysis.skillMatch * 0.45 +      // Increased weight for skills
       analysis.experienceMatch * 0.25 + // Experience is crucial for senior roles
       analysis.locationMatch * 0.20 +   // Location matching for Europe requirement
       analysis.availabilityMatch * 0.10) // Availability for contract work
    );

    // Add quality indicators
    if (candidate.rating >= 4.8) {
      matchReasons.push('Highly rated professional (4.8+ stars)');
    }
    if (candidate.projects && candidate.projects.length >= 2) {
      matchReasons.push('Strong project portfolio');
    }
    if (candidate.isVerified) {
      matchReasons.push('Verified profile');
    }
    if (candidate.achievements && candidate.achievements.length >= 2) {
      matchReasons.push('Notable achievements');
    }

    return {
      ...candidate,
      relevanceScore,
      matchReasons,
      aiAnalysis: analysis
    };
  }

  // Enhanced main AI search function
  async searchTalent(naturalLanguageQuery: string): Promise<AISearchResponse> {
    const startTime = Date.now();
    
    console.log('🔍 AI Search Query:', naturalLanguageQuery);
    
    // Parse natural language query
    const parsedQuery = this.parseNaturalLanguageQuery(naturalLanguageQuery);
    console.log('📊 Parsed Query:', parsedQuery);

    // Get all candidates
    const allCandidates = candidateService.getAllCandidates();
    console.log(`📋 Total candidates in database: ${allCandidates.length}`);
    
    // Score and rank candidates with minimum threshold
    const scoredCandidates = allCandidates
      .map(candidate => this.scoreCandidate(candidate, parsedQuery))
      .filter(candidate => {
        // For specific queries like "senior + LangChain + RAG + Europe + contract", 
        // apply stricter filtering
        if (naturalLanguageQuery.toLowerCase().includes('senior') && 
            naturalLanguageQuery.toLowerCase().includes('langchain') && 
            naturalLanguageQuery.toLowerCase().includes('rag') && 
            naturalLanguageQuery.toLowerCase().includes('europe') &&
            naturalLanguageQuery.toLowerCase().includes('contract')) {
          return candidate.relevanceScore >= 70; // Higher threshold for specific queries
        }
        return candidate.relevanceScore >= 30; // General threshold
      })
      .sort((a, b) => b.relevanceScore - a.relevanceScore);

    const searchTime = Date.now() - startTime;

    console.log(`✅ Found ${scoredCandidates.length} matching candidates`);
    console.log('🏆 Top matches:', scoredCandidates.slice(0, 3).map(c => ({
      name: c.name,
      score: c.relevanceScore,
      location: c.location,
      skills: c.skills.filter(s => s.toLowerCase().includes('langchain') || s.toLowerCase().includes('rag'))
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
    
    // Check for compound roles
    if (query.toLowerCase().includes('gen-ai') || query.toLowerCase().includes('generative ai')) {
      return 'Gen-AI Engineer';
    }
    
    return 'AI Professional';
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
      estimatedTime: questions.length * 5 // 5 minutes per question
    };
  }
}

export const aiSearchService = new AISearchService();
