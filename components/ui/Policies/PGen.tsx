import { useEffect, useState } from 'react';

const PGen: React.FC<{ forPage: string }> = ({ forPage }) => {
    const [contentData, setContentData] = useState<any>(null); // Use a type that matches your content structure
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/legal-content?forPage=${forPage}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch content");
                }
                const data = await response.json();
                setContentData(data);
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [forPage]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="m-2 p-4 text">
            <h1 className="text-2xl font-bold text-center mb-6">{contentData?.title}</h1>
            <p className="text-center text-gray-600 mb-6">Last updated: {contentData?.date}</p>
            <div className="leading-relaxed">
                <ol className="list-decimal pl-6 mb-4">
                    {contentData?.content.map((section: any, index: number) => (
                        <li key={index} className="mt-4">
                            <strong>{section.heading}</strong>
                            {section.subpoints && (
                                <ul className="list-disc pl-6 mt-2">
                                    {section.subpoints.map((point: string, idx: number) => (
                                        <li key={idx}>{point}</li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ol>
                <p className="mt-6">
                    For any concerns or requests related to your data, please contact us at <a href="mailto:support@yourcompany.com" className="text-blue-600 underline">sohamsinh@tiserai.tech</a>.
                </p>
            </div>
        </div>
    );
};

export default PGen;
