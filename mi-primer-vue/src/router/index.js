import { createRouter, createWebHistory } from 'vue-router';
import productos from '../views/productos.vue';
import home from '../views/home.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/productos',
    name: 'productos',
    component: productos,
    //component: () => import(/* webpackChunkName: "productos" */ '../views/productos.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
