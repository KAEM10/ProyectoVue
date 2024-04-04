<script>
export default {
    data() {
        return {
            pedidos: [],
        };
    },
    mounted() {
        this.cargarPedidos();
    },
    methods: {
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
                        <li class="nav-item">
                            <router-link to="/carrito" class="nav-link"><a class="icon"><i
                                        class="bi-solid bi-cart"></i></a></router-link>
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