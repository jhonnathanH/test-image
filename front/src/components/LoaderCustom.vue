<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isLoading" class="overlay">
        <div class="loader-content">
          <Loader2 class="spin" :size="48" />
          <p>{{ loadingMessage }}</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { Loader2 } from "lucide-vue-next";
import { useLoading } from "../composables/useLoading";

const { isLoading, loadingMessage } = useLoading();
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
}

.loader-content {
  text-align: center;
  color: white;
}

.spin {
  animation: rotate 1s linear infinite;
  color: #4ade80;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
