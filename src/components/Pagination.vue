<template>
  <button @click="changePage(0, false)">
  ◄◄
  </button>
  <button @click=changePage(-1)>
  ◄
  </button>
  <button @click=changePage(1)>
  ►
  </button>
  <button @click="changePage(lastPage, false)">
  ►►
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PaginationComponent',
  emits: ['truncated'],
  props: {
    data: {
      type: Array,
    },
  },
  data() {
    return {
      numberOfRows: 5,
      currentPage: 0,
    };
  },
  computed: {
    visibleData() {
      const start = this.numberOfRows * this.currentPage;
      const end = start + this.numberOfRows;
      console.log(this.data.slice(start, end));
      return this.data.slice(start, end);
    },
    lastPage() {
      return Math.floor((this.data.length - 1) / this.numberOfRows);
    },
  },
  watch: {
    data: {
      immediate: true,
      handler() {
        this.truncate();
      },
    },
  },
  methods: {
    changePage(howMuch, relative = true) {
      if (relative) {
        this.currentPage += howMuch;
      } else {
        this.currentPage = howMuch;
      }
      if (this.currentPage > this.lastPage) {
        this.currentPage = this.lastPage;
      } else if (this.currentPage < 0) {
        this.currentPage = 0;
      }
      this.truncate();
    },
    truncate() {
      this.$emit('truncated', this.visibleData);
    },
  },
});
</script>

<style scoped>
</style>
