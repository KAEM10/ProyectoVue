<script>
export default {
    data() {
        return {
            productos: [],
            carrito: [],
            nombreProducto: '',
            precioProducto: '',
            pedidos: [],
            idProductos: [],
            pedidosProducto: [],
            usuarioIdPedido: '',
            productoIdPedido: '',
            cantidadPedido: '',
            usuarios: [],
            ruta: '/src/assets/imagenes/',
            numero: 1,
            usuarioPedido: null,
            pedidoId: ''
        };
    },
    mounted() {
        this.cargarProductos();
        this.cargarUsuarios();
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
        agregarCarrito(producto, cantidad) {
            const nuevoProducto = {
                varProducto: producto,
                varNum: cantidad
            }

            const productoExistente = this.carrito.find(item => item.varProducto.id === producto.id);

            if (productoExistente) {
                window.alert("El producto ya está agregado");
            } else {
                this.carrito.push(nuevoProducto);
            }
        },
        quitarCarrito( id) {
            const index = this.carrito.findIndex(item => item.varProducto.id === id);
            if (index !== -1) {
                this.carrito.splice(index, 1);
            } else {
                window.alert("El producto no está en el carrito");
            }
        },
        limpiarCarrito() {
            this.carrito = [];
        },
        cargarProductos() {
            fetch('http://localhost:3000/productos')
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                })
                .catch(error => {
                    console.error('Error al cargar productos:', error);
                });
        },
        agregarProductoPedido() {

            this.obtenerPedido();
            console.log(this.pedidoId.id)
            this.carrito.forEach(element => {
                this.obtenerIdProducto(element.varProducto.nombre);
            });

            console.log(this.idProductos);
            const nuevoProductoPedido = {
                pedidoId: this.pedidoId.id,
                productosId: this.idProductos,
                productos: this.carrito
            };

            fetch('http://localhost:3000/pedidoProducto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoProductoPedido)
            })
                .then(response => response.json())
                .then(data => {
                    // Si la solicitud es exitosa, actualiza la lista de usuarios
                    this.pedidosProducto.push(data);
                    // Limpia los campos de entrada
                })
                .catch(error => {
                    console.error('Error al agregar usuario:', error);
                });
        },

        agregarPedido() {


            const nuevoPedido = {
                usuarioId: this.usuarioPedido.id
            };

            fetch('http://localhost:3000/pedidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoPedido)
            })
                .then(response => response.json())
                .then(data => {
                    // Si la solicitud es exitosa, actualiza la lista de usuarios
                    this.pedidos.push(data);
                    // Limpia los campos de entrada
                })
                .catch(error => {
                    console.error('Error al agregar usuario:', error);
                });
            this.agregarProductoPedido()
        },
        obtenerPedido() {
            fetch('http://localhost:3000/pedidos')
                .then(response => response.json())
                .then(data => {
                    
                    this.pedidoId = data;
                })
                .catch(error => {
                    console.error('Error al cargar productos:', error);
                });
        },
        obtenerIdProducto(nombre) {
            const nuevoProducto = {
                varNombre: nombre
            };
            fetch('http://localhost:3000/idProductos',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoProducto)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    //this.idProductos.push(data);
                })
                .catch(error => {
                    console.error('Error al cargar productos:', error);
                });
        },

    },
};
</script>

<template>

    <div>
        <header class="header navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <router-link to="/" class="navbar-brand">RappiChamo</router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <router-link to="/usuarios" class="nav-link">Usuarios</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/productos" class="nav-link">Productos</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/pedidos" class="nav-link">Pedidos</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    </div>
    <h3>Pedidos</h3>

    <div>
        <label>Usuario:</label>
        <select v-model="usuarioPedido">
            <option v-for="usuario in usuarios" :value="usuario">{{ usuario.nombre }}</option>
        </select>
    </div>

    <div>
        <div>
            <ul class="list-group">
                <li class="list-group-item" v-for="producto in carrito" :key="producto.varProducto.id">
                    {{ producto.varProducto.nombre }} - ${{ producto.varProducto.precio }}
                    <label>Cantidad: </label>
                    <input type="number" v-model="producto.varNum" min="1" max="10" step="1">
                </li>
            </ul>
            <button v-if="carrito.length > 0" class="btn btn-primary mb-3" @click="limpiarCarrito">Limpiar
                Carrito</button>
            <button v-if="carrito.length > 0" class="btn btn-primary mb-3" @click="agregarPedido"> Crear Pedido</button>
        </div>
    </div>

    <div class="pedidos">
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr v-for="producto in productos" :key="producto.id">
                        <td>{{ producto.nombre }}</td>
                        <td>${{ producto.precio }}</td>
                        <td>
                            <img :src="ruta + producto.imagen" class="img-fluid">
                        </td>
                        <td>
                            <a class="icon">
                                <i v-on:click="agregarCarrito(producto, 1)" class="bi bi-cart-plus"></i>
                            </a>
                            <a class="icon">
                                <i v-on:click="quitarCarrito(producto, producto.id)" class="bi bi-trash"></i>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>



<style scoped>
img {
    width: 150px;
    /* Ajusta el tamaño según tus necesidades */
    height: 100px;
    /* Ajusta el tamaño según tus necesidades */
    margin-right: 10px;
}

button {
    margin: 10px;
}

.descripcion {
    width: 100px;
    height: 50px;
}

input {
    margin: 10px;
    width: 60px;
}

select {
    margin: 10px;
    width: 200px;
}
</style>