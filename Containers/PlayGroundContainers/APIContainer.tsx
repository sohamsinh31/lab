import { useState, useEffect } from "react";
import { fetchData, postData, putData, deleteData } from "@/components/services/CallAPI";

type HistoryEntry = {
    method: string;
    url: string;
    data?: string;
};

const APIPlayground: React.FC = () => {
    const [method, setMethod] = useState<string>("GET");
    const [url, setUrl] = useState<string>("");
    const [data, setData] = useState<string>("");
    const [response, setResponse] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [history, setHistory] = useState<HistoryEntry[]>([]);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const res = await fetch("/api/history");
            const historyData: HistoryEntry[] = await res.json();
            setHistory(historyData);
        } catch (err) {
            console.error("Failed to fetch history", err);
        }
    };

    const handleAPIRequest = async () => {
        if (!url) {
            setError("Please enter a valid URL.");
            return;
        }

        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            let result;
            switch (method) {
                case "GET":
                    result = await fetchData(url);
                    break;
                case "POST":
                    result = await postData(url, JSON.parse(data || "{}"));
                    break;
                case "PUT":
                    result = await putData(url, JSON.parse(data || "{}"));
                    break;
                case "DELETE":
                    result = await deleteData(url, JSON.parse(data || "{}"));
                    break;
                default:
                    throw new Error("Unsupported method");
            }
            setResponse(result);

            // Save to history
            await fetch("/api/history", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ method, url, data }),
            });

            fetchHistory();
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleHistoryClick = (entry: HistoryEntry) => {
        setMethod(entry.method);
        setUrl(entry.url);
        setData(entry.data || "");
    };

    return (
        <div className="flex min-w-[85vw]">
            {/* Sidebar */}
            <div className="w-1/4 border m-2 p-4 rounded-md">
                <h2 className="text-lg font-bold mb-4">History</h2>
                <ul className="space-y-2">
                    {history.map((entry, index) => (
                        <li
                            key={index}
                            className="p-2 border rounded-md cursor-pointer hover:bg-gray-200"
                            onClick={() => handleHistoryClick(entry)}
                        >
                            <strong>{entry.method}</strong>: {entry.url}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Playground */}
            <div className="w-3/4 p-4 m-2 border rounded-md">
                <h1 className="text-lg font-bold mb-4">API Playground</h1>
                <div className="flex items-center space-x-4 mb-4">
                    <div className="w-1/4">
                        <label htmlFor="method" className="block font-medium mb-1">Method:</label>
                        <select
                            name="method"
                            value={method}
                            onChange={(e) => setMethod(e.target.value)}
                            className="w-full text-black p-2 border rounded-md bg-white"
                        >
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="DELETE">DELETE</option>
                        </select>
                    </div>
                    <div className="w-3/4">
                        <label htmlFor="url" className="block font-medium mb-1">URL:</label>
                        <input
                            type="text"
                            name="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://api.example.com/resource"
                            className="w-full p-2 border rounded-md text-black"
                        />
                    </div>
                </div>

                {(method === "POST" || method === "PUT") && (
                    <div className="mb-4">
                        <label htmlFor="data" className="block font-medium mb-1">Request Body (JSON):</label>
                        <textarea
                            name="data"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            placeholder='{"key":"value"}'
                            className="w-full p-2 border rounded-md text-black"
                            rows={4}
                        ></textarea>
                    </div>
                )}

                <button
                    onClick={handleAPIRequest}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send Request"}
                </button>

                <div className="mt-4">
                    <h2 className="text-md font-bold">Response:</h2>
                    {loading && <p className="text-gray-600">Loading...</p>}
                    {error && <p className="text-red-500">Error: {error}</p>}
                    {response && (
                        <pre className="p-2 bg-gray-100 border rounded-md overflow-x-auto text-black">
                            {JSON.stringify(response, null, 2)}
                        </pre>
                    )}
                </div>
            </div>
        </div>
    );
};

export default APIPlayground;
