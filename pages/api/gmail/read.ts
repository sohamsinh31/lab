import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXT_PUBLIC_SEC;  // Define your next-auth secret in the .env file

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Retrieve the token using next-auth's getToken for server-side access
    const { tokens : token } = req.body;

    // Log the retrieved token to debug
    console.log('Retrieved token:', token);

    // Check if token and accessToken are present
    if (!token) {
        console.error('Unauthorized: Token or accessToken not found.');
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
        access_token: token as string,
    });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    try {
        const response = await gmail.users.messages.list({
            userId: 'me',
            maxResults: 10,  // You can customize this
        });

        const messages = response.data.messages;
        res.status(200).json(messages);
    } catch (error: any) {
        console.error('Error fetching Gmail messages:', error.message);
        res.status(500).json({ error: error.message });
    }
}
