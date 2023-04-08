import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { authGuard } from '@auth0/auth0-vue';
import LoginView from '../views/LoginView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    alias: ['/', '/user'],
    name: 'login',
    component: LoginView,
  },
  {
    path: '/callback',
    name: 'callback',
    component: () => import('@/views/Callback.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/Dashboard.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
