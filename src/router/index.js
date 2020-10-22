import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Login from '@/components/login'
import Home from '@/components/home'
import Micuenta from '@/components/micuenta'
import Opciones from '@/components/micuenta-opciones'
import Logros from '@/components/logros'


// admin components

import Adminlogin from '@/components/admin/login-admin'
import Dashboard from '@/components/admin/admin-cuenta'
import Usuarios from '@/components/admin/admin-gestion-usuarios'
import Lecciones from '@/components/admin/admin-gestion-lecciones'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/micuenta',
      name: 'Micuenta',
      component: Micuenta,
      children: [
        {path:'/opciones', name: 'Opciones' ,component:Opciones},
        {path:'/logros', name: 'Logros' ,component:Logros},
      ]
    },
    {
      path: '/admin',
      name: 'Adminlogin',
      component: Adminlogin,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {path:'/users', name:'Users', component: Usuarios},
        {path:'/lessons', name:'Lessons', component: Lecciones},
      ]
    },

  ]
})

export default router;

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  let user = firebase.auth().currentUser;
  let auth = to.matched.some(record=>record.meta.autentificado);
  console.log(user);
  next();

  // if(auth && !user){
  //   next('Login')
  // }
  // else{
  //   next();
  // }
})
