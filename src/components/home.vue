<template>
  <div class="container mx-auto">
    <div v-if="!auth" class="flex justify-end">
      <router-link class="px-2 text-white font-thin text-sm" tag="a" to="/login"
        >Iniciar sesión</router-link
      >
      <router-link class="px-2 text-white font-thin text-sm" tag="a" to="/login"
        >Registro</router-link
      >
    </div>
    <div v-if="auth" class="flex justify-end">
      <div @click="show = !show" class="relative">
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
          <a
            @click="logout()"
            href="#"
            class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
            >Cerrar sesión</a
          >
        </div>
      </div>
    </div>
    <div id="centro" class="flex flex-col items-center">
      <h1 class="text-white font-bold">¿Qué quieres aprender hoy?</h1>
      <input
        class="w-1/2 rounded-md p-2"
        type="search"
        placeholder="Buscar lección"
        name=""
        id=""
      />
      <div
        class="w-2/3 bg-white border border-red-200 rounded-md flex justify-around items-center p-3 mt-10"
      >
        <img
          class="w-1/5 border border-red-200"
          src="../assets/cuadrado.jpg"
          alt=""
        />
        <p class="p-1 text-xs text-justify">
          <span class="block text-sm">Título de la lección</span>
          Esto sería la descripción de la lección que se va a realizar. Donde el
          alumno podrá leer toda la información necesaria para saber en qué
          consiste la lección
        </p>
        <button
          class="p-1 text-xs text-white bg-green-400 border border-red-200 rounded-md"
        >
          Comenzar
        </button>
      </div>
    </div>
    <pre>
      {{ $data }}
    </pre>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      user: null,
      auth: false,
      show: false,
      name: '',
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.user = firebase.auth().currentUser;
      if (!this.user.photoURL) {
        this.name = this.user.email.charAt(0);
      }
      this.auth = true;
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut();
    },
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,300italic,regular,italic,600,600italic,700,700italic,800,800italic);
@import url(https://fonts.googleapis.com/css?family=Roboto:100,100italic,300,300italic,regular,italic,500,500italic,700,700italic,900,900italic);
@import url(https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic);
@import url(https://fonts.googleapis.com/css?family=Chilanka:regular);

p {
  font-family: Open Sans;
}
button {
  font-family: Arial, Helvetica, sans-serif;
}
h1 {
  font-family: Chilanka;
  font-size: 40px;
  text-transform: uppercase;
}
#centro {
  margin-top: 15%;
}
</style>