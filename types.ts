export type Language = 'English' | 'Hindi' | 'Marathi';

export type StudyTime = '15 min' | '30 min' | '60 min' | '90+ min';

export interface StudentProfile {
  name: string;
  grade: string;
  subjects: string[];
  language: Language;
  studyTime: StudyTime;
  createdAt: number;
}

export interface TopicInfo {
  subject: string;
  grade: string;
  chapter: string;
  topic: string;
  code: string;
}
