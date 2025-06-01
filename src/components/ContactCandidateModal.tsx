
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { emailService } from '@/lib/services/emailService';
import { Mail, Send } from 'lucide-react';

interface ContactCandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateEmail: string;
  candidateName: string;
}

const subjectPresets = [
  'Interview Invitation - Exciting Opportunity',
  'Follow-up on Your Application',
  'Interested in Your Profile',
  'Quick Chat About Opportunity',
  'Custom Subject'
];

export const ContactCandidateModal = ({ 
  isOpen, 
  onClose, 
  candidateEmail, 
  candidateName 
}: ContactCandidateModalProps) => {
  const [subject, setSubject] = useState('');
  const [selectedPreset, setSelectedPreset] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handlePresetChange = (preset: string) => {
    setSelectedPreset(preset);
    if (preset !== 'Custom Subject') {
      setSubject(preset);
    } else {
      setSubject('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !subject.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      const success = await emailService.sendRecruiterOutreach(
        candidateEmail,
        candidateName,
        user.name || 'Recruiter',
        user.company || 'Company',
        subject,
        message
      );

      if (success) {
        toast({
          title: "Email Sent Successfully! 📧",
          description: `Your message has been sent to ${candidateName}.`,
        });
        onClose();
        setSubject('');
        setMessage('');
        setSelectedPreset('');
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      toast({
        title: "Error Sending Email",
        description: "Failed to send message. Please try again.",
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
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Contact {candidateName}
          </DialogTitle>
          <DialogDescription>
            Send a personalized message to reach out about opportunities
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Candidate Info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900">Sending to:</h4>
            <p className="text-blue-700">{candidateName} ({candidateEmail})</p>
          </div>

          {/* Subject Presets */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Subject Line</label>
            <Select value={selectedPreset} onValueChange={handlePresetChange}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a subject preset..." />
              </SelectTrigger>
              <SelectContent>
                {subjectPresets.map((preset) => (
                  <SelectItem key={preset} value={preset}>
                    {preset}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {(selectedPreset === 'Custom Subject' || selectedPreset === '') && (
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter custom subject..."
                required
              />
            )}
            
            {selectedPreset && selectedPreset !== 'Custom Subject' && (
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject line"
                required
              />
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Message</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Hi ${candidateName},

I came across your profile on HireAI+GigHub and was impressed by your background in [mention specific skills/experience].

We have an exciting opportunity at [Company Name] that I think would be a great fit for your skillset...

Would you be interested in a quick 15-minute call to discuss this further?

Best regards,
${user?.name || 'Your Name'}`}
              rows={8}
              maxLength={1000}
              required
            />
            <p className="text-xs text-gray-500">
              {message.length}/1000 characters
            </p>
          </div>

          {/* Professional Tips */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">💡 Tips for Better Response:</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Mention specific skills from their profile</li>
              <li>• Be clear about the opportunity</li>
              <li>• Keep it concise and professional</li>
              <li>• Include next steps (call, interview, etc.)</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting || !subject.trim() || !message.trim()}
              className="flex-1 bg-gradient-to-r from-blue-500 to-green-600"
            >
              {isSubmitting ? (
                <>Sending...</>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
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
