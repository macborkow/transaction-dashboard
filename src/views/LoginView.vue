<template>
  <div class="container">
    <div v-if='!isAuthenticated'>
      <button v-if="!isLoading" @click="login">Log in</button>
    </div>
    <div v-if='isAuthenticated && !wasLoading'>
      <div class="userinfo">
        <img :src=user.picture alt="user picture">
        <div class="textinfo">
          <p>{{ user.name }}</p>
          <p>{{ user.email }}</p>
        </div>
      </div>
      <button @click="logout">Log out</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
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

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
}
.userinfo {
  margin-bottom: 2vh;
  display: flex;
  flex-direction: row;
}
.textinfo {
  display: flex;
  flex-direction: column;
  margin-left: 2vw;
}
img {
  height: 100%;
}
</style>
