<template>
  <div id="app" class="fondo h-screen">
    <div v-if="!verified" class="mx-auto w-1/2 bg-orange-300">
      <h3 class="text-center">
        Debes verificar tu cuenta para poder acceder al contenido de la web
      </h3>
    </div>
    <div class="w-11/12 flex justify-between">
      <div>
        <router-link class="px-2 text-white font-thin text-sm" tag="a" to="/"
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
          class="px-2 text-white font-thin text-sm"
          tag="a"
          to="/login"
          >Iniciar sesión</router-link
        >
        <router-link
          class="px-2 text-white font-thin text-sm"
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
      this.verified = firebase.auth().currentUser.emailVerified;
      this.auth = true;
      this.user = firebase.auth().currentUser;
    }
  },
  data() {
    return {
      user: null,
      verified: true,
      auth: false,
      show: false,
    };
  },
  methods: {
    logout() {
      firebase.auth().signOut();
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
