import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store';
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import PasswordChangeView from '@/views/PasswordChangeView.vue';
import PasswordResetView from '@/views/PasswordResetView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,    
      meta: {
        requiresAuth: true 
      }  
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,      
    }, 
    {
      path: '/register',
      name: 'register',
      component: RegistrationView,      
    },    
    {
      path: '/password-change',
      name: 'password-change',
      component: PasswordChangeView,
      meta: {
        requiresAuth: true 
      }               
    },   
    {
      path: '/password-reset',
      name: 'password-reset',
      component: PasswordResetView
    },       
    { 
      // otherwise redirect to NotFoundView
      path: '/:pathMatch(.*)*', 
      name: 'notfound',
      component: () => import('@/views/NotFoundView.vue')
    }    
  ],
  linkActiveClass: "active"
})



router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {    
    const authStore = useAuthStore();
    if (!authStore.isAuthenticated){
      return {
        path: '/login',
        query: { returnUrl: to.href }
      };
    }
  }
});

export default router
