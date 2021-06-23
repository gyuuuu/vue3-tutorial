<template>
  <div class="name">{{ name }}</div>
</template>

<script>
export default {
  setup(){
    const name = "Gyu";

    return {
      name
    };
  }
}
</script>

<style>
  .name {
    color: blue;
  }
</style>