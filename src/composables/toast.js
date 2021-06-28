import { ref, onUnmounted } from 'vue';

export const useToast = () => {
  const messageToast = ref('');
  const toastAlertType = ref('');
  const showToast = ref(false);
  const timeout = ref(null);
  const triggerToast = (message, type = 'success') => {
    messageToast.value = message;
    toastAlertType.value = type;
    showToast.value = true;
    timeout.value = setTimeout(() => {
      messageToast.value = '';
      toastAlertType.value = '';
      showToast.value = false;
    }, 3000);
  };

  onUnmounted(() => {
    console.log('unmounted');
    clearTimeout(timeout.value);
  });

  return {
    messageToast,
    toastAlertType,
    showToast,
    triggerToast,
  };
};
