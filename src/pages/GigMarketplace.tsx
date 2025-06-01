
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Clock, DollarSign, Star, Filter, BookmarkPlus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { gigService, type Gig } from '@/lib/services/gigService';
import { useAuth } from '@/contexts/AuthContext';

const GigMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [roleTypeFilter, setRoleTypeFilter] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: allGigs = [], isLoading } = useQuery({
    queryKey: ['gigs'],
    queryFn: gigService.getAllGigs,
  });

  const { data: filteredGigs = [] } = useQuery({
    queryKey: ['filteredGigs', { searchQuery, selectedSkills, locationFilter, categoryFilter, roleTypeFilter }],
    queryFn: async () => {
      if (!searchQuery && selectedSkills.length === 0 && !locationFilter && !categoryFilter && !roleTypeFilter) {
        return allGigs;
      }

      if (searchQuery) {
        const searchResults = await gigService.searchGigs(searchQuery);
        return searchResults;
      }

      return await gigService.filterGigs({
        skills: selectedSkills.length > 0 ? selectedSkills : undefined,
        location: locationFilter || undefined,
        category: categoryFilter || undefined,
        roleType: roleTypeFilter || undefined,
      });
    },
    enabled: !!allGigs.length,
  });

  const handleGigClick = (gigId: string | number) => {
    navigate(`/gigs/${gigId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="animate-pulse space-y-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="h-48 bg-gray-200"></Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Gig Marketplace</h1>
            <p className="text-gray-600">Discover freelance opportunities and build your portfolio</p>
          </div>
          {(user?.role === 'recruiter' || user?.role === 'founder' || user?.role === 'admin') && (
            <Button 
              onClick={() => navigate('/post-gig')}
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 w-full sm:w-auto"
            >
              Post a Gig
            </Button>
          )}
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search gigs by title, company, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="ai/ml">AI/ML</SelectItem>
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>

              <Select value={roleTypeFilter} onValueChange={setRoleTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Role Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                  <SelectItem value="part-time">Part-Time</SelectItem>
                  <SelectItem value="full-time">Full-Time</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />

              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSkills([]);
                  setLocationFilter('');
                  setCategoryFilter('');
                  setRoleTypeFilter('');
                }}
                className="w-full"
              >
                <Filter className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Gig Listings */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            {filteredGigs.length} Gigs Available
          </h2>
        </div>

        <div className="grid gap-4 sm:gap-6">
          {filteredGigs.map((gig) => (
            <Card 
              key={gig.id} 
              className="hover:shadow-lg transition-all cursor-pointer hover:scale-[1.01]"
              onClick={() => handleGigClick(gig.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1">
                    <CardTitle className="text-lg sm:text-xl mb-1 flex flex-wrap items-center gap-2">
                      {gig.title}
                      {gig.isUrgent && (
                        <Badge variant="destructive" className="text-xs">URGENT</Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      {gig.company} • {gig.postedTime}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 self-start">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">{gig.rating}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                      <BookmarkPlus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-gray-600 mb-4 text-sm sm:text-base line-clamp-2">{gig.description}</p>
                
                <div className="flex items-center gap-3 sm:gap-6 text-sm text-gray-500 mb-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{gig.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>{gig.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 flex-shrink-0" />
                    <span>{gig.budget || gig.hourlyRate || gig.stipend}</span>
                  </div>
                  {gig.roleType && (
                    <Badge variant="outline" className="text-xs">
                      {gig.roleType}
                    </Badge>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {gig.skills.slice(0, 4).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {gig.skills.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{gig.skills.length - 4} more
                    </Badge>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-sm text-gray-500">
                    {gig.applicants} applicants
                  </span>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-green-500 to-blue-600 w-full sm:w-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {user?.role === 'student' ? 'Apply Now' : 'View Details'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGigs.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Gigs Found</h3>
              <p className="text-gray-600">Try adjusting your filters or search terms.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GigMarketplace;
