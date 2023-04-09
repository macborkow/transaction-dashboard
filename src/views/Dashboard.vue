<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      customers: [],
      transactions: [],
    };
  },
  async mounted() {
    this.customers = await fetch('http://localhost:3000/customers').then((r) => r.json());
    this.transactions = await fetch('http://localhost:3000/transactions').then((r) => r.json());
  },
});
</script>
