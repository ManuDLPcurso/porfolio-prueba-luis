import { apiClient } from '../config/api';
import { Proyecto } from '../types';

export class ProjectService {
  static async getAll(): Promise<Proyecto[]> {
    return apiClient.get<Proyecto[]>('/projects');
  }

  static async getFeatured(): Promise<Proyecto[]> {
    return apiClient.get<Proyecto[]>('/projects?featured=true');
  }

  static async getById(id: string): Promise<Proyecto | null> {
    return apiClient.get<Proyecto | null>(`/projects?id=${id}`);
  }

  static async create(project: Omit<Proyecto, 'id' | 'created_at'>): Promise<Proyecto> {
    return apiClient.post<Proyecto>('/projects', project);
  }

  static async update(id: string, project: Partial<Proyecto>): Promise<Proyecto> {
    return apiClient.put<Proyecto>(`/projects?id=${id}`, project);
  }

  static async delete(id: string): Promise<void> {
    return apiClient.delete(`/projects?id=${id}`);
  }

  static async toggleFeatured(id: string, featured: boolean): Promise<void> {
    await apiClient.put(`/projects?id=${id}`, { destacado: featured });
  }
}
