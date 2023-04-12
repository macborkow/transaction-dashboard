<template>
  <CustomerSearch @filtered=handleCustomerSearch :data=customers />
  <Table v-if='customers.length > 0'
    :data='this.filteredCustomers'
    title='Customers'
    :sortable=true
  />
  <Spinner v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Table from '@/components/Table.vue';
import Spinner from '@/components/Spinner.vue';
import CustomerSearch from '@/components/CustomerSearch.vue';
import { Customer } from '@/common/types';

export default defineComponent({
  name: 'CustomerList',
  components: {
    Table,
    Spinner,
    CustomerSearch,
  },
  data() {
    return {
      customers: [] as Array<Customer>,
      filteredCustomers: [] as Array<Customer>,
    };
  },
  async mounted() {
    const accessToken = await this.$auth0.getAccessTokenSilently();
    this.customers = await fetch(`${process.env.VUE_APP_API_SERVER_URL}/api/customers`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((r) => r.json())
      .then((body) => JSON.parse(body.data));
    this.filteredCustomers = this.customers;
  },
  methods: {
    handleCustomerSearch(filteredData : Array<Customer>) {
      this.filteredCustomers = filteredData;
    },
  },
});
</script>

<style scoped>
</style>
