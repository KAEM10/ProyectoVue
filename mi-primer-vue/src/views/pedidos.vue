<script>
export default {
    data() {
        return {
            productos: [],
            nombreProducto: '',
            precioProducto: '',
            pedidos: [],
            usuarioIdPedido: '',
            productoIdPedido: '',
            cantidadPedido: '',
            ruta: '../assets/imagenes/'
        };
    },
    mounted() {
        this.cargarProductos();
        //this.cargarProductos();
        //this.cargarPedidos();
    },
    methods: {
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


        agregarPedido() {
            const nuevoPedido = {
                usuario: this.usuario,
                producto: this.producto,
                pedido: this.pedido,
                cantidad: this.cantidad

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
        },

    },



};

</script>

<template>
    <div class="pedidos">
        
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr v-for="producto in productos" :key="producto.id">
                        <td>{{ producto.nombre }}</td>
                        <td>${{ producto.precio }}</td>
                        <td>
                            <img :src="ruta + producto.imagen" class="img-fluid" >
                            <p>{{ruta}}{{producto.imagen}}</p>
                        </td>
                        <td>
                            <a href="#" class="icon">
                                <i v-on:click="" class="bi bi-cart-plus"></i>
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

.descripcion {
    width: 100px;
    height: 50px;
}
</style>