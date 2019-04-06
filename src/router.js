import firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home';
import Login from '@/views/Login';
import Detail from '@/views/Detail';
import New from '@/views/New';
import Settings from '@/views/Settings';
import Archive from '@/views/Archive';
//import SignUp from '@/views/SignUp';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/pass',
      name: 'Pass',
      component: Detail,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new',
      name: 'New',
      component: New,
      meta: {
        requiresAuth: true,
        requiresOnline: true
      }
    },/*
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },*/
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/archive',
      name: 'Archive',
      component: Archive,
      meta: {
        requiresAuth: true,
        requiresOnline: true
      }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresOnline = to.matched.some(record => record.meta.requiresOnline);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('home');
  else if (requiresOnline && !navigator.onLine) next('home');
  else next();
});

export default router;
