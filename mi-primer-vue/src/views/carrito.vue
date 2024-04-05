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
            pedidoId: '',
            pedidoN: '',
            usuarioPedido: null,
            showUserMenu: false
        };
    },
    mounted() {
        this.cargarProductos();
        this.cargarUsuarios();
    },
    methods: {
        toggleUserMenu() {
            this.showUserMenu = !this.showUserMenu;
        },
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
        quitarCarrito(id) {
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

            console.log(this.pedidoId);
            this.carrito.forEach(element => {
                this.obtenerIdProducto(element.varProducto.nombre).then(data => {
                    console.log('Datos obtenidos:', data);
                    console.log(this.pedidoId);

                    console.log(this.idProductos);
                    const nuevoProductoPedido = {
                        pedidoId: this.pedidoId,
                        productosId: data[0].id,
                        cantidad: element.varNum
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
                })
                    .catch(error => {
                        console.error('Error al obtener ID del producto:', error);
                    });



            });
            this.limpiarCarrito();
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
                    console.log(data);
                    this.pedidos.push(data);
                    this.pedidoId = data.id;
                    // Limpia los campos de entrada
                })
                .catch(error => {
                    console.error('Error al agregar usuario:', error);
                });
            this.agregarProductoPedido();
            //this.obtenerPedido()
        },
       /* 
        obtenerPedido() {
            fetch('http://localhost:3000/pedidos')
                .then(response => response.json())
                .then(data => {
                    console.log(data[0].id);
                    this.pedidoId = data[0].id;
                    this.agregarProductoPedido();
                    return data;
                })
                .catch(error => {
                    console.error('Error al cargar productos:', error);
                });

        },*/
        obtenerIdProducto(nombre) {
            const nuevoProducto = {
                varNombre: nombre
            };

            return new Promise((resolve, reject) => {
                fetch('http://localhost:3000/idProductos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(nuevoProducto)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error al obtener el ID del producto');
                        }
                        return response.json();
                    })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        console.error('Error al cargar productos:', error);
                        reject(error);
                    });
            });
        }

    },
};
</script>

<template>

    <div>
        <!-- Header -->
        <header class="header navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <router-link to="/home" class="navbar-brand">
                    <i class="bi bi-shop"></i> RappiChamo
                </router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <router-link to="/usuarios" class="nav-link">
                                <i class="bi bi-person"></i> Usuarios
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/productos" class="nav-link">
                                <i class="bi bi-box"></i> Productos
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/pedidos" class="nav-link">
                                <i class="bi bi-cart-check"></i> Pedidos
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/carrito" class="nav-link">
                                <i class="bi bi-cart-fill"></i> Carrito
                            </router-link>
                        </li>
                        <li class="nav-item" @click="toggleUserMenu">
                            <a href="#" class="nav-link">
                                <i class="bi bi-person"></i>
                            </a>
                        </li>
                        <li v-show="showUserMenu" class="nav-item">
                            <router-link to="/" class="nav-link">
                                <i class="bi bi-box-arrow-right"></i> Cerrar sesión
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    </div>
    <h3>Carrito</h3>

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
                                <i v-on:click="quitarCarrito(producto.id)" class="bi bi-trash"></i>
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

.navbar-nav {
    font-size: 1.2rem;
}
</style>