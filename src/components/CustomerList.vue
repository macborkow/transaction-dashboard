<template>
  <Table v-if='customers.length > 0'
    :data='this.customers'
    title='Customers'
    :sortable=true
  />
  <Spinner v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Table from '@/components/Table.vue';
import Spinner from '@/components/Spinner.vue';
import { Customer } from '@/common/types';

export default defineComponent({
  name: 'CustomerList',
  components: {
    Table,
    Spinner,
  },
  data() {
    return {
      customers: [] as Array<Customer>,
    };
  },
  async mounted() {
    const accessToken = await this.$auth0.getAccessTokenSilently();
    this.customers = await fetch(`${process.env.VUE_APP_API_SERVER_URL}/customers`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((r) => r.json());
  },
});
</script>

<style scoped>
</style>
