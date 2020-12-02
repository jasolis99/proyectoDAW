<template>
  <div id="app" class="fondo h-screen">
    <div class="w-full flex justify-between items-center p-3 bg-gray-800">
      <div>
        <router-link class="px-2 text-white font-thin text-md" tag="a" to="/"
          >Inicio</router-link
        >
      </div>
      <div v-if="auth" @click="show = !show" class="relative">
        <button
          class="block h-12 w-12 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white"
        >
          <img
            v-if="user.photoURL"
            class="h-full w-full object-cover"
            :src="user.photoURL"
            alt="Your avatar"
          />
          <div v-else class="h-full w-full object-cover bg-white">
            <span class="text-center uppercase text-3xl" v-text="name"></span>
          </div>
        </button>
        <div
          v-if="show"
          class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl"
        >
          <router-link
            to="/micuenta"
            tag="a"
            href="#"
            class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
            >Mi cuenta</router-link
          >
          <router-link
            v-if="adminlog == true"
            to="/dashboard"
            tag="a"
            href="#"
            class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
            >Gestión de aplicación</router-link
          >
          <a
            @click="logout()"
            href="#"
            class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
            >Cerrar sesión</a
          >
        </div>
      </div>
      <div v-else class="flex justify-end">
        <router-link
          class="px-2 text-white font-thin text-md"
          tag="a"
          to="/login"
          >Iniciar sesión</router-link
        >
        <router-link
          class="px-2 text-white font-thin text-md"
          tag="a"
          to="/register"
          >Registro</router-link
        >
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "App",
  created() {
    if (firebase.auth().currentUser) {
      this.auth = true;
      this.user = firebase.auth().currentUser;
      if (!this.user.photoURL) {
        this.name = this.user.email.charAt(0);
      }
      this.admin();
    }
  },
  data() {
    return {
      user: null,
      auth: false,
      show: false,
      adminlog: false,
    };
  },
  methods: {
    admin() {
      if (this.user.email == "josealbertosolis99@gmail.com") {
        this.adminlog = true;
      }
    },
    logout() {
      firebase.auth().signOut().then(this.$router.replace("/"));
    },
  },
};
</script>
<style lang="css">
@import "./style/main.css";
.fondo {
  background: url("./assets/background-educativo-1.png");
  background-repeat: repeat;
  background-size: 100%;
}
</style>
