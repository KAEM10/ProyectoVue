import { createRouter, createWebHistory } from 'vue-router';
import productos from '../views/productos.vue';
import usuarios from '../views/usuarios.vue';
import pedidos from '../views/pedidos.vue';
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
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: usuarios,
  },
  {
    path: '/pedidos',
    name: 'pedidos',
    component: pedidos,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
