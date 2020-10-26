<template>
  <div id="app" class="fondo h-screen">
    <div v-if="!verified" class="mx-auto w-1/2 bg-orange-300">
      <h3 class="text-center">
        Debes verificar tu cuenta para poder acceder al contenido de la web
      </h3>
    </div>
    <router-view />
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: "App",
  created() {
    if(firebase.auth().currentUser){
      this.verified = firebase.auth().currentUser.emailVerified;
    }
  },
  data() {
    return {
      verified: true,
      
    }
  },
};
</script>
<style lang="css">
.fondo {
  background: url("./assets/background-educativo-1.png");
  background-repeat: repeat;
  background-size: 100%;
}
</style>
