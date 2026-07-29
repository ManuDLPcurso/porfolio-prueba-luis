import { VercelRequest, VercelResponse } from '@vercel/node';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error parsing file' });
      }

      const file = files.file as formidable.File;
      const bucket = (fields.bucket as string) || 'projects';
      
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', bucket);
      
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = `${Date.now()}-${file.originalFilename}`;
      const filePath = path.join(uploadDir, fileName);

      fs.copyFileSync(file.filepath, filePath);

      return res.status(200).json({
        url: `/uploads/${bucket}/${fileName}`,
        fileName,
      });
    });
  } else if (req.method === 'DELETE') {
    const { fileName, bucket } = req.query;
    const filePath = path.join(
      process.cwd(),
      'public',
      'uploads',
      (bucket as string) || 'projects',
      fileName as string
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return res.status(200).json({ success: true });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
