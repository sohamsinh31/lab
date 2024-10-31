import { useEffect, useState } from "react";
import { postData } from '../../services/CallAPI';

interface FormField {
    name: string;
    type: string;
    tag: string; // 'input', 'textarea', 'checkbox', etc.
    label: string;
}

const DForm = () => {
    const [fields, setFields] = useState<FormField[]>([]);
    const [formData, setFormData] = useState<{ [key: string]: any }>({});

    // Fetch form fields from the backend
    useEffect(() => {
        async function fetchFormFields() {
            const response = await fetch(process.env.NEXT_PUBLIC_JWS_URL + '/api/form-structure');
            const fields = await response.json();
            setFields(fields);
        }
        fetchFormFields();
    }, []);

    // Handle change for form inputs
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        // If the input type is checkbox, handle the `checked` property
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData({
                ...formData,
                [name]: checked
            });
        } else {
            // For text, textarea, or other input types, use the `value` property
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await postData(process.env.NEXT_PUBLIC_JWS_URL + '/api/survey', formData);
            console.log('Form submitted successfully:', result);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    // Render form fields based on the 'tag' property
    const renderField = (field: FormField) => {
        switch (field.tag) {
            case 'input':
                return (
                    <input
                        type={field.type}
                        name={field.name}
                        onChange={handleInputChange}
                        value={formData[field.name] || (field.type === 'checkbox' ? false : '')}
                        checked={field.type === 'checkbox' ? formData[field.name] || false : undefined}
                    />
                );
            case 'textarea':
                return (
                    <textarea
                        name={field.name}
                        onChange={handleInputChange}
                        value={formData[field.name] || ''}
                    />
                );
            default:
                return null; // Handle more cases like 'select', 'radio', etc.
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {fields.map((field) => (
                    <div key={field.name}>
                        <label>{field.label}</label>
                        {renderField(field)}
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default DForm;
