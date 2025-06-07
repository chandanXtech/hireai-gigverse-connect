
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, ThumbsUp, Eye, Plus, Search, TrendingUp, Users, BookOpen } from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  category: string;
  tags: string[];
  likes: number;
  replies: number;
  views: number;
  createdAt: Date;
  isPinned?: boolean;
}

export const CommunityForum = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts', icon: MessageSquare },
    { id: 'questions', name: 'Q&A', icon: MessageSquare },
    { id: 'resources', name: 'Resources', icon: BookOpen },
    { id: 'networking', name: 'Networking', icon: Users },
    { id: 'trending', name: 'Trending', icon: TrendingUp }
  ];

  const posts: ForumPost[] = [
    {
      id: '1',
      title: 'How to prepare for React interviews in 2024?',
      content: 'I have been learning React for 6 months and want to start applying for junior positions. What are the most important concepts I should focus on?',
      author: 'Priya Sharma',
      authorAvatar: '/placeholder.svg',
      category: 'questions',
      tags: ['React', 'Interview', 'Frontend'],
      likes: 24,
      replies: 12,
      views: 156,
      createdAt: new Date(Date.now() - 3600000),
      isPinned: true
    },
    {
      id: '2',
      title: 'Free resources for learning Machine Learning',
      content: 'Curated list of free ML resources including courses, books, and practice datasets. Perfect for beginners!',
      author: 'Rahul Kumar',
      authorAvatar: '/placeholder.svg',
      category: 'resources',
      tags: ['Machine Learning', 'Python', 'Resources'],
      likes: 45,
      replies: 8,
      views: 234,
      createdAt: new Date(Date.now() - 7200000)
    },
    {
      id: '3',
      title: 'Looking for study buddy for DSA preparation',
      content: 'Anyone interested in forming a study group for Data Structures and Algorithms? Planning to solve 2-3 problems daily.',
      author: 'Amit Patel',
      authorAvatar: '/placeholder.svg',
      category: 'networking',
      tags: ['DSA', 'Study Group', 'Coding'],
      likes: 18,
      replies: 15,
      views: 89,
      createdAt: new Date(Date.now() - 10800000)
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community Forum</h1>
          <p className="text-gray-600">Connect, learn, and grow with fellow developers</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search posts, topics, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Advanced Search</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                      selectedCategory === category.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
                    }`}
                  >
                    <category.icon className="w-4 h-4" />
                    {category.name}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Community Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Posts</span>
                <span className="font-semibold">1,234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Members</span>
                <span className="font-semibold">5,678</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">This Week</span>
                <span className="font-semibold">89 posts</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Posts List */}
        <div className="lg:col-span-3 space-y-4">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={post.authorAvatar} />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {post.isPinned && (
                        <Badge variant="secondary" className="text-xs">Pinned</Badge>
                      )}
                      <Badge variant="outline" className="text-xs">{post.category}</Badge>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {post.content}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {post.replies}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.views}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>by {post.author}</span>
                        <span>•</span>
                        <span>{formatTimeAgo(post.createdAt)}</span>
                      </div>
                    </div>
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
