
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Mail, Phone, Calendar, Star, Download, MessageCircle, UserPlus } from 'lucide-react';
import { useParams } from 'react-router-dom';

const CandidateProfile = () => {
  const { id } = useParams();

  // Mock candidate data for Phase 1
  const candidate = {
    id: id,
    name: 'Sarah Chen',
    title: 'Senior AI Engineer',
    location: 'San Francisco, CA',
    email: 'sarah.chen@email.com',
    phone: '+1 (555) 123-4567',
    rating: 4.9,
    experience: '5+ years',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    summary: 'Passionate AI engineer with 5+ years of experience building large-scale machine learning systems. Expertise in deep learning, NLP, and computer vision with a track record of shipping AI products to millions of users.',
    skills: [
      { name: 'Python', level: 'Expert', years: 5 },
      { name: 'TensorFlow', level: 'Expert', years: 4 },
      { name: 'PyTorch', level: 'Advanced', years: 3 },
      { name: 'MLOps', level: 'Advanced', years: 2 },
      { name: 'NLP', level: 'Expert', years: 4 },
      { name: 'Computer Vision', level: 'Intermediate', years: 2 }
    ],
    experience_details: [
      {
        company: 'Meta',
        role: 'Senior AI Engineer',
        duration: '2021 - Present',
        description: 'Led development of recommendation systems serving 2B+ users. Improved model accuracy by 15% and reduced latency by 30%.'
      },
      {
        company: 'Google',
        role: 'ML Engineer',
        duration: '2019 - 2021',
        description: 'Built and deployed computer vision models for Google Photos. Contributed to open-source TensorFlow projects.'
      },
      {
        company: 'OpenAI',
        role: 'Research Engineer',
        duration: '2018 - 2019',
        description: 'Conducted research on large language models and natural language processing. Published 3 papers in top-tier conferences.'
      }
    ],
    education: [
      {
        school: 'Stanford University',
        degree: 'M.S. Computer Science (AI Track)',
        year: '2018'
      },
      {
        school: 'UC Berkeley',
        degree: 'B.S. Computer Science',
        year: '2016'
      }
    ],
    projects: [
      {
        name: 'AI-Powered Code Review',
        description: 'Built an AI system that automatically reviews code for bugs and suggests improvements, reducing review time by 40%.',
        technologies: ['Python', 'Transformers', 'GitHub API']
      },
      {
        name: 'Multimodal Search Engine',
        description: 'Developed a search engine that understands both text and image queries using cross-modal embeddings.',
        technologies: ['PyTorch', 'CLIP', 'Elasticsearch']
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-24 h-24 rounded-full bg-gray-200"
              />
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">{candidate.name}</h1>
                    <p className="text-xl text-gray-600 mb-2">{candidate.title}</p>
                    <div className="flex items-center gap-4 text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {candidate.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {candidate.experience}
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-medium">{candidate.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Resume
                    </Button>
                    <Button variant="outline">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add to Pipeline
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {candidate.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {candidate.phone}
                  </div>
                </div>
                
                <p className="text-gray-700">{candidate.summary}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Skills Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Core Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.slice(0, 6).map((skill) => (
                      <Badge key={skill.name} variant="secondary">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Education */}
              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {candidate.education.map((edu, index) => (
                    <div key={index}>
                      <p className="font-medium">{edu.degree}</p>
                      <p className="text-sm text-gray-600">{edu.school} • {edu.year}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="experience" className="space-y-6">
            {candidate.experience_details.map((exp, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {exp.role}
                    <Badge variant="outline">{exp.duration}</Badge>
                  </CardTitle>
                  <CardDescription>{exp.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="grid gap-4">
              {candidate.skills.map((skill) => (
                <Card key={skill.name}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{skill.name}</p>
                        <p className="text-sm text-gray-600">{skill.years} years experience</p>
                      </div>
                      <Badge variant={skill.level === 'Expert' ? 'default' : 'secondary'}>
                        {skill.level}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            {candidate.projects.map((project, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CandidateProfile;
