import { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    return res.status(200).json({
      url: null,
      error: 'File uploads are not supported in Vercel serverless. Use Supabase Storage or an external service.',
    });
  } else if (req.method === 'DELETE') {
    return res.status(200).json({ success: true });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
