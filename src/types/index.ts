export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface FocusSession {
  id: string;
  tagId: string;
  tagName: string;
  tagColor: string;
  duration: number;
  timestamp: number;
  distractions: number;
}

export interface DistractionRecord {
  id: string;
  timestamp: number;
  duration: number;
}

export interface UserConfig {
  onboardingDone: boolean;
  focusDuration: number;
  breakDuration: number;
  autoBreak: boolean;
  dailyGoalMinutes: number;
}