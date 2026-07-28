import { supabase } from '../config/supabase';

export class StorageService {
  static async uploadImage(file: File, bucket: string = 'projects'): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, { contentType: file.type, upsert: false });
    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
    return urlData.publicUrl;
  }

  static async deleteImage(fileName: string, bucket: string = 'projects'): Promise<void> {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([fileName]);
    if (error) throw error;
  }

  static getPublicUrl(fileName: string, bucket: string = 'projects'): string {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);
    return data.publicUrl;
  }
}
