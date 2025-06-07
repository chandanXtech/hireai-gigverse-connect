
export interface SmartMatch {
  candidateId: string;
  gigId: string;
  overallScore: number;
  skillMatch: number;
  experienceMatch: number;
  locationMatch: number;
  salaryMatch: number;
  availabilityMatch: number;
  reasoning: string[];
  recommendations: string[];
}

export interface MatchingCriteria {
  requiredSkills: string[];
  preferredSkills?: string[];
  experienceLevel: 'entry' | 'junior' | 'mid' | 'senior' | 'lead';
  location?: string;
  salaryRange?: { min: number; max: number };
  workType: 'remote' | 'onsite' | 'hybrid';
  availability: 'immediate' | 'within-month' | 'flexible';
}

class MatchingService {
  calculateSkillMatch(candidateSkills: string[], requiredSkills: string[], preferredSkills: string[] = []): number {
    const requiredMatches = requiredSkills.filter(skill => 
      candidateSkills.some(cSkill => cSkill.toLowerCase().includes(skill.toLowerCase()))
    ).length;
    
    const preferredMatches = preferredSkills.filter(skill => 
      candidateSkills.some(cSkill => cSkill.toLowerCase().includes(skill.toLowerCase()))
    ).length;
    
    const requiredScore = (requiredMatches / requiredSkills.length) * 0.8;
    const preferredScore = preferredSkills.length > 0 ? (preferredMatches / preferredSkills.length) * 0.2 : 0;
    
    return Math.min((requiredScore + preferredScore) * 100, 100);
  }

  calculateExperienceMatch(candidateExp: string, requiredLevel: string): number {
    const expYears = parseInt(candidateExp);
    const levelRanges = {
      'entry': { min: 0, max: 1 },
      'junior': { min: 1, max: 3 },
      'mid': { min: 3, max: 6 },
      'senior': { min: 6, max: 10 },
      'lead': { min: 8, max: 15 }
    };
    
    const range = levelRanges[requiredLevel as keyof typeof levelRanges];
    if (!range) return 50;
    
    if (expYears >= range.min && expYears <= range.max) return 100;
    if (expYears < range.min) return Math.max(0, 100 - (range.min - expYears) * 20);
    return Math.max(0, 100 - (expYears - range.max) * 10);
  }

  calculateLocationMatch(candidateLocation: string, jobLocation?: string, workType: string = 'onsite'): number {
    if (workType === 'remote') return 100;
    if (!jobLocation) return 50;
    
    const candidateLoc = candidateLocation.toLowerCase();
    const jobLoc = jobLocation.toLowerCase();
    
    if (candidateLoc.includes(jobLoc) || jobLoc.includes(candidateLoc)) return 100;
    
    // Check for same city/state
    const candidateParts = candidateLoc.split(',').map(p => p.trim());
    const jobParts = jobLoc.split(',').map(p => p.trim());
    
    const commonParts = candidateParts.filter(part => 
      jobParts.some(jPart => jPart.includes(part) || part.includes(jPart))
    );
    
    return (commonParts.length / Math.max(candidateParts.length, jobParts.length)) * 100;
  }

  calculateSalaryMatch(expectedSalary: string, offeredRange?: { min: number; max: number }): number {
    if (!offeredRange) return 50;
    
    const expected = parseInt(expectedSalary.replace(/[^\d]/g, ''));
    if (isNaN(expected)) return 50;
    
    if (expected >= offeredRange.min && expected <= offeredRange.max) return 100;
    if (expected < offeredRange.min) {
      const diff = (offeredRange.min - expected) / offeredRange.min;
      return Math.max(0, 100 - diff * 100);
    }
    
    const diff = (expected - offeredRange.max) / offeredRange.max;
    return Math.max(0, 100 - diff * 50); // Less penalty for asking higher
  }

  generateSmartMatch(candidate: any, gig: any, criteria: MatchingCriteria): SmartMatch {
    const skillMatch = this.calculateSkillMatch(
      candidate.skills || [],
      criteria.requiredSkills,
      criteria.preferredSkills
    );
    
    const experienceMatch = this.calculateExperienceMatch(
      candidate.experience || '0',
      criteria.experienceLevel
    );
    
    const locationMatch = this.calculateLocationMatch(
      candidate.location || '',
      criteria.location,
      criteria.workType
    );
    
    const salaryMatch = this.calculateSalaryMatch(
      candidate.expectedSalary || '0',
      criteria.salaryRange
    );
    
    const availabilityMatch = candidate.availability?.includes('Available') ? 100 : 50;
    
    const overallScore = (
      skillMatch * 0.4 +
      experienceMatch * 0.25 +
      locationMatch * 0.15 +
      salaryMatch * 0.1 +
      availabilityMatch * 0.1
    );
    
    const reasoning = [];
    const recommendations = [];
    
    if (skillMatch >= 80) reasoning.push('Strong skill alignment with requirements');
    else if (skillMatch >= 60) reasoning.push('Good skill match with some gaps');
    else {
      reasoning.push('Limited skill overlap');
      recommendations.push('Consider additional training in required technologies');
    }
    
    if (experienceMatch >= 90) reasoning.push('Perfect experience level match');
    else if (experienceMatch < 60) {
      reasoning.push('Experience level may not align perfectly');
      if (criteria.experienceLevel === 'senior' && parseInt(candidate.experience) < 5) {
        recommendations.push('Gain more hands-on experience before applying');
      }
    }
    
    if (locationMatch < 50) {
      reasoning.push('Location may require relocation or remote work discussion');
      recommendations.push('Clarify remote work possibilities');
    }
    
    return {
      candidateId: candidate.id,
      gigId: gig.id,
      overallScore: Math.round(overallScore),
      skillMatch: Math.round(skillMatch),
      experienceMatch: Math.round(experienceMatch),
      locationMatch: Math.round(locationMatch),
      salaryMatch: Math.round(salaryMatch),
      availabilityMatch: Math.round(availabilityMatch),
      reasoning,
      recommendations
    };
  }

  findBestMatches(candidates: any[], gig: any, criteria: MatchingCriteria, limit: number = 10): SmartMatch[] {
    const matches = candidates
      .map(candidate => this.generateSmartMatch(candidate, gig, criteria))
      .filter(match => match.overallScore >= 40) // Minimum threshold
      .sort((a, b) => b.overallScore - a.overallScore)
      .slice(0, limit);
    
    return matches;
  }
}

export const matchingService = new MatchingService();
