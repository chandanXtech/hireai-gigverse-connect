
import gigsData from '@/data/gigs.json';

export interface Gig {
  id: number | string;
  title: string;
  company: string;
  location: string;
  duration: string;
  budget?: string;
  hourlyRate?: string;
  stipend?: string;
  skills: string[];
  description: string;
  requirements?: string[];
  postedTime: string;
  applicants: number;
  rating: number;
  isUrgent: boolean;
  category: string;
  contactEmail: string;
  companySize: string;
  industry: string;
  roleType?: string;
  experienceLevel?: string;
  deadline?: string;
  positions?: number;
  perks?: string[];
}

// In-memory storage for new gigs (in real app, this would be a database)
let mockGigs: Gig[] = [...gigsData];

export const gigService = {
  // Get all gigs
  getAllGigs: (): Promise<Gig[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockGigs]), 100);
    });
  },

  // Get gig by ID
  getGigById: (id: string | number): Promise<Gig | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const gig = mockGigs.find(g => g.id.toString() === id.toString());
        resolve(gig || null);
      }, 100);
    });
  },

  // Add new gig
  addGig: (gigData: Omit<Gig, 'id'>): Promise<Gig> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newGig: Gig = {
          ...gigData,
          id: Date.now(), // Simple ID generation
        };
        mockGigs.unshift(newGig); // Add to beginning
        resolve(newGig);
      }, 500); // Simulate API delay
    });
  },

  // Search gigs
  searchGigs: (query: string): Promise<Gig[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!query.trim()) {
          resolve([...mockGigs]);
          return;
        }

        const filtered = mockGigs.filter(gig =>
          gig.title.toLowerCase().includes(query.toLowerCase()) ||
          gig.company.toLowerCase().includes(query.toLowerCase()) ||
          gig.skills.some(skill => 
            skill.toLowerCase().includes(query.toLowerCase())
          ) ||
          gig.location.toLowerCase().includes(query.toLowerCase())
        );
        resolve(filtered);
      }, 200);
    });
  },

  // Filter gigs
  filterGigs: (filters: {
    skills?: string[];
    location?: string;
    category?: string;
    roleType?: string;
    experienceLevel?: string;
  }): Promise<Gig[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...mockGigs];

        if (filters.skills && filters.skills.length > 0) {
          filtered = filtered.filter(gig =>
            filters.skills!.some(skill =>
              gig.skills.some(gigSkill =>
                gigSkill.toLowerCase().includes(skill.toLowerCase())
              )
            )
          );
        }

        if (filters.location) {
          filtered = filtered.filter(gig =>
            gig.location.toLowerCase().includes(filters.location!.toLowerCase())
          );
        }

        if (filters.category) {
          filtered = filtered.filter(gig =>
            gig.category.toLowerCase() === filters.category!.toLowerCase()
          );
        }

        if (filters.roleType) {
          filtered = filtered.filter(gig =>
            gig.roleType?.toLowerCase() === filters.roleType!.toLowerCase()
          );
        }

        if (filters.experienceLevel) {
          filtered = filtered.filter(gig =>
            gig.experienceLevel?.toLowerCase() === filters.experienceLevel!.toLowerCase()
          );
        }

        resolve(filtered);
      }, 200);
    });
  }
};
