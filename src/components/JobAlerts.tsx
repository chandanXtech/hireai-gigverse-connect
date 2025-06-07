
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, BellOff, MapPin, DollarSign, Clock, Building } from 'lucide-react';

interface JobAlert {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  skills: string[];
  matchScore: number;
  postedAt: Date;
  isNew: boolean;
}

interface AlertPreference {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  keywords: string[];
  location?: string;
  salaryMin?: number;
  jobType?: string[];
}

export const JobAlerts = () => {
  const [alerts, setAlerts] = useState<JobAlert[]>([]);
  const [preferences, setPreferences] = useState<AlertPreference[]>([
    {
      id: '1',
      name: 'React Developer',
      description: 'Frontend roles with React, JavaScript, TypeScript',
      enabled: true,
      keywords: ['React', 'JavaScript', 'TypeScript', 'Frontend']
    },
    {
      id: '2',
      name: 'Data Science Internships',
      description: 'Entry-level data science and ML positions',
      enabled: true,
      keywords: ['Data Science', 'Machine Learning', 'Python'],
      jobType: ['internship', 'entry-level']
    },
    {
      id: '3',
      name: 'Remote Full-Stack',
      description: 'Remote full-stack developer opportunities',
      enabled: false,
      keywords: ['Full Stack', 'Node.js', 'React'],
      location: 'Remote'
    }
  ]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    // Simulate fetching job alerts
    const mockAlerts: JobAlert[] = [
      {
        id: '1',
        title: 'Frontend React Developer',
        company: 'TechStart Inc.',
        location: 'Bangalore, India',
        salary: '₹8-12 LPA',
        type: 'full-time',
        skills: ['React', 'JavaScript', 'CSS', 'Git'],
        matchScore: 95,
        postedAt: new Date(Date.now() - 3600000),
        isNew: true
      },
      {
        id: '2',
        title: 'Data Science Intern',
        company: 'Analytics Corp',
        location: 'Mumbai, India',
        salary: '₹25,000/month',
        type: 'internship',
        skills: ['Python', 'Machine Learning', 'SQL', 'Pandas'],
        matchScore: 88,
        postedAt: new Date(Date.now() - 7200000),
        isNew: true
      },
      {
        id: '3',
        title: 'Junior Full Stack Developer',
        company: 'StartupXYZ',
        location: 'Remote',
        salary: '₹6-9 LPA',
        type: 'full-time',
        skills: ['Node.js', 'React', 'MongoDB', 'Express'],
        matchScore: 82,
        postedAt: new Date(Date.now() - 14400000),
        isNew: false
      }
    ];
    setAlerts(mockAlerts);
  }, []);

  const togglePreference = (id: string) => {
    setPreferences(prev => prev.map(pref => 
      pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
    ));
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just posted';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Alerts</h1>
          <p className="text-gray-600">Stay updated with personalized job recommendations</p>
        </div>
        <div className="flex items-center gap-2">
          {notificationsEnabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
          <Switch
            checked={notificationsEnabled}
            onCheckedChange={setNotificationsEnabled}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alert Preferences */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Alert Preferences</CardTitle>
              <CardDescription>Configure your job alert settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {preferences.map((pref) => (
                <div key={pref.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{pref.name}</h3>
                    <Switch
                      checked={pref.enabled}
                      onCheckedChange={() => togglePreference(pref.id)}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{pref.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {pref.keywords.map((keyword) => (
                      <Badge key={keyword} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                + Add New Alert
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Job Alerts List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Alerts ({alerts.length})</h2>
            <Button variant="outline" size="sm">Mark All as Read</Button>
          </div>

          {alerts.map((alert) => (
            <Card key={alert.id} className={`hover:shadow-md transition-shadow ${alert.isNew ? 'ring-2 ring-blue-200' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                      {alert.title}
                    </h3>
                    {alert.isNew && <Badge variant="default" className="text-xs">New</Badge>}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{alert.matchScore}%</div>
                    <div className="text-xs text-gray-500">Match</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    {alert.company}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {alert.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {alert.salary}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatTimeAgo(alert.postedAt)}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  <Badge variant="outline" className="text-xs capitalize">
                    {alert.type}
                  </Badge>
                  {alert.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Save for Later
                  </Button>
                  <Button variant="ghost" size="sm">
                    Not Interested
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {alerts.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts yet</h3>
                <p className="text-gray-600 mb-4">
                  Configure your alert preferences to start receiving personalized job recommendations.
                </p>
                <Button>Set Up Alerts</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
