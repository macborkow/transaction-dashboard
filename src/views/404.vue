<template>
  <div>
    <h2>Path not found.</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotFound',
});
</script>

<style scoped>
div {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
}
</style>
