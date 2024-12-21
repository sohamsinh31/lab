import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXT_PUBLIC_SEC;  // Define your next-auth secret in the .env file

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Retrieve the token using next-auth's getToken for server-side access
    const token: any = await getToken({ req, secret });

    console.log(token.accessToken)
    console.log("Here is other: ", token.tokens)

    if (!token || !token.tokens) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
        access_token: token.tokens,
    });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    const { to, subject, message } = req.body;
    console.log(req.body)

    const rawMessage = [
        `To: ${to}`,
        `Subject: ${subject}`,
        '',
        message, // Body of the email
    ].join('\n');

    // Encoding the message properly
    const encodedMessage = Buffer.from(rawMessage)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');


    try {
        await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: encodedMessage,
            },
        });
        res.status(200).json({ status: 'Email sent!' });
    } catch (error: any) {
        console.error("Error sending email: ", error);  // Log the full error for debugging
        res.status(500).json({ error: error.message });
    }
}    
