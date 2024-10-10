import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css'; // Import the Quill editor styles

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const EmailEditor: React.FC = () => {
    const [content, setContent] = useState<string>('');

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

    return (
        <div className="w-full min-h-screen p-8 flex flex-col items-center">
            <div className="w-full max-w-4xl bg-slate-500 rounded-md shadow-md p-4 mb-4">
                <h2 className="text-xl font-semibold">Compose Email</h2>
            </div>
            <div className="w-full max-w-4xl bg-white shadow-md p-4">
                <ReactQuill
                    value={content}
                    onChange={handleChange}
                    modules={modules}
                    className="min-h-[300px] bg-gray-50"
                    theme="snow"
                />
            </div>
            <div className="w-full max-w-4xl mt-4 flex justify-end space-x-2">
                <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-300">
                    Save Draft
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Send Email
                </button>
            </div>
        </div>
    );
};

export default EmailEditor;
