<template>
  <label for="amountFilter">Amount Filter
    <span class="grid">
      <input @input=filterData v-model=from type="number" />
      <input @input=filterData v-model=to type="number" />
    </span>
  </label>
  <p> {{ error }} </p>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Transaction } from '@/common/types';

export default defineComponent({
  name: 'AmountFilter',
  emits: ['filtered'],
  props: {
    data: {
      type: Array as PropType<Transaction[]>,
    },
  },
  data() {
    return {
      from: null,
      to: null,
    };
  },
  computed: {
    filteredData() {
      const to = this.to ? this.to : Infinity;
      const from = this.from ? this.from : 0;
      if (to > from) {
        return this.data?.filter((item) => {
          const { amount } = item;
          return amount > from && amount < to;
        });
      }
      return this.data;
    },
    error() {
      const from = this.from ? this.from : 0;
      const to = this.to ? this.to : Infinity;
      if (from > to) {
        return 'First amount must be lower than second amount.';
      }
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
p {
  text-align: center;
}
</style>
