export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'athlete' | 'recruiter';
  isVerified: boolean;
  isSubscribed: boolean;
  createdAt: string;
  updatedAt: string;
}
