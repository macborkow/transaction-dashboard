<template>
  <div class='dashboard'>
    <button @click='toggleShowTransactions'>
      Show {{ showTransactions ? 'customers' : 'transactions' }}
    </button>
    <CustomerList v-if='!showTransactions'/>
    <TransactionList v-else />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import CustomerList from '@/components/CustomerList.vue';
import TransactionList from '@/components/TransactionList.vue';

export default defineComponent({
  components: {
    CustomerList,
    TransactionList,
  },
  name: 'DashboardView',
  data() {
    return {
      showTransactions: false as boolean,
    };
  },
  methods: {
    toggleShowTransactions() {
      this.showTransactions = !this.showTransactions;
    },
  },
});
</script>

<style scoped>
  .dashboard {
  }
</style>
