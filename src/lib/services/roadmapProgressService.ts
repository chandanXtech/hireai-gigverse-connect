
interface PhaseProgress {
  phaseId: string;
  completed: boolean;
  completedResources: string[];
  totalResources: number;
  percentage: number;
  timeSpent: number; // in minutes
}

interface RoadmapProgress {
  roadmapId: string;
  studentId: string;
  goal: string;
  phases: PhaseProgress[];
  overallProgress: number;
  totalTimeSpent: number;
  createdAt: string;
  lastUpdated: string;
}

// Mock storage for roadmap progress
let roadmapProgressStorage: RoadmapProgress[] = [];

export const roadmapProgressService = {
  // Save a new roadmap for a student
  saveRoadmap: (studentId: string, goal: string, roadmap: any): string => {
    const roadmapId = `roadmap_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const phases: PhaseProgress[] = roadmap.roadmap.map((phase: any, index: number) => ({
      phaseId: `phase_${index + 1}`,
      completed: false,
      completedResources: [],
      totalResources: phase.resources.length,
      percentage: 0,
      timeSpent: 0
    }));

    const progress: RoadmapProgress = {
      roadmapId,
      studentId,
      goal,
      phases,
      overallProgress: 0,
      totalTimeSpent: 0,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    roadmapProgressStorage.push(progress);
    return roadmapId;
  },

  // Get roadmap progress for a student
  getRoadmapProgress: (studentId: string, roadmapId: string): RoadmapProgress | null => {
    return roadmapProgressStorage.find(p => p.studentId === studentId && p.roadmapId === roadmapId) || null;
  },

  // Update resource completion
  markResourceComplete: (studentId: string, roadmapId: string, phaseId: string, resourceTitle: string, timeSpent: number = 0): void => {
    const progressIndex = roadmapProgressStorage.findIndex(p => p.studentId === studentId && p.roadmapId === roadmapId);
    
    if (progressIndex >= 0) {
      const progress = roadmapProgressStorage[progressIndex];
      const phaseIndex = progress.phases.findIndex(p => p.phaseId === phaseId);
      
      if (phaseIndex >= 0) {
        const phase = progress.phases[phaseIndex];
        
        // Add resource to completed if not already there
        if (!phase.completedResources.includes(resourceTitle)) {
          phase.completedResources.push(resourceTitle);
          phase.timeSpent += timeSpent;
          
          // Update phase percentage
          phase.percentage = Math.round((phase.completedResources.length / phase.totalResources) * 100);
          
          // Check if phase is completed
          phase.completed = phase.percentage === 100;
          
          // Update overall progress
          const totalResources = progress.phases.reduce((sum, p) => sum + p.totalResources, 0);
          const totalCompleted = progress.phases.reduce((sum, p) => sum + p.completedResources.length, 0);
          progress.overallProgress = Math.round((totalCompleted / totalResources) * 100);
          
          // Update total time spent
          progress.totalTimeSpent = progress.phases.reduce((sum, p) => sum + p.timeSpent, 0);
          
          progress.lastUpdated = new Date().toISOString();
        }
      }
    }
  },

  // Get all roadmaps for a student
  getStudentRoadmaps: (studentId: string): RoadmapProgress[] => {
    return roadmapProgressStorage.filter(p => p.studentId === studentId);
  }
};
