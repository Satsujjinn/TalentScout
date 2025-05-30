export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}
