<template>
    <div>
      <home/>
    </div>
  </template>
  
  <script>
  import home from './views/home.vue'; // Importa el componente home.vue
  
  export default {
    components: {
      home // Registra el componente Home en el ámbito de este componente
    }
    // Otra lógica JavaScript si es necesaria
  }
  </script>
  
  <style>
  /* Estilos CSS si es necesario */
  </style>
  