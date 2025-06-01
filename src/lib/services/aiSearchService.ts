
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
  // Simulate AI-powered natural language query parsing
  private parseNaturalLanguageQuery(query: string): SearchQuery {
    const normalizedQuery = query.toLowerCase();
    
    // Extract skills using keyword matching (in real implementation, use LLM)
    const skillKeywords = [
      'react', 'vue', 'angular', 'javascript', 'typescript', 'python', 'java',
      'node.js', 'express', 'django', 'flask', 'tensorflow', 'pytorch', 'opencv',
      'langchain', 'rag', 'llm', 'gpt', 'bert', 'transformers', 'huggingface',
      'machine learning', 'deep learning', 'nlp', 'computer vision', 'ai',
      'sql', 'mongodb', 'postgresql', 'redis', 'docker', 'kubernetes', 'aws',
      'gcp', 'azure', 'devops', 'ci/cd', 'microservices', 'blockchain', 'solidity'
    ];
    
    const extractedSkills = skillKeywords.filter(skill => 
      normalizedQuery.includes(skill)
    );

    // Extract location
    const locationKeywords = ['europe', 'us', 'usa', 'canada', 'uk', 'germany', 'france', 'remote', 'san francisco', 'new york', 'london', 'berlin'];
    const location = locationKeywords.find(loc => normalizedQuery.includes(loc)) || '';

    // Extract experience level
    let experience = '';
    if (normalizedQuery.includes('senior') || normalizedQuery.includes('lead')) {
      experience = 'senior';
    } else if (normalizedQuery.includes('junior') || normalizedQuery.includes('entry')) {
      experience = 'junior';
    } else if (normalizedQuery.includes('mid') || normalizedQuery.includes('intermediate')) {
      experience = 'mid';
    }

    // Extract work type
    let availability = '';
    if (normalizedQuery.includes('contract') || normalizedQuery.includes('freelance')) {
      availability = 'Available for contract';
    } else if (normalizedQuery.includes('full-time') || normalizedQuery.includes('permanent')) {
      availability = 'Available immediately';
    }

    return {
      query: normalizedQuery,
      location,
      experience,
      skills: extractedSkills,
      availability
    };
  }

  // AI-powered candidate scoring and ranking
  private scoreCandidate(candidate: Candidate, searchQuery: SearchQuery): ScoredCandidate {
    const analysis = {
      skillMatch: 0,
      experienceMatch: 0,
      locationMatch: 0,
      availabilityMatch: 0
    };

    const matchReasons: string[] = [];

    // Skill matching
    if (searchQuery.skills && searchQuery.skills.length > 0) {
      const matchedSkills = candidate.skills.filter(skill =>
        searchQuery.skills!.some(searchSkill =>
          skill.toLowerCase().includes(searchSkill.toLowerCase())
        )
      );
      analysis.skillMatch = (matchedSkills.length / searchQuery.skills.length) * 100;
      
      if (matchedSkills.length > 0) {
        matchReasons.push(`Strong match in ${matchedSkills.slice(0, 3).join(', ')}`);
      }
    } else {
      analysis.skillMatch = 50; // Default score when no specific skills mentioned
    }

    // Experience matching
    if (searchQuery.experience) {
      const candidateExp = candidate.experience.toLowerCase();
      if (searchQuery.experience === 'senior' && (candidateExp.includes('senior') || candidateExp.includes('lead') || candidateExp.includes('5+'))) {
        analysis.experienceMatch = 100;
        matchReasons.push('Senior-level experience');
      } else if (searchQuery.experience === 'junior' && (candidateExp.includes('junior') || candidateExp.includes('entry') || candidateExp.includes('1-2'))) {
        analysis.experienceMatch = 100;
        matchReasons.push('Junior-level experience match');
      } else if (searchQuery.experience === 'mid' && candidateExp.includes('3-4')) {
        analysis.experienceMatch = 100;
        matchReasons.push('Mid-level experience match');
      } else {
        analysis.experienceMatch = 30;
      }
    } else {
      analysis.experienceMatch = 50;
    }

    // Location matching
    if (searchQuery.location) {
      if (candidate.location.toLowerCase().includes(searchQuery.location.toLowerCase()) ||
          (searchQuery.location === 'remote' && candidate.availability.includes('Remote'))) {
        analysis.locationMatch = 100;
        matchReasons.push(`Located in ${searchQuery.location}`);
      } else if (searchQuery.location === 'europe' && 
                 ['London', 'Berlin', 'Amsterdam', 'Paris', 'Barcelona'].some(city => 
                   candidate.location.includes(city))) {
        analysis.locationMatch = 90;
        matchReasons.push('Europe-based candidate');
      } else {
        analysis.locationMatch = 20;
      }
    } else {
      analysis.locationMatch = 50;
    }

    // Availability matching
    if (searchQuery.availability) {
      if (candidate.availability.toLowerCase().includes(searchQuery.availability.toLowerCase())) {
        analysis.availabilityMatch = 100;
        matchReasons.push('Availability matches requirements');
      } else {
        analysis.availabilityMatch = 30;
      }
    } else {
      analysis.availabilityMatch = 50;
    }

    // Calculate overall relevance score
    const relevanceScore = Math.round(
      (analysis.skillMatch * 0.4 + 
       analysis.experienceMatch * 0.3 + 
       analysis.locationMatch * 0.2 + 
       analysis.availabilityMatch * 0.1)
    );

    // Add AI insights
    if (candidate.rating >= 4.5) {
      matchReasons.push('Highly rated professional');
    }
    if (candidate.projects.length >= 3) {
      matchReasons.push('Strong project portfolio');
    }
    if (candidate.isVerified) {
      matchReasons.push('Verified profile');
    }

    return {
      ...candidate,
      relevanceScore,
      matchReasons,
      aiAnalysis: analysis
    };
  }

  // Main AI search function
  async searchTalent(naturalLanguageQuery: string): Promise<AISearchResponse> {
    const startTime = Date.now();
    
    console.log('🔍 AI Search Query:', naturalLanguageQuery);
    
    // Parse natural language query
    const parsedQuery = this.parseNaturalLanguageQuery(naturalLanguageQuery);
    console.log('📊 Parsed Query:', parsedQuery);

    // Get all candidates
    const allCandidates = candidateService.getAllCandidates();
    
    // Score and rank candidates
    const scoredCandidates = allCandidates
      .map(candidate => this.scoreCandidate(candidate, parsedQuery))
      .filter(candidate => candidate.relevanceScore >= 20) // Filter out very low matches
      .sort((a, b) => b.relevanceScore - a.relevanceScore);

    const searchTime = Date.now() - startTime;

    return {
      candidates: scoredCandidates,
      totalFound: scoredCandidates.length,
      searchTime,
      parsedQuery: {
        role: naturalLanguageQuery.split(' ').find(word => 
          ['engineer', 'developer', 'scientist', 'analyst', 'manager'].includes(word.toLowerCase())
        ) || 'Professional',
        skills: parsedQuery.skills || [],
        location: parsedQuery.location || 'Any',
        experience: parsedQuery.experience || 'Any level',
        workType: parsedQuery.availability || 'Any'
      }
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
      estimatedTime: questions.length * 5 // 5 minutes per question
    };
  }
}

export const aiSearchService = new AISearchService();
