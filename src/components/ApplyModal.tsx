
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { applicationService } from '@/lib/services/applicationService';
import { emailService } from '@/lib/services/emailService';
import type { Gig } from '@/lib/services/gigService';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  gig: Gig;
}

export const ApplyModal = ({ isOpen, onClose, gig }: ApplyModalProps) => {
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      // Submit application
      await applicationService.submitApplication({
        gigId: gig.id,
        studentId: user.id,
        coverLetter: coverLetter.trim(),
        appliedAt: new Date().toISOString(),
        status: 'applied'
      });

      // Send confirmation email
      await emailService.sendApplicationConfirmation(
        user.email || `${user.id}@example.com`,
        user.name || 'Student',
        gig.title,
        gig.company
      );

      toast({
        title: "Application Submitted Successfully! 🎉",
        description: `Your application for ${gig.title} has been sent. Check your email for confirmation.`,
      });

      onClose();
      setCoverLetter('');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for {gig.title}</DialogTitle>
          <DialogDescription>
            Submit your application to {gig.company}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Gig Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border">
            <h4 className="font-medium mb-2 text-gray-900">{gig.title}</h4>
            <p className="text-sm text-gray-600 mb-3">{gig.company} • {gig.location}</p>
            <div className="flex flex-wrap gap-2">
              {gig.skills.slice(0, 6).map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {gig.skills.length > 6 && (
                <Badge variant="outline" className="text-xs">
                  +{gig.skills.length - 6} more
                </Badge>
              )}
            </div>
          </div>

          {/* Application Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Cover Letter (Optional)
              </label>
              <Textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder={`Hi ${gig.company} team,

I am excited to apply for the ${gig.title} position. With my experience in ${gig.skills.slice(0, 3).join(', ')}, I believe I would be a great fit for this role.

[Share specific examples of your relevant experience and why you're interested in this opportunity]

I'm available for ${gig.duration} and excited about the chance to contribute to your team.

Thank you for your consideration!

Best regards,
${user?.name || 'Your Name'}`}
                rows={8}
                maxLength={1000}
                className="resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {coverLetter.length}/1000 characters
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
              <h4 className="font-medium text-blue-900 mb-2">📝 Application Tips:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Highlight relevant skills: {gig.skills.slice(0, 3).join(', ')}</li>
                <li>• Mention your availability for {gig.duration}</li>
                <li>• Show enthusiasm for {gig.company}</li>
                <li>• Keep it concise but personal</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>📧 What happens next:</strong> You'll receive an email confirmation 
                and notifications when your application status changes. Your profile and 
                skills will be automatically included with this application.
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
            >
              {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
