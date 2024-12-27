// pages/form-builder.tsx
import { postData } from '@/components/services/CallAPI';
import { Delete } from '@mui/icons-material';
import { useState } from 'react';

type QuestionType = "text" | "textarea" | "radio" | "checkbox";

interface Question {
    id: number;
    question: string;
    type: QuestionType;
    options?: string[]; // For radio or checkbox types
}

interface Form {
    title: string;
    qes: string;
}

const FormBuilder: React.FC = () => {
    const [formTitle, setFormTitle] = useState<string>("");
    const [questions, setQuestions] = useState<Question[]>([
        { id: 1, question: "", type: "text" },
    ]);
    const [link, setLink] = useState<string>();

    const createForm = async () => {
        try {
            const newForm: Form = { title: formTitle, qes: JSON.stringify(questions) };
            const response = await postData(
                `${process.env.NEXT_PUBLIC_JWS_URL}/api/forms/`,
                newForm
            );

            if (response) {
                setLink(`/forms/shared/` + response.id)
            }
        } catch (error) {
            console.error('Error creating form:', error);
        }
    };

    const addQuestion = () => {
        setQuestions([
            ...questions,
            { id: questions.length + 1, question: "", type: "text" },
        ]);
    };

    const updateQuestion = (id: number, field: keyof Question, value: any) => {
        setQuestions(
            questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
        );
    };

    const updateOption = (id: number, index: number, value: string) => {
        setQuestions(
            questions.map((q) =>
                q.id === id && q.options
                    ? {
                        ...q,
                        options: q.options.map((opt, i) =>
                            i === index ? value : opt
                        ),
                    }
                    : q
            )
        );
    };

    const addOption = (id: number) => {
        setQuestions(
            questions.map((q) =>
                q.id === id
                    ? { ...q, options: [...(q.options || []), ""] }
                    : q
            )
        );
    };

    const removeOption = (id: number, index: number) => {
        setQuestions(
            questions.map((q) =>
                q.id === id
                    ? {
                        ...q,
                        options: q.options?.filter((_, i) => i !== index) || [],
                    }
                    : q
            )
        );
    };

    const removeQuestion = (id: number) => {
        setQuestions(questions.filter((q) => q.id !== id));
    };

    return (
        <div className="min-h-screen text-black p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
               { !link && <div>
                    <h1 className="text-2xl font-bold mb-4">Form Builder</h1>
                    {/* Form Title */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Form Title</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            placeholder="Enter form title"
                            value={formTitle}
                            onChange={(e) => setFormTitle(e.target.value)}
                        />
                    </div>
                    {/* Questions */}
                    <div>
                        {questions.map((q, index) => (
                            <div
                                key={q.id}
                                className="border border-gray-300 rounded p-4 mb-4 relative"
                            >
                                <div className="flex p-2 justify-between">
                                    <label className="block text-sm font-medium p-2">
                                        Question {index + 1}
                                    </label>
                                    <button
                                        className="text-red-500 p-1"
                                        onClick={() => removeQuestion(q.id)}
                                    >
                                        <Delete />
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                                    placeholder="Enter question"
                                    value={q.question}
                                    onChange={(e) =>
                                        updateQuestion(q.id, "question", e.target.value)
                                    }
                                />
                                <label className="block text-sm font-medium mb-2">
                                    Question Type
                                </label>
                                <select
                                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                                    value={q.type}
                                    onChange={(e) =>
                                        updateQuestion(q.id, "type", e.target.value as QuestionType)
                                    }
                                >
                                    <option value="text">Text</option>
                                    <option value="textarea">Paragraph</option>
                                    <option value="radio">Multiple Choice</option>
                                    <option value="checkbox">Checkboxes</option>
                                </select>
                                {/* Options for Multiple Choice or Checkboxes */}
                                {(q.type === "radio" || q.type === "checkbox") && (
                                    <div className="space-y-2">
                                        {q.options?.map((opt, i) => (
                                            <div key={i} className="flex items-center space-x-2">
                                                <input
                                                    type="text"
                                                    className="flex-grow border border-gray-300 rounded px-3 py-2"
                                                    placeholder={`Option ${i + 1}`}
                                                    value={opt}
                                                    onChange={(e) =>
                                                        updateOption(q.id, i, e.target.value)
                                                    }
                                                />
                                                <button
                                                    className="text-red-500"
                                                    onClick={() => removeOption(q.id, i)}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            className="text-blue-500 text-sm"
                                            onClick={() => addOption(q.id)}
                                        >
                                            + Add Option
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* Add Question Button */}
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
                        onClick={addQuestion}
                    >
                        Add Question
                    </button>
                    <button
                        className="bg-green-500 text-black px-4 py-2 rounded mt-4 ml-4 hover:bg-green-600"
                        onClick={createForm}
                    >
                        Generate Form URL
                    </button>
                </div>
                }
                <div>
                    {link && (<h3>{link}</h3>)}
                </div>
            </div>
            {/* <button
                className="bg-green-300 p-2 m-1 rounded-md"
                onClick={createForm}
            >
                Create
            </button> */}
        </div>
    );
};

export default FormBuilder;
