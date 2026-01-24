<template>
  <div class="log-item">
    <div class="info-section">
      <div class="img-container">
        <img v-if="item.url" :src="item.url" alt="test" />
        <ImageIcon v-else :size="20" color="#666" />
      </div>

      <div class="text-data" v-if="item.data">
        <div class="meta-row">
          <span class="badge size">
            <span class="label">W</span> {{ item.data.width }}
          </span>
          <span class="badge size">
            <span class="label">H</span> {{ item.data.height }}
          </span>
        </div>

        <div class="meta-row color-row">
          <div
            class="color-preview"
            :style="{
              backgroundColor: `rgb(${item.data.dominant_rgb.r}, ${item.data.dominant_rgb.g}, ${item.data.dominant_rgb.b})`,
            }"
          ></div>
          <span class="rgb-values">
            {{ item.data.dominant_rgb.r }}, {{ item.data.dominant_rgb.g }},
            {{ item.data.dominant_rgb.b }}
          </span>
        </div>
      </div>
    </div>

    <div class="actions">
      <button class="btn-action view" @click="emit('view', item)">
        <Eye :size="18" />
      </button>
      <button class="btn-action delete" @click="emit('delete', item.id)">
        <Trash2 :size="18" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Eye, Trash2, ImageIcon } from "lucide-vue-next";

const props = defineProps<{
  item: {
    id: string;
    data: {
      width: number;
      height: number;
      dominant_rgb: {
        r: number;
        g: number;
        b: number;
      };
    };
    url?: string;
  };
}>();

const emit = defineEmits(["view", "delete"]);
</script>

<style scoped>
.log-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  border-radius: 12px;
  border: 1px solid #333;
  margin-bottom: 8px;
  margin-right: 4px;
}

.img-container {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.log-item .actions {
  display: flex;
}

.img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btn-action {
  background: transparent;
  border: none;
  color: #888;
  padding: 8px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.view:hover {
  color: #fff;
  background: #333;
}
.delete:hover {
  color: #ff4444;
  background: #331a1a;
}

.info-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.text-data {
  display: flex;
  gap: 6px;
  flex: 1;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.badge {
  background: #2a2a2a;
  border: 1px solid #3d3d3d;
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 0.8rem;
  color: #ccc;
  min-width: 64px;
}

.badge .label {
  color: #888;
  font-weight: bold;
  margin-right: 4px;
  font-size: 0.7rem;
}

.color-row {
  font-size: 0.75rem;
  color: #888;
  margin-left: 6px;
}

.color-preview {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #444;
}

.rgb-values {
  letter-spacing: 0.5px;
}
</style>
