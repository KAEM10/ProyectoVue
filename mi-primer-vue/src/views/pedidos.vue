<script>
export default {
    data() {
        return {
            pedidos: [],
            showUserMenu:false
        };
    },
    mounted() {
        this.cargarPedidos();
    },
    methods: {
        toggleUserMenu() {
            this.showUserMenu = !this.showUserMenu;
        },
        cargarPedidos() {
            fetch('http://localhost:3000/listaPedidos')
                .then(response => response.json())
                .then(data => {
                    this.pedidos = data;
                })
                .catch(error => {
                    console.error('Error al cargar pedidos:', error);
                });


        },


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
    <h3>Pedidos</h3>

    <div class="pedidos">
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">
                            ID PEDIDO
                        </th>
                        <th>
                            USUARIO
                        </th>
                        <th >
                            ID PRODUCTO
                        </th>
                        <th>
                            NOMBRE
                        </th>
                        
                        <th>
                            PRECIO C/U
                        </th>
                        <th>
                            NUMERO PRODUCTOS
                        </th>
                        <th>
                            VALOR TOTAL
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="pedido in pedidos" :key="pedido.id">
                        <td>{{ pedido.id_pedido }}</td>
                        <td>{{ pedido.nombre_usuario }}</td>
                        <td>{{ pedido.id_producto }}</td>
                        <td>{{ pedido.nombre_producto }}</td>
                        
                       
                        <td>${{ pedido.precioUnidad }}</td>
                        <td>{{ pedido.numProductos }}</td>
                        <td>${{ pedido.total }}</td>

                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>



<style scoped>
.pedidos {
    background-color: rgba(158, 246, 246, 0.722);
}
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