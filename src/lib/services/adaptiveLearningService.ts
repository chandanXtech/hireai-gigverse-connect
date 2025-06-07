
import { learningService, type StudentProgress, type Module } from './learningService';
import { advancedAIService } from './aiAlgorithmsService';

export interface LearningProfile {
  studentId: string;
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  difficultyPreference: 'beginner' | 'intermediate' | 'advanced';
  pacePreference: 'slow' | 'medium' | 'fast';
  timeSlots: string[]; // Preferred learning times
  strengths: string[];
  weaknesses: string[];
  motivationFactors: string[];
  attentionSpan: number; // in minutes
  retentionRate: number; // percentage
}

export interface PersonalizedRecommendation {
  type: 'module' | 'job' | 'project' | 'skill' | 'mentor';
  id: string;
  title: string;
  reason: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface LearningAnalytics {
  engagementScore: number;
  completionRate: number;
  averageSessionTime: number;
  strongestSkills: string[];
  improvementAreas: string[];
  learningVelocity: number;
  predictedOutcomes: string[];
}

class AdaptiveLearningEngine {
  private learningProfiles: Map<string, LearningProfile> = new Map();
  private sessionData: Map<string, any[]> = new Map();

  // Analyze user behavior and create learning profile
  async createLearningProfile(studentId: string, initialData?: Partial<LearningProfile>): Promise<LearningProfile> {
    const progress = await learningService.getStudentProgress(studentId);
    
    const profile: LearningProfile = {
      studentId,
      learningStyle: initialData?.learningStyle || this.detectLearningStyle(progress),
      difficultyPreference: initialData?.difficultyPreference || this.detectDifficultyPreference(progress),
      pacePreference: initialData?.pacePreference || this.detectPacePreference(progress),
      timeSlots: initialData?.timeSlots || this.detectOptimalTimeSlots(studentId),
      strengths: this.identifyStrengths(progress),
      weaknesses: this.identifyWeaknesses(progress),
      motivationFactors: this.identifyMotivationFactors(progress),
      attentionSpan: this.calculateAttentionSpan(studentId),
      retentionRate: this.calculateRetentionRate(progress)
    };

    this.learningProfiles.set(studentId, profile);
    return profile;
  }

  // Generate personalized learning path
  async generatePersonalizedPath(studentId: string, careerGoal: string): Promise<{
    modules: Module[],
    recommendations: PersonalizedRecommendation[],
    timeline: string,
    adaptations: string[]
  }> {
    const profile = await this.getLearningProfile(studentId);
    const roadmap = await learningService.getRoadmap(careerGoal);
    
    if (!roadmap) {
      throw new Error('Career goal not found');
    }

    // Adapt modules based on learning profile
    const adaptedModules = this.adaptModules(roadmap.modules, profile);
    
    // Generate personalized recommendations
    const recommendations = await this.generateRecommendations(studentId, profile);
    
    // Calculate timeline based on pace and attention span
    const timeline = this.calculatePersonalizedTimeline(adaptedModules, profile);
    
    // Identify specific adaptations made
    const adaptations = this.getAdaptationReasons(profile);

    return {
      modules: adaptedModules,
      recommendations,
      timeline,
      adaptations
    };
  }

  // Real-time difficulty adjustment
  adjustDifficulty(studentId: string, moduleId: string, performance: number): {
    newDifficulty: string,
    recommendations: string[],
    nextSteps: string[]
  } {
    const profile = this.learningProfiles.get(studentId);
    if (!profile) {
      return { newDifficulty: 'medium', recommendations: [], nextSteps: [] };
    }

    let newDifficulty: string;
    let recommendations: string[] = [];
    let nextSteps: string[] = [];

    if (performance < 60) {
      // Struggling - reduce difficulty
      newDifficulty = 'easy';
      recommendations = [
        'Review prerequisite concepts',
        'Take breaks between learning sessions',
        'Try visual learning aids',
        'Connect with a peer mentor'
      ];
      nextSteps = [
        'Complete foundational exercises',
        'Watch introductory videos',
        'Practice with simpler examples'
      ];
    } else if (performance > 85) {
      // Excelling - increase difficulty
      newDifficulty = 'hard';
      recommendations = [
        'Try advanced challenges',
        'Explore real-world applications',
        'Consider helping other learners',
        'Look into specialized topics'
      ];
      nextSteps = [
        'Complete bonus exercises',
        'Start a personal project',
        'Explore industry case studies'
      ];
    } else {
      // Performing well - maintain level
      newDifficulty = 'medium';
      recommendations = [
        'Continue current learning pace',
        'Focus on practical applications',
        'Build portfolio projects'
      ];
      nextSteps = [
        'Complete standard exercises',
        'Apply concepts to projects',
        'Prepare for next module'
      ];
    }

    return { newDifficulty, recommendations, nextSteps };
  }

