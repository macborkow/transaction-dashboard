<template>
  <div v-if="lastPage > 0">
  <nav class="flex" v-if="lastPage > 0">
    <nav class="cluster">
      <button class="secondary" v-if="currentPage > 1" @click="changePage(0, false)">
      &lt;&lt;
      </button>
      <button class="secondary" v-if="currentPage > 0" @click=changePage(-1)>
      &lt;
      </button>
    </nav>
    <nav>
      <button v-for="(item, index) in quickNavigationPages"
      :class='currentPage === item ? "contrast" : "secondary"'
      v-bind:key=index @click="changePage(item, false)">
        {{ item + 1 }}
      </button>
    </nav>
    <nav class="cluster">
      <button class="secondary" v-if="currentPage < lastPage" @click=changePage(1)>
      &gt;
      </button>
      <button class="secondary" v-if="currentPage < lastPage - 1"
      @click="changePage(lastPage, false)">
      &gt;&gt;
      </button>
    </nav>
  </nav>
  <progress :value="currentPage" :max="lastPage"></progress>
  <p> {{ currentPage + 1 }}/{{ lastPage + 1 }} </p>
  </div>
  <label for="amountRows">Rows to show
    <select @change=updateRows name="amountRows">
      <option value=5>5</option>
      <option value=10>10</option>
    </select>
  </label>
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
      return this.data?.slice(start, end);
    },
    lastPage() {
      if (this.data) {
        return Math.floor((this.data.length - 1) / this.numberOfRows);
      }
      return 0;
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
        if (this.currentPage > this.lastPage) {
          this.currentPage = this.lastPage;
        } else if (this.currentPage < 0) {
          this.currentPage = 0;
        }
        this.truncate();
      },
    },
  },
  methods: {
    updateRows(event : Event) {
      const eventTarget = event.target as HTMLInputElement;
      const newValue = parseInt(eventTarget.value, 10);
      const preservedRatio = this.numberOfRows / newValue;
      const newCurrentPage = this.currentPage * preservedRatio;
      this.currentPage = Math.floor(newCurrentPage);
      this.numberOfRows = newValue;
      this.truncate();
    },
    changePage(howMuch : number, relative = true) {
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
nav {
  margin-bottom: 1vh;
}
button {
  margin: 0 0.1vw;
  width: max-content;
  transform: scale(0.8);
}
.cluster {
  minwidth: 5vw;
}
.flex {
  display: flex;
  justify-content: space-between;
}
select {
  width: max-content;
}
</style>
