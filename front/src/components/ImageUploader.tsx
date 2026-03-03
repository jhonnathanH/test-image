import React from 'react';
import styled from 'styled-components';

const StyledImageUploader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px dashed #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const StyledButton = styled.button`
  background-color: #4169E1; /* Azul Rey */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    opacity: 0.8;
  }
`;

interface ImageUploaderProps {
  onImageSelected: (image: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelected(file);
    }
  };

  return (
    <StyledImageUploader>
      <label htmlFor="image-upload">
        <StyledButton>Seleccionar Imagen</StyledButton>
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
    </StyledImageUploader>
  );
};

export default ImageUploader;