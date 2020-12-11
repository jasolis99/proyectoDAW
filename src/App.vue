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
    <div
      v-if="auth && !verified"
      class="bg-blue-200 my-0 px-6 py-4 left-1/2 rounded-md text-lg flex items-center mx-auto w-3/4 xl:w-2/4"
    >
      <svg viewBox="0 0 24 24" class="text-blue-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
        <path
          fill="currentColor"
          d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"
        ></path>
      </svg>
      <span class="text-blue-800 text-sm">
        Verifica tu bandeja de entrada y confirma tu cuenta para acceder al
        contenido
      </span>
    </div>
    <router-view />
    <footer class="flex justify-between px-4 text-gray-100 bg-gray-800">
      <div class=" w-full flex items-center justify-between mt-6 md:flex-row">
        <div>
          <a href="#" class="text-xl font-bold">iLearnIT</a>
        </div>
        <div class="flex mt-4 md:m-0">
          <div class="-mx-">
            <a href="#" class="px-4 text-sm">José Alberto Solís</a>
          </div>
        </div>
      </div>
    </footer>
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
      if (this.user.emailVerified) {
        this.verified = true;
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
      verified: false,
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
footer{
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
