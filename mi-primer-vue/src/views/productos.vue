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
        cargarPedidos() {
            fetch('http://localhost:3000/pedidos')
                .then(response => response.json())
                .then(data => {
                    this.pedidos = data;
                })
                .catch(error => {
                    console.error('Error al cargar pedidos:', error);
                });
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
        onEdit(usuario){
            this.editId = usuario.id
        },
        onCancel(){
            this.editId = ''
        },
        actualizarUsuario(usuario) {
            fetch(`http://localhost:3000/usuarios/${usuario.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            })
                .then(response => response.json())
                .then(() => {
                    this.onCancel();
                })
                .catch(error => {
                    console.error('Error al actualizar usuario:', error);
                });
        },
        eliminarUsuario(id) {
            fetch(`http://localhost:3000/usuarios/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
                .then(() => {
                    const index = this.usuarios.findIndex(usuario => usuario.id === id);
                    if (index !== -1) {
                        this.usuarios.splice(index, 1);
                    }
                    // Volver a cargar la lista de usuarios
                    this.cargarUsuarios();
                })
                .catch(error => {
                    console.error('Error al eliminar usuario:', error);
                });
        },
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
                    <template v-if = "editId == usuario.id"> 
                        <td>{{ usuario.id }}</td>
                        <td><input type="text" v-model="usuario.nombre" class="form-control"></td>
                        <td><input type="text" v-model="usuario.email" class="form-control"></td>
                        <td>
                            <a href="#" class="icon">
                                <i v-on:click="actualizarUsuario(usuario)" class="bi bi-check"></i>
                            </a>
                            <a href="#" class="icon">
                                <i v-on:click="onCancel" class="bi bi-x-circle"></i>
                            </a>
                        </td>
                    </template>
                    <template v-else>
                        <td>{{ usuario.id }}</td>
                        <td>{{ usuario.nombre }}</td>
                        <td>{{ usuario.email }}</td>
                        <td>
                            <a href="#" class="icon">
                                <i v-on:click="onEdit(usuario)" class="bi bi-pencil"></i>
                            </a>
                            <a href="#" class="icon">
                                <i v-on:click="eliminarUsuario(usuario.id)" class="bi bi-trash"></i>
                            </a>
                        </td>
                    </template>
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