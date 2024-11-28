import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/annotationen',
      name: 'Annotationen',
      component: () => import('../views/Annotationen.vue')
    },
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('../views/Dashboard.vue')
    },
    {
      path: '/ueber-uns',
      name: 'Über Uns',
      component: () => import('../views/UeberUns.vue')
    },
    {
      path: '/fallgenerator',
      name: 'Fallgenerator',
      component: () => import('../views/Fallgenerator.vue')
    },
    {
      path: '/profil',
      name: 'Profil',
      component: () => import('../views/Profil.vue')
    },
    {
      path: '/validierung',
      name: 'Validierung',
      component: () => import('../views/Validierung.vue')
    }

  ]
});

export default router;
