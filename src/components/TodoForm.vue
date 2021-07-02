<template>
  <div v-if="loading">
    Loading...
  </div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <Input
          label="Subject"
          v-model:subject="todo.subject"
          :error="subjectError"
        />
      </div>

      <div v-if="editing" class="col-6">
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

      <div class="col-12">
        <div class="form-group">
          <label>Body</label>
          <textarea
            v-model="todo.body"
            class="form-control"
            id=""
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary" :disabled="!todoUpdated">
      {{ editing ? 'Update' : 'Create' }}
    </button>
    <button class="btn btn-outline-dark ml-2" @click="moveToTodoListPage">
      Cancel
    </button>
  </form>
  <transition name="fade">
    <Toast v-if="showToast" :message="messageToast" :type="toastAlertType" />
  </transition>
</template>

<script>
import axios from '@/axios';
import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';
import Input from '@/components/Input.vue';

export default {
  components: {
    Toast,
    Input,
  },
  props: {
    editing: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const todo = ref({
      subject: '',
      completed: false,
      body: '',
    });
    const subjectError = ref('');
    const originaltodo = ref(null);
    const loading = ref(false);
    const todoId = route.params.id;

    const {
      messageToast,
      toastAlertType,
      showToast,
      triggerToast,
    } = useToast();

    const getTodo = async () => {
      loading.value = true;
      try {
        const res = await axios.get(`todos/${todoId}`);
        todo.value = { ...res.data };
        originaltodo.value = { ...res.data };
        loading.value = false;
      } catch (error) {
        loading.value = false;
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

    if (props.editing) {
      getTodo();
    }

    const onSave = async () => {
      subjectError.value = '';
      if (!todo.value.subject) {
        subjectError.value = 'Subject is required';
        return;
      }
      try {
        let res;
        const data = {
          subject: todo.value.subject,
          completed: todo.value.completed,
          body: todo.value.body,
        };
        if (props.editing) {
          res = await axios.put(`todos/${todoId}`, data);
          originaltodo.value = { ...res.data };
        } else {
          res = await axios.post('todos', data);
          todo.value.subject = '';
          todo.value.body = '';
        }

        const message =
          'Successfully' + (props.editing ? 'Updated!' : 'Created!');
        triggerToast(message);

        if (!props.editing) {
          router.push({
            name: 'Todos',
          });
        }
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
      subjectError,
      todoUpdated,
      toggleTodoStatus,
      moveToTodoListPage,
      onSave,
    };
  },
};
</script>

<style scoped>
.text-red {
  color: red;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>
