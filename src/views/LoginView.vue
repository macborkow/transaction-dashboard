<template>
  <div>
    <button v-if="!isAuthenticated" @click="login">Log in</button>
    <button v-if="isAuthenticated" @click="logout">Log out</button>
    <pre>
      <code>{{ user }}</code>
    </pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
    };
  },
  methods: {
    login() {
      this.$auth0.loginWithRedirect();
    },
    logout() {
      this.$auth0.logout({ logoutParams: { returnTo: window.location.origin } });
    },
  },
};
</script>
