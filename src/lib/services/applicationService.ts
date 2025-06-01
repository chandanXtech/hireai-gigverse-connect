
export interface Application {
  id: string;
  gigId: string | number;
  studentId: string;
  coverLetter?: string;
  appliedAt: string;
  status: 'applied' | 'shortlisted' | 'rejected' | 'hired';
  recruiterNotes?: string;
}

// In-memory storage for applications
let mockApplications: Application[] = [];

export const applicationService = {
  // Submit new application
  submitApplication: async (applicationData: Omit<Application, 'id'>): Promise<Application> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if already applied
        const existingApplication = mockApplications.find(
          app => app.gigId.toString() === applicationData.gigId.toString() && 
                 app.studentId === applicationData.studentId
        );

        if (existingApplication) {
          reject(new Error('You have already applied for this gig'));
          return;
        }

        const newApplication: Application = {
          ...applicationData,
          id: Date.now().toString(),
        };

        mockApplications.push(newApplication);
        resolve(newApplication);
      }, 500);
    });
  },

  // Get student's applications
  getStudentApplications: async (studentId: string): Promise<Application[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const studentApps = mockApplications.filter(app => app.studentId === studentId);
        resolve(studentApps);
      }, 200);
    });
  },

  // Get applications for a gig
  getGigApplications: async (gigId: string | number): Promise<Application[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const gigApps = mockApplications.filter(app => app.gigId.toString() === gigId.toString());
        resolve(gigApps);
      }, 200);
    });
  },

  // Update application status
  updateApplicationStatus: async (
    applicationId: string, 
    status: Application['status'], 
    recruiterNotes?: string
  ): Promise<Application> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const appIndex = mockApplications.findIndex(app => app.id === applicationId);
        
        if (appIndex === -1) {
          reject(new Error('Application not found'));
          return;
        }

        mockApplications[appIndex] = {
          ...mockApplications[appIndex],
          status,
          recruiterNotes: recruiterNotes || mockApplications[appIndex].recruiterNotes,
        };

        resolve(mockApplications[appIndex]);
      }, 300);
    });
  },

  // Get all applications (for admin/analytics)
  getAllApplications: async (): Promise<Application[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockApplications]);
      }, 200);
    });
  },
};
