// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import firebase from 'firebase'
import App from './App'
import router from './router'
require("./style/main.css")

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDt-zVUB-pn6KLt1INtPWlYgloqNSIV4fY",
  authDomain: "proyecto-daw-eba1d.firebaseapp.com",
  databaseURL: "https://proyecto-daw-eba1d.firebaseio.com",
  projectId: "proyecto-daw-eba1d",
  storageBucket: "proyecto-daw-eba1d.appspot.com",
  messagingSenderId: "503936455919",
  appId: "1:503936455919:web:488d8b93951bd6ff6d771a"
};
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
