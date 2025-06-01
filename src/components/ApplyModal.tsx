
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { applicationService } from '@/lib/services/applicationService';
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
      await applicationService.submitApplication({
        gigId: gig.id,
        studentId: user.id,
        coverLetter: coverLetter.trim(),
        appliedAt: new Date().toISOString(),
        status: 'applied'
      });

      toast({
        title: "Application Submitted!",
        description: `Your application for ${gig.title} has been sent successfully.`,
      });

      onClose();
      setCoverLetter('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Apply for {gig.title}</DialogTitle>
          <DialogDescription>
            Submit your application to {gig.company}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Gig Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">{gig.title}</h4>
            <p className="text-sm text-gray-600 mb-2">{gig.company}</p>
            <div className="flex flex-wrap gap-2">
              {gig.skills.slice(0, 5).map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
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
                placeholder="Tell them why you're perfect for this gig..."
                rows={5}
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">
                {coverLetter.length}/500 characters
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Your profile information and skills will be automatically 
                included with this application. Make sure your profile is up to date!
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-600"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
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
