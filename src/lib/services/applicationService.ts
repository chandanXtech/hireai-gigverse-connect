
import { emailService } from './emailService';

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

  // Update application status with email notification
  updateApplicationStatus: async (
    applicationId: string, 
    status: Application['status'], 
    recruiterNotes?: string,
    gigTitle?: string,
    company?: string,
    studentEmail?: string,
    studentName?: string
  ): Promise<Application> => {
    return new Promise(async (resolve, reject) => {
      setTimeout(async () => {
        const appIndex = mockApplications.findIndex(app => app.id === applicationId);
        
        if (appIndex === -1) {
          reject(new Error('Application not found'));
          return;
        }

        const previousStatus = mockApplications[appIndex].status;
        mockApplications[appIndex] = {
          ...mockApplications[appIndex],
          status,
          recruiterNotes: recruiterNotes || mockApplications[appIndex].recruiterNotes,
        };

        // Send email notification if status changed
        if (previousStatus !== status && studentEmail && studentName && gigTitle && company) {
          try {
            await emailService.sendStatusUpdateEmail(
              studentEmail,
              studentName,
              gigTitle,
              company,
              status,
              recruiterNotes
            );
          } catch (error) {
            console.error('Failed to send status update email:', error);
          }
        }

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

  // Get application statistics
  getApplicationStats: async (): Promise<{
    total: number;
    applied: number;
    shortlisted: number;
    hired: number;
    rejected: number;
  }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stats = mockApplications.reduce((acc, app) => {
          acc.total++;
          acc[app.status]++;
          return acc;
        }, {
          total: 0,
          applied: 0,
          shortlisted: 0,
          hired: 0,
          rejected: 0
        });
        resolve(stats);
      }, 100);
    });
  }
};
