
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Database, Brain, Globe } from 'lucide-react';

interface SkillsSectionProps {
  skills: string[];
}

export const SkillsSection = ({ skills }: SkillsSectionProps) => {
  const getSkillCategory = (skill: string) => {
    const webSkills = ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Next.js', 'Vue', 'Angular'];
    const backendSkills = ['Node.js', 'Python', 'Java', 'Express', 'Django', 'Flask', 'FastAPI'];
    const dataSkills = ['TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Scikit-learn', 'Data Science', 'AI/ML'];
    const blockchainSkills = ['Solidity', 'Web3', 'Blockchain', 'Ethereum', 'Smart Contracts'];
    
    if (webSkills.includes(skill)) return { category: 'Frontend', icon: Globe, color: 'bg-blue-500' };
    if (backendSkills.includes(skill)) return { category: 'Backend', icon: Database, color: 'bg-green-500' };
    if (dataSkills.includes(skill)) return { category: 'AI/ML', icon: Brain, color: 'bg-purple-500' };
    if (blockchainSkills.includes(skill)) return { category: 'Blockchain', icon: Code, color: 'bg-orange-500' };
    return { category: 'General', icon: Code, color: 'bg-gray-500' };
  };

  const categorizedSkills = skills.reduce((acc, skill) => {
    const { category } = getSkillCategory(skill);
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="w-5 h-5" />
          Skills & Technologies
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(categorizedSkills).map(([category, categorySkills]) => {
            const { icon: Icon, color } = getSkillCategory(categorySkills[0]);
            return (
              <div key={category}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${color}`}></div>
                  <h4 className="font-medium text-gray-700">{category}</h4>
                </div>
                <div className="flex flex-wrap gap-2 ml-5">
                  {categorySkills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="outline" 
                      className="hover:bg-blue-50 transition-colors cursor-pointer"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
