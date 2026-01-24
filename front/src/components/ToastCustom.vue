<template>
  <Teleport to="body">
    <Transition name="toast-fade">
      <div v-if="visible" class="custom-toast" :class="type">
        <div class="toast-content">
          <CheckCircle2 v-if="type === 'success'" :size="18" />
          <AlertCircle v-else-if="type === 'error'" :size="18" />
          <Info v-else :size="18" />

          <span class="message">{{ message }}</span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { CheckCircle2, AlertCircle, Info } from "lucide-vue-next";
import { useToast } from "../composables/useToast";

const { visible, message, type } = useToast();
</script>

<style scoped>
.custom-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 99999;
  background: #1e1e1e;
  color: #fff;
  padding: 12px 20px;
  border-radius: 8px;
  border: 1px solid #333;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  min-width: 250px;
}

.success {
  border-left: 4px solid #2ecc71;
}
.error {
  border-left: 4px solid #e74c3c;
}
.info {
  border-left: 4px solid #3498db;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.toast-fade-enter-from {
  transform: translateY(-20px) scale(0.9);
  opacity: 0;
}
.toast-fade-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
</style>
