import { supabase } from '../config/supabase';
import { Proyecto } from '../types';

export class ProjectService {
  static async getAll(): Promise<Proyecto[]> {
    const { data, error } = await supabase
      .from('proyectos')
      .select('*')
      .order('fecha', { ascending: false });
    if (error) throw error;
    return data ?? [];
  }

  static async getFeatured(): Promise<Proyecto[]> {
    const { data, error } = await supabase
      .from('proyectos')
      .select('*')
      .eq('destacado', true)
      .order('fecha', { ascending: false });
    if (error) throw error;
    return data ?? [];
  }

  static async getById(id: string): Promise<Proyecto | null> {
    const { data, error } = await supabase
      .from('proyectos')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  static async create(project: Omit<Proyecto, 'id' | 'created_at'>): Promise<Proyecto> {
    const { data, error } = await supabase
      .from('proyectos')
      .insert(project)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async update(id: string, project: Partial<Proyecto>): Promise<Proyecto> {
    const { data, error } = await supabase
      .from('proyectos')
      .update(project)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('proyectos')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }

  static async toggleFeatured(id: string, featured: boolean): Promise<void> {
    const { error } = await supabase
      .from('proyectos')
      .update({ destacado: featured })
      .eq('id', id);
    if (error) throw error;
  }
}
