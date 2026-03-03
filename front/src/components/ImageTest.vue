<template>
  <div class="upload-box">
    <input
      type="file"
      ref="fileInput"
      class="hidden-input"
      @change="handleFile"
      accept="image/*"
    />

    <div v-if="previewUrl" class="preview-box">
      <div class="div-preview-img">
        <img :src="previewUrl" alt="Vista previa" />
      </div>

      <button @click="processImage" class="btn-send">Enviar</button>
      <button @click="resetImage" class="btn-remove">Eliminar</button>
    </div>

    <div v-else class="upload-controls">
      <button @click="triggerSelect" class="btn-upload">
        Seleccionar Imagen
      </button>
      <p style="padding-top: 10px">Formatos aceptados: JPG, PNG</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["on-upload"]);

const fileInput = ref(null);
const previewUrl = ref(null);
const selectedFile = ref(null);

const triggerSelect = () => {
  fileInput.value.click();
};

const handleFile = (event) => {
  const file = event.target.files[0];
  if (file) {
    previewUrl.value = URL.createObjectURL(file);
    selectedFile.value = file;
  }
};

const processImage = async () => {
  if (!selectedFile.value) return;
  await emit("on-upload", selectedFile.value);
  resetImage();
};

const resetImage = () => {
  previewUrl.value = null;
  selectedFile.value = null;
  if (fileInput.value) fileInput.value.value = "";
};
</script>

<style scoped>
.upload-box {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  min-height: 340px;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
}

.hidden-input {
  display: none;
}

.div-preview-img {
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
}

.preview-box img {
  max-width: 100%;
  max-height: 260px;
  border-radius: 8px;
  display: block;
  margin: auto;
}

.upload-container {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  border-radius: 12px;
}

.btn-upload {
  background-color: #8B8000; /* Dark Yellow */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.btn-upload:hover {
  opacity: 0.8;
}

.btn-send {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

.btn-send:hover {
  opacity: 0.8;
}

.btn-remove {
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

.btn-remove:hover {
  opacity: 0.8;
}
</style>
