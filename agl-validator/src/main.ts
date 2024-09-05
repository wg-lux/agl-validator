import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

import './assets/css/nucleo-icons.css';
import './assets/css/nucleo-svg.css';
import './assets/css/material-dashboard.css?v=3.1.0';
import './assets/main.css'; // Your custom styles

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
