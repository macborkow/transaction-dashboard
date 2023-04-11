<template>
  <nav v-if='checkRoute && !isLoading'>
    <span v-if='isAuthenticated'>
      <router-link to="/dashboard"> Dashboard </router-link> |
      <router-link to="/user"> User Info </router-link>
    </span>
  </nav>
  <Spinner abs v-else-if='checkRoute && isLoading' />
  <router-view />
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
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
