<template>
    <div class="container">
        <div class="rounded d-flex justify-content-center mt-5">
            <div class="col-lg-4 col-md-6 col-sm-12 shadow-lg p-4 bg-light">
                <div class="text-center">
                    <h3 class="text-primary">{{ $t('password_change') }}</h3>                    
                </div>
                <div class="mt-4">
                    <form @submit.prevent="handleSubmit">    
                        <div class="input-group mb-3">
                            <span class="input-group-text bg-primary">
                                <i class="bi bi-key-fill text-white"></i>
                            </span>
                            <input type="password" class="form-control" :class="{ 'is-invalid' : errors.current_password}" placeholder="Current password" id="current_password" v-model="current_password">
                            <div v-if="errors.current_password" id="current_password-invalid" class="invalid-feedback">
                                {{ errors.current_password }}
                            </div>                              
                        </div>                                            
                        <div class="input-group mb-3">
                            <span class="input-group-text bg-primary">
                                <i class="bi bi-key-fill text-white"></i>
                            </span>
                            <input type="password" class="form-control" :class="{ 'is-invalid' : errors.new_password}" placeholder="New password" id="new_password" v-model="new_password">
                            <div v-if="errors.new_password" id="new_password-invalid" class="invalid-feedback">
                                {{ errors.new_password }}
                            </div>                              
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text bg-primary">
                                <i class="bi bi-key text-white"></i>
                            </span>
                            <input type="password" class="form-control" :class="{ 'is-invalid' : errors.re_new_password}" placeholder="Re-type password" id="re-password" v-model="re_new_password">
                            <div v-if="errors.re_new_password" id="re-password-invalid" class="invalid-feedback">
                                {{ errors.re_new_password }}
                            </div>                              
                        </div>                        
                        <div v-if="errors.non_field_errors" class="alert alert-danger text-center" role="alert">{{ errors.non_field_errors }}</div>
                        <div class="d-grid col-12 mx-auto">
                            <button class="btn btn-primary" type="submit"><span></span> {{ $t('save') }}</button>
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

    export default defineComponent({
        setup() {

            const route = useRoute();

            const current_password = ref('');
            const new_password = ref('');
            const re_new_password = ref('');
            const errors = ref({});

            const handleSubmit = async () => {

                delete errors.value.non_field_errors;

                // Validate the form fields
                if (!current_password.value) {
                    errors.value.current_password = 'Please enter current password.';
                } else {
                    delete errors.value.current_password;
                }

                if (!new_password.value) {
                    errors.value.password = 'Please enter new password.';
                } else {
                    delete errors.value.new_password;
                }

                if (!re_new_password.value) {
                    errors.value.re_new_password = 'Please re-type new password.';
                } else {
                    delete errors.value.re_new_password;
                }   
                
                if (new_password.value != re_new_password.value) {
                    errors.value.re_new_password = 'Passwords are not equals.';
                } else {
                    delete errors.value.re_new_password;
                }                

                if (Object.keys(errors.value).length === 0) {                    
                    await axios
                        .post('/auth/users/set_password/', {
                            "current_password": current_password.value,
                            "new_password": new_password.value,
                            "re_new_password": re_new_password.value,
                        })
                        .then(() => {                            
                            // Redirect to dashboard or handle login success
                            router.push(route.query.returnUrl || '/');                                  
                        })       
                        .catch((error) => {                            
                            errors.value.current_password = error.response.data.current_password ? error.response.data.current_password[0] : null;
                            errors.value.new_password = error.response.data.new_password ? error.response.data.new_password[0] : null;
                            errors.value.re_new_password = error.response.data.re_new_password ? error.response.data.re_new_password[0] : null;
                            errors.value.non_field_errors = error.response.data.non_field_errors ? error.response.data.non_field_errors[0] : "Change password failed!";
                            console.error('error updating password:', error);       
                            // throw error;                         
                        });                                                                                                                                          
                }
            };

            return {
                current_password,
                new_password,
                re_new_password,
                errors,
                handleSubmit,
            };
        },
    });

</script>