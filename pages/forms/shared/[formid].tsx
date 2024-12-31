import { fetchData } from "@/components/services/CallAPI";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Question {
    id: number;
    question: string;
    type: "text" | "textarea" | "radio" | "checkbox";
    options?: string[];
}

interface FormData {
    id: number;
    formName: string;
    formStructure: Question[];
}

const DynamicForm: React.FC = () => {
    const [responses, setResponses] = useState<{ [key: number]: any }>({});
    const router = useRouter();
    const { formid } = router.query;

    const { data: session, status } = useSession();
    const [formData, setFormData] = useState<FormData | null>(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/login");
        }
    }, [status, router]);

    useEffect(() => {
        if (formid) {
            const fetchForm = async () => {
                try {
                    const res = await fetchData(
                        `${process.env.NEXT_PUBLIC_JWS_URL}/api/forms/${formid}`
                    );
                    // Parse `formStructure` if it's a string
                    const parsedFormStructure = JSON.parse(res.formStructure);
                    setFormData({
                        ...res,
                        formStructure: parsedFormStructure,
                    });
                } catch (error) {
                    console.error("Error fetching form data:", error);
                }
            };
            fetchForm();
        }
    }, [formid]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    const handleInputChange = (id: number, value: any) => {
        setResponses((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleCheckboxChange = (id: number, option: string) => {
        setResponses((prev) => {
            const existing = prev[id] || [];
            if (existing.includes(option)) {
                return {
                    ...prev,
                    [id]: existing.filter((o: string) => o !== option),
                };
            } else {
                return {
                    ...prev,
                    [id]: [...existing, option],
                };
            }
        });
    };

    const handleSubmit = () => {
        console.log("Responses:", responses);
        alert("Responses Submitted! Check console for output.");
    };

    return (
        <div className="min-h-screen text-black p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">
                    {formData ? formData.formName : "Loading form..."}
                </h1>
                {formData ? (
                    <form>
                        {formData.formStructure.map((q) => (
                            <div key={q.id} className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    {q.question}
                                </label>
                                {q.type === "text" && (
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                        value={responses[q.id] || ""}
                                        onChange={(e) =>
                                            handleInputChange(q.id, e.target.value)
                                        }
                                    />
                                )}
                                {q.type === "textarea" && (
                                    <textarea
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                        value={responses[q.id] || ""}
                                        onChange={(e) =>
                                            handleInputChange(q.id, e.target.value)
                                        }
                                    />
                                )}
                                {(q.type === "radio" || q.type === "checkbox") &&
                                    q.options?.map((option, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center mb-2"
                                        >
                                            <input
                                                type={q.type}
                                                id={`q-${q.id}-opt-${index}`}
                                                name={`q-${q.id}`}
                                                value={option}
                                                checked={
                                                    q.type === "radio"
                                                        ? responses[q.id] === option
                                                        : responses[q.id]?.includes(option)
                                                }
                                                onChange={(e) =>
                                                    q.type === "radio"
                                                        ? handleInputChange(q.id, option)
                                                        : handleCheckboxChange(q.id, option)
                                                }
                                                className="mr-2"
                                            />
                                            <label
                                                htmlFor={`q-${q.id}-opt-${index}`}
                                                className="text-sm"
                                            >
                                                {option}
                                            </label>
                                        </div>
                                    ))}
                            </div>
                        ))}
                        <button
                            type="button"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </form>
                ) : (
                    <div>Loading form data...</div>
                )}
            </div>
        </div>
    );
};

export default DynamicForm;
