<template>
  <div>
    <button v-if="!isAuthenticated" @click="login">Log in</button>
    <button v-if="isAuthenticated" @click="logout">Log out</button>
    <pre>
      <code>{{ user }}</code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
    };
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
