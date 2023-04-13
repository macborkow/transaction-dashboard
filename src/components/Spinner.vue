<template>
  <div :class='abs ? "flex abs" : "flex noabs"'>
    <div class="enlarge" aria-busy="true"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SpinnerComponent',
  props: {
    abs: {
      type: Boolean,
      required: false,
    },
  },
});
</script>

<style scoped>
.enlarge {
  transform: scale(2.0);
}
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.noabs {
  padding: 3vh;
}
.abs {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}
</style>
