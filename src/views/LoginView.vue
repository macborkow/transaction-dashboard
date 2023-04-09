<template>
  <div>
    <div v-if='!isAuthenticated'>
      <button v-if="!isLoading" @click="login">Log in</button>
      <Spinner abs v-else />
    </div>
    <div v-if='isAuthenticated && !wasLoading'>
      <button @click="logout">Log out</button>
      <pre>
        <code>{{ user }}</code>
      </pre>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Spinner from '@/components/Spinner.vue';

export default defineComponent({
  components: {
    Spinner,
  },
  data() {
    return {
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
      isLoading: this.$auth0.isLoading,
      wasLoading: false,
    };
  },
  watch: {
    isAuthenticated() {
      if (this.wasLoading) {
        this.$router.push('/dashboard');
      }
    },
  },
  mounted() {
    if (this.isLoading) {
      this.wasLoading = true;
    }
  },
  methods: {
    login() {
      this.$auth0.loginWithRedirect({
        appState: {
          target: '/dashboard',
        },
      });
    },
    logout() {
      this.$auth0.logout({ logoutParams: { returnTo: window.location.origin } });
    },
  },
});
</script>
