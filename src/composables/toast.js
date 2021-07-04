import { computed } from 'vue';
import { useStore } from 'vuex';

export const useToast = () => {
  const store = useStore();
  const messageToast = computed(
    () => store.getters['toast/messageToastWithSmile']
  );
  const toastAlertType = computed(() => store.state.toast.toastAlertType);
  const showToast = computed(() => store.state.toast.showToast);
  const triggerToast = (message, type = 'success') => {
    store.dispatch('toast/triggerToast', message, type);
  };

  return {
    messageToast,
    toastAlertType,
    showToast,
    triggerToast,
  };
};
