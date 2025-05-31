
import gigsData from '@/data/gigs.json';

export interface Gig {
  id: number;
  title: string;
  company: string;
  location: string;
  duration: string;
  budget: string;
  hourlyRate: string;
  skills: string[];
  description: string;
  requirements: string[];
  postedTime: string;
  applicants: number;
  rating: number;
  isUrgent: boolean;
  category: string;
  contactEmail: string;
  companySize: string;
  industry: string;
}

export const gigService = {
  // Get all gigs
  getAllGigs: (): Gig[] => {
    return gigsData as Gig[];
  },

  // Get gig by ID
  getGigById: (id: number): Gig | undefined => {
    return gigsData.find(gig => gig.id === id) as Gig | undefined;
  },

  // Search gigs by query
  searchGigs: (query: string): Gig[] => {
    if (!query) return gigsData as Gig[];
    
    const lowercaseQuery = query.toLowerCase();
    return gigsData.filter(gig => 
      gig.title.toLowerCase().includes(lowercaseQuery) ||
      gig.skills.some(skill => skill.toLowerCase().includes(lowercaseQuery)) ||
      gig.company.toLowerCase().includes(lowercaseQuery) ||
      gig.description.toLowerCase().includes(lowercaseQuery)
    ) as Gig[];
  },

  // Filter gigs by category
  filterByCategory: (category: string): Gig[] => {
    if (!category) return gigsData as Gig[];
    
    return gigsData.filter(gig =>
      gig.category.toLowerCase() === category.toLowerCase()
    ) as Gig[];
  }
};
