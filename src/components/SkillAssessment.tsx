
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Award, Code, Brain } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  skill: string;
}

interface AssessmentProps {
  skill: string;
  onComplete: (score: number, certification: boolean) => void;
}

export const SkillAssessment = ({ skill, onComplete }: AssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes

  const questions: Question[] = [
    {
      id: '1',
      question: 'What is the correct way to create a React component?',
      options: [
        'function MyComponent() { return <div>Hello</div>; }',
        'class MyComponent() { return <div>Hello</div>; }',
        'const MyComponent = () => { return <div>Hello</div>; }',
        'Both A and C are correct'
      ],
      correctAnswer: 3,
      difficulty: 'beginner',
      skill: 'React'
    },
    {
      id: '2',
      question: 'Which hook is used for managing state in functional components?',
      options: ['useEffect', 'useState', 'useContext', 'useMemo'],
      correctAnswer: 1,
      difficulty: 'beginner',
      skill: 'React'
    },
    {
      id: '3',
      question: 'What is the purpose of useEffect hook?',
      options: [
        'To manage component state',
        'To perform side effects in functional components',
        'To optimize performance',
        'To handle user interactions'
      ],
      correctAnswer: 1,
      difficulty: 'intermediate',
      skill: 'React'
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const correctAnswers = selectedAnswers.filter((answer, index) => 
      answer === questions[index].correctAnswer
    ).length;
    
    const score = (correctAnswers / questions.length) * 100;
    const certification = score >= 80;
    
    setShowResults(true);
    onComplete(score, certification);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResults) {
    const score = (selectedAnswers.filter((answer, index) => 
      answer === questions[index].correctAnswer
    ).length / questions.length) * 100;
    
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {score >= 80 ? (
              <Award className="w-16 h-16 text-yellow-500" />
            ) : (
              <CheckCircle className="w-16 h-16 text-green-500" />
            )}
          </div>
          <CardTitle className="text-2xl">Assessment Complete!</CardTitle>
          <CardDescription>Your {skill} skill assessment results</CardDescription>
        </CardHeader>
        
        <CardContent className="text-center space-y-4">
          <div className="text-4xl font-bold text-blue-600">{Math.round(score)}%</div>
          
          <div className="space-y-2">
            <p className="text-lg">
              You answered {selectedAnswers.filter((answer, index) => 
                answer === questions[index].correctAnswer
              ).length} out of {questions.length} questions correctly
            </p>
            
            {score >= 80 && (
              <Badge variant="default" className="bg-yellow-500">
                <Award className="w-4 h-4 mr-1" />
                Certification Earned!
              </Badge>
            )}
            
            <Badge variant={score >= 70 ? 'default' : 'secondary'}>
              {score >= 90 ? 'Expert' : score >= 80 ? 'Advanced' : score >= 70 ? 'Intermediate' : 'Beginner'} Level
            </Badge>
          </div>
          
          <div className="text-sm text-gray-600">
            <p>This assessment validates your {skill} skills</p>
            <p>Certificate ID: CERT-{skill.toUpperCase()}-{Date.now()}</p>
          </div>
          
          <Button className="w-full">View Detailed Results</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              {skill} Assessment
            </CardTitle>
            <CardDescription>
              Question {currentQuestion + 1} of {questions.length}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4" />
            {formatTime(timeLeft)}
          </div>
        </div>
        
        <Progress value={(currentQuestion / questions.length) * 100} className="w-full" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {questions[currentQuestion].difficulty}
            </Badge>
            <Brain className="w-4 h-4 text-gray-500" />
          </div>
          
          <h3 className="text-lg font-medium">
            {questions[currentQuestion].question}
          </h3>
          
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-3 text-left border rounded-lg transition-colors ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
          >
            Previous
          </Button>
          <Button 
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
          >
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
