
export interface EmailTemplate {
  subject: string;
  htmlContent: string;
  textContent: string;
}

export interface EmailData {
  to: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
  templateData?: Record<string, any>;
}

// Mock email service for development
class EmailService {
  private emailQueue: EmailData[] = [];
  private isEnabled = process.env.NODE_ENV !== 'production'; // Disable in production for demo

  // Email templates
  private templates = {
    welcome: {
      subject: 'Welcome to HireAI+GigHub! 🚀',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #10b981, #3b82f6); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Welcome to HireAI+GigHub!</h1>
          </div>
          <div style="padding: 30px;">
            <h2>Hi {{name}},</h2>
            <p>Welcome to the future of AI-powered hiring and gig marketplace! 🎉</p>
            <p>As a {{role}}, you now have access to:</p>
            {{#if isRecruiter}}
            <ul>
              <li>AI-powered talent search</li>
              <li>Post unlimited gigs</li>
              <li>Advanced candidate screening</li>
              <li>Real-time analytics dashboard</li>
            </ul>
            {{else}}
            <ul>
              <li>Browse exciting gig opportunities</li>
              <li>Build your professional profile</li>
              <li>Apply to relevant positions</li>
              <li>Track your application status</li>
            </ul>
            {{/if}}
            <div style="text-align: center; margin: 30px 0;">
              <a href="{{dashboardUrl}}" style="background: linear-gradient(135deg, #10b981, #3b82f6); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block;">
                Get Started
              </a>
            </div>
            <p>Best regards,<br>The HireAI+GigHub Team</p>
          </div>
        </div>
      `,
      textContent: 'Welcome to HireAI+GigHub! Start exploring opportunities today.'
    },
    applicationConfirmation: {
      subject: 'Application Submitted: {{gigTitle}}',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #f8fafc; padding: 20px; border-left: 4px solid #10b981;">
            <h2 style="color: #10b981; margin: 0;">Application Submitted Successfully! ✅</h2>
          </div>
          <div style="padding: 30px;">
            <p>Hi {{studentName}},</p>
            <p>Your application for <strong>{{gigTitle}}</strong> at <strong>{{company}}</strong> has been submitted successfully!</p>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Application Details:</h3>
              <p><strong>Position:</strong> {{gigTitle}}</p>
              <p><strong>Company:</strong> {{company}}</p>
              <p><strong>Applied:</strong> {{appliedDate}}</p>
              <p><strong>Status:</strong> Under Review</p>
            </div>
            
            <p>You'll receive updates via email when your application status changes.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="{{applicationsUrl}}" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                View My Applications
              </a>
            </div>
            
            <p>Good luck! 🍀</p>
            <p>The HireAI+GigHub Team</p>
          </div>
        </div>
      `,
      textContent: 'Your application for {{gigTitle}} has been submitted successfully!'
    },
    statusUpdate: {
      subject: 'Application Update: {{gigTitle}}',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: {{statusColor}}; padding: 20px; text-align: center;">
            <h2 style="color: white; margin: 0;">Application Status Update</h2>
          </div>
          <div style="padding: 30px;">
            <p>Hi {{studentName}},</p>
            <p>Great news! Your application status has been updated:</p>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid {{statusColor}};">
              <h3>{{gigTitle}} at {{company}}</h3>
              <p><strong>New Status:</strong> <span style="color: {{statusColor}}; font-weight: bold;">{{status}}</span></p>
              {{#if recruiterNotes}}
              <p><strong>Recruiter Notes:</strong> {{recruiterNotes}}</p>
              {{/if}}
            </div>
            
            {{#if nextSteps}}
            <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4>Next Steps:</h4>
              <p>{{nextSteps}}</p>
            </div>
            {{/if}}
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="{{applicationUrl}}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                View Application
              </a>
            </div>
            
            <p>Best of luck!</p>
            <p>The HireAI+GigHub Team</p>
          </div>
        </div>
      `,
      textContent: 'Your application status for {{gigTitle}} has been updated to {{status}}.'
    },
    recruiterOutreach: {
      subject: '{{subject}}',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #10b981, #3b82f6); padding: 20px;">
            <h2 style="color: white; margin: 0;">{{recruiterName}} from {{company}}</h2>
          </div>
          <div style="padding: 30px;">
            <p>Hi {{candidateName}},</p>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              {{message}}
            </div>
            
            <div style="background: #ecfdf5; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; color: #059669;">
                <strong>💡 Tip:</strong> This message was sent through HireAI+GigHub platform. 
                <a href="{{platformUrl}}" style="color: #059669;">Visit your dashboard</a> for more opportunities!
              </p>
            </div>
            
            <p>Best regards,<br>{{recruiterName}}<br>{{company}}</p>
          </div>
        </div>
      `,
      textContent: '{{message}}'
    }
  };

  async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      // In development, log email instead of sending
      if (!this.isEnabled) {
        console.log('📧 Email would be sent:', {
          to: emailData.to,
          subject: emailData.subject,
          content: emailData.textContent || emailData.htmlContent
        });
        return true;
      }

      // Add to queue for processing
      this.emailQueue.push(emailData);
      
      // Simulate email sending delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }

  private compileTemplate(template: string, data: Record<string, any>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] || match;
    });
  }

  async sendWelcomeEmail(userEmail: string, userName: string, userRole: string): Promise<boolean> {
    const template = this.templates.welcome;
    const isRecruiter = ['recruiter', 'founder', 'admin'].includes(userRole);
    
    const emailData: EmailData = {
      to: userEmail,
      subject: template.subject,
      htmlContent: this.compileTemplate(template.htmlContent, {
        name: userName,
        role: userRole,
        isRecruiter: isRecruiter,
        dashboardUrl: `${window.location.origin}/dashboard`
      }),
      textContent: template.textContent
    };

    return this.sendEmail(emailData);
  }

  async sendApplicationConfirmation(
    studentEmail: string, 
    studentName: string, 
    gigTitle: string, 
    company: string
  ): Promise<boolean> {
    const template = this.templates.applicationConfirmation;
    
    const emailData: EmailData = {
      to: studentEmail,
      subject: this.compileTemplate(template.subject, { gigTitle }),
      htmlContent: this.compileTemplate(template.htmlContent, {
        studentName,
        gigTitle,
        company,
        appliedDate: new Date().toLocaleDateString(),
        applicationsUrl: `${window.location.origin}/my-applications`
      }),
      textContent: this.compileTemplate(template.textContent, { gigTitle })
    };

    return this.sendEmail(emailData);
  }

  async sendStatusUpdateEmail(
    studentEmail: string,
    studentName: string,
    gigTitle: string,
    company: string,
    status: string,
    recruiterNotes?: string
  ): Promise<boolean> {
    const template = this.templates.statusUpdate;
    
    const statusColors = {
      'shortlisted': '#f59e0b',
      'hired': '#10b981',
      'rejected': '#ef4444',
      'applied': '#6b7280'
    };

    const nextStepsMap = {
      'shortlisted': 'Congratulations! You have been shortlisted. The recruiter will contact you soon for the next steps.',
      'hired': 'Congratulations! You have been selected for this position. The recruiter will reach out with onboarding details.',
      'rejected': 'Thank you for your interest. While this opportunity did not work out, keep exploring other gigs on our platform!'
    };

    const emailData: EmailData = {
      to: studentEmail,
      subject: this.compileTemplate(template.subject, { gigTitle }),
      htmlContent: this.compileTemplate(template.htmlContent, {
        studentName,
        gigTitle,
        company,
        status: status.charAt(0).toUpperCase() + status.slice(1),
        statusColor: statusColors[status as keyof typeof statusColors] || '#6b7280',
        recruiterNotes,
        nextSteps: nextStepsMap[status as keyof typeof nextStepsMap],
        applicationUrl: `${window.location.origin}/my-applications`
      }),
      textContent: this.compileTemplate(template.textContent, { gigTitle, status })
    };

    return this.sendEmail(emailData);
  }

  async sendRecruiterOutreach(
    candidateEmail: string,
    candidateName: string,
    recruiterName: string,
    company: string,
    subject: string,
    message: string
  ): Promise<boolean> {
    const template = this.templates.recruiterOutreach;
    
    const emailData: EmailData = {
      to: candidateEmail,
      subject,
      htmlContent: this.compileTemplate(template.htmlContent, {
        candidateName,
        recruiterName,
        company,
        subject,
        message,
        platformUrl: window.location.origin
      }),
      textContent: this.compileTemplate(template.textContent, { message })
    };

    return this.sendEmail(emailData);
  }

  // Get email queue for monitoring
  getEmailQueue(): EmailData[] {
    return [...this.emailQueue];
  }

  // Clear email queue
  clearEmailQueue(): void {
    this.emailQueue = [];
  }
}

export const emailService = new EmailService();
