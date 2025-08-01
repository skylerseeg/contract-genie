import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const signature = req.headers['x-hub-signature-256'] as string;
    const payload = JSON.stringify(req.body);

    // Validate webhook signature (optional but recommended)
    const crypto = require('crypto');
    const secret = process.env.GITHUB_WEBHOOK_SECRET || '';
    const hmac = crypto.createHmac('sha256', secret);
    const digest = `sha256=${hmac.update(payload).digest('hex')}`;

    if (signature !== digest) {
      return res.status(401).json({ message: 'Invalid signature' });
    }

    // Handle the webhook event
    const event = req.headers['x-github-event'] as string;
    console.log(`Received event: ${event}`);

    res.status(200).json({ message: 'Webhook received successfully' });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
