<template>
  <label for="searchCustomer">Search Customer
    <input @input=filterData v-model=search type="text" />
  </label>
  <p> {{ error }} </p>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Customer } from '@/common/types';

export default defineComponent({
  name: 'CustomerSearch',
  emits: ['filtered'],
  props: {
    data: {
      type: Array as PropType<Customer[]>,
    },
  },
  data() {
    return {
      search: null,
    };
  },
  computed: {
    filteredData() {
      return this.data;
    },
    error() {
      return '';
    },
  },
  methods: {
    filterData() {
      this.$emit('filtered', this.filteredData);
    },
  },
});
</script>

<style scoped>
</style>
