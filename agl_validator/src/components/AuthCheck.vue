// AuthCheck.vue
<template>
  <div class="auth-container p-4">
    <!-- Loading State -->
    <div v-if="loading" class="text-center">
      <div class="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
      <p class="mt-2 text-gray-600">Checking authentication status...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <p class="font-bold">Authentication Error</p>
      <p>{{ error }}</p>
      <button @click="checkAuth" class="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        Retry
      </button>
    </div>

    <!-- Authenticated State -->
    <div v-else-if="isAuthenticated" class="bg-white rounded shadow p-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Welcome, {{ username }}</h2>
        <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
      <div class="space-y-2">
        <p><strong>Groups:</strong></p>
        <ul class="list-disc list-inside">
          <li v-for="group in userGroups" :key="group" class="text-gray-700">
            {{ group }}
          </li>
        </ul>
      </div>
      <slot name="authenticated-content"></slot>
    </div>

    <!-- Not Authenticated State -->
    <div v-else class="bg-white rounded shadow p-4 text-center">
      <h2 class="text-xl font-bold mb-4">Please Sign In</h2>
      <button @click="login" class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
        Login with Keycloak
      </button>
      <slot name="unauthenticated-content"></slot>
    </div>
  </div>
</template>

// AuthCheck.vue
<script>
import axios from 'axios';

export default {
  name: 'AuthCheck',
  
  data() {
    return {
      loading: true,
      error: null,
      isAuthenticated: false,
      username: '',
      userGroups: [],
    };
  },

  created() {
    this.checkAuth();
  },

  methods: {
    async checkAuth() {
      // Development bypass
      if (process.env.NODE_ENV === 'development') {
        this.isAuthenticated = true;
        this.username = 'DevUser';
        this.userGroups = ['admin', 'user-intern'];
        this.loading = false;
        return;
      }

      try {
        this.loading = true;
        this.error = null;
        const response = await axios.get('/user-status/');
        this.isAuthenticated = response.data.is_authenticated;
        
        if (this.isAuthenticated) {
          this.username = response.data.username;
          this.userGroups = response.data.groups || [];
        }
      } catch (err) {
        this.error = 'Failed to check authentication status';
        console.error('Auth check error:', err);
      } finally {
        this.loading = false;
      }
    },

    login() {
      if (process.env.NODE_ENV === 'development') {
        this.checkAuth(); // This will set the dev user
        return;
      }
      window.location.href = '/accounts/login/';
    },

    async logout() {
      if (process.env.NODE_ENV === 'development') {
        this.isAuthenticated = false;
        this.username = '';
        this.userGroups = [];
        return;
      }

      try {
        await axios.post('/accounts/logout/');
        window.location.href = '/redirect-after-logout/';
      } catch (err) {
        this.error = 'Failed to logout';
        console.error('Logout error:', err);
      }
    },
  },
};
</script>