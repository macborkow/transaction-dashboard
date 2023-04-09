<template>
  <Spinner abs />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Spinner from '@/components/Spinner.vue';

export default defineComponent({
  name: 'CallbackView',
  components: {
    Spinner,
  },
});
</script>