  // Generate comprehensive learning analytics
  async generateLearningAnalytics(studentId: string): Promise<LearningAnalytics> {
    const progress = await learningService.getStudentProgress(studentId);
    const profile = this.learningProfiles.get(studentId);
    const sessions = this.sessionData.get(studentId) || [];

    const engagementScore = this.calculateEngagementScore(sessions);
    const completionRate = progress ? (progress.completedModules.length / (progress.completedModules.length + progress.inProgressModules.length)) * 100 : 0;
    const averageSessionTime = this.calculateAverageSessionTime(sessions);
    const strongestSkills = progress?.skillsAcquired.slice(0, 5) || [];
    const improvementAreas = this.identifyImprovementAreas(progress, profile);
    const learningVelocity = this.calculateLearningVelocity(progress);
    const predictedOutcomes = await this.predictLearningOutcomes(studentId);

    return {
      engagementScore,
      completionRate,
      averageSessionTime,
      strongestSkills,
      improvementAreas,
      learningVelocity,
      predictedOutcomes
    };
  }

  // Predict optimal learning times
  predictOptimalLearningTimes(studentId: string): { times: string[], confidence: number } {
    const sessions = this.sessionData.get(studentId) || [];
    const timePerformance: { [time: string]: number[] } = {};

    sessions.forEach(session => {
      const hour = new Date(session.startTime).getHours();
      const timeSlot = this.getTimeSlot(hour);
      
      if (!timePerformance[timeSlot]) {
        timePerformance[timeSlot] = [];
      }
      timePerformance[timeSlot].push(session.performance || 0);
    });

    const averagePerformance: { [time: string]: number } = {};
    Object.entries(timePerformance).forEach(([time, performances]) => {
      averagePerformance[time] = performances.reduce((a, b) => a + b, 0) / performances.length;
    });

    const sortedTimes = Object.entries(averagePerformance)
      .sort(([,a], [,b]) => b - a)
      .map(([time]) => time);

    const confidence = sessions.length > 10 ? 0.8 : 0.5;

    return { times: sortedTimes.slice(0, 3), confidence };
  }

  // Private helper methods
  private detectLearningStyle(progress: StudentProgress | null): 'visual' | 'auditory' | 'kinesthetic' | 'reading' {
    if (!progress) return 'visual';
    
    // Analyze video vs text content preferences
    const videoProgress = Object.keys(progress.videoProgress || {}).length;
    const totalActivities = progress.completedModules.length + progress.inProgressModules.length;
    
    if (videoProgress / totalActivities > 0.7) return 'visual';
    if (progress.watchTime > 7200) return 'auditory'; // 2+ hours
    return 'reading';
  }

  private detectDifficultyPreference(progress: StudentProgress | null): 'beginner' | 'intermediate' | 'advanced' {
    if (!progress) return 'beginner';
    
    const avgQuizScore = Object.values(progress.quizScores || {}).reduce((a, b) => a + b, 0) / Object.keys(progress.quizScores || {}).length;
    
    if (avgQuizScore > 85) return 'advanced';
    if (avgQuizScore > 70) return 'intermediate';
    return 'beginner';
  }

