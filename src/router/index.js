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
    path: '/mensajes-fortaleza',
    name: 'mensaje-fortaleza',
    component: () => import(/* webpackChunkName: "mensaje-fortaleza" */ '../components/mensajes-fortaleza'),
  },
  {
    path: '/voces-fortaleza',
    name: 'voces-fortaleza',
    component: () => import(/* webpackChunkName: "voces-fortaleza" */ '../components/voces-fortaleza'),
  },
  {
    path: '/entregas',
    name: 'entregas',
    component: () => import(/* webpackChunkName: "entregas" */ '../components/entregas'),
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
    path: '/cuenta',
    name: 'cuenta',
    component: () => import(/* webpackChunkName: "cuenta" */ '../components/cuenta'),
  },
  {
    path: '/categorias-llamada',
    name: 'categorias-llamada',
    component: () => import(/* webpackChunkName: "categorias-llamadas" */ '../components/categorias-llamadas'),
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
