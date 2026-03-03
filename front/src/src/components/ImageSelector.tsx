import React from 'react';
import './ImageSelector.css';

interface ImageSelectorProps {
  onImageSelected: (image: File) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ onImageSelected }) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelected(file);
    }
  };

  return (
    <div className="image-selector-container">
      <input
        type="file"
        id="image-input"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="image-input" className="select-image-button">Seleccionar Imagen</label>
    </div>
  );
};

export default ImageSelector;