<template>
  <Table v-if='transactions.length > 0'
    :data='this.transactions'
    title='Transactions'
  />
  <Spinner v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Table from '@/components/Table.vue';
import Spinner from '@/components/Spinner.vue';

interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  customerId: string;
}

export default defineComponent({
  name: 'TransactionList',
  components: {
    Table,
    Spinner,
  },
  data() {
    return {
      transactions: [] as Array<Transaction>,
    };
  },
  async mounted() {
    this.transactions = await fetch('http://localhost:3000/transactions')
      .then((r) => r.json());
  },
});
</script>

<style scoped>
</style>