  private detectPacePreference(progress: StudentProgress | null): 'slow' | 'medium' | 'fast' {
    if (!progress || !progress.lastActivity) return 'medium';
    
    const daysSinceStart = Math.floor((Date.now() - new Date(progress.lastActivity).getTime()) / (1000 * 60 * 60 * 24));
    const modulesPerDay = progress.completedModules.length / Math.max(daysSinceStart, 1);
    
    if (modulesPerDay > 0.5) return 'fast';
    if (modulesPerDay > 0.2) return 'medium';
    return 'slow';
  }

  private identifyStrengths(progress: StudentProgress | null): string[] {
    if (!progress) return [];
    
    const highScoreModules = Object.entries(progress.quizScores || {})
      .filter(([_, score]) => score > 85)
      .map(([moduleId]) => moduleId);
    
    return progress.skillsAcquired.filter((_, index) => index < 5);
  }

  private identifyWeaknesses(progress: StudentProgress | null): string[] {
    if (!progress) return [];
    
    const lowScoreModules = Object.entries(progress.quizScores || {})
      .filter(([_, score]) => score < 70)
      .map(([moduleId]) => moduleId);
    
    return lowScoreModules.slice(0, 3);
  }

  private calculateAttentionSpan(studentId: string): number {
    const sessions = this.sessionData.get(studentId) || [];
    if (sessions.length === 0) return 25; // Default 25 minutes
    
    const averageSession = sessions.reduce((sum, session) => sum + (session.duration || 25), 0) / sessions.length;
    return Math.min(Math.max(averageSession, 10), 60); // Between 10-60 minutes
  }

  private async getLearningProfile(studentId: string): Promise<LearningProfile> {
    let profile = this.learningProfiles.get(studentId);
    if (!profile) {
      profile = await this.createLearningProfile(studentId);
    }
    return profile;
  }

  private adaptModules(modules: Module[], profile: LearningProfile): Module[] {
    return modules.map(module => {
      const adaptedModule = { ...module };
      
      // Adjust content based on learning style
      if (profile.learningStyle === 'visual') {
        adaptedModule.content = module.content.filter(content => 
          content.type === 'youtube' || content.type === 'article'
        );
      }
      
      // Adjust estimated time based on pace preference
      const timeMultiplier = profile.pacePreference === 'fast' ? 0.8 : 
                            profile.pacePreference === 'slow' ? 1.3 : 1.0;
      
      const estimatedWeeks = parseInt(adaptedModule.estimatedTime.split(' ')[0]);
      adaptedModule.estimatedTime = `${Math.ceil(estimatedWeeks * timeMultiplier)} weeks`;
      
      return adaptedModule;
    });
  }

  private async generateRecommendations(studentId: string, profile: LearningProfile): Promise<PersonalizedRecommendation[]> {
    const recommendations: PersonalizedRecommendation[] = [];
    
    // Skill-based recommendations
    profile.weaknesses.forEach(weakness => {
      recommendations.push({
        type: 'skill',
        id: `skill-${weakness}`,
        title: `Strengthen ${weakness} skills`,
        reason: `Identified as improvement area based on quiz performance`,
        confidence: 0.8,
        priority: 'high',
        estimatedTime: '2-3 hours',
        difficulty: 'medium'
      });
    });
    
    // Learning style recommendations
    if (profile.learningStyle === 'visual') {
      recommendations.push({
        type: 'module',
        id: 'visual-learning',
        title: 'Interactive coding exercises',
        reason: 'Matches your visual learning preference',
        confidence: 0.9,
        priority: 'medium',
        estimatedTime: '1 hour',
        difficulty: 'easy'
      });
    }
    
    return recommendations.slice(0, 5);
  }

  private calculatePersonalizedTimeline(modules: Module[], profile: LearningProfile): string {
    const baseWeeks = modules.reduce((total, module) => {
      const weeks = parseInt(module.estimatedTime.split(' ')[0]);
      return total + weeks;
    }, 0);
    
    const paceMultiplier = profile.pacePreference === 'fast' ? 0.7 : 
                          profile.pacePreference === 'slow' ? 1.4 : 1.0;
    
    const adjustedWeeks = Math.ceil(baseWeeks * paceMultiplier);
    
    if (adjustedWeeks < 4) return `${adjustedWeeks} weeks`;
    if (adjustedWeeks < 12) return `${Math.ceil(adjustedWeeks / 4)} months`;
    return `${Math.ceil(adjustedWeeks / 12)} years`;
  }

