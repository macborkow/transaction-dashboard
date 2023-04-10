<template>
  <label for="dateFilter">Date Filter
    <input @change=filterData v-model=from type="date" />
    <input @change=filterData v-model=until type="date" />
  </label>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Transaction } from '@/common/types';

export default defineComponent({
  name: 'DateFilter',
  props: {
    data: {
      type: Array as PropType<Transaction[]>,
    },
  },
  data() {
    return {
      from: '',
      until: '',
    };
  },
  computed: {
    filteredData() {
      if (this.from && this.until) {
        const from = new Date(this.from).getTime();
        const until = new Date(this.until).getTime();
        console.log(from, until);
        return this.data?.filter((item) => {
          const time = new Date(item.date).getTime();
          console.log(time);
          return time > from && time < until;
        });
      }
      return this.data;
    },
  },
  methods: {
    filterData() {
      console.log(this.filteredData);
      this.$emit('filtered', this.filteredData);
    },
  },
});
</script>

<style scoped>
</style>
