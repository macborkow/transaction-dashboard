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
    this.customers = await fetch('http://localhost:3000/customers')
      .then((r) => r.json());
  },
});
</script>

<style scoped>
</style>
