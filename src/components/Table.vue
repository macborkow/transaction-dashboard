<template>
  <table>
    <caption> {{ title }} </caption>
    <thead>
      <tr>
        <th v-for="(header, index) in refinedHeaders" :key="header.name">
          {{ header.displayName }}
          <button @click=handleSortClick(index)
            v-if='sortable'>
            <span v-if='index === sortTarget'>
            {{ sortDescending === 1 ? '▲' : '▼' }}
            </span>
            <span v-else class='inactive'>▼</span>
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in refinedData" :key="row.id">
        <td v-for="(element, key) in row" :key="key">
          {{ element }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface RefinedHeader {
  name: string;
  displayName: string;
}

interface ObjectWithMixedProperties {
  [key: string]: string | number;
}

export default defineComponent({
  name: 'TableComponent',
  data() {
    return {
      sortTarget: -1 as number,
      sortDescending: -1 as number,
    };
  },
  props: {
    data: {
      type: Array as PropType<ObjectWithMixedProperties[]>,
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
  methods: {
    handleSortClick(index : number) {
      if (this.sortTarget === index) {
        this.sortDescending += 1;
      } else {
        this.sortDescending = 0;
      }
      this.sortTarget = index;
      if (this.sortDescending > 1) {
        this.sortDescending = -1;
        this.sortTarget = -1;
      }
    },
  },
  computed: {
    refinedHeaders(): RefinedHeader[] {
      if (!this.data[0]) {
        return [];
      }
      return Object.keys(this.data[0] as ObjectWithMixedProperties)
        .map((item: string) => ({
          name: `${item}`,
          displayName: `${item.charAt(0).toUpperCase() + item.slice(1)}`,
        }));
    },
    refinedData() {
      return this.data.slice()
        .sort((a: ObjectWithMixedProperties, b: ObjectWithMixedProperties) => {
          const valueA = Object.values(a)[this.sortTarget];
          const valueB = Object.values(b)[this.sortTarget];
          if (typeof valueA === 'number' && typeof valueB === 'number') {
            return this.sortDescending === 0 ? valueA - valueB : valueB - valueA;
          } if (typeof valueA === 'string' && typeof valueB === 'string') {
            return this.sortDescending === 0 ? valueA.localeCompare(valueB)
              : valueB.localeCompare(valueA);
          }
          return -1;
        });
    },
  },
  mounted() {
    // console.log(this.data, this.refinedHeaders);
  },
});
</script>

<style scoped>
.inactive {
  color: lightgray;
}
</style>
