import { defineStore } from 'pinia';
import axios from 'axios';
import Cookies from 'js-cookie';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({    
    username: null,
    token: null,
    refreshToken: null
  }),
  actions: {
    async handleLogin(username, password) {
      try {
        const response = await axios.post('/auth/jwt/create/', {
          username,
          password,
        });
        const { access, refresh } = response.data;
        this.token = access;
        this.refreshToken = refresh;
        this.username = username
        this.isAuthenticated = true;
        
        Cookies.set('authToken', access, { secure: true, sameSite: 'strict' });
        Cookies.set('refreshToken', refresh, { secure: true, sameSite: 'strict' });
        Cookies.set('username', username, { secure: true, sameSite: 'strict' });

        // Set token in axios headers
        axios.defaults.headers.common['Authorization'] = `JWT ${this.token}`;

        this.handleCurrentUser();
        this.startRefreshTokenTimer();
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    async handleCurrentUser() {
      try {
        const response = await axios.get('/auth/users/me/', {});
        const { username } = response.data;
        this.username = username
       
        Cookies.set('username', username, { secure: true, sameSite: 'strict' });
        return this.username;
      } catch (error) {
        console.error('getting current user fails', error);
        throw error;
      }
    },    
    async handleLogout() {
      this.stopRefreshTokenTimer();

      this.token = null;
      this.refreshToken = null;
      this.isAuthenticated = false;
      this.username = null;
      
      // remove from cookies
      Cookies.remove('authToken');
      Cookies.remove('refreshToken');
      Cookies.remove('username');
      
      // Remove token from axios headers
      delete axios.defaults.headers.common['Authorization'];
    },
    async handleRefreshToken() {
      try {
        this.refreshToken = Cookies.get('refreshToken');
      
        if (this.refreshToken) {
          
          const response = await axios.post('/auth/jwt/refresh/', {
            refresh: this.refreshToken,
          });
          const { access } = response.data;
          this.token = access;
          this.isAuthenticated = true;

          Cookies.set('authToken', access, { secure: true, sameSite: 'strict' });

          // Update token in axios headers
          axios.defaults.headers.common['Authorization'] = `JWT ${this.token}`;

          this.handleCurrentUser();
          this.startRefreshTokenTimer();
        }
        
      } catch (error) {
        console.error('Failed to refresh token:', error);

        // remove from cookies
        Cookies.remove('authToken');
        Cookies.remove('refreshToken');
        Cookies.remove('username');

        // Remove token from axios headers
        delete axios.defaults.headers.common['Authorization'];

        throw error;
      }
    },
    startRefreshTokenTimer() {
      // parse json object from base64 encoded jwt token
      const jwtBase64 = this.token.split('.')[1];
      const jwtToken = JSON.parse(atob(jwtBase64));

      // set a timeout to refresh the token a minute before it expires
      const expires = new Date(jwtToken.exp * 1000);
      const timeout = expires.getTime() - Date.now() - (60 * 1000);

      this.refreshTokenTimeout = setTimeout(() => {
        this.handleRefreshToken();
      }, timeout);
    },    
    stopRefreshTokenTimer() {
      clearTimeout(this.refreshTokenTimeout);
    }      
  },
});
