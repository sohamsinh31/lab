import { useState } from "react";
import { fetchData, postData, putData, deleteData } from "@/components/services/CallAPI";

const APIPlayground = () => {
    const [method, setMethod] = useState("GET");
    const [url, setUrl] = useState("");
    const [data, setData] = useState("");
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAPIRequest = async () => {
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
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 m-4 border rounded-md shadow-md min-w-[85vw]">
            <h1 className="text-lg font-bold mb-4">API Playground</h1>
            <div className="mb-4">
                <label htmlFor="method" className="block font-medium mb-1">Select Method:</label>
                <select
                    name="method"
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full p-2 border rounded-md bg-white text text-black"
                >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="url" className="block font-medium mb-1">Enter the URL:</label>
                <input
                    type="text"
                    name="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://api.example.com/resource"
                    className="w-full p-2 border rounded-md text text-black"
                />
            </div>

            {(method === "POST" || method === "PUT") && (
                <div className="mb-4">
                    <label htmlFor="data" className="block font-medium mb-1">Enter Request Body (JSON):</label>
                    <textarea
                        name="data"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        placeholder='{"key":"value"}'
                        className="w-full p-2 border rounded-md"
                        rows={4}
                    ></textarea>
                </div>
            )}

            <button
                onClick={handleAPIRequest}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
                Send Request
            </button>

            <div className="mt-4">
                <h2 className="text-md font-bold">Response:</h2>
                {loading && <p className="text-gray-600">Loading...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}
                {response && (
                    <pre className="p-2 bg-gray-100 text text-black border rounded-md overflow-x-auto">
                        {JSON.stringify(response, null, 2)}
                    </pre>
                )}
            </div>
        </div>
    );
};

export default APIPlayground;
