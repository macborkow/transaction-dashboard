<template>
  <div>
    <button @click="login">Log in</button>
    <button @click="logout">Log out</button>
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
