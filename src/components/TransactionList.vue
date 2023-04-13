<template>
  <DateFilter @filtered=handleDateFilteredData :data=transactions />
  <AmountFilter @filtered=handleAmountFilteredData :data=transactions />
  <Table v-if='transactions.length > 0'
    :data='refinedData'
    title='Transactions'
  />
  <Spinner v-else-if=!error />
  <Error v-if=error :message=error />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Table from '@/components/Table.vue';
import Spinner from '@/components/Spinner.vue';
import DateFilter from '@/components/DateFilter.vue';
import AmountFilter from '@/components/AmountFilter.vue';
import { Transaction } from '@/common/types';
import apiCall from '@/services/api.service';
import Error from '@/components/Error.vue';

export default defineComponent({
  name: 'TransactionList',
  components: {
    Table,
    Spinner,
    DateFilter,
    AmountFilter,
    Error,
  },
  data() {
    return {
      transactions: [] as Array<Transaction>,
      dateFilteredTransactions: [] as Array<Transaction>,
      amountFilteredTransactions: [] as Array<Transaction>,
      error: '' as string,
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
    async fetchTransactions() {
      const response = await apiCall<Transaction>({ endpoint: 'transactions', token: this.$auth0.getAccessTokenSilently() });
      if (response.data) {
        this.transactions = response.data;
        this.amountFilteredTransactions = this.transactions;
        this.dateFilteredTransactions = this.transactions;
      } else {
        this.transactions = [];
        this.error = response.error as string;
      }
    },
    handleDateFilteredData(filteredData : Array<Transaction>) {
      this.dateFilteredTransactions = filteredData;
    },
    handleAmountFilteredData(filteredData : Array<Transaction>) {
      this.amountFilteredTransactions = filteredData;
    },
  },
  async mounted() {
    await this.fetchTransactions();
  },
});
</script>

<style scoped>
</style>
