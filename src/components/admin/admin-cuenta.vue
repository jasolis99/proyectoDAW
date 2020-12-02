<template>
  <div id="centro" class="container mx-auto shadow-md rounded-md bg-white">
    <div class="flex rounded-md border border-black">
      <div class="p-10 w-1/2 flex border-r border-black flex-col">
        <router-link class="my-5" to="users">Gestión de usuarios</router-link>
        <router-link class="my-5" to="lessons"
          >Gestión de lecciones</router-link
        >
      </div>
      <div class="w-1/2 p-4">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {

  data() {
    return {};
  },
  /**
   * @description
   * Comprueba si el usuario es administrador. Si no es, se le devuelve a la pantalla inicial.
   */
  created() {
    if (firebase.auth().currentUser.uid != "j2ZZ3o5HWMYawkUIkjMVPoiNngJ3") {
      // this.$router.replace('/')
      console.log("No eres admin");
    }
  },
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Montserrat:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic);
@import url(https://fonts.googleapis.com/css?family=Roboto:100,100italic,300,300italic,regular,italic,500,500italic,700,700italic,900,900italic);
h1,
a {
  font-family: Montserrat;
}
p {
  font-family: Roboto;
}
#centro {
  position: relative;
  top: 25%;
}
</style>