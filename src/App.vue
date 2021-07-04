<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" :to="{ name: 'Home' }">
      Gyu
    </router-link>

    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" :to="{ name: 'Todos' }"
          >Todos
        </router-link>
      </li>
    </ul>
  </nav>
  <div class="container">
    <router-view />
  </div>
  <transition name="slide">
    <Toast v-if="showToast" :message="messageToast" :type="toastAlertType" />
  </transition>
</template>

<script>
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';

export default {
  components: {
    Toast,
  },

  setup() {
    const {
      messageToast,
      toastAlertType,
      showToast,
      triggerToast,
    } = useToast();

    return {
      messageToast,
      toastAlertType,
      showToast,
      triggerToast,
    };
  },
};
</script>

<style scoped>
.text-red {
  color: red;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>
