<script>
export default{
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
    },
    methods: {
        cargarUsuarios() {
            fetch('http://localhost:3000/usuarios')
                .then(response => response.json())
                .then(data => {
                    this.usuarios = data;
                })
                .catch(error => {
                    console.error('Error al cargar usuarios:', error);
                });
        },      
        agregarUsuario() {
            this.usuarios.push({
                id: this.usuarios.length + 1,
                nombre: this.nombreUsuario,
                email: this.emailUsuario
            });
            this.nombreUsuario = '';
            this.emailUsuario = '';
            
        },
        agregarProducto() {
            this.productos.push({
                id: this.productos.length + 1,
                nombre: this.nombreProducto,
                precio: this.precioProducto
            });
            this.nombreProducto = '';
            this.precioProducto = '';
        },
        agregarPedido() {
            this.pedidos.push({
                id: this.pedidos.length + 1,
                usuarioId: this.usuarioIdPedido,
                productoId: this.productoIdPedido,
                cantidad: this.cantidadPedido
            });
            this.usuarioIdPedido = '';
            this.productoIdPedido = '';
            this.cantidadPedido = '';
            console.log(this.pedidos);
        }
    }
};
</script>

<template>
    <div>
        <!-- Usuarios -->
        <div>
            <h1>{{titulo1}}</h1>
            <ul>
                <li v-for="usuario in usuarios" :key="usuario.id">{{usuario.id}} - {{ usuario.nombre }} - {{ usuario.email }}</li>
            </ul>
            <form @submit.prevent="cargarUsuarios">
                <input type="text" v-model="nombreUsuario" placeholder="Nombre">
                <input type="email" v-model="emailUsuario" placeholder="Email@ejemplo">
                <button type="submit">Agregar Usuario</button>
            </form>
        </div>
        <!-- Productos -->
        <div>
            <h1>{{titulo2}}</h1>
            <ul>
                <li v-for="producto in productos" :key="producto.id">{{producto.id}} - {{ producto.nombre }} - {{ producto.precio }}</li>
            </ul>
            <form @submit.prevent="agregarProducto">
                <input type="text" v-model="nombreProducto" placeholder="Nombre">
                <input type="number" v-model="precioProducto" placeholder="Precio">
                <button type="submit">Agregar Producto</button>
            </form>
        </div>
        <!-- Pedidos -->
        <div>
            <h1>{{titulo3}}</h1>
            <ul>
                <li v-for="pedido in pedidos" :key="pedido.id">{{ pedido.usuarioId }} - {{ pedido.productoId }} - {{ pedido.cantidad }}</li>
            </ul>
            <form @submit.prevent="agregarPedido">
                <input type="number" v-model="usuarioIdPedido" placeholder="Usuario ID">
                <input type="number" v-model="productoIdPedido" placeholder="Producto ID">
                <input type="number" v-model="cantidadPedido" placeholder="Cantidad">
                <button type="submit">Agregar Pedido</button>
            </form>
        </div>
        

    </div>
</template>

<style>
h1 {
  color: red;
}
</style>