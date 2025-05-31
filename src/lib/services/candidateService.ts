
import candidatesData from '@/data/candidates.json';

export interface Candidate {
  id: number;
  username: string;
  name: string;
  university: string;
  year: string;
  skills: string[];
  location: string;
  tagline: string;
  bio: string;
  experience: string;
  availability: string;
  rating: number;
  projects: Array<{
    name: string;
    description: string;
    github: string;
    technologies: string[];
    tags: string[];
  }>;
  achievements: string[];
  certifications: Array<{
    title: string;
    issuer: string;
    year: number;
    verified: boolean;
  }>;
  isVerified: boolean;
  profileImage: string;
  resumeLink: string;
  socialLinks: {
    github: string;
    linkedin: string;
    portfolio?: string;
  };
  tokensEarned: number;
  badges: string[];
  profileViews: number;
  profileSlug: string;
}

export const candidateService = {
  // Get all candidates
  getAllCandidates: (): Candidate[] => {
    return candidatesData as Candidate[];
  },

  // Get candidate by ID
  getCandidateById: (id: number): Candidate | undefined => {
    return candidatesData.find(candidate => candidate.id === id) as Candidate | undefined;
  },

  // Get candidate by username/slug
  getCandidateByUsername: (username: string): Candidate | undefined => {
    return candidatesData.find(candidate => 
      candidate.profileSlug === username || 
      candidate.username === username
    ) as Candidate | undefined;
  },

  // Search candidates by query
  searchCandidates: (query: string): Candidate[] => {
    if (!query) return candidatesData as Candidate[];
    
    const lowercaseQuery = query.toLowerCase();
    return candidatesData.filter(candidate => 
      candidate.name.toLowerCase().includes(lowercaseQuery) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(lowercaseQuery)) ||
      candidate.university.toLowerCase().includes(lowercaseQuery) ||
      candidate.location.toLowerCase().includes(lowercaseQuery) ||
      candidate.tagline.toLowerCase().includes(lowercaseQuery)
    ) as Candidate[];
  },

  // Filter candidates by skills
  filterBySkills: (skills: string[]): Candidate[] => {
    if (skills.length === 0) return candidatesData as Candidate[];
    
    return candidatesData.filter(candidate =>
      skills.some(skill => 
        candidate.skills.some(candidateSkill =>
          candidateSkill.toLowerCase().includes(skill.toLowerCase())
        )
      )
    ) as Candidate[];
  },

  // Filter candidates by location
  filterByLocation: (location: string): Candidate[] => {
    if (!location) return candidatesData as Candidate[];
    
    return candidatesData.filter(candidate =>
      candidate.location.toLowerCase().includes(location.toLowerCase())
    ) as Candidate[];
  }
};
