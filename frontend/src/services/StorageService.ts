const API_BASE = import.meta.env.VITE_API_URL || '/api';

export class StorageService {
  static async uploadImage(file: File, bucket: string = 'projects'): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', bucket);

    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error('Error uploading file');
    const { url } = await res.json();
    return url;
  }

  static async deleteImage(fileName: string, bucket: string = 'projects'): Promise<void> {
    const res = await fetch(`${API_BASE}/upload?fileName=${fileName}&bucket=${bucket}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error deleting file');
  }

  static getPublicUrl(fileName: string, bucket: string = 'projects'): string {
    return `/uploads/${bucket}/${fileName}`;
  }
}
