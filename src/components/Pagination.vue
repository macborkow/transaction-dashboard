<template>
  <nav v-if="lastPage > 0">
  <button v-if="currentPage > 1" @click="changePage(0, false)">
  ◄◄
  </button>
  <button v-if="currentPage > 0" @click=changePage(-1)>
  ◄
  </button>
  <button v-for="item in quickNavigationPages" v-bind:key=item.id @click="changePage(item, false)">
    {{ item + 1 }}
  </button>
  <button v-if="currentPage < lastPage" @click=changePage(1)>
  ►
  </button>
  <button v-if="currentPage < lastPage - 1" @click="changePage(lastPage, false)">
  ►►
  </button>
  </nav>
  <label for="amountRows">Rows to show
    <select @change=updateRows name="amountRows">
      <option value=5>5</option>
      <option value=10>10</option>
    </select>
  </label>
  <p> {{ currentPage + 1 }}/{{ lastPage + 1 }} </p>
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
      return this.data.slice(start, end);
    },
    lastPage() {
      return Math.floor((this.data.length - 1) / this.numberOfRows);
    },
    quickNavigationPages() {
      const from = Math.max(this.currentPage - 2, 0);
      const to = Math.min(this.currentPage + 2, this.lastPage);
      const output = [];
      for (let i = from; i <= to; i += 1) {
        output.push(i);
      }
      return output;
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
    updateRows(event) {
      const newValue = parseInt(event.target.value, 10);
      const preservedRatio = this.numberOfRows / newValue;
      const newCurrentPage = this.currentPage * preservedRatio;
      this.currentPage = Math.floor(newCurrentPage);
      this.numberOfRows = newValue;
      this.truncate();
    },
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