  private getAdaptationReasons(profile: LearningProfile): string[] {
    const adaptations: string[] = [];
    
    adaptations.push(`Optimized for ${profile.learningStyle} learning style`);
    adaptations.push(`Adjusted pace for ${profile.pacePreference} learners`);
    
    if (profile.attentionSpan < 20) {
      adaptations.push('Shortened learning sessions for better focus');
    }
    
    if (profile.strengths.length > 0) {
      adaptations.push(`Leveraging strengths in ${profile.strengths.slice(0, 2).join(' and ')}`);
    }
    
    return adaptations;
  }

  private detectOptimalTimeSlots(studentId: string): string[] {
    // Default optimal learning times
    return ['09:00-11:00', '14:00-16:00', '19:00-21:00'];
  }

  private identifyMotivationFactors(progress: StudentProgress | null): string[] {
    const factors = ['Achievement badges', 'Skill progression', 'Community recognition'];
    
    if (progress?.streak && progress.streak > 7) {
      factors.push('Streak maintenance');
    }
    
    if (progress?.tokensEarned && progress.tokensEarned > 100) {
      factors.push('Token rewards');
    }
    
    return factors;
  }

  private calculateRetentionRate(progress: StudentProgress | null): number {
    if (!progress) return 0.7; // Default 70%
    
    const totalModules = progress.completedModules.length + progress.inProgressModules.length;
    if (totalModules === 0) return 0.7;
    
    return progress.completedModules.length / totalModules;
  }

  private calculateEngagementScore(sessions: any[]): number {
    if (sessions.length === 0) return 0;
    
    const avgSessionLength = sessions.reduce((sum, s) => sum + (s.duration || 0), 0) / sessions.length;
    const consistency = sessions.length / 30; // Sessions per month
    
    return Math.min((avgSessionLength / 30 + consistency) * 50, 100);
  }

  private calculateAverageSessionTime(sessions: any[]): number {
    if (sessions.length === 0) return 0;
    return sessions.reduce((sum, s) => sum + (s.duration || 0), 0) / sessions.length;
  }

  private identifyImprovementAreas(progress: StudentProgress | null, profile?: LearningProfile): string[] {
    const areas: string[] = [];
    
    if (!progress) return ['Complete initial assessment'];
    
    if (progress.completedModules.length === 0) {
      areas.push('Start first learning module');
    }
    
    if (Object.keys(progress.quizScores || {}).length === 0) {
      areas.push('Take skill assessments');
    }
    
    if (progress.streak < 3) {
      areas.push('Build consistent learning habits');
    }
    
    return areas;
  }

  private calculateLearningVelocity(progress: StudentProgress | null): number {
    if (!progress || !progress.lastActivity) return 0;
    
    const daysSinceStart = Math.floor((Date.now() - new Date(progress.lastActivity).getTime()) / (1000 * 60 * 60 * 24));
    return progress.completedModules.length / Math.max(daysSinceStart, 1);
  }

  private async predictLearningOutcomes(studentId: string): Promise<string[]> {
    const progress = await learningService.getStudentProgress(studentId);
    const outcomes: string[] = [];
    
    if (progress) {
      if (progress.completedModules.length > 3) {
        outcomes.push('High probability of course completion');
      }
      
      if (progress.streak > 14) {
        outcomes.push('Strong habit formation, likely to continue learning');
      }
      
      if (progress.skillsAcquired.length > 5) {
        outcomes.push('Ready for entry-level positions');
      }
    }
    
    return outcomes;
  }

  private getTimeSlot(hour: number): string {
    if (hour < 6) return 'early-morning';
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    if (hour < 22) return 'evening';
    return 'late-night';
  }
}

export const adaptiveLearningService = new AdaptiveLearningEngine();
