import { fetchData } from '@/components/services/CallAPI';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css'; // Import the Quill editor styles

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const EmailEditor: React.FC = () => {
    const router = useRouter();
    const [content, setContent] = useState<string>('');
    const [to, setTo] = useState<string>('');         // State for "To" field
    const [subject, setSubject] = useState<string>(''); // State for "Subject" field
    const { data: session }: any = useSession();
    const [accessToken, setAcc] = useState<string>('');

    useEffect(() => {

        if (!session) {
            router.push("/auth/login")
        } else { setAcc(session?.accessToken) }

        readMails();

    }, [session])



    const handleChange = (value: string) => {
        setContent(value);
    };

    const modules = {
        toolbar: [
            [{ 'font': [] }],
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image', 'blockquote', 'code-block'],
            ['clean']
        ],
    };

    const readMails = async () => {
        const data = await fetch('/api/gmail/read');
        console.log(data);
    }

    const sendMail = async () => {
        if (!accessToken) {
            console.error("No access token found");
            return;
        }

        const emailBody = `
          To: ${to}
          Subject: ${subject}
    
          ${content}
        `;

        // Base64 encode the email body
        const base64EncodedEmail = window.btoa(emailBody)
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");

        try {
            const res = await fetch('/api/gmail/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ to, subject, content }),
            });

            if (res.ok) {
                alert('Email sent successfully!');
            } else {
                alert('Failed to send email.');
            };

        } catch (error) {
            console.error("Error sending email:", error);
        }
    };

    return (
        <div className="w-full min-h-screen p-8 flex flex-col items-center">
            {/* Email Header Section */}
            <div className="w-full max-w-4xl bg-slate-500 rounded-md shadow-md p-4 mb-4">
                <h2 className="text-xl font-semibold">Compose Email</h2>
            </div>

            {/* To and Subject Inputs */}
            <div className="w-full max-w-4xl bg-white shadow-md p-4 mb-4">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-black">To</label>
                    <input
                        type="email"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                        placeholder="Recipient's email"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-black">Subject</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                        placeholder="Email subject"
                    />
                </div>
            </div>

            {/* Email Body (React Quill) */}
            <div className="w-full max-w-4xl bg-white shadow-md p-4">
                <ReactQuill
                    value={content}
                    onChange={handleChange}
                    modules={modules}
                    className="min-h-[300px] bg-gray-50 text-black"
                    theme="snow"
                />
            </div>

            {/* Action Buttons */}
            <div className="w-full max-w-4xl mt-4 flex justify-end space-x-2">
                <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-300">
                    Save Draft
                </button>
                <button
                    onClick={() => sendMail()} // Replace with actual access token
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Send Email
                </button>
            </div>
        </div>
    );
};

export default EmailEditor;
