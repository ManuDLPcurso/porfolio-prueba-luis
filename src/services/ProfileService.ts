import { supabase } from "../config/supabase";

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
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .limit(1)
      .single();
    if (error) {
      console.warn("No profile found in Supabase:", error.message);
      return null;
    }
    return data;
  }

  static async updateProfile(id: number, profile: Partial<Profile>) {
    const { error } = await supabase
      .from("profiles")
      .update({ ...profile, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) throw error;
  }
}
