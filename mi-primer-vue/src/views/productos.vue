<script>
export default {
    data() {
        return {
            editId: '',
            productos: [],
            nombreProducto: '',
            precioProducto: '',
            selectedFile: null,
            showUserMenu: false
        };
    },
    mounted() {

        this.cargarProductos();

    },
    methods: {
        toggleUserMenu() {
            this.showUserMenu = !this.showUserMenu;
        },
        handleFileInputChange(event) {
            this.selectedFile = event.target.files[0];
            console.log(this.selectedFile.name);
        },
        uploadImage() {
            if (!this.selectedFile) {
                console.error('No se ha seleccionado ningún archivo.');
                return;
            }
            const formData = new FormData();
            formData.append('image', this.selectedFile);
            fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al subir archivo.');
                    }
                    return response.text();
                })
                .then(data => {
                    console.log(data);
                    this.$refs.inputArchivo.value = '';
                })
                .catch(error => {
                    console.error(error.message);
                });
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
        agregarProductos() {
            const nuevoProducto = {
                nombre: this.nombreProducto,
                precio: this.precioProducto,
                imagen: this.selectedFile.name
            };
            fetch('http://localhost:3000/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoProducto)
            })
                .then(response => response.json())
                .then(data => {
                    // Si la solicitud es exitosa, actualiza la lista de usuarios
                    this.productos.push(data);

                    // Limpia los campos de entrada
                    this.nombreProducto = '';
                    this.precioProducto = '';

                    this.cargarProductos();
                })
                .catch(error => {
                    console.error('Error al agregar producto:', error);
                });
        },
        onEdit(producto) {
            this.editId = producto.id
        },
        onCancel() {
            this.editId = ''
        },
        actualizarProducto(producto) {
            fetch(`http://localhost:3000/productos/${producto.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            })
                .then(response => response.json())
                .then(() => {
                    this.editId = '';
                    // Volver a cargar la lista de usuarios
                    this.cargarProductos();
                })
                .catch(error => {
                    console.error('Error al actualizar usuario:', error);
                });
        },
        eliminarProducto(id) {
            fetch(`http://localhost:3000/productos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(() => {
                    const index = this.productos.findIndex(producto => producto.id === id);
                    if (index !== -1) {
                        this.productos.splice(index, 1);
                    }
                    alert("Producto eliminado con exito");
                    // Volver a cargar la lista de usuarios
                    this.cargarProductos();
                })
                .catch(error => {
                    console.error('Error al eliminar producto:', error);
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
        <h3>Productos</h3>
        <div class="card">
            <div class="card-header">
                Agregar Nuevo Producto
            </div>
            <div class="card-body">
                <form class="form-inline" v-on:submit.prevent="agregarProductos">

                    <div class="form-group">
                        <label>Nombre</label>
                        <input v-model="nombreProducto" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
                    </div>
                    <div class="form-group">
                        <label>Precio</label>
                        <input v-model="precioProducto" type="number" class="form-control ml-sm-2 mr-sm-4 my-2"
                            required>
                    </div>
                    <div class="form-group">
                        <label>Imagen</label>
                        <input type="file" accept="image/*" @change="handleFileInputChange" ref="inputArchivo">
                    </div>
                    <div class="ml-auto text-right">
                        <button @click="uploadImage" type="submit" class="btn btn-primary my-2">Agregar</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="card mt-5">
            <div class="card-header">
                Lista Productos
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
                                    Precio
                                </th>
                                <th>
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="producto in productos" :key="producto.id">
                                <template v-if="editId == producto.id">
                                    <td>{{ producto.id }}</td>
                                    <td><input type="text" v-model="producto.nombre" class="form-control"></td>
                                    <td><input type="number" v-model="producto.precio" class="form-control"></td>
                                    <td>
                                        <a href="#" class="icon">
                                            <i v-on:click="actualizarProducto(producto)" class="bi bi-check"></i>
                                        </a>
                                        <a href="#" class="icon">
                                            <i v-on:click="onCancel" class="bi bi-x-circle"></i>
                                        </a>
                                    </td>
                                </template>
                                <template v-else>
                                    <td>{{ producto.id }}</td>
                                    <td>{{ producto.nombre }}</td>
                                    <td>${{ producto.precio }}</td>
                                    <td>
                                        <a href="#" class="icon">
                                            <i v-on:click="onEdit(producto)" class="bi bi-pencil"></i>
                                        </a>
                                        <a href="#" class="icon">
                                            <i v-on:click="eliminarProducto(producto.id)" class="bi bi-trash"></i>
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

<style scoped>
.bi {
    font-size: 1.5rem;
    color: #007bff;
}
.navbar-nav {
    font-size: 1.2rem;
}
</style>