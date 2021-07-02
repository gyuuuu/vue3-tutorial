import { createStore } from 'vuex';

export default createStore({
  state: {
    messageToast: '',
    toastAlertType: '',
    showToast: false,
    timeout: null,
  },
});
