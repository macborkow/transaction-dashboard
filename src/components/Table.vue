<template>
  <table>
    <caption> {{ title }} </caption>
    <thead>
      <tr>
        <th v-for="header in refinedHeaders" :key="header.name">
          {{ header.displayName }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in data" :key="row.id">
        <td v-for="(element, key) in row" :key="key">
          {{ element }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface RefinedHeader {
  name: string;
  displayName: string;
}

export default defineComponent({
  name: 'TableComponent',
  props: {
    data: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    sortable: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    refinedHeaders(): RefinedHeader[] {
      return Object.keys(this.data[0] as string[])
        .map((item: string) => ({
          name: `${item}`,
          displayName: `${item.charAt(0).toUpperCase() + item.slice(1)}`,
        }));
    },
  },
  mounted() {
    // console.log(this.data, this.refinedHeaders);
  },
});
</script>

<style scoped>
</style>
