import ImageUpload from "@/components/ui/Drag/ImageDrag";
import { useState } from "react";

const CourseRoute = () => {
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [descriptions, setDescriptions] = useState<string[]>([]);

    const handleImageChange = (images: File[]) => {
        setUploadedImages(images);
        setDescriptions(Array(images.length).fill("")); // Initialize description array for each image
        setDisabled(false);
    };

    const handleConfirmOpen = () => {
        setConfirmOpen(true);
    };

    const handleConfirmClose = () => {
        setConfirmOpen(false);
    };

    const handleConfirm = () => {
        // cloudUpload();
        handleConfirmClose();
        setDisabled(true); // Disable further uploads after confirmation
    };

    const handleDescriptionChange = (index: number, value: string) => {
        const updatedDescriptions = [...descriptions];
        updatedDescriptions[index] = value;
        setDescriptions(updatedDescriptions);
    };

    return (
        <div className="flex">
            {/* Left Side: Image Upload and Warnings */}
            <div className="w-1/2 p-4 border-r">
                <label>Images:</label>
                <ImageUpload onChange={handleImageChange} />

                <button
                    onClick={handleConfirmOpen}
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 m-1 px-4 rounded-lg"
                    disabled={uploadedImages.length === 0}
                >
                    UPLOAD To Cloud
                </button>

                <div className="p-1 m-1">
                    <h4>Upload images to cloud first to start filling form!</h4>
                    <ul className="list-disc list-inside p-2 m-1">
                        <li>Upload images one by one to show in course title.</li>
                        <li>Upload appropriate images only. Inappropriate uploads may result in a ban.</li>
                        <li>File size must not exceed 20MB.</li>
                        <li>
                            Once uploaded, images cannot be changed here; you may update them after submitting the form.
                        </li>
                    </ul>
                </div>
            </div>

            {/* Right Side: Form for each uploaded image with preview */}
            <div className="w-1/2 p-4">
                {uploadedImages.length > 0 && (
                    <>
                        <h4>Fill descriptions for each uploaded image:</h4>
                        {uploadedImages.map((image, index) => (
                            <div key={index} className="mb-4 flex items-start">
                                {/* Image Preview */}
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Uploaded preview ${index + 1}`}
                                    className="w-20 h-20 object-cover mr-4 border rounded-lg"
                                />

                                {/* Description Form */}
                                <div className="flex-1">
                                    <h5>Image {index + 1} Description:</h5>
                                    <textarea
                                        value={descriptions[index]}
                                        onChange={(e) => handleDescriptionChange(index, e.target.value)}
                                        placeholder="Enter a description for this image"
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                            </div>
                        ))}
                    </>
                )}
                {!disabled && <h4>You can now fill the form.</h4>}
                {disabled && uploadedImages.length > 0 && (
                    <h3>You have already uploaded images to the cloud!</h3>
                )}
            </div>
        </div>
    );
};

export default CourseRoute;
