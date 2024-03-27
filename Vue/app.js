const app = new Vue({
    el: '#app',
    data: {
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
        titulo3: 'Pedidos',
    },
    created() {
        this.cargarUsuarios();
    },
    methods: {
        cargarUsuarios() {
            fetch('http://localhost/phpmyadmin/index.php?route=/sql&db=proyectovue&table=usuarios&pos=0')
                .then(response => response.json())
                .then(data => {
                    data.forEach(usuario => {
                        this.usuarios.push({
                            id: usuario.id,
                            nombre: usuario.nombre,
                            email: usuario.email
                        });
                    });
                });
        },        
        agregarUsuario: function() {
            this.usuarios.push({
                id: this.usuarios.length + 1,
                nombre: this.nombreUsuario,
                email: this.emailUsuario
            });
            this.nombreUsuario = '';
            this.emailUsuario = '';
            
        },
        agregarProducto: function() {
            this.productos.push({
                id: this.productos.length + 1,
                nombre: this.nombreProducto,
                precio: this.precioProducto
            });
            this.nombreProducto = '';
            this.precioProducto = '';
        },
        agregarPedido: function() {
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
});