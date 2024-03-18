import { defineStore } from 'pinia';
import axios from 'axios';
import Cookies from 'js-cookie';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({    
    token: null,
    refreshToken: null,
    isAuthenticated: false
  }),
  actions: {
    setAuthCookie(name, value) {
      Cookies.set(name, value, { secure: true, sameSite: 'strict' });
    },    
    getAuthCookie(name) {
      return Cookies.get(name);
    },
    removeAuthCookie(name) {
      Cookies.remove(name);
    },
    setAuthentication(payload) {
      this.token = payload.access;
      this.refreshToken = payload.refresh;
      this.isAuthenticated = true;

      this.setAuthCookie('authToken', this.token, { secure: true, sameSite: 'strict' });
      this.setAuthCookie('refreshToken', this.refreshToken, { secure: true, sameSite: 'strict' });  
      
      // Set jwt in axios headers
      axios.defaults.headers.common['Authorization'] = `JWT ${this.token}`;

      // start timer to refresh jwt
      this.startRefreshTokenTimer();
    },  
    async refreshAuthentication(payload) {
      this.token = payload.access;
      this.isAuthenticated = true;

      this.setAuthCookie('authToken', this.token, { secure: true, sameSite: 'strict' });
      
      // Set jwt in axios headers
      axios.defaults.headers.common['Authorization'] = `JWT ${this.token}`;

      // start timer to refresh jwt
      this.startRefreshTokenTimer();
    },
    async handleRefreshToken() {
      console.log('refresh token');
      try {
        this.refreshToken = this.getAuthCookie('refreshToken');
      
        if (this.refreshToken) {
          
          const response = await axios.post('/auth/jwt/refresh/', {
            refresh: this.refreshToken,
          });
          
          const payload = response.data;
          this.refreshAuthentication(payload);
        }
      } catch (error) {
        console.error('Failed to refresh token:', error);
        // on error clear state
        this.clearAuthentication();
        throw error;
      }
    },
    startRefreshTokenTimer() {
      // parse json object from base64 encoded jwt token
      const jwtBase64 = this.token.split('.')[1];
      const jwtToken = JSON.parse(atob(jwtBase64));

      // set a timeout to refresh the jwt a minute before it expires
      const expires = new Date(jwtToken.exp * 1000);
      const timeout = expires.getTime() - Date.now() - (60 * 1000);

      this.refreshTokenTimeout = setTimeout(() => {
        this.handleRefreshToken();
      }, timeout);
    },    
    stopRefreshTokenTimer() {
      clearTimeout(this.refreshTokenTimeout);
    },
    clearAuthentication () {
      // stop timer to refresh jwt
      this.stopRefreshTokenTimer();

      // Remove token from axios headers
      delete axios.defaults.headers.common['Authorization'];

      // remove from cookies
      this.removeAuthCookie('authToken');
      this.removeAuthCookie('refreshToken');
      
      this.$reset();
    }      
  }
});
