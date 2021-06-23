<template>
  <div :class="nameClass">
    {{ name }}
  </div>
  <input :type="type" :value="name">
  <button 
    class="btn btn-primary"
    @click="updateName"
  >
  Click
  </button>
</template>

<script>
import  { ref } from 'vue';

export default {
  setup(){
    const name = ref('Gyu');
    const type = ref('number');
    const nameClass = ref('');

    const updateName = () => {
      name.value = 'Gyuuuu';
      type.value = 'text';
    }

    return {
      name,
      updateName,
      type,
      nameClass
    };
  }
}
</script>

<style>
  .name {
    color: blue;
  }
</style>