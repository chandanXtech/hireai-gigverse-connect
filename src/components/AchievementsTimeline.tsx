
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, CheckCircle, Calendar } from 'lucide-react';
import type { Candidate } from '@/lib/services/candidateService';

interface AchievementsTimelineProps {
  achievements: string[];
  certifications: Candidate['certifications'];
}

export const AchievementsTimeline = ({ achievements, certifications }: AchievementsTimelineProps) => {
  return (
    <div className="space-y-6">
      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Achievements & Awards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-gray-900">{achievement}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Certifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-start justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{cert.title}</h4>
                    {cert.verified && (
                      <Badge className="bg-green-500 text-white text-xs">✓ Verified</Badge>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{cert.issuer}</p>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  {cert.year}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
