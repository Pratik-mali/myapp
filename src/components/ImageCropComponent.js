import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './cropImageHelper'; // Import the fixed function
import { resizeImageTo500KB } from './imageUtils';
import { readFileAsDataURL } from './readFileAsDataURL';

const ImageCropComponent = ({ handleCroppedImageChange }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null); // For showing cropped image
  const [isCropped, setIsCropped] = useState(false); // Track if the image is cropped

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageDataUrl = await readFileAsDataURL(file);
      setImageSrc(imageDataUrl);
      setIsCropped(false); // Reset the cropped state when a new image is selected
    }
  };

  const handleCropAndShowImage = async () => {
    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

      // Check if the croppedBlob is a valid Blob
      if (!(croppedBlob instanceof Blob)) {
        console.error('Cropped image is not a Blob');
        return;
      }

      // Convert Blob to Data URL
      const reader = new FileReader();
      reader.readAsDataURL(croppedBlob);
      reader.onloadend = async () => {
        const base64Image = reader.result;
        const resizedImage = await resizeImageTo500KB(base64Image); // Resize to 500KB
        setCroppedImage(resizedImage);
        setIsCropped(true); // Mark image as cropped
        handleCroppedImageChange(resizedImage); // Pass cropped image to parent handler
      };
    } catch (error) {
      console.error('Error cropping/resizing the image:', error);
    }
  };

  // Internal CSS for hiding original image and styling components
  const styles = {
    container: {
      textAlign: 'center',
      marginTop: '20px',
    },
    cropContainer: {
      position: 'relative',
      width: '100%',
      height: 400,
      display: isCropped ? 'none' : 'block', // Hide the original image when cropped
    },
    croppedImage: {
      maxWidth: '100%',
      height: 'auto',
      marginTop: '20px',
    },
    fileInput: {
      margin: '20px 0',
    },
    cropButton: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <input type="file" onChange={handleImageChange} style={styles.fileInput} />
      {imageSrc && (
        <>
          <div style={styles.cropContainer}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={4 / 4}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          {!isCropped && (
            <button type="button" onClick={handleCropAndShowImage} style={styles.cropButton}>
              Crop and Show Image
            </button>
          )}
        </>
      )}
      {/* Display the cropped image */}
      {croppedImage && (
        <div>
          <h3>Cropped Image:</h3>
          <img src={croppedImage} alt="Cropped Preview" style={styles.croppedImage} />
        </div>
      )}
    </div>
  );
};

export default ImageCropComponent;
