<template>
  <div class="name">
    {{ name }}
  </div>
  <button 
    class="btn btn-primary"
    v-on:click="updateName"
  >
  Click
  </button>
</template>

<script>
export default {
  setup(){
    let name = "Gyu";

    // const greeting = (name) => {
    //   return 'Hello, ' + name;
    // };

    const updateName = () => {
      name = 'Gyuuuu';
      console.log(name);
    }

    return {
      name,
      updateName
    };
  }
}
</script>

<style>
  .name {
    color: blue;
  }
</style>