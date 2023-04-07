import { createApp } from 'vue';
import { createAuth0 } from '@auth0/auth0-vue';
import App from './App.vue';
import router from './router';
import store from './store';

createApp(App).use(store).use(router).use(
  createAuth0({
    domain: 'dev-x0dtyv186bbbfyta.us.auth0.com',
    clientId: 'g9CdikxK4FWCUzqZ2oycsPXCBwpVi9BJ',
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
  }),
)
  .mount('#app');
