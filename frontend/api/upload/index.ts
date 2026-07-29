import { VercelRequest, VercelResponse } from '@vercel/node';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const form = formidable();
    
    try {
      const [fields, files] = await form.parse(req);
      const file = files.file?.[0];
      
      if (!file) {
        return res.status(400).json({ error: 'No file provided' });
      }

      const bucket = (fields.bucket?.[0]) || 'projects';

      return res.status(200).json({
        url: null,
        error: 'File uploads require an external storage service (Supabase Storage, Cloudinary, etc.)',
        fileName: file.originalFilename,
        bucket,
      });
    } catch {
      return res.status(500).json({ error: 'Error parsing file' });
    }
  } else if (req.method === 'DELETE') {
    return res.status(200).json({ success: true });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
