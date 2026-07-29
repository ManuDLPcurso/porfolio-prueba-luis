import { apiClient } from '../config/api';
import { Habilidad } from '../types';

export class SkillService {
  static async getAll(): Promise<Habilidad[]> {
    return apiClient.get<Habilidad[]>('/skills');
  }

  static async getByCategory(category: string): Promise<Habilidad[]> {
    return apiClient.get<Habilidad[]>(`/skills?category=${category}`);
  }

  static async create(skill: Omit<Habilidad, 'id'>): Promise<Habilidad> {
    return apiClient.post<Habilidad>('/skills', skill);
  }

  static async update(id: string, skill: Partial<Habilidad>): Promise<Habilidad> {
    return apiClient.put<Habilidad>(`/skills?id=${id}`, skill);
  }

  static async delete(id: string): Promise<void> {
    return apiClient.delete(`/skills?id=${id}`);
  }
}
