<template>
  <DateFilter @filtered=handleDateFilteredData :data=transactions />
  <AmountFilter @filtered=handleAmountFilteredData :data=transactions />
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
import AmountFilter from '@/components/AmountFilter.vue';
import { Transaction } from '@/common/types';

export default defineComponent({
  name: 'TransactionList',
  components: {
    Table,
    Spinner,
    DateFilter,
    AmountFilter,
  },
  data() {
    return {
      transactions: [] as Array<Transaction>,
      dateFilteredTransactions: [] as Array<Transaction>,
      amountFilteredTransactions: [] as Array<Transaction>,
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
    filteredTransactions() : Array<Transaction> {
      return this.amountFilteredTransactions
        .filter((item : Transaction) => this.dateFilteredTransactions.includes(item));
    },
  },
  methods: {
    handleDateFilteredData(filteredData : Array<Transaction>) {
      this.dateFilteredTransactions = filteredData;
    },
    handleAmountFilteredData(filteredData : Array<Transaction>) {
      this.amountFilteredTransactions = filteredData;
    },
  },
  async mounted() {
    this.transactions = await fetch('http://localhost:3000/transactions')
      .then((r) => r.json());
    this.amountFilteredTransactions = this.transactions;
    this.dateFilteredTransactions = this.transactions;
  },
});
</script>

<style scoped>
</style>
