import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */'../components/auth/Login.vue'),
  },
  {
    path: '/',
    name: 'Main',
    component: () => import(/* webpackChunkName: "dashboard" */ '../components/dashboard'),
  },
  {
    path: '/llamadas',
    name: 'llamadas',
    component: () => import(/* webpackChunkName: "llamadas" */ '../components/unicall'),
  },
  {
    path: '/quienes-somos',
    name: 'quienes-somos',
    component: () => import(/* webpackChunkName: "quienes-somos" */ '../components/quienes-somos'),
  },
  {
    path: '/contactanos',
    name: 'contactanos',
    component: () => import(/* webpackChunkName: "contactanos" */ '../components/contactanos'),
  },
  {
    path: '/seguimiento-llamadas',
    name: 'seguimiento-llamadas',
    component: () => import(/* webpackChunkName: "seguimiento-llamadas" */ '../components/seguimiento-llamadas'),
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: () => import(/* webpackChunkName: "usuarios" */ '../components/usuarios'),
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "notFound" */ '../layout/AppNotFound.vue'),
  }
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
