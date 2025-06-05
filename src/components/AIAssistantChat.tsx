
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, X, Bot, User, Lightbulb, BookOpen, Target, TrendingUp, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const quickActions = [
  { icon: <Target className="w-4 h-4" />, text: "Find learning path", action: "help-learning-path" },
  { icon: <BookOpen className="w-4 h-4" />, text: "Course recommendations", action: "help-courses" },
  { icon: <TrendingUp className="w-4 h-4" />, text: "Track my progress", action: "help-progress" },
  { icon: <Lightbulb className="w-4 h-4" />, text: "Study tips", action: "help-study-tips" }
];

const predefinedResponses = {
  "help-learning-path": {
    content: "I can help you find the perfect learning path! Here are some questions to get started:\n\n• What field interests you most? (Technology, Design, Business, etc.)\n• What's your current skill level?\n• How much time can you dedicate per week?\n• Are you looking for certification?\n\nYou can also try our AI Roadmap Generator for personalized recommendations!",
    suggestions: ["Show me trending courses", "I'm a beginner in programming", "I want to learn data science"]
  },
  "help-courses": {
    content: "Based on current trends, here are some popular course categories:\n\n🔥 **Trending Now:**\n• AI & Machine Learning\n• Full Stack Development\n• Digital Marketing\n• UI/UX Design\n\n💡 **Always Popular:**\n• Photography\n• Fitness & Nutrition\n• Cooking & Culinary Arts\n• Personal Finance\n\nWhat interests you most?",
    suggestions: ["Show AI courses", "I want creative skills", "Business and finance courses"]
  },
  "help-progress": {
    content: "Great question! Here's how to track your learning progress effectively:\n\n📊 **Dashboard Features:**\n• Module completion tracking\n• Time spent learning\n• Skills acquired badges\n• Certificate progress\n\n🎯 **Tips for Success:**\n• Set daily learning goals\n• Complete modules in sequence\n• Practice with real projects\n• Join study groups\n\nCheck your Dashboard tab to see your current progress!",
    suggestions: ["Show my achievements", "Set learning goals", "Find study groups"]
  },
  "help-study-tips": {
    content: "Here are proven study techniques for online learning:\n\n🧠 **Effective Methods:**\n• Pomodoro Technique (25min focus + 5min break)\n• Active recall - test yourself regularly\n• Spaced repetition for long-term retention\n• Take handwritten notes\n\n💪 **Stay Motivated:**\n• Set small, achievable daily goals\n• Track your streak\n• Reward yourself for milestones\n• Find an accountability partner\n\nConsistency beats intensity!",
    suggestions: ["Create study schedule", "Join study groups", "Set daily goals"]
  }
};

export const AIAssistantChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your AI Learning Assistant 🤖 I'm here to help you navigate your learning journey, find courses, track progress, and answer any questions about our platform. How can I help you today?",
      timestamp: new Date(),
      suggestions: ["Find learning path", "Course recommendations", "Study tips", "How does this work?"]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for specific keywords and return appropriate responses
    if (lowerMessage.includes('course') || lowerMessage.includes('learn') || lowerMessage.includes('study')) {
      return {
        content: "I'd love to help you find the right course! Our platform offers comprehensive learning paths in:\n\n🎯 **Technology:** Web Development, AI/ML, Mobile Apps\n🎨 **Creative:** UI/UX Design, Photography, Digital Art\n💼 **Business:** Digital Marketing, Trading, Finance\n🍳 **Lifestyle:** Cooking, Fitness, Music Production\n\nWhat field interests you most? You can browse our Learning Catalog or use the AI Roadmap Generator for personalized recommendations!",
        suggestions: ["Browse all courses", "AI Roadmap Generator", "Popular courses", "Beginner-friendly courses"]
      };
    }
    
    if (lowerMessage.includes('progress') || lowerMessage.includes('track')) {
      return predefinedResponses["help-progress"];
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
      return {
        content: "I'm here to help! Here's what I can assist you with:\n\n📚 **Course Discovery:** Find courses based on your interests and goals\n🗺️ **Learning Paths:** Get personalized roadmaps for your career\n📊 **Progress Tracking:** Monitor your learning journey\n🎯 **Goal Setting:** Help you set and achieve learning objectives\n💡 **Study Tips:** Share effective learning strategies\n\nWhat would you like to know more about?",
        suggestions: ["Find courses for beginners", "Create learning roadmap", "Study tips", "How to earn certificates"]
      };
    }
    
    if (lowerMessage.includes('certificate') || lowerMessage.includes('certification')) {
      return {
        content: "Great question about certifications! 🏆\n\n**Certificate Types:**\n• Course Completion Certificates\n• Skill-based Badges\n• Professional Certifications\n• Industry-recognized Credentials\n\n**How to Earn:**\n1. Complete all course modules\n2. Pass quizzes and assignments\n3. Submit final projects\n4. Maintain 80%+ average\n\nCertificates are automatically added to your profile and can be shared on LinkedIn!",
        suggestions: ["Show certified courses", "View my certificates", "LinkedIn integration"]
      };
    }
    
    // Default helpful response
    return {
      content: "Thanks for your question! I'm designed to help with:\n\n• Finding the right courses for your goals\n• Creating personalized learning roadmaps\n• Tracking your progress and achievements\n• Providing study tips and motivation\n• Explaining platform features\n\nCould you be more specific about what you'd like help with?",
      suggestions: ["Browse courses", "AI Roadmap", "Study tips", "Platform features"]
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(inputValue);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickAction = (action: string) => {
    const response = predefinedResponses[action as keyof typeof predefinedResponses];
    if (response) {
      const assistantMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions
      };
      setMessages(prev => [...prev, assistantMessage]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => handleSendMessage(), 100);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        size="lg"
      >
        <MessageSquare className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 w-96 bg-white shadow-2xl z-50 transition-all duration-300 ${
      isMinimized ? 'h-16' : 'h-[600px]'
    }`}>
      <CardHeader className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bot className="w-5 h-5" />
            AI Learning Assistant
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 w-8 h-8 p-0"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 w-8 h-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-[calc(600px-80px)]">
          {/* Quick Actions */}
          <div className="p-4 border-b bg-gray-50">
            <p className="text-sm text-gray-600 mb-2">Quick Help:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction(action.action)}
                  className="text-xs justify-start h-8"
                >
                  {action.icon}
                  <span className="ml-1 truncate">{action.text}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-purple-500 text-white'
                  }`}>
                    {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className="space-y-2">
                    <div className={`p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                    {message.suggestions && (
                      <div className="flex flex-wrap gap-1">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs h-6 px-2"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about learning..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
