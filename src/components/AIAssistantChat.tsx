
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, X, Bot, User, Lightbulb, BookOpen, Target, Zap, HelpCircle, Mic, MicOff } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
}

export const AIAssistantChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI learning companion. I can help you with study plans, answer questions, provide feedback, and guide your learning journey. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        "Create a study plan for Python",
        "Explain machine learning basics",
        "Help me with my coding project",
        "Suggest learning resources"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (text: string = inputValue) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response with contextual learning assistance
    setTimeout(() => {
      const aiResponse = generateAIResponse(text.trim());
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    let response = '';
    let suggestions: string[] = [];

    if (input.includes('study plan') || input.includes('schedule')) {
      response = "I'd love to help you create a personalized study plan! Here's what I recommend:\n\n1. **Assess your current level** - Take our skill assessment\n2. **Set clear goals** - What do you want to achieve?\n3. **Break it down** - Divide into manageable chunks\n4. **Schedule regular sessions** - Consistency is key\n5. **Track progress** - Use our built-in analytics\n\nWould you like me to create a specific plan for any technology or subject?";
      suggestions = ["Create Python study plan", "Plan for web development", "Schedule machine learning course", "Set up daily coding practice"];
    } else if (input.includes('python') || input.includes('programming')) {
      response = "Python is an excellent choice! Here's your learning roadmap:\n\n**Beginner Level:**\n• Variables and data types\n• Control structures (if/else, loops)\n• Functions and modules\n• File handling\n\n**Intermediate:**\n• Object-oriented programming\n• Exception handling\n• Libraries (NumPy, Pandas)\n• Web frameworks (Flask/Django)\n\n**Advanced:**\n• Machine learning with scikit-learn\n• Data visualization\n• API development\n\nShall I recommend specific resources for any of these topics?";
      suggestions = ["Show Python resources", "Explain OOP concepts", "Help with a Python project", "Practice Python coding"];
    } else if (input.includes('machine learning') || input.includes('ml') || input.includes('ai')) {
      response = "Machine Learning is fascinating! Let me break it down:\n\n**Core Concepts:**\n🧠 **Supervised Learning** - Learning from labeled data\n🔍 **Unsupervised Learning** - Finding patterns in unlabeled data\n🎯 **Reinforcement Learning** - Learning through rewards\n\n**Getting Started:**\n1. Master Python and statistics\n2. Learn pandas and NumPy\n3. Practice with scikit-learn\n4. Explore real datasets\n5. Build your first model\n\nWant me to suggest a specific ML project to start with?";
      suggestions = ["Suggest ML project ideas", "Explain supervised learning", "Help with data preprocessing", "Recommend ML courses"];
    } else if (input.includes('help') || input.includes('stuck') || input.includes('problem')) {
      response = "I'm here to help! Here are some ways I can assist:\n\n📚 **Learning Support:**\n• Explain complex concepts\n• Provide additional resources\n• Create practice exercises\n• Review your code\n\n🎯 **Goal Setting:**\n• Define learning objectives\n• Create milestones\n• Track progress\n• Adjust plans as needed\n\n💡 **Problem Solving:**\n• Debug code issues\n• Suggest best practices\n• Recommend tools\n• Connect you with community\n\nWhat specific challenge are you facing?";
      suggestions = ["Debug my code", "Explain a concept", "Find practice exercises", "Connect with study group"];
    } else if (input.includes('project') || input.includes('build') || input.includes('create')) {
      response = "Great idea! Building projects is the best way to learn. Here are some project suggestions based on your level:\n\n**Beginner Projects:**\n• Calculator app\n• To-do list\n• Weather app\n• Simple blog\n\n**Intermediate:**\n• E-commerce site\n• Chat application\n• Data visualization dashboard\n• API integration project\n\n**Advanced:**\n• Machine learning model\n• Full-stack application\n• Mobile app\n• Open source contribution\n\nWhich type of project interests you most?";
      suggestions = ["Suggest web projects", "Help plan a data project", "Review my project idea", "Find project partners"];
    } else {
      response = "That's an interesting question! I'm constantly learning to better assist students like you. Here are some ways I can help:\n\n• **Personalized Learning** - Adapt to your pace and style\n• **24/7 Support** - Available whenever you need help\n• **Smart Recommendations** - Suggest relevant content\n• **Progress Tracking** - Monitor your learning journey\n• **Interactive Feedback** - Provide detailed explanations\n\nWhat would you like to explore today?";
      suggestions = ["Explore learning paths", "Get study tips", "Ask about careers", "Find practice problems"];
    }

    return {
      id: Date.now().toString(),
      text: response,
      sender: 'ai',
      timestamp: new Date(),
      suggestions
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      setIsListening(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all z-50"
        size="lg"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] flex flex-col shadow-2xl border-0 z-50 bg-white">
      <CardHeader className="pb-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bot className="w-5 h-5" />
            AI Learning Assistant
            <Badge className="bg-green-500 text-xs">Online</Badge>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-purple-100 text-sm">Your 24/7 learning companion</p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-start gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  }`}>
                    {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-900 rounded-bl-none'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>

                {/* AI Suggestions */}
                {message.sender === 'ai' && message.suggestions && (
                  <div className="mt-2 ml-10 space-y-1">
                    <p className="text-xs text-gray-500 mb-1">Quick actions:</p>
                    <div className="flex flex-wrap gap-1">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs px-2 py-1 h-6 hover:bg-blue-50"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-gray-100 px-4 py-2 rounded-lg rounded-bl-none">
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

        {/* Quick Actions */}
        <div className="px-4 py-2 border-t bg-gray-50">
          <div className="flex gap-2 mb-2">
            <Button variant="outline" size="sm" onClick={() => handleSuggestionClick("Help me study")}>
              <BookOpen className="w-3 h-3 mr-1" />
              Study Help
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleSuggestionClick("Set learning goals")}>
              <Target className="w-3 h-3 mr-1" />
              Goals
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleSuggestionClick("Get tips")}>
              <Lightbulb className="w-3 h-3 mr-1" />
              Tips
            </Button>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about learning..."
                className="pr-10"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={startVoiceRecognition}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                disabled={isListening}
              >
                {isListening ? (
                  <MicOff className="w-4 h-4 text-red-500" />
                ) : (
                  <Mic className="w-4 h-4 text-gray-400" />
                )}
              </Button>
            </div>
            <Button 
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <Zap className="w-3 h-3" />
            Powered by AI • Supports voice input
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
