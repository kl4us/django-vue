<template>
    <div class="container">
        <div class="rounded d-flex justify-content-center mt-5">
            <div class="col-lg-4 col-md-6 col-sm-12 shadow-lg p-4 bg-light">
                <div class="text-center">
                    <h3 class="text-primary">{{ $t('register') }}</h3>
                </div>
                <div class="mt-4">
                    <form action="">
                        <div class="input-group mb-3">
                            <span class="input-group-text bg-primary"><i
                                    class="bi bi-person-plus-fill text-white"></i></span>
                            <input type="text" class="form-control" placeholder="Username">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text bg-primary"><i
                                    class="bi bi-envelope text-white"></i></span>
                            <input type="email" class="form-control" placeholder="Email">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text bg-primary"><i
                                    class="bi bi-key-fill text-white"></i></span>
                            <input type="password" class="form-control" placeholder="Password">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text bg-primary"><i
                                    class="bi bi-key text-white"></i></span>
                            <input type="password" class="form-control" placeholder="Re-type password">
                        </div>                        
                        <div class="d-grid col-12 mx-auto">
                            <button class="btn btn-primary" type="button"><span></span> {{ $t('register') }}</button>
                        </div>
                        <p class="text-center mt-3">{{ $t('already_have_account') }}
                            <RouterLink to="/login" class="text-primary link">{{ $t('login') }}</RouterLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>    
    </div>
</template>


<script>

    import { defineComponent } from 'vue';
    import router from '@/router'
    import { useAuthStore } from '@/stores/auth.store';

    export default defineComponent({
        setup() {

            const authStore = useAuthStore();

            if (authStore.isAuthenticated) {
                router.push('/');
            }

        },
    });

</script>

<style scoped>
    .link {
        text-decoration: none;
    }
</style>
