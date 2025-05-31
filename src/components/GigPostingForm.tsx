
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SkillSelector } from '@/components/SkillSelector';
import { gigService } from '@/lib/services/gigService';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, DollarSign, Users, Clock, Award } from 'lucide-react';

interface GigFormData {
  title: string;
  company: string;
  location: string;
  duration: string;
  stipend: string;
  roleType: string;
  experienceLevel: string;
  description: string;
  deadline: string;
  positions: number;
}

export const GigPostingForm = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<GigFormData>();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedPerks, setSelectedPerks] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const perksOptions = [
    'Certificate',
    'Letter of Recommendation', 
    'Flexible Timings',
    'Work From Home',
    'Mentorship',
    'Full-time Opportunity'
  ];

  const togglePerk = (perk: string) => {
    setSelectedPerks(prev => 
      prev.includes(perk) 
        ? prev.filter(p => p !== perk)
        : [...prev, perk]
    );
  };

  const onSubmit = async (data: GigFormData) => {
    if (selectedSkills.length === 0) {
      toast({
        title: "Skills Required",
        description: "Please select at least one skill requirement.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const gigData = {
        ...data,
        skills: selectedSkills,
        perks: selectedPerks,
        postedTime: 'Just now',
        applicants: 0,
        rating: 0,
        isUrgent: false,
        category: 'Other',
        contactEmail: 'contact@company.com',
        companySize: '1-50',
        industry: 'Technology'
      };

      await gigService.addGig(gigData);
      
      toast({
        title: "Success!",
        description: "Your gig has been posted successfully.",
      });

      navigate('/gigs');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post gig. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Gig Title *</Label>
              <Input
                id="title"
                {...register('title', { required: 'Title is required' })}
                placeholder="e.g., Frontend Developer Intern"
              />
              {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
            </div>
            <div>
              <Label htmlFor="company">Company/Startup *</Label>
              <Input
                id="company"
                {...register('company', { required: 'Company name is required' })}
                placeholder="e.g., TechNova Startup"
              />
              {errors.company && <p className="text-sm text-red-600">{errors.company.message}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                {...register('location', { required: 'Location is required' })}
                placeholder="Remote or City name"
              />
              {errors.location && <p className="text-sm text-red-600">{errors.location.message}</p>}
            </div>
            <div>
              <Label htmlFor="duration">Duration *</Label>
              <Input
                id="duration"
                {...register('duration', { required: 'Duration is required' })}
                placeholder="e.g., 3 months"
              />
              {errors.duration && <p className="text-sm text-red-600">{errors.duration.message}</p>}
            </div>
            <div>
              <Label htmlFor="stipend">Stipend *</Label>
              <Input
                id="stipend"
                {...register('stipend', { required: 'Stipend is required' })}
                placeholder="e.g., ₹5,000/month"
              />
              {errors.stipend && <p className="text-sm text-red-600">{errors.stipend.message}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Role Type *</Label>
              <Select onValueChange={(value) => setValue('roleType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Internship">Internship</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                  <SelectItem value="Part-Time">Part-Time</SelectItem>
                  <SelectItem value="Full-Time">Full-Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Experience Level *</Label>
              <Select onValueChange={(value) => setValue('experienceLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label>Required Skills *</Label>
            <SkillSelector selectedSkills={selectedSkills} onSkillsChange={setSelectedSkills} />
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Description
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="description">Gig Description *</Label>
          <Textarea
            id="description"
            {...register('description', { required: 'Description is required' })}
            placeholder="Describe the role, responsibilities, and what you're looking for..."
            className="min-h-[120px]"
          />
          {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
        </CardContent>
      </Card>

      {/* Perks & Extras */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Perks & Benefits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label>Select perks offered (optional)</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {perksOptions.map((perk) => (
              <div
                key={perk}
                onClick={() => togglePerk(perk)}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                  selectedPerks.includes(perk)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-sm font-medium">{perk}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Application Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Application Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="deadline">Application Deadline *</Label>
              <Input
                id="deadline"
                type="date"
                {...register('deadline', { required: 'Deadline is required' })}
              />
              {errors.deadline && <p className="text-sm text-red-600">{errors.deadline.message}</p>}
            </div>
            <div>
              <Label htmlFor="positions">Number of Positions *</Label>
              <Input
                id="positions"
                type="number"
                min="1"
                {...register('positions', { 
                  required: 'Number of positions is required',
                  min: { value: 1, message: 'At least 1 position required' }
                })}
                placeholder="e.g., 2"
              />
              {errors.positions && <p className="text-sm text-red-600">{errors.positions.message}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Posting...' : 'Post Gig'}
        </Button>
      </div>
    </form>
  );
};
