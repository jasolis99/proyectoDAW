import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Login from '@/components/login'
import Home from '@/components/home'
import Micuenta from '@/components/micuenta'
import Opciones from '@/components/micuenta-opciones'
import Logros from '@/components/logros'
import Leccion from '@/components/leccion'


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
      props: {registerform:false}
    },
    {
      path: '/register',
      name: 'Login',
      component: Login,
      props: {registerform: true}
    },
    {
      path: '/micuenta',
      name: 'Micuenta',
      component: Micuenta,
      meta:{
        autentificado: true,
      },
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
      meta: {
        autentificado: true,
      },
      children: [
        {path:'/users', name:'Users', component: Usuarios},
        {path:'/lessons', name:'Lessons', component: Lecciones},
      ]
    },
    {
      path:'/leccion/:les',
      name:'Lesson',
      component:Leccion,
      meta: {
        autentificado: true,
      }
    }

  ]
})

export default router;

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  let user = firebase.auth().currentUser;
  let auth = to.matched.some(record=>record.meta.autentificado);
  next();

  if(auth && !user){
    next('Login')
  }
  else if (!auth && user){
    next('/')
  }
  else{
    next();
  }
})
