<template>
  <Teleport to="body">
    <Transition name="fade-modal">
      <div v-if="show" class="modal-overlay" @click.self="emit('close')">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="title">{{ title || "Detalle de imagen" }}</h3>
            <!-- width, height RGB promedio -->
            <div class="data-imagen">
              <span v-if="data" class="badge size">
                <span class="label">Width</span> {{ data.width }}
              </span>
              <span v-if="data" class="badge size">
                <span class="label">Height</span> {{ data.height }}
              </span>
              <span v-if="data" class="badge size">
                <div
                  class="color-preview"
                  :style="{
                    backgroundColor: `rgb(${data.dominant_rgb.r}, ${data.dominant_rgb.g}, ${data.dominant_rgb.b})`,
                  }"
                ></div>
                <span class="label">RGB promedio</span>
                ({{ data.dominant_rgb.r }}, {{ data.dominant_rgb.g }},
                {{ data.dominant_rgb.b }})
              </span>
            </div>
            <button class="close-btn" @click="emit('close')">
              <X :size="20" />
            </button>
          </div>
          <div class="modal-body">
            <img :src="imageUrl" alt="Detalle" class="full-image" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { X } from "lucide-vue-next";

defineProps({
  show: { type: Boolean, required: true },
  imageUrl: { type: String, required: true },
  data: { type: Object, default: null },
  title: { type: String, default: "" },
});

const emit = defineEmits(["close"]);
</script>

<style scoped>
.title {
  margin: 0;
  color: #757373;
  font-size: 1.2rem;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  backdrop-filter: blur(8px);
}

.modal-content {
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
}

.modal-header {
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #333;
}

.close-btn {
  background: transparent;
  border: none;
  color: #888;
  cursor: pointer;
}

.close-btn:hover {
  color: #fff;
}

.modal-body {
  padding: 10px;
  display: flex;
  justify-content: center;
  max-height: 80vh;
}

.full-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 4px;
}

.fade-modal-enter-active,
.fade-modal-leave-active {
  transition: opacity 0.3s ease;
}
.fade-modal-enter-from,
.fade-modal-leave-to {
  opacity: 0;
}

.data-imagen {
  display: flex;
  gap: 12px;
  margin-left: 20px;
}

.badge {
  background: #2a2a2a;
  border: 1px solid #3d3d3d;
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 0.8rem;
  color: #ccc;
}

.badge .label {
  color: #888;
  font-weight: bold;
  margin-right: 4px;
  font-size: 0.7rem;
}

.color-preview {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #444;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  vertical-align: bottom;
}
</style>
