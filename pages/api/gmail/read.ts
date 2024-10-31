import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;  // Define your next-auth secret in the .env file

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Retrieve the token using next-auth's getToken for server-side access
    const token: any = await getToken({ req, secret });

    if (!token || !token.accessToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
        access_token: token.accessToken,
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
        res.status(500).json({ error: error.message });
    }
}
