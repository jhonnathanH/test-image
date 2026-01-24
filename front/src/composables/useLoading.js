import { ref } from 'vue';

const isLoading = ref(false);
const loadingMessage = ref('Cargando...');

export function useLoading() {
  const showLoading = (message = 'Cargando...') => {
    loadingMessage.value = message;
    isLoading.value = true;
  };

  const hideLoading = () => {
    isLoading.value = false;
  };

  return { isLoading, loadingMessage, showLoading, hideLoading };
}