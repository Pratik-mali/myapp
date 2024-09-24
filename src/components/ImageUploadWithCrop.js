import React, { useState, useRef } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./ImageUploadWithCrop.css"; // Ensure you add styles for the modal

const ImageUploadWithCrop = ({ onChange }) => {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: "px", // Change this to pixel-based for better control
    width: 200, // Default width for initial crop box
    aspect: 1, // 1:1 aspect ratio for square cropping
  });
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [fileSizeError, setFileSizeError] = useState("");
  const imageRef = useRef(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Function to handle file selection and load the image
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSrc(reader.result);
        setIsModalOpen(true); // Open modal when image is loaded
      };
      reader.readAsDataURL(file);
    }
    if (onChange) {
      onChange(event); // Call the parent onChange handler if needed
    }
  };

  // Function to capture the loaded image reference
  const onImageLoaded = (image) => {
    imageRef.current = image;
  };

  // Function to handle crop completion
  const handleCropComplete = (crop) => {
    setCompletedCrop(crop);
  };

  // Function to handle changes in crop
  const handleCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  // Function to crop the image and resize it to under 500KB
  const getCroppedImage = async (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          const file = new File([blob], "croppedImage.jpeg", { type: "image/jpeg" });

          if (blob.size > 500 * 1024) {
            setFileSizeError("The file is larger than 500KB. Resizing...");
            const newBlob = resizeImage(blob, 500);
            resolve(URL.createObjectURL(newBlob));
          } else {
            resolve(URL.createObjectURL(file));
          }
        },
        "image/jpeg",
        1
      );
    });
  };

  // Function to resize the image if it exceeds 500KB
  const resizeImage = (blob, maxSizeKB) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = URL.createObjectURL(blob);

    return new Promise((resolve) => {
      img.onload = () => {
        const scaleFactor = Math.sqrt(maxSizeKB * 1024 / blob.size);
        canvas.width = img.width * scaleFactor;
        canvas.height = img.height * scaleFactor;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((resizedBlob) => {
          resolve(resizedBlob);
        }, "image/jpeg");
      };
    });
  };

  // Function to crop and resize the image when user clicks the button
  const handleCropAndResize = async () => {
    if (completedCrop && imageRef.current) {
      const croppedImageUrl = await getCroppedImage(imageRef.current, completedCrop);
      setCroppedImageUrl(croppedImageUrl);
      setFileSizeError("");
      setIsModalOpen(false); // Close the modal after cropping
    }
  };

  // Function to close the modal without saving the crop
  const closeModal = () => {
    setIsModalOpen(false);
    setSrc(null); // Reset the image
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Crop Image</h3>
            {src && (
              <ReactCrop
                src={src}
                crop={crop}
                onImageLoaded={onImageLoaded}
                onComplete={handleCropComplete}
                onChange={handleCropChange}
                locked={false}
                aspect={1} // Keep the 1:1 aspect ratio for square cropping
                className="crop-area" // You can add styles here for a larger cropping area
              />
            )}
            <button onClick={handleCropAndResize}>Crop & Resize</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}

      {croppedImageUrl && (
        <div>
          <h3>Cropped Image:</h3>
          <img alt="Cropped" src={croppedImageUrl} />
        </div>
      )}
      {fileSizeError && <p>{fileSizeError}</p>}
    </div>
  );
};

export default ImageUploadWithCrop;
