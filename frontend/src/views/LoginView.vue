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
                            <input type="password" class="form-control" :class="{ 'is-invalid' : errors.password}" placeholder="Password" id="password" v-model="password">
                            <div v-if="errors.password" id="password-invalid" class="invalid-feedback">
                                {{ errors.password }}
                            </div>                              
                        </div>
                        <div v-if="errors.non_field_errors" class="alert alert-danger text-center" role="alert"> {{ errors.non_field_errors }} </div>
                        <div class="d-grid col-12 mx-auto">
                            <button class="btn btn-primary" type="submit"><span></span> {{ $t('login') }}</button>
                        </div>
                        <div class="text-center mt-3 mb-3">
                            <RouterLink to="/password-reset" class="text-primary link">{{ $t('password_reset') }}</RouterLink>
                            <div class="mt-1">
                                {{ $t('no_account') }}                        
                                <RouterLink to="/register" class="text-primary link">{{ $t('register') }}</RouterLink>                                
                            </div>
                        </div>
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
    import axios from 'axios';
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

                delete errors.value.non_field_errors;

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
                    await axios
                        .post('/auth/jwt/create/', {
                            username: username.value,
                            password: password.value,
                        })
                        .then((response) => {                            
                            authStore.setAuthentication(response.data);
                            router.push(route.query.returnUrl || '/');                                  
                        })       
                        .catch((error) => {                            
                            errors.value.username = error.response.data.username ? error.response.data.username[0] : null;
                            errors.value.password = error.response.data.password ? error.response.data.password[0] : null;
                            errors.value.non_field_errors = error.response.data.detail ? error.response.data.detail : "Login failed!";
                            console.error('error during login:', error)
                            // throw error;                         
                        });                                 
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