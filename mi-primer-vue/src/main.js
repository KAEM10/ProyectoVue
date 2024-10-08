import { createApp } from 'vue'; // Importa createApp desde Vue en lugar de Vue
import router from './router/index.js'; // Importa tu router
import App from './App.vue'; // Importa tu componente principal


createApp(App)
  .use(router) // Usa el router
  .mount('#app'); // Monta la aplicación en el elemento con ID 'app'