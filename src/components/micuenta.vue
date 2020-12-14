<template>
  <div id="centro" class="container mx-auto">
    <div class="flex rounded-md bg-white border border-black">
      <div class="p-10 w-2/5 flex border-r border-black flex-col">
        <router-link tag="a" class="my-5" to="opciones">Mi Cuenta</router-link>
        <router-link class="my-5" to="logros">Logros</router-link>
        <a @click="logout()" href="#">Cerrar sesión</a>
      </div>
      <div class="w-1/2 p-4">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  methods: {
    logout() {
      firebase.auth().signOut().then(()=>this.$router.replace("/"));
    },
  },
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Montserrat:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic);
@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,300italic,regular,italic,600,600italic,700,700italic,800,800italic);
#centro {
  position: relative;
  top: 10%;
}
h1,
a {
  font-family: Montserrat;
}
p {
  font-family: Open Sans;
}
</style>