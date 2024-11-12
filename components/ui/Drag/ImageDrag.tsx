"use client"
import React, { useState } from 'react';
import { Box, IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { DropzoneArea } from 'material-ui-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import "./Drag.css"

const useStyles = makeStyles({
    dropzone: {
        background: 'transparent',
        border: '2px dashed white',
        borderRadius: '11px',
        padding: '20px',
        '&:hover': {
            backgroundColor: 'lightgray',
        },
    },
    dropzoneText: {
        color: 'white',
        fontSize: '16px',
    },
});

interface ImageUploadProps {
    onChange: (images: File[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange }) => {
    const [images, setImages] = useState<{ id: number, url: string }[]>([]);
    const classes = useStyles();

    const handleAddImage = (files: File[]) => {
        const newImages = files.map((file, index) => ({
            id: Date.now() + index,
            url: URL.createObjectURL(file),
        }));
        setImages(prevImages => {
            const updatedImages = [...prevImages, ...newImages];
            onChange(files); // Call the onChange callback with the new files
            return updatedImages;
        });
    };

    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            <DropzoneArea
                acceptedFiles={['image/*']}
                dropzoneText="Drag and drop an image here or click"
                onChange={handleAddImage}
                showAlerts={false}
                filesLimit={10}
                dropzoneClass={classes.dropzone}
                dropzoneParagraphClass={classes.dropzoneText}
                onDropRejected={(files) => {
                    alert('Only image files are allowed');
                }}
            />
        </Box>
    );
};

export default ImageUpload;