<template>
  <h1>To-Do Page</h1>
  <div v-if="loading">
    Loading...
  </div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>Subject</label>
          <input v-model="todo.subject" type="text" class="form-control" />
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label>Status</label>
          <div>
            <button
              class="btn"
              type="button"
              :class="todo.completed ? 'btn-success' : 'btn-danger'"
              @click="toggleTodoStatus"
            >
              {{ todo.completed ? 'Completed' : 'Incompleted' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary" :disabled="!todoUpdated">
      Save
    </button>
    <button class="btn btn-outline-dark ml-2" @click="moveToTodoListPage">
      Cancel
    </button>
  </form>
  <Toast v-if="showToast" :message="messageToast" :type="toastAlertType" />
</template>

<script>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';

export default {
  components: {
    Toast,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const todo = ref(null);
    const originaltodo = ref(null);
    const loading = ref(true);
    const messageToast = ref('');
    const toastAlertType = ref('');
    const showToast = ref(false);
    const todoId = route.params.id;

    const getTodo = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
        todo.value = { ...res.data };
        originaltodo.value = { ...res.data };
        loading.value = false;
      } catch (error) {
        console.log(error);
        triggerToast('Something went wrong', 'danger');
      }
    };

    const todoUpdated = computed(() => {
      return !_.isEqual(todo.value, originaltodo.value);
    });

    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed;
    };

    const moveToTodoListPage = () => {
      router.push({
        name: 'Todos',
      });
    };

    getTodo();

    const triggerToast = (message, type = 'success') => {
      messageToast.value = message;
      toastAlertType.value = type;
      showToast.value = true;
      setTimeout(() => {
        messageToast.value = '';
        toastAlertType.value = '';
        showToast.value = false;
      }, 3000);
    };

    const onSave = async () => {
      try {
        const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
          subject: todo.value.subject,
          completed: todo.value.completed,
        });

        originaltodo.value = { ...res.data };
        triggerToast('Successfully saved!!');
      } catch (error) {
        console.log(error);
        triggerToast('Something went wrong', 'danger');
      }
    };

    return {
      loading,
      showToast,
      messageToast,
      toastAlertType,
      todo,
      todoUpdated,
      toggleTodoStatus,
      moveToTodoListPage,
      onSave,
    };
  },
};
</script>

<style></style>
