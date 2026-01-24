import { ref } from 'vue';

const visible = ref(false);
const message = ref('');
const type = ref('success');

export function useToast() {
  const notify = (msg, toastType = 'success', duration = 3000) => {
    message.value = msg;
    type.value = toastType;
    visible.value = true;

    setTimeout(() => {
      visible.value = false;
    }, duration);
  };

  return { visible, message, type, notify };
}