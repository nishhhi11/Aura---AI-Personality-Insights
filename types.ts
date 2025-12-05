export type Question = {
  id: number;
  text: string;
  options: Option[];
};

export type Option = {
  id: string;
  text: string;
  emoji: string;
};

export type PersonalityResult = {
  title: string;
  description: string;
  tips: string[];
};

export type UserDetails = {
  name: string;
  zodiac: string;
  avatarUrl?: string;
};

export enum AppState {
  LANDING = 'LANDING',
  LOGIN = 'LOGIN',
  QUIZ = 'QUIZ',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}