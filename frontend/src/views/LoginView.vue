<template>
    <div class="container">
        <div class="rounded d-flex justify-content-center mt-5">
            <div class="col-lg-4 col-md-6 col-sm-12 shadow-lg p-4 bg-light">
                <div class="text-center">
                    <h3 class="text-primary">{{ $t('login') }}</h3>                    
                </div>
                <div class="mt-4">
                    <form @submit.prevent="handleSubmit">
                        <div class="input-group mb-3">
                            <span class="input-group-text bg-primary">
                                <i class="bi bi-person-fill text-white"></i>
                            </span>
                            <input type="text" class="form-control" :class="{ 'is-invalid' : errors.username}" placeholder="Username" id="username" v-model="username">
                            <div v-if="errors.username" id="username-invalid" class="invalid-feedback">
                                {{ errors.username }}
                            </div>                            
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text bg-primary">
                                <i class="bi bi-key-fill text-white"></i>
                            </span>
                            <input type="password" class="form-control" :class="{ 'is-invalid' : errors.password}" placeholder="password" id="password" v-model="password">
                            <div v-if="errors.password" id="password-invalid" class="invalid-feedback">
                                {{ errors.password }}
                            </div>                              
                        </div>
                        <div v-if="errors.login_failed" class="alert alert-danger text-center" role="alert">Invalid username or password</div>
                        <div class="d-grid col-12 mx-auto">
                            <button class="btn btn-primary" type="submit"><span></span> {{ $t('login') }}</button>
                        </div>
                        <p class="text-center mt-3">{{ $t('no_account') }}                        
                            <RouterLink to="/register" class="text-primary link">{{ $t('register') }}</RouterLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>   
    </div>
</template>

<style scoped>
    .link {
        text-decoration: none;
    }
</style>

<script>

    import { defineComponent, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import router from '@/router'
    import { useAuthStore } from '@/stores/auth.store';

    export default defineComponent({
        setup() {

            const route = useRoute();
            const authStore = useAuthStore();

            if (authStore.isAuthenticated) {
                router.push('/');
            }

            const username = ref('');
            const password = ref('');
            const errors = ref({});

            const handleSubmit = async () => {

                delete errors.value.login_failed;

                // Validate the form fields
                if (!username.value) {
                    errors.value.username = 'Please enter your username.';
                } else {
                    delete errors.value.username;
                }

                if (!password.value) {
                    errors.value.password = 'Please enter your password.';
                } else {
                    delete errors.value.password;
                }         

                if (Object.keys(errors.value).length === 0) {
                    try {
                        await authStore.handleLogin(username.value, password.value);                
                       
                        // Redirect to dashboard or handle login success
                        router.push(route.query.returnUrl || '/');
                    } catch (error) {
                        console.error('Login failed:', error);
                        // Handle login error
                        errors.value.login_failed = true;
                    }
                }
            };

            return {
                username,
                password,
                errors,
                handleSubmit,
            };
        },
    });

</script>