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
        // setDisabled(false);
    };

    const handleConfirmOpen = () => {
        setConfirmOpen(true);
        setDisabled(false);
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

                <div className="p-1 m-1">
                    <h4>Upload images to cloud first to start filling form!</h4>
                    <ul className="list-disc list-inside p-2 m-1">
                        <li>Upload appropriate images only. Inappropriate uploads may result in a ban.</li>
                        <li>
                            Uploaded, images cannot be changed here you may update them after submitting the form.
                        </li>
                    </ul>
                </div>
                <div className="form">
                    <div>
                        <label htmlFor="topic">Enter Topic:-</label>
                        <input type="text" name="topic" className="p-2 m-1 rounded-lg bg-transparent border" />
                    </div>
                    <div>
                        <label htmlFor="tags">Enter Tags:-</label>
                        <input type="text" name="tags" className="p-2 m-1 rounded-lg bg-transparent border" />
                    </div>
                </div>
                <button
                    onClick={handleConfirmOpen}
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 m-1 px-4 rounded-lg"
                    disabled={uploadedImages.length === 0 || !disabled}
                >
                    Next
                </button>
            </div>

            <div className="w-1/2 p-4">
                {/* Right Side: Form for each uploaded image with preview */}
                {disabled ? <h4>You can't fill the form. Please fill previous form</h4>
                    :
                    <div>
                        {uploadedImages.length > 0 && (
                            <>
                                <h4 className="text p-1 m-1">Fill descriptions for each uploaded image:</h4>
                                {uploadedImages.map((image, index) => (
                                    <div key={index} className="mb-4 flex items-start">
                                        {/* Image Preview */}
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`Uploaded preview ${index + 1}`}
                                            className="w-28 h-28 object-cover mr-4 p-0.5 mx-1 border rounded-lg"
                                        />

                                        {/* Description Form */}
                                        <div className="flex-1">
                                            <h5 className="text p-1 m-1">Image {index + 1} Description:</h5>
                                            <textarea
                                                value={descriptions[index]}
                                                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                                                placeholder="Enter a description for this image"
                                                className="w-full p-2 border rounded-lg text-black"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                }
            </div>
        </div>
    );
};

export default CourseRoute;
