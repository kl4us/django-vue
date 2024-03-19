<template>

    <!-- Fixed navbar -->
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div class="container-fluid">
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
                    <li class="nav-item" v-if="!isAuthenticated">
                        <RouterLink to="/login" class="nav-link">{{ $t('login') }}</RouterLink>
                    </li>
                    <li class="nav-item" v-if="!isAuthenticated">
                        <RouterLink to="/register" class="nav-link">{{ $t('register') }}</RouterLink>
                    </li>                          
                    <div class="dropdown" v-if="isAuthenticated">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" 
                            role="button" 
                            data-bs-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false"
                        >
                        <i class="bi bi-person-fill"></i>
                        </a>                        
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <RouterLink to="/password-change" class="dropdown-item">{{ $t('password_change') }}</RouterLink>
                            </li>                              
                            <li>
                                <a class="dropdown-item" href="#" @click="handleLogout">{{ $t('logout') }}</a>
                            </li>                                                     
                        </ul>
                    </div>   
                    <LanguageSwitcher />                                                            
                </ul>         
            </div>
        </div>
    </nav>    

</template>

<script setup>
    import { computed } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '@/stores/auth.store';
    import LanguageSwitcher from '@/plugins/i18n/LanguageSwitcher.vue';

    const router = useRouter();
    const authStore = useAuthStore();

    const isAuthenticated = computed(() => authStore.isAuthenticated);

    const handleLogout = () => {
        // clear authentication state
        authStore.clearAuthentication();

        // Redirect to the login page after logout
        router.push('/');           
    };
</script>

