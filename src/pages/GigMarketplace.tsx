
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MapPin, Clock, DollarSign, Star, Plus } from 'lucide-react';
import { useState } from 'react';

const GigMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock gig data for Phase 1
  const mockGigs = [
    {
      id: 1,
      title: 'AI Chatbot Development',
      company: 'TechStartup Inc.',
      location: 'Remote',
      duration: '2-3 weeks',
      budget: '$2,500 - $4,000',
      skills: ['Python', 'NLP', 'OpenAI API'],
      description: 'Build an intelligent chatbot for customer service using GPT-4 API.',
      postedTime: '2 hours ago',
      applicants: 8,
      rating: 4.8
    },
    {
      id: 2,
      title: 'Data Analysis Dashboard',
      company: 'Analytics Pro',
      location: 'San Francisco, CA',
      duration: '1 month',
      budget: '$3,000 - $5,500',
      skills: ['React', 'D3.js', 'Python', 'SQL'],
      description: 'Create interactive data visualization dashboard for business metrics.',
      postedTime: '1 day ago',
      applicants: 15,
      rating: 4.9
    },
    {
      id: 3,
      title: 'Machine Learning Model Optimization',
      company: 'AI Solutions Ltd.',
      location: 'Remote',
      duration: '3-4 weeks',
      budget: '$4,000 - $7,000',
      skills: ['TensorFlow', 'PyTorch', 'MLOps'],
      description: 'Optimize existing ML models for better performance and accuracy.',
      postedTime: '3 days ago',
      applicants: 12,
      rating: 4.7
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gig Marketplace</h1>
            <p className="text-gray-600">Discover freelance opportunities and build your portfolio</p>
          </div>
          <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Post a Gig
          </Button>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for gigs by skills, location, or budget..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="bg-gradient-to-r from-green-500 to-blue-600">
                Search Gigs
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="browse">Browse Gigs</TabsTrigger>
            <TabsTrigger value="applied">My Applications</TabsTrigger>
            <TabsTrigger value="active">Active Gigs</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {mockGigs.length} Gigs Available
              </h2>
              <div className="flex gap-2">
                <Badge variant="secondary">Latest</Badge>
                <Badge variant="outline">Budget</Badge>
                <Badge variant="outline">Duration</Badge>
              </div>
            </div>

            <div className="grid gap-6">
              {mockGigs.map((gig) => (
                <Card key={gig.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-1">{gig.title}</CardTitle>
                        <CardDescription className="text-base">
                          {gig.company} • {gig.postedTime}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{gig.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-600 mb-4">{gig.description}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {gig.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {gig.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {gig.budget}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {gig.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {gig.applicants} applicants
                      </span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Save
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-green-500 to-blue-600">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applied">
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h3>
                <p className="text-gray-600">Start applying to gigs to see your applications here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active">
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Gigs</h3>
                <p className="text-gray-600">Your accepted gigs will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GigMarketplace;
