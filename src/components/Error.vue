<template>
  <div class="flex">
    <aside class="box">
      <h3>Error</h3>
      <p>{{ message }}</p>
      <button @click="this.$router.push('/')">Go back</button>
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ErrorComponent',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.flex {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
}

.box {
  width: 20vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: black 3px solid;
  z-index: 0;
}
button {
  margin: 2vh;
}
</style>
