import { computed, onUnmounted } from 'vue';
import { useStore } from 'vuex';

export const useToast = () => {
  const store = useStore();
  const messageToast = computed(() => store.state.messageToast);
  const toastAlertType = computed(() => store.state.toastAlertType);
  const showToast = computed(() => store.state.showToast);
  const timeout = computed(() => store.state.timeout);
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
