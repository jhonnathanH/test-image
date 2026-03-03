import React from 'react';

interface ImageSelectorProps {
  onImageSelect: (image: File) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ onImageSelect }) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        id="image-input"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="image-input">
        <button
          style={{
            backgroundColor: 'rgb(65, 105, 225)',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Seleccionar Imagen
        </button>
      </label>
    </div>
  );
};

export default ImageSelector;