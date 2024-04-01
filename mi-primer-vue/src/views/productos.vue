<script>
export default {
    name: 'productos',
    components: {

    },
    mounted() {
    // Escuchar el evento para redirigir a la página de productos
    this.$bus.on('autenticacionExitosa', () => {
        this.$router.push({ name: 'productos' });
    });
},

    data() {
        return {
            usuarios: [],
            nombreUsuario: '',
            emailUsuario: '',
            productos: [],
            nombreProducto: '',
            precioProducto: '',
            pedidos: [],
            usuarioIdPedido: '',
            productoIdPedido: '',
            cantidadPedido: '',
            titulo1: 'Usuarios',
            titulo2: 'Productos',
            titulo3: 'Pedidos'
        };
    }
}
</script>
<template>
    <div class="productos">

    </div>
</template>

<style>
h1 {
    color: red;
}
</style>