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
    <!-- Cuerpo -->
    <div class="bg-pastel">
        <main class="main">
            <section class="content">
                <div class="row">
                    <div class="col-md-6">
                        <h2 class="text-center mb-4">¡Bienvenido!</h2>
                        <p class="lead">Esta página funciona como una aplicación en la cual puedes</p>
                        <div v-for="(item, index) in items" :key="index" class="mb-3">
                            <div class="d-flex align-items-center mb-2">
                                <i class="bi bi-check-circle-fill text-success mr-2"></i>
                                <p>{{ item }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <img src="../assets/imagenes/tienda.png" alt="Imagen" class="img-fluid">
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            items: [
                'Registrar, modificar y eliminar usuarios.',
                'Administrar pedidos.',
                'Gestionar productos.',
                'Utilizar un carrito de compras.',
                'Acceder a un historial de pedidos.'
            ],
            showUserMenu: false
        };
    },
    methods: {
        toggleUserMenu() {
            this.showUserMenu = !this.showUserMenu;
        }
    }
}
</script>

<style scoped>
/* Estilos específicos para esta página */
.container {
    max-width: 1200px;
    margin: 0 auto;
}

.main {
    padding: 20px;
}

.bg-pastel {
    background-color: #f0f5f9;
    /* Color pastel */
}
</style>