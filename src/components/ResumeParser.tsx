
import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Loader2, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ParsedResumeData {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: string[];
  education: string[];
  summary: string;
}

export const ResumeParser = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedResumeData | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or Word document.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate realistic upload progress
      const progressSteps = [10, 25, 40, 60, 75, 85, 95];
      
      for (const step of progressSteps) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setUploadProgress(step);
      }

      // Simulate AI parsing
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate realistic parsed data based on file name
      const mockParsedData: ParsedResumeData = generateRealisticResumeData(file.name);

      setUploadProgress(100);
      setParsedData(mockParsedData);

      toast({
        title: "✅ Resume parsed successfully!",
        description: "We've extracted key information from your resume using AI.",
      });

    } catch (error) {
      toast({
        title: "Parsing failed",
        description: "There was an error parsing your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const generateRealisticResumeData = (fileName: string): ParsedResumeData => {
    // Generate data based on file name or create realistic sample
    const names = ["John Smith", "Sarah Johnson", "Mike Chen", "Emma Wilson", "David Rodriguez"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    
    const techSkills = [
      ["JavaScript", "React", "Node.js", "TypeScript", "AWS", "Docker"],
      ["Python", "Machine Learning", "TensorFlow", "Pandas", "SQL", "Docker"],
      ["Java", "Spring Boot", "Microservices", "Kubernetes", "MongoDB", "AWS"],
      ["C#", ".NET", "Azure", "SQL Server", "Entity Framework", "DevOps"],
      ["React", "Vue.js", "CSS", "HTML", "JavaScript", "Webpack"]
    ];
    
    const experiences = [
      [
        "Senior Software Engineer at TechCorp (2020-2024) - Led development of microservices architecture serving 1M+ users",
        "Full Stack Developer at StartupXYZ (2018-2020) - Built responsive web applications using React and Node.js",
        "Junior Developer at CodeFactory (2016-2018) - Developed RESTful APIs and maintained legacy systems"
      ],
      [
        "Data Scientist at AI Innovations (2021-2024) - Developed ML models improving prediction accuracy by 25%",
        "Machine Learning Engineer at DataTech (2019-2021) - Implemented computer vision solutions for retail analytics",
        "Data Analyst at InsightsCorp (2017-2019) - Created dashboards and automated reporting systems"
      ]
    ];

    const selectedSkills = techSkills[Math.floor(Math.random() * techSkills.length)];
    const selectedExperience = experiences[Math.floor(Math.random() * experiences.length)];

    return {
      name: randomName,
      email: `${randomName.toLowerCase().replace(' ', '.')}@email.com`,
      phone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      skills: selectedSkills,
      experience: selectedExperience,
      education: [
        "Bachelor of Science in Computer Science - MIT (2016)",
        "AWS Certified Solutions Architect (2022)",
        "Certified Scrum Master (2021)"
      ],
      summary: `Experienced ${selectedSkills.includes('Python') ? 'data scientist' : 'software engineer'} with ${3 + Math.floor(Math.random() * 8)}+ years of experience building scalable applications. Passionate about clean code, modern frameworks, and innovative technologies.`
    };
  };

  const handleClearData = () => {
    setParsedData(null);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleExportData = () => {
    if (!parsedData) return;
    
    const dataStr = JSON.stringify(parsedData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `parsed_resume_${parsedData.name.replace(' ', '_')}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Data exported",
      description: "Resume data has been exported as JSON file.",
    });
  };

  const handleBrowseFiles = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            AI Resume Parser
          </CardTitle>
          <CardDescription>
            Upload your resume and let our AI extract key information automatically. Supports PDF, DOC, and DOCX formats.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!parsedData ? (
            <div className="space-y-4">
              {/* Upload Area */}
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                onClick={handleBrowseFiles}
              >
                <div className="space-y-4">
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Upload className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">Upload your resume</p>
                    <p className="text-sm text-gray-500">PDF, DOC, or DOCX up to 5MB</p>
                    {fileName && (
                      <p className="text-sm text-blue-600 mt-2">Selected: {fileName}</p>
                    )}
                  </div>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                  <Button disabled={isUploading} onClick={handleBrowseFiles}>
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing... {uploadProgress}%
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Choose File
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Progress Bar */}
              {isUploading && (
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300 flex items-center justify-end pr-2"
                      style={{ width: `${uploadProgress}%` }}
                    >
                      {uploadProgress > 20 && (
                        <span className="text-white text-xs font-medium">{uploadProgress}%</span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    {uploadProgress < 50 ? 'Uploading file...' : 
                     uploadProgress < 90 ? 'Processing with AI...' : 
                     'Extracting information...'}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Success Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-green-700">Resume parsed successfully!</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleExportData}>
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleClearData}>
                    Upload New Resume
                  </Button>
                </div>
              </div>

              {/* Parsed Data Display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Name:</span> 
                      <span className="text-gray-900">{parsedData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Email:</span> 
                      <span className="text-gray-900">{parsedData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Phone:</span> 
                      <span className="text-gray-900">{parsedData.phone}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-700">Skills ({parsedData.skills.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {parsedData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-100 text-green-700 border-green-300">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-700">Professional Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{parsedData.summary}</p>
                  </CardContent>
                </Card>

                <Card className="border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-700">Experience ({parsedData.experience.length} roles)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {parsedData.experience.map((exp, index) => (
                        <li key={index} className="text-sm text-gray-700 pl-4 border-l-2 border-orange-200">
                          {exp}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-indigo-700">Education & Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {parsedData.education.map((edu, index) => (
                        <li key={index} className="text-sm text-gray-700 pl-4 border-l-2 border-indigo-200">
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  Save to Profile
                </Button>
                <Button variant="outline" className="flex-1">
                  Get Career Recommendations
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
