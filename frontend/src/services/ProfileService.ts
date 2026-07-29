import { apiClient } from '../config/api';

export interface Profile {
  id: number;
  bio: string;
  avatar_url: string;
  location: string;
  title: string;
  updated_at: string;
}

export class ProfileService {
  static async getProfile(): Promise<Profile | null> {
    try {
      return await apiClient.get<Profile>('/profile');
    } catch (error) {
      console.warn('No profile found:', error);
      return null;
    }
  }

  static async updateProfile(id: number, profile: Partial<Profile>) {
    await apiClient.put(`/profile?id=${id}`, profile);
  }
}
