<template>
  <main class="container">
  <nav class="grid" v-if='checkRoute && !isLoading'>
    <span v-if='isAuthenticated'>
      <router-link role="button" class="outline"
      :class="currentRoute === 'dashboard' ? 'contrast' : 'secondary'"
      to="/dashboard"> Dashboard </router-link>
      <router-link role="button" class="outline"
      :class="currentRoute === 'login' ? 'contrast' : 'secondary'"
      to="/user"> User Profile </router-link>
    </span>
  </nav>
  <Spinner abs v-else-if='checkRoute && isLoading' />
  <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Spinner from '@/components/Spinner.vue';

export default defineComponent({
  name: 'BaseLayout',
  components: {
    Spinner,
  },
  data() {
    return {
      isAuthenticated: this.$auth0.isAuthenticated,
      isLoading: this.$auth0.isLoading,
    };
  },
  computed: {
    checkRoute() {
      const viableRoutes = ['login', 'dashboard'];
      return viableRoutes.find((item) => item === this.$route.name);
    },
    currentRoute() {
      return this.$route.name;
    },
  },
});
</script>

<style scoped>
span {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
span * {
  margin: 2vh 0;
  font-size: 2vh;
}
</style>
