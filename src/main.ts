import { createApp } from 'vue';
import { createAuth0 } from '@auth0/auth0-vue';
import App from './App.vue';
import router from './router';
import store from './store';

createApp(App).use(store).use(router).use(
  createAuth0({
    domain: process.env.VUE_APP_AUTH0_DOMAIN,
    clientId: process.env.VUE_APP_AUTH0_CLIENT_ID,
    authorizationParams: {
      audience: process.env.VUE_APP_AUTH0_AUDIENCE,
      redirect_uri: process.env.VUE_APP_AUTH0_CALLBACK_URL,
    },
  }),
)
  .mount('#app');
