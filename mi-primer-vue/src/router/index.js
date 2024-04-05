import { createRouter, createWebHistory } from 'vue-router';
import productos from '../views/productos.vue';
import usuarios from '../views/usuarios.vue';
import pedidos from '../views/pedidos.vue';
import home from '../views/home.vue';
import carrito from '../views/carrito.vue';
import inicio from '../views/inicio.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
  },

  {
    path: '/productos',
    name: 'productos',
    component: productos,
    meta: {
      requiresAuth: true // Esta ruta requiere autenticación
    }
  },
  {
    path: '/home',
    name: 'inicio',
    component: inicio,
    meta: {
      requiresAuth: true // Esta ruta requiere autenticación
    }
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: usuarios,
    meta: {
      requiresAuth: true // Esta ruta requiere autenticación
    }
  },
  {
    path: '/pedidos',
    name: 'pedidos',
    component: pedidos,
    meta: {
      requiresAuth: true // Esta ruta requiere autenticación
    }
  },
  {
    path: '/carrito',
    name: 'carrito',
    component: carrito,
    meta: {
      requiresAuth: true // Esta ruta requiere autenticación
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Función para verificar si el usuario ha iniciado sesión
const isLoggedIn = () => {
  // Aquí puedes verificar si el token de sesión existe en el almacenamiento local
  // Devuelve true si el token está definido, de lo contrario, devuelve false
  if (localStorage.getItem('token') != null && localStorage.getItem('token') != "undefined") {

    return true;
  } return false;
};


router.beforeEach((to, from, next) => {
  // Si la ruta requiere autenticación y el usuario no está autenticado
  if (to.meta.requiresAuth && !isLoggedIn()) {
    // Redirige a la página de inicio de sesión
    next('/');
  } else {
    // Continúa con la navegación
    next();
  }
});

export default router;
