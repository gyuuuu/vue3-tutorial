<template>
  <div class="name">
    {{ greeting(name) }}
  </div>
</template>

<script>
export default {
  setup(){
    const name = "Gyu";

    const greeting = (name) => {
      return 'Hello, ' + name;
    };

    return {
      name,
      greeting
    };
  }
}
</script>

<style>
  .name {
    color: blue;
  }
</style>