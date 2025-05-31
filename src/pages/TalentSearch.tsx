
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Star, MapPin, Calendar } from 'lucide-react';
import { useState } from 'react';

const TalentSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock candidate data for Phase 1
  const mockCandidates = [
    {
      id: 1,
      name: 'Sarah Chen',
      title: 'Senior AI Engineer',
      location: 'San Francisco, CA',
      rating: 4.9,
      skills: ['Python', 'TensorFlow', 'PyTorch', 'ML Ops'],
      experience: '5+ years',
      availability: 'Available',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      title: 'Machine Learning Researcher',
      location: 'New York, NY',
      rating: 4.8,
      skills: ['NLP', 'Computer Vision', 'Research', 'PhD'],
      experience: '7+ years',
      availability: '2 weeks notice',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'Data Scientist',
      location: 'Austin, TX',
      rating: 4.7,
      skills: ['R', 'Python', 'Statistics', 'Deep Learning'],
      experience: '4+ years',
      availability: 'Available',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Talent Search</h1>
          <p className="text-gray-600">Find and connect with top AI professionals using natural language queries</p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for 'Senior ML Engineer with NLP experience in SF' or 'Python developer with 5+ years'"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 text-lg py-6"
                />
              </div>
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
              <Button variant="outline" size="lg">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {mockCandidates.length} AI Professionals Found
            </h2>
            <div className="flex gap-2">
              <Badge variant="secondary">Relevance</Badge>
              <Badge variant="outline">Rating</Badge>
              <Badge variant="outline">Availability</Badge>
            </div>
          </div>

          {mockCandidates.map((candidate) => (
            <Card key={candidate.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={candidate.avatar}
                    alt={candidate.name}
                    className="w-16 h-16 rounded-full bg-gray-200"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{candidate.name}</h3>
                        <p className="text-gray-600">{candidate.title}</p>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{candidate.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {candidate.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {candidate.experience}
                      </div>
                      <Badge variant={candidate.availability === 'Available' ? 'default' : 'secondary'}>
                        {candidate.availability}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600">
                      View Profile
                    </Button>
                    <Button variant="outline" size="sm">
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TalentSearch;
