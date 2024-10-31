import { useState } from "react";


const SurveyRoute = () => {
    const [formData, setFormData] = useState<{ [key: string]: any }>({});

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
    return (
        <div>
            <form action="">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" onChange={handleInputChange} />
                <label htmlFor="cloud">Have you usen any cloud services? Please Specify</label>
                <input type="email" name="email" onChange={handleInputChange} />
                <input type="email" name="email" onChange={handleInputChange} />
            </form>
        </div>
    )
}

export default SurveyRoute;