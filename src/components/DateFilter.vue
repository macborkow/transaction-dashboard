<template>
  <label for="dateFilter">Date Filter
    <input class='from' @change=filterData v-model=from type="date" />
    <input class='until' @change=filterData v-model=until type="date" />
  </label>
  <p> {{ error }} </p>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Transaction } from '@/common/types';

export default defineComponent({
  name: 'DateFilter',
  emits: ['filtered'],
  props: {
    data: {
      type: Array as PropType<Transaction[]>,
    },
  },
  data() {
    return {
      from: null,
      until: null,
    };
  },
  computed: {
    filteredData() {
      const from = this.from ? new Date(this.from).getTime() : 0;
      const until = this.until ? new Date(this.until).getTime() : Infinity;
      if (from < until) {
        return this.data?.filter((item) => {
          const time = new Date(item.date).getTime();
          return time > from && time < until;
        });
      }
      return [];
    },
    error() {
      const from = this.from ? new Date(this.from).getTime() : 0;
      const until = this.until ? new Date(this.until).getTime() : Infinity;
      if (from > until) {
        return 'Date from must be earlier than date until';
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
</style>
