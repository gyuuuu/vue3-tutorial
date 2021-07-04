import { computed } from 'vue';
import { useStore } from 'vuex';

export const useToast = () => {
  const store = useStore();
  const messageToast = computed(() => store.getters.messageToastWithSmile);
  const toastAlertType = computed(() => store.state.toastAlertType);
  const showToast = computed(() => store.state.showToast);
  const triggerToast = (message, type = 'success') => {
    store.dispatch('triggerToast', message, type);
  };

  return {
    messageToast,
    toastAlertType,
    showToast,
    triggerToast,
  };
};
