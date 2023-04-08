<template>
  <nav>
    <span v-if='isAuthenticated'>
      <router-link to="/dashboard"> Dashboard </router-link> |
    </span>
    <router-link to="/"> {{ isAuthenticated ? 'User info' : 'Login' }} </router-link>
  </nav>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseLayout',
  data() {
    return {
      isAuthenticated: this.$auth0.isAuthenticated,
    };
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
