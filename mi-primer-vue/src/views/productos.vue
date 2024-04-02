<script>
export default {
    data() {
        return {
            usuarios: [],
            nombreUsuario: '',
            emailUsuario: '',
            passUsuario: '',
            productos: [],
            nombreProducto: '',
            precioProducto: '',
            pedidos: [],
            usuarioIdPedido: '',
            productoIdPedido: '',
            cantidadPedido: ''
        };
    },
    mounted() {
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
        agregarUsuario() {
            const nuevoUsuario = {
                nombre: this.nombreUsuario,
                email: this.emailUsuario,
                pass: this.passUsuario
            };
            fetch('http://localhost:3000/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoUsuario)
            })
                .then(response => response.json())
                .then(data => {
                    // Si la solicitud es exitosa, actualiza la lista de usuarios
                    this.usuarios.push(data);
                    // Limpia los campos de entrada
                    this.nombreUsuario = '';
                    this.emailUsuario = '';
                    this.passUsuario = '';
                })
                .catch(error => {
                    console.error('Error al agregar usuario:', error);
                });
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
        
    },
};

</script>

<template>
    <div class="products">
    <h3>Usuarios</h3>
    <div class="card">
        <div class="card-header">
        Agregar Nuevo Usuario
        </div>
        <div class="card-body">
        <form class="form-inline" v-on:submit.prevent="agregarUsuario">
            
            <div class="form-group">
            <label>Nombre</label>
            <input v-model="nombreUsuario" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
            </div>
            <div class="form-group">
            <label>Email</label>
            <input v-model="emailUsuario" type="email" class="form-control ml-sm-2 mr-sm-4 my-2" required>
            </div>
            <div class="form-group">
            <label>Contraseña</label>
            <input v-model="passUsuario" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
            </div>
            <div class="ml-auto text-right">
            <button @click="cargarUsuarios" type="submit" class="btn btn-primary my-2">Agregar</button>
            </div>
        </form>
        </div>
    </div>

    <div class="card mt-5">
        <div class="card-header">
        Lista Usuarios
        </div>
        <div class="card-body">
        <div class="table-responsive">
            <table class="table">
            <thead>
                <tr>
                <th scope="col">
                    ID
                </th>
                <th>
                    Nombre
                </th>
                <th>
                    Email
                </th>
                <th>
                    Acciones
                </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="usuario in usuarios" :key="usuario.id">
                <td>{{ usuario.id }}</td>
                <td>{{ usuario.nombre }}</td>
                <td>{{ usuario.email }}</td>
                <td>
                    <a href="#" class="icon">
                      <i v-on:click="onEdit(product)" class="bi bi-pencil"></i>
                    </a>
                    <a href="#" class="icon">
                      <i v-on:click="onDelete(product.id)" class="bi bi-trash"></i>
                    </a>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
        </div>
    </div>

    </div>
</template>

<style>
h1 {
    color: red;
}
</style>