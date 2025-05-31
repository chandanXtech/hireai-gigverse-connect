
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Coins, Trophy, Target, TrendingUp } from 'lucide-react';

interface GamificationPanelProps {
  tokensEarned: number;
  badges: string[];
  profileViews: number;
}

export const GamificationPanel = ({ tokensEarned, badges, profileViews }: GamificationPanelProps) => {
  const getLevel = (tokens: number) => {
    if (tokens >= 300) return { level: 'Gold', color: 'text-yellow-600', progress: 100 };
    if (tokens >= 200) return { level: 'Silver', color: 'text-gray-600', progress: (tokens / 300) * 100 };
    return { level: 'Bronze', color: 'text-orange-600', progress: (tokens / 200) * 100 };
  };

  const { level, color, progress } = getLevel(tokensEarned);

  const completedActions = [
    { action: 'Profile Completed', completed: true },
    { action: 'First Project Added', completed: true },
    { action: 'Resume Uploaded', completed: true },
    { action: 'Verification Submitted', completed: true },
    { action: 'Social Links Added', completed: true },
    { action: '100+ Profile Views', completed: profileViews >= 100 },
    { action: '5+ Projects Added', completed: false },
    { action: 'Mentor Endorsed', completed: false }
  ];

  return (
    <div className="space-y-6">
      {/* Tokens & Level */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="w-5 h-5" />
            SkillTokens & Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{tokensEarned} Tokens</p>
                <p className={`text-sm font-medium ${color}`}>{level} Level</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to next level</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Profile Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{profileViews}</p>
              <p className="text-sm text-gray-600">Profile Views</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{badges.length}</p>
              <p className="text-sm text-gray-600">Badges Earned</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Profile Completion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {completedActions.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  item.completed ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  {item.completed && <span className="text-white text-xs">✓</span>}
                </div>
                <span className={`text-sm ${item.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                  {item.action}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
