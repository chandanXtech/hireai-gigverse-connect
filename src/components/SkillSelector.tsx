
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';

interface SkillSelectorProps {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
}

const popularSkills = [
  'React', 'JavaScript', 'TypeScript', 'Python', 'Java', 'Node.js',
  'HTML/CSS', 'Tailwind CSS', 'MongoDB', 'PostgreSQL', 'MySQL',
  'Git', 'Docker', 'AWS', 'Firebase', 'Figma', 'UI/UX',
  'Machine Learning', 'Data Science', 'Blockchain', 'Solidity',
  'Flutter', 'React Native', 'Angular', 'Vue.js', 'Express.js'
];

export const SkillSelector: React.FC<SkillSelectorProps> = ({
  selectedSkills,
  onSkillsChange
}) => {
  const [inputValue, setInputValue] = useState('');

  const addSkill = (skill: string) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && !selectedSkills.includes(trimmedSkill)) {
      onSkillsChange([...selectedSkills, trimmedSkill]);
    }
    setInputValue('');
  };

  const removeSkill = (skillToRemove: string) => {
    onSkillsChange(selectedSkills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(inputValue);
    }
  };

  const handlePopularSkillClick = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      onSkillsChange([...selectedSkills, skill]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Selected Skills */}
      {selectedSkills.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Selected Skills:</p>
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skill) => (
              <Badge key={skill} variant="secondary" className="pr-1">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Input for custom skills */}
      <div className="relative">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a skill and press Enter..."
          className="pr-10"
        />
        {inputValue.trim() && (
          <button
            type="button"
            onClick={() => addSkill(inputValue)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
          >
            <Plus className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Popular Skills */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Popular Skills:</p>
        <div className="flex flex-wrap gap-2">
          {popularSkills
            .filter(skill => !selectedSkills.includes(skill))
            .map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => handlePopularSkillClick(skill)}
                className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
              >
                {skill}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};
