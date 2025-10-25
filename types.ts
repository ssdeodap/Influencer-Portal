export interface UserProfile {
  fullName: string;
  profilePicture: string | null;
  bio: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Non-binary' | 'Prefer not to say';
  languages: string[];
  niche: string[];
  website: string[];
  experience: number;
  audienceDemographics: string[];
  contentStyle: string;
  engagementRate: number;
  preferredCollaborations: string[];
  socialAccounts: SocialAccount[];
  interests: string[];
  authenticity: number;
  avgWatchTime: number;
}

export interface SocialAccount {
  platform: 'Instagram' | 'YouTube' | 'TikTok' | 'Twitter' | 'Facebook';
  handle: string;
  url: string;
  followers: number;
  engagementRate: number;
  avgLikes?: number;
  avgComments?: number;
  avgViews?: number;
  avgWatchTime?: number;
  connected: boolean;
  lastSync: string;
  recentPosts: { id: number; image: string; likes: number; comments: number }[];
}

export type WorkflowStepStatus = 'Completed' | 'Action Needed' | 'Waiting' | 'Upcoming';

export interface WorkflowStep {
    id: number;
    title: string;
    status: WorkflowStepStatus;
    date?: string;
    description?: string;
    actionLabel?: string;
    actionLink?: string;
    feedback?: string;
}

export interface Campaign {
  id: number;
  brandName: string;
  campaignTitle: string;
  campaignImage: string;
  tags: string[];
  compensation: string;
  specifications: {
    brand: string;
    budget: string;
    influencerAge: string;
    influencerLocation: string;
    followers: string;
    audienceLocation: string;
    audienceAge: string;
  };
  description: string;
  contentReferences: { title: string; url: string }[];
  deliverables: string[];
  cta: string[];
  mediaRequirements: { reels: number; stories: number; posts: number };
  paymentTerms: string;
  aboutTheBrand: string;
}

export interface Application {
    id: string;
    campaign: Campaign;
    status: 'Applied' | 'Accepted' | 'Rejected';
    appliedDate: string;
}

export interface Collaboration {
    id: string;
    campaign: Campaign;
    status: 'In Progress' | 'Completed';
    workflow: WorkflowStep[];
}
