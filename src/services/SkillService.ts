import { supabase } from '../config/supabase';
import { Habilidad } from '../types';

export class SkillService {
  static async getAll(): Promise<Habilidad[]> {
    const { data, error } = await supabase
      .from('habilidades')
      .select('*')
      .order('categoria', { ascending: true });
    if (error) throw error;
    return data ?? [];
  }

  static async getByCategory(category: string): Promise<Habilidad[]> {
    const { data, error } = await supabase
      .from('habilidades')
      .select('*')
      .eq('categoria', category)
      .order('nombre', { ascending: true });
    if (error) throw error;
    return data ?? [];
  }

  static async create(skill: Omit<Habilidad, 'id'>): Promise<Habilidad> {
    const { data, error } = await supabase
      .from('habilidades')
      .insert(skill)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async update(id: string, skill: Partial<Habilidad>): Promise<Habilidad> {
    const { data, error } = await supabase
      .from('habilidades')
      .update(skill)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('habilidades')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
}
