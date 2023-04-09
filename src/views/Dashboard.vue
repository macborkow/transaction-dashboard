<template>
  <div class='dashboard' v-if='customers[0] && transactions[0]'>
    <Table v-if='!showTransactions'
      :data='this.customers'
      title='Customers'
      :sortable=true
    />
    <Table v-else
      :headers='Object.keys(this.transactions[0])'
      :data='this.transactions'
      title='Transactions'
    />
  </div>
  <Spinner v-else />
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Table from '@/components/Table.vue';
import Spinner from '@/components/Spinner.vue';

interface Customer {
  id: string;
  name: string;
  email: string;
}

interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  customerId: string;
}

export default defineComponent({
  components: {
    Table,
    Spinner,
  },
  name: 'HomeView',
  data() {
    return {
      customers: [] as Array<Customer>,
      transactions: [] as Array<Transaction>,
      showTransactions: false as boolean,
    };
  },
  async mounted() {
    this.customers = await fetch('http://localhost:3000/customers').then((r) => r.json());
    this.transactions = await fetch('http://localhost:3000/transactions').then((r) => r.json());
  },
});
</script>
