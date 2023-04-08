import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { authGuard } from '@auth0/auth0-vue';
import Dashboard from '../views/Dashboard.vue';
import LoginView from '../views/LoginView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    alias: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    beforeEnter: authGuard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
