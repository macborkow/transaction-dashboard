<template>
  <span v-if='customers.length > 0'>
    <Table
      :data='this.filteredCustomers'
      title='Customers'
      :sortable=true
    />
    <CustomerSearch @filtered=handleCustomerSearch :data=customers />
  </span>
  <Spinner v-else-if=!error />
  <Error v-if=error :message=error />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Table from '@/components/Table.vue';
import Spinner from '@/components/Spinner.vue';
import CustomerSearch from '@/components/CustomerSearch.vue';
import { Customer } from '@/common/types';
import apiCall from '@/services/api.service';
import Error from '@/components/Error.vue';

export default defineComponent({
  name: 'CustomerList',
  components: {
    Table,
    Spinner,
    CustomerSearch,
    Error,
  },
  data() {
    return {
      customers: [] as Array<Customer>,
      filteredCustomers: [] as Array<Customer>,
      error: '' as string,
    };
  },
  async mounted() {
    await this.fetchCustomers();
  },
  methods: {
    async fetchCustomers() {
      const response = await apiCall<Customer>({ endpoint: 'customers', token: this.$auth0.getAccessTokenSilently() });
      if (response.data) {
        this.customers = response.data;
        this.filteredCustomers = this.customers;
      } else {
        this.customers = [];
        this.error = response.error as string;
      }
    },
    handleCustomerSearch(filteredData : Array<Customer>) {
      this.filteredCustomers = filteredData;
    },
  },
});
</script>

<style scoped>
</style>
