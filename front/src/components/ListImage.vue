<template>
  <div class="list-container">
    <div v-if="history.length === 0">No hay subidas recientes.</div>
    <ImageModal
      :show="isModalOpen"
      :imageUrl="selectedUrl"
      :data="dataImagen"
      @close="isModalOpen = false"
    />
    <LogImage
      v-for="log in history"
      :key="log.id"
      :item="log"
      @view="openModal"
      @delete="handleDeleteRequest"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import LogImage from "./LogImage.vue";
import ImageModal from "./ImageModal.vue";
import { RestService } from "../services/rest.js";
import { useLoading } from "../composables/useLoading";
import { useToast } from "../composables/useToast";

const { showLoading, hideLoading } = useLoading();
const { notify } = useToast();
const history = ref([]);
const isLoading = ref(true);
const isModalOpen = ref(false);
const selectedUrl = ref("");
const dataImagen = ref(null);
const props = defineProps({
  newItem: {
    type: Object,
    default: null,
  },
});

onMounted(async () => {
  try {
    showLoading("Cargando datos...");
    const response = await RestService.getHistory();
    console.log("load", response);
    if (response.success) {
      history.value = response.data;
    } else {
      console.error("Error server", response.message);
    }
  } catch (error) {
    console.error("Error", error);
  } finally {
    isLoading.value = false;
    hideLoading();
  }
});

watch(
  () => props.newItem,
  (newVal) => {
    if (newVal) {
      history.value.unshift(newVal);
    }
  },
);

const openModal = (item) => {
  console.log("view", item);
  selectedUrl.value = item.url;
  dataImagen.value = item.data;
  isModalOpen.value = true;
};

const handleDeleteRequest = async (id) => {
  const confirmed = confirm("¿Estás seguro de eliminar este registro?");
  if (!confirmed) return;

  showLoading("Eliminando de la base de datos...");

  try {
    await RestService.deleteImage(id);
    history.value = history.value.filter((item) => item.id !== id);
    notify("Eliminado con éxito");
  } catch (error) {
    alert("Error al eliminar");
  } finally {
    hideLoading();
  }
};
</script>

<style scoped>
.list-container {
  max-height: 600px;
  overflow-y: auto;
}
.list-container::-webkit-scrollbar-track {
  background: #1e1e1e;
  border-radius: 10px;
  padding-left: 10px;
  margin-left: 10px;
}
.list-container::-webkit-scrollbar {
  width: 8px;
}
.list-container::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 10px;
}
</style>
