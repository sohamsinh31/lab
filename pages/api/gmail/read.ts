import { google } from 'googleapis';
import { getSession } from 'next-auth/react';

export default async function handler({ req, res }: any) {
    const session: any = await getSession({ req });

    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
        access_token: session?.accessToken,
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
