<template>
  <DateFilter @filtered=handleFilteredData :data=transactions />
  <Table v-if='transactions.length > 0'
    :data='refinedData'
    title='Transactions'
  />
  <Spinner v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Table from '@/components/Table.vue';
import Spinner from '@/components/Spinner.vue';
import DateFilter from '@/components/DateFilter.vue';
import { Transaction } from '@/common/types';

export default defineComponent({
  name: 'TransactionList',
  components: {
    Table,
    Spinner,
    DateFilter,
  },
  data() {
    return {
      transactions: [] as Array<Transaction>,
      filteredTransactions: [] as Array<Transaction>,
    };
  },
  computed: {
    refinedData() : Array<Transaction> {
      const newData = this.filteredTransactions.map((item) => {
        const newItem = { ...item };
        delete newItem.customerId;
        return newItem;
      });
      return newData;
    },
  },
  methods: {
    handleFilteredData(filteredData : Array<Transaction>) {
      this.filteredTransactions = filteredData;
    },
  },
  async mounted() {
    this.transactions = await fetch('http://localhost:3000/transactions')
      .then((r) => r.json());
    this.filteredTransactions = this.transactions;
  },
});
</script>

<style scoped>
</style>
