// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import firebase from 'firebase'
import App from './App'
import router from './router'
import {firebaseConfig} from './firebase-config'

require('./style/main.css')

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

/* eslint-disable no-new */

firebase.auth().onAuthStateChanged((user)=>{
  console.log(user)
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
})
