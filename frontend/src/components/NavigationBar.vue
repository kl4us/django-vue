<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>

    <!-- Fixed navbar -->
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div class="container-fluid">
            <!-- <a class="navbar-brand" href="#">Brand Name</a> -->
            <RouterLink to="/" class="navbar-brand">Brand Name</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <RouterLink to="/" class="nav-link">
                            <i class="bi bi-house-door-fill"></i>
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/login" class="nav-link">Login</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/register" class="nav-link">Register</RouterLink>
                    </li>            
                </ul>         
            </div>
        </div>
    </nav>    

</template>