
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Folder } from 'lucide-react';
import type { Candidate } from '@/lib/services/candidateService';

interface ProjectsListProps {
  projects: Candidate['projects'];
}

export const ProjectsList = ({ projects }: ProjectsListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Folder className="w-5 h-5" />
          Featured Projects
        </CardTitle>
        <CardDescription>
          Showcasing technical expertise through real-world applications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">{project.name}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-1" />
                    Code
                  </a>
                </Button>
              </div>
              
              <div className="mb-3">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Technologies Used:</h5>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {project.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className={`text-xs ${
                      tag === 'Featured' ? 'bg-yellow-100 text-yellow-800' :
                      tag === 'Hackathon Winner' ? 'bg-green-100 text-green-800' :
                      tag === 'Published' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
