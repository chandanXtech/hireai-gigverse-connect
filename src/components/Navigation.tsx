
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { 
  Menu, Brain, BookOpen, Users, Bell, Target, 
  BarChart3, Eye, Briefcase, Heart, Gamepad2 
} from "lucide-react";

export const Navigation = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 py-2.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-blue-600">
            HireAI+GigHub
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Navigate through the app
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col space-y-2 mt-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                    Dashboard
                  </Link>
                </Button>

                {user?.role === 'student' && (
                  <>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/learning" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        Learning
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/microlearning" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                        <Gamepad2 className="w-4 h-4" />
                        Microlearning
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/immersive-learning" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        VR/AR Learning
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/portfolio-builder" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        Portfolio
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/wellness" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        Wellness
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/community" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        Community
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/job-alerts" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                        <Bell className="w-4 h-4" />
                        Job Alerts
                      </Link>
                    </Button>
                  </>
                )}

                {(user?.role === 'recruiter' || user?.role === 'founder' || user?.role === 'admin') && (
                  <>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/ai-search" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                        <Brain className="w-4 h-4" />
                        AI Search
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/smart-matching" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        Smart Matching
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/talent-search" className="text-gray-700 hover:text-blue-600">
                        Browse Talent
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/post-gig" className="text-gray-700 hover:text-blue-600">
                        Post Gig
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/advanced-analytics" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                        <BarChart3 className="w-4 h-4" />
                        Advanced Analytics
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/recruiter-analytics" className="text-gray-700 hover:text-blue-600">
                        Analytics
                      </Link>
                    </Button>
                  </>
                )}

                {user ? (
                  <Button variant="ghost" size="sm" onClick={logout} className="text-red-600 hover:text-red-800">
                    Logout
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/login" className="text-gray-700 hover:text-blue-600">
                      Login
                    </Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Menu */}
        {user && (
          <div className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
            </Button>

            {user.role === 'student' && (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/learning" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    Learning
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/microlearning" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                    <Gamepad2 className="w-4 h-4" />
                    Micro
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/immersive-learning" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    VR/AR
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/portfolio-builder" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    Portfolio
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/wellness" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    Wellness
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/community" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Community
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/job-alerts" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                    <Bell className="w-4 h-4" />
                    Alerts
                  </Link>
                </Button>
              </>
            )}
            
            {(user.role === 'recruiter' || user.role === 'founder' || user.role === 'admin') && (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/ai-search" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                    <Brain className="w-4 h-4" />
                    AI Search
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/smart-matching" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    Smart Match
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/talent-search" className="text-gray-700 hover:text-blue-600">
                    Browse Talent
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/post-gig" className="text-gray-700 hover:text-blue-600">
                    Post Gig
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/advanced-analytics" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                    <BarChart3 className="w-4 h-4" />
                    Advanced
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/recruiter-analytics" className="text-gray-700 hover:text-blue-600">
                    Analytics
                  </Link>
                </Button>
              </>
            )}

            <Button variant="ghost" size="sm" onClick={logout} className="text-red-600 hover:text-red-800">
              Logout
            </Button>
          </div>
        )}

        {!user && (
          <div className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
