export type UserRole = 'citizen' | 'field_officer' | 'dept_admin' | 'super_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleTitle: string;
  department?: string;
  ward?: string;
}

export type ProblemCategory =
  | 'Roads'
  | 'Water'
  | 'Garbage'
  | 'Streetlights'
  | 'Drainage'
  | 'Public Safety'
  | 'Other';

export type ProblemStatus =
  | 'reported'
  | 'assigned'
  | 'in_progress'
  | 'resolution_pending'
  | 'resolved'
  | 'reopened';

export type LocationSource = 'gps' | 'pin';

export interface ProblemLocation {
  lat: number;
  lng: number;
  address: string;
  source: LocationSource;
}

export interface TimelineEvent {
  id: string;
  status: ProblemStatus;
  timestamp: string;
  note: string;
  author: string;
  photoUrl?: string;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  category: ProblemCategory;
  location: ProblemLocation;
  evidencePhotos: string[];
  status: ProblemStatus;
  department: string;
  assignedOfficer?: string;
  deadline?: string;
  createdAt: string;
  reportedBy: string;
  reportedByEmail?: string;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  timeline: TimelineEvent[];
  resolutionPhoto?: string;
  resolutionNotes?: string;
  citizenFeedback?: 'solved' | 'still_exists';
  citizenFeedbackNote?: string;
  publishedToChallenge?: boolean;
}

export interface CommunitySolution {
  id: string;
  challengeId: string;
  title: string;
  idea: string;
  howItHelps: string;
  expectedImpact: string;
  author: string;
  authorRole?: string;
  likes: number;
  status: 'submitted' | 'shortlisted' | 'expert_review' | 'pilot' | 'rejected';
  createdAt: string;
  reviewerNotes?: string;
}

export interface OpenChallenge {
  id: string;
  title: string;
  problemDescription: string;
  whyDifficult: string;
  location: string;
  department: string;
  status: 'open' | 'under_review' | 'pilot_selected';
  solutionsCount: number;
  linkedProblemId?: string;
  createdAt: string;
}

export interface Innovation {
  id: string;
  title: string;
  problem: string;
  solution: string;
  expectedImpact: string;
  author: string;
  status: 'under_review' | 'shortlisted' | 'pilot' | 'implemented';
  createdAt: string;
}

export interface Department {
  id: string;
  name: string;
  head: string;
  activeProblems: number;
  resolved: number;
}

export interface ConsultationOption {
  key: string;
  label: string;
  votes: number;
}

export interface Consultation {
  id: string;
  question: string;
  explanation: string;
  deadline: string;
  category: string;
  department: string;
  options: ConsultationOption[];
  totalVotes: number;
}
