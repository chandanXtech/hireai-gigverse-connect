
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Bot, User, X, Minimize2, Maximize2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
  suggestions?: string[];
}

export const AIAssistantChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Welcome message when chat opens
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(
          "👋 Hi! I'm your AI learning assistant. I can help you with:\n\n• Finding the right learning path\n• Understanding course content\n• Resume optimization tips\n• Career guidance\n• Technical questions\n\nHow can I assist you today?",
          [
            "Show me available learning paths",
            "Help me create a roadmap",
            "Resume writing tips",
            "How to use the platform?"
          ]
        );
      }, 500);
    }
  }, [isOpen, messages.length]);

  const addBotMessage = (message: string, suggestions?: string[]) => {
    const botMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'bot',
      message,
      timestamp: new Date(),
      suggestions
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const addUserMessage = (message: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
  };

  const generateBotResponse = (userMessage: string): { message: string; suggestions?: string[] } => {
    const msg = userMessage.toLowerCase();

    if (msg.includes('learning path') || msg.includes('roadmap') || msg.includes('course')) {
      return {
        message: "🎯 I can help you create a personalized learning roadmap! Here's what I can do:\n\n• **AI Roadmap Generator**: Go to the 'AI Roadmap' tab to generate custom learning paths\n• **Explore Courses**: Check the 'Explore' tab for available career goals\n• **Track Progress**: Monitor your learning progress in the Dashboard\n\nWhat specific skill or career goal are you interested in?",
        suggestions: [
          "I want to become a Data Scientist",
          "Show me frontend development path",
          "Help with machine learning",
          "Trading and finance courses"
        ]
      };
    }

    if (msg.includes('resume') || msg.includes('cv')) {
      return {
        message: "📄 Resume optimization tips:\n\n• **Use the Resume Parser**: Upload your resume in the AI Talent Search page\n• **Highlight relevant skills**: Focus on skills matching your target role\n• **Quantify achievements**: Use numbers and metrics\n• **Keep it concise**: 1-2 pages maximum\n• **Tailor for each role**: Customize for specific positions\n\nWould you like me to guide you to the resume parser?",
        suggestions: [
          "Take me to resume parser",
          "What skills should I highlight?",
          "Resume format tips",
          "How to write achievements?"
        ]
      };
    }

    if (msg.includes('platform') || msg.includes('how to use') || msg.includes('navigation')) {
      return {
        message: "🚀 Platform Navigation Guide:\n\n• **Dashboard**: Track your learning progress and achievements\n• **AI Roadmap**: Generate personalized learning paths\n• **Explore**: Browse available career goals and courses\n• **Achievements**: View your badges and milestones\n• **AI Talent Search**: For recruiters to find talent and parse resumes\n\nWhich section would you like to explore?",
        suggestions: [
          "Go to Dashboard",
          "Create learning roadmap",
          "Browse courses",
          "Check achievements"
        ]
      };
    }

    if (msg.includes('progress') || msg.includes('track')) {
      return {
        message: "📊 Progress Tracking Features:\n\n• **Phase Completion**: See percentage completion for each learning phase\n• **Time Tracking**: Monitor hours spent on learning\n• **Skill Badges**: Earn badges as you complete modules\n• **Streak Counter**: Maintain learning streaks\n• **Video Progress**: Track video watch progress\n\nYour progress is automatically saved as you learn!",
        suggestions: [
          "Show my current progress",
          "How to earn badges?",
          "Video tracking features",
          "Learning streak tips"
        ]
      };
    }

    // Default response
    return {
      message: "I'm here to help! I can assist with:\n\n• 🎯 Creating learning roadmaps\n• 📚 Finding courses and resources\n• 📄 Resume optimization\n• 📊 Progress tracking\n• 🏆 Platform features\n\nPlease tell me more about what you'd like to know!",
      suggestions: [
        "Help me learn Data Science",
        "Resume writing tips",
        "How to use this platform?",
        "Show learning progress"
      ]
    };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    addUserMessage(inputMessage);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateBotResponse(inputMessage);
      setIsTyping(false);
      addBotMessage(response.message, response.suggestions);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    addUserMessage(suggestion);
    setIsTyping(true);

    setTimeout(() => {
      const response = generateBotResponse(suggestion);
      setIsTyping(false);
      addBotMessage(response.message, response.suggestions);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
          size="lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${isMinimized ? 'w-80' : 'w-96'}`}>
      <Card className={`shadow-2xl border-0 ${isMinimized ? 'h-16' : 'h-96'} transition-all duration-300`}>
        <CardHeader className="pb-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="w-5 h-5" />
              AI Assistant
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="flex items-start gap-2">
                      {message.type === 'bot' && <Bot className="w-4 h-4 mt-1 flex-shrink-0" />}
                      {message.type === 'user' && <User className="w-4 h-4 mt-1 flex-shrink-0" />}
                      <div className="text-sm whitespace-pre-line">{message.message}</div>
                    </div>
                    
                    {message.suggestions && (
                      <div className="mt-3 space-y-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs h-8 w-full justify-start bg-white/50 hover:bg-white/80"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4" />
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
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button onClick={handleSendMessage} disabled={isTyping || !inputMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};
