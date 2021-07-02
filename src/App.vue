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
  <Toast v-if="showToast" :message="messageToast" :type="toastAlertType" />
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

<style>
.todo {
  color: gray;
  text-decoration: line-through;
}
</style>
