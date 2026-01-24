<script setup>
import { ref } from "vue";

import { useLoading } from "./composables/useLoading";
import { useToast } from "./composables/useToast";

import ImageTest from "./components/ImageTest.vue";
import ListImage from "./components/ListImage.vue";
import LoaderCustom from "./components/LoaderCustom.vue";
import ToastCustom from "./components/ToastCustom.vue";

import { RestService } from "./services/rest";

const newItem = ref(null);
const { showLoading, hideLoading } = useLoading();
const { notify } = useToast();

const processImage = async (file) => {
  console.log("Procesando imagen:", file);
  showLoading("Subiendo imagen...");
  const response = await RestService.uploadImage(file);
  if (response.success) {
    newItem.value = response.data;
    notify("¡Imagen guardada con éxito!", "success");
  } else {
    console.error("Error updating:", response.message);
    alert("Error: " + response.message);
  }
  hideLoading();
};
</script>

<template>
  <ToastCustom />
  <LoaderCustom />
  <div class="container">
    <div class="div-1">
      <h2>Procesador de Imágenes</h2>
      <ImageTest @on-upload="processImage" />
    </div>
    <div class="div-2">
      <h2>Historial de Procesamiento</h2>
      <ListImage :newItem="newItem" />
    </div>
  </div>
</template>

<style>
.container {
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;
  font-family: sans-serif;
  display: flex;
  justify-items: center;
}
.div-1,
.div-2 {
  width: 50%;
  padding: 20px;
}
</style>
