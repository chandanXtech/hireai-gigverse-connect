
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

export const aiSearchService = {
  searchCandidates: (query: string): CandidateMatch[] => {
    const analysis = analyzeQuery(query);
    const allCandidates = candidateService.getAllCandidates();
    
    const matchedCandidates = allCandidates
      .map(candidate => calculateMatch(candidate, analysis, query))
      .filter(match => match.matchPercentage > 20) // Only show candidates with meaningful matches
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

    return matchedCandidates;
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

  // Skills matching (40% weight)
  if (analysis.skills.length > 0) {
    const matchingSkills = analysis.skills.filter(skill => 
      candidate.skills.some(candidateSkill => 
        candidateSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(candidateSkill.toLowerCase())
      )
    );
    
    skillsMatch = Math.min(100, (matchingSkills.length / analysis.skills.length) * 100);
    
    if (matchingSkills.length > 0) {
      reasons.push(`Expert in ${matchingSkills.join(', ')}`);
    }
    
    // Bonus for exact skill matches
    const exactMatches = matchingSkills.filter(skill =>
      candidate.skills.some(candidateSkill => 
        candidateSkill.toLowerCase() === skill.toLowerCase()
      )
    );
    
    if (exactMatches.length > 0) {
      skillsMatch = Math.min(100, skillsMatch + (exactMatches.length * 15));
    }
  } else {
    skillsMatch = 50; // Default if no specific skills mentioned
  }

  // Experience matching (25% weight)
  if (analysis.experience) {
    const candidateExp = candidate.experience.toLowerCase();
    const candidateTitle = candidate.tagline.toLowerCase();
    
    if (analysis.experience === 'senior') {
      if (candidateExp.includes('5+') || candidateExp.includes('6+') || 
          candidateExp.includes('7+') || candidateExp.includes('8+') ||
          candidateTitle.includes('senior') || candidateTitle.includes('lead') ||
          candidateTitle.includes('principal')) {
        experienceMatch = 100;
        reasons.push('Senior-level expertise confirmed');
      } else if (candidateExp.includes('3+') || candidateExp.includes('4+')) {
        experienceMatch = 70;
      } else {
        experienceMatch = 30;
      }
    } else if (analysis.experience === 'junior') {
      if (candidateExp.includes('1+') || candidateExp.includes('2+') ||
          candidateTitle.includes('junior') || candidateTitle.includes('graduate')) {
        experienceMatch = 100;
        reasons.push('Perfect match for junior level');
      } else {
        experienceMatch = 60;
      }
    } else {
      experienceMatch = 80;
    }
  } else {
    experienceMatch = 75;
  }

  // Location matching (25% weight)
  if (analysis.location) {
    const candidateLocation = candidate.location.toLowerCase();
    const searchLocation = analysis.location.toLowerCase();
    
    if (candidateLocation.includes(searchLocation) || 
        searchLocation.includes(candidateLocation)) {
      locationMatch = 100;
      reasons.push(`Located in ${analysis.location}`);
    } else if (searchLocation === 'europe' || searchLocation === 'european') {
      const europeanCountries = ['spain', 'germany', 'france', 'italy', 'uk', 'poland', 
                                'denmark', 'norway', 'netherlands', 'sweden', 'finland'];
      if (europeanCountries.some(country => candidateLocation.includes(country))) {
        locationMatch = 100;
        reasons.push('Located in Europe');
      } else {
        locationMatch = 20;
      }
    } else if (searchLocation === 'india' || searchLocation === 'indian') {
      if (candidateLocation.includes('bangalore') || candidateLocation.includes('mumbai') ||
          candidateLocation.includes('delhi') || candidateLocation.includes('hyderabad') ||
          candidateLocation.includes('chennai') || candidateLocation.includes('pune')) {
        locationMatch = 100;
        reasons.push('Located in India');
      } else {
        locationMatch = 20;
      }
    } else {
      locationMatch = 30;
    }
  } else {
    locationMatch = 80;
  }

  // Availability matching (10% weight)
  if (analysis.availability) {
    const candidateAvailability = candidate.availability.toLowerCase();
    if (candidateAvailability.includes(analysis.availability)) {
      availabilityMatch = 100;
      reasons.push(`Available for ${analysis.availability} work`);
    } else {
      availabilityMatch = 40;
    }
  } else {
    availabilityMatch = 80;
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

  // Calculate weighted overall match with some randomization for variety
  const baseMatch = (skillsMatch * 0.4) + (experienceMatch * 0.25) + (locationMatch * 0.25) + (availabilityMatch * 0.1);
  
  // Add small random variation to avoid identical scores
  const randomVariation = (Math.random() - 0.5) * 10;
  const finalMatch = Math.max(20, Math.min(100, Math.round(baseMatch + randomVariation)));

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
