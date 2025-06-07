
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Palette, Layout, Eye, Download, Share2, Plus, Trash2, Edit, Code, Globe, Github, Linkedin, Mail } from 'lucide-react';

interface PortfolioTemplate {
  id: string;
  name: string;
  description: string;
  category: 'modern' | 'classic' | 'creative' | 'minimal' | 'developer';
  preview: string;
  features: string[];
  isPremium: boolean;
}

interface PortfolioSection {
  id: string;
  type: 'header' | 'about' | 'skills' | 'projects' | 'experience' | 'education' | 'contact';
  title: string;
  content: any;
  isVisible: boolean;
  order: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  highlights: string[];
}

export const PortfolioBuilder = () => {
  const [templates, setTemplates] = useState<PortfolioTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('1');
  const [portfolioSections, setPortfolioSections] = useState<PortfolioSection[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [portfolioData, setPortfolioData] = useState({
    personalInfo: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      bio: '',
      profileImage: '',
      socialLinks: {
        github: '',
        linkedin: '',
        portfolio: '',
        twitter: ''
      }
    },
    theme: {
      primaryColor: '#3B82F6',
      secondaryColor: '#10B981',
      fontFamily: 'Inter',
      layout: 'modern'
    },
    seo: {
      title: '',
      description: '',
      keywords: ''
    }
  });

  useEffect(() => {
    loadTemplates();
    initializePortfolioSections();
    loadProjects();
  }, []);

  const loadTemplates = () => {
    const mockTemplates: PortfolioTemplate[] = [
      {
        id: '1',
        name: 'Modern Developer',
        description: 'Clean, modern design perfect for developers and engineers',
        category: 'modern',
        preview: '/templates/modern-dev.png',
        features: ['Responsive design', 'Dark/light mode', 'Project showcase', 'Skills visualization'],
        isPremium: false
      },
      {
        id: '2',
        name: 'Creative Portfolio',
        description: 'Vibrant and creative layout for designers and artists',
        category: 'creative',
        preview: '/templates/creative.png',
        features: ['Image galleries', 'Animation effects', 'Custom layouts', 'Portfolio grid'],
        isPremium: true
      },
      {
        id: '3',
        name: 'Minimalist Pro',
        description: 'Simple, elegant design focusing on content',
        category: 'minimal',
        preview: '/templates/minimal.png',
        features: ['Clean typography', 'Minimal design', 'Fast loading', 'SEO optimized'],
        isPremium: false
      },
      {
        id: '4',
        name: 'Classic Professional',
        description: 'Traditional professional layout for corporate roles',
        category: 'classic',
        preview: '/templates/classic.png',
        features: ['Professional layout', 'PDF export', 'Contact forms', 'Testimonials'],
        isPremium: true
      }
    ];
    setTemplates(mockTemplates);
  };

  const initializePortfolioSections = () => {
    const defaultSections: PortfolioSection[] = [
      {
        id: '1',
        type: 'header',
        title: 'Header',
        content: { showPhoto: true, showContact: true },
        isVisible: true,
        order: 1
      },
      {
        id: '2',
        type: 'about',
        title: 'About Me',
        content: { text: '' },
        isVisible: true,
        order: 2
      },
      {
        id: '3',
        type: 'skills',
        title: 'Skills',
        content: { skills: [], showProficiency: true },
        isVisible: true,
        order: 3
      },
      {
        id: '4',
        type: 'projects',
        title: 'Projects',
        content: { layout: 'grid', showTechnologies: true },
        isVisible: true,
        order: 4
      },
      {
        id: '5',
        type: 'experience',
        title: 'Experience',
        content: { experiences: [] },
        isVisible: true,
        order: 5
      },
      {
        id: '6',
        type: 'contact',
        title: 'Contact',
        content: { showForm: true, showSocial: true },
        isVisible: true,
        order: 6
      }
    ];
    setPortfolioSections(defaultSections);
  };

  const loadProjects = () => {
    const mockProjects: Project[] = [
      {
        id: '1',
        title: 'E-commerce Dashboard',
        description: 'Modern dashboard for e-commerce analytics with real-time data visualization',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
        githubUrl: 'https://github.com/user/ecommerce-dashboard',
        liveUrl: 'https://ecommerce-dashboard.vercel.app',
        imageUrl: '/projects/dashboard.png',
        highlights: ['Real-time analytics', 'Responsive design', 'Dark/light mode']
      },
      {
        id: '2',
        title: 'AI Chat Application',
        description: 'Intelligent chat application with natural language processing capabilities',
        technologies: ['Next.js', 'OpenAI API', 'Prisma', 'PostgreSQL'],
        githubUrl: 'https://github.com/user/ai-chat',
        liveUrl: 'https://ai-chat-app.vercel.app',
        imageUrl: '/projects/chat-app.png',
        highlights: ['AI-powered responses', 'Real-time messaging', 'User authentication']
      }
    ];
    setProjects(mockProjects);
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'New Project',
      description: '',
      technologies: [],
      highlights: []
    };
    setProjects([...projects, newProject]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, ...updates } : project
    ));
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const toggleSection = (sectionId: string) => {
    setPortfolioSections(sections => 
      sections.map(section => 
        section.id === sectionId 
          ? { ...section, isVisible: !section.isVisible }
          : section
      )
    );
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setPortfolioData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const updateSocialLink = (platform: string, url: string) => {
    setPortfolioData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        socialLinks: {
          ...prev.personalInfo.socialLinks,
          [platform]: url
        }
      }
    }));
  };

  const updateTheme = (property: string, value: string) => {
    setPortfolioData(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        [property]: value
      }
    }));
  };

  const exportPortfolio = (format: 'html' | 'pdf' | 'json') => {
    const portfolioContent = {
      template: selectedTemplate,
      sections: portfolioSections,
      projects,
      personalInfo: portfolioData.personalInfo,
      theme: portfolioData.theme
    };

    if (format === 'json') {
      const dataStr = JSON.stringify(portfolioContent, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'portfolio.json';
      link.click();
    } else if (format === 'html') {
      // Generate HTML would be implemented here
      console.log('Exporting as HTML...', portfolioContent);
    } else if (format === 'pdf') {
      // PDF generation would be implemented here
      console.log('Exporting as PDF...', portfolioContent);
    }
  };

  const publishPortfolio = () => {
    const subdomain = portfolioData.personalInfo.name.toLowerCase().replace(/\s+/g, '-');
    const portfolioUrl = `https://${subdomain}.portfolio.hireonai.com`;
    
    console.log('Publishing portfolio to:', portfolioUrl);
    // API call to publish portfolio would be here
    
    navigator.clipboard.writeText(portfolioUrl);
    alert(`Portfolio published! URL copied to clipboard: ${portfolioUrl}`);
  };

  const TemplateSelector = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map(template => (
        <Card key={template.id} className={`cursor-pointer transition-all ${
          selectedTemplate === template.id ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'
        }`} onClick={() => setSelectedTemplate(template.id)}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{template.name}</CardTitle>
              {template.isPremium && <Badge>Pro</Badge>}
            </div>
            <CardDescription>{template.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
              <Layout className="w-12 h-12 text-gray-400" />
            </div>
            <div className="flex flex-wrap gap-1">
              {template.features.map(feature => (
                <Badge key={feature} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const PersonalInfoEditor = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={portfolioData.personalInfo.name}
            onChange={(e) => updatePersonalInfo('name', e.target.value)}
            placeholder="John Doe"
          />
        </div>
        <div>
          <Label htmlFor="title">Professional Title</Label>
          <Input
            id="title"
            value={portfolioData.personalInfo.title}
            onChange={(e) => updatePersonalInfo('title', e.target.value)}
            placeholder="Full Stack Developer"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={portfolioData.personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            placeholder="john@example.com"
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={portfolioData.personalInfo.location}
            onChange={(e) => updatePersonalInfo('location', e.target.value)}
            placeholder="San Francisco, CA"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={portfolioData.personalInfo.bio}
          onChange={(e) => updatePersonalInfo('bio', e.target.value)}
          placeholder="Tell your story..."
          rows={4}
        />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5" />
            <Input
              value={portfolioData.personalInfo.socialLinks.github}
              onChange={(e) => updateSocialLink('github', e.target.value)}
              placeholder="GitHub URL"
            />
          </div>
          <div className="flex items-center gap-2">
            <Linkedin className="w-5 h-5" />
            <Input
              value={portfolioData.personalInfo.socialLinks.linkedin}
              onChange={(e) => updateSocialLink('linkedin', e.target.value)}
              placeholder="LinkedIn URL"
            />
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            <Input
              value={portfolioData.personalInfo.socialLinks.portfolio}
              onChange={(e) => updateSocialLink('portfolio', e.target.value)}
              placeholder="Portfolio URL"
            />
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            <Input
              value={portfolioData.personalInfo.socialLinks.twitter}
              onChange={(e) => updateSocialLink('twitter', e.target.value)}
              placeholder="Twitter URL"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const ProjectsEditor = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Projects</h3>
        <Button onClick={addProject}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="space-y-4">
        {projects.map(project => (
          <Card key={project.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 space-y-3">
                  <Input
                    value={project.title}
                    onChange={(e) => updateProject(project.id, { title: e.target.value })}
                    placeholder="Project title"
                    className="font-medium"
                  />
                  <Textarea
                    value={project.description}
                    onChange={(e) => updateProject(project.id, { description: e.target.value })}
                    placeholder="Project description"
                    rows={2}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      value={project.githubUrl || ''}
                      onChange={(e) => updateProject(project.id, { githubUrl: e.target.value })}
                      placeholder="GitHub URL"
                    />
                    <Input
                      value={project.liveUrl || ''}
                      onChange={(e) => updateProject(project.id, { liveUrl: e.target.value })}
                      placeholder="Live URL"
                    />
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteProject(project.id)}
                  className="ml-4"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label>Technologies</Label>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map(tech => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <Input
                  placeholder="Add technology (press Enter)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const value = e.currentTarget.value.trim();
                      if (value && !project.technologies.includes(value)) {
                        updateProject(project.id, {
                          technologies: [...project.technologies, value]
                        });
                        e.currentTarget.value = '';
                      }
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const SectionsEditor = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Portfolio Sections</h3>
      {portfolioSections.map(section => (
        <Card key={section.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Edit className="w-4 h-4" />
                <span className="font-medium">{section.title}</span>
                <Badge variant="outline">{section.type}</Badge>
              </div>
              <Switch
                checked={section.isVisible}
                onCheckedChange={() => toggleSection(section.id)}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const ThemeCustomizer = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="primary-color">Primary Color</Label>
          <div className="flex items-center gap-2">
            <Input
              id="primary-color"
              type="color"
              value={portfolioData.theme.primaryColor}
              onChange={(e) => updateTheme('primaryColor', e.target.value)}
              className="w-12 h-12 p-1"
            />
            <Input
              value={portfolioData.theme.primaryColor}
              onChange={(e) => updateTheme('primaryColor', e.target.value)}
              placeholder="#3B82F6"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="secondary-color">Secondary Color</Label>
          <div className="flex items-center gap-2">
            <Input
              id="secondary-color"
              type="color"
              value={portfolioData.theme.secondaryColor}
              onChange={(e) => updateTheme('secondaryColor', e.target.value)}
              className="w-12 h-12 p-1"
            />
            <Input
              value={portfolioData.theme.secondaryColor}
              onChange={(e) => updateTheme('secondaryColor', e.target.value)}
              placeholder="#10B981"
            />
          </div>
        </div>
      </div>
      
      <div>
        <Label htmlFor="font-family">Font Family</Label>
        <select
          id="font-family"
          value={portfolioData.theme.fontFamily}
          onChange={(e) => updateTheme('fontFamily', e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="Inter">Inter</option>
          <option value="Roboto">Roboto</option>
          <option value="Open Sans">Open Sans</option>
          <option value="Montserrat">Montserrat</option>
          <option value="Poppins">Poppins</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Builder</h1>
          <p className="text-gray-600">Create your professional portfolio without coding</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setIsPreviewMode(!isPreviewMode)}>
            <Eye className="w-4 h-4 mr-2" />
            {isPreviewMode ? 'Edit' : 'Preview'}
          </Button>
          <Button variant="outline" onClick={() => exportPortfolio('html')}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={publishPortfolio}>
            <Share2 className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Panel */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="template" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="template">Template</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="sections">Sections</TabsTrigger>
              <TabsTrigger value="theme">Theme</TabsTrigger>
            </TabsList>

            <TabsContent value="template">
              <Card>
                <CardHeader>
                  <CardTitle>Choose Template</CardTitle>
                  <CardDescription>Select a template that matches your style</CardDescription>
                </CardHeader>
                <CardContent>
                  <TemplateSelector />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Add your personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent>
                  <PersonalInfoEditor />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <CardTitle>Project Showcase</CardTitle>
                  <CardDescription>Add and manage your projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProjectsEditor />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sections">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Sections</CardTitle>
                  <CardDescription>Configure which sections to show in your portfolio</CardDescription>
                </CardHeader>
                <CardContent>
                  <SectionsEditor />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="theme">
              <Card>
                <CardHeader>
                  <CardTitle>Theme Customization</CardTitle>
                  <CardDescription>Customize colors and typography</CardDescription>
                </CardHeader>
                <CardContent>
                  <ThemeCustomizer />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Live Preview
              </CardTitle>
              <CardDescription>See your portfolio as visitors will</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[3/4] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Layout className="w-12 h-12 mx-auto mb-2" />
                  <p>Portfolio Preview</p>
                  <p className="text-sm">Template: {templates.find(t => t.id === selectedTemplate)?.name}</p>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <Button className="w-full" variant="outline">
                  <Code className="w-4 h-4 mr-2" />
                  View Code
                </Button>
                <Button className="w-full" variant="outline">
                  <Globe className="w-4 h-4 mr-2" />
                  Open in New Tab
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
