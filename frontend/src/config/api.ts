const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const apiClient = {
  async get<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (!res.ok) throw new Error(`Error: ${res.statusText}`);
    return res.json();
  },

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Error: ${res.statusText}`);
    return res.json();
  },

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Error: ${res.statusText}`);
    return res.json();
  },

  async delete(endpoint: string): Promise<void> {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(`Error: ${res.statusText}`);
  },
};
