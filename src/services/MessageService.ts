import { supabase } from '../config/supabase';
import { Mensaje } from '../types';

export class MessageService {
  static async getAll(): Promise<Mensaje[]> {
    const { data, error } = await supabase
      .from('mensajes')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data ?? [];
  }

  static async getUnreadCount(): Promise<number> {
    const { count, error } = await supabase
      .from('mensajes')
      .select('*', { count: 'exact', head: true })
      .eq('leido', false);
    if (error) throw error;
    return count ?? 0;
  }

  static async send(message: Omit<Mensaje, 'id' | 'leido' | 'created_at'>): Promise<Mensaje> {
    const { data, error } = await supabase
      .from('mensajes')
      .insert({ ...message, leido: false })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async markAsRead(id: string): Promise<void> {
    const { error } = await supabase
      .from('mensajes')
      .update({ leido: true })
      .eq('id', id);
    if (error) throw error;
  }

  static async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('mensajes')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
}
