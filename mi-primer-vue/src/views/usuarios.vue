<script>
export default {
    data() {
        return {
            usuarios: [],
            nombreUsuario: '',
            emailUsuario: '',
            passUsuario: '',
            showUserMenu: false,
            editId: ''
        };
    },
    mounted() {
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
                    this.cargarUsuarios();
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
                    this.editId = '';
                    // Volver a cargar la lista de usuarios
                    this.cargarUsuarios();
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
                    alert("Usuario eliminado con exito");
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
            <button type="submit" class="btn btn-primary my-2">Agregar</button>
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
                        <td><input type="email" v-model="usuario.email" class="form-control"></td>
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
.bi {
    font-size: 1.5rem;
    color: #007bff;
}
.products {
  background-color: #f0f5f9; /* Color pastel */
}
.navbar-nav {
    font-size: 1.2rem;
}
</style>