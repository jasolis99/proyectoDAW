<template>
  <div>
    <div>
      <h1>Cambio de contraseña</h1>
      <p class="my-3">
        Mantener una contraseña actualizada y segura aumenta la protección de tu
        cuenta.
      </p>
      <button @click="cambiocontrasena()" class="p-1 rounded-md bg-blue-500 text-white">
        Solicitar cambio de contraseña
      </button>
    </div>

    <div class="my-5">
      <h1>Cambiar correo electrónico</h1>
      <p class="my-3">
        Para solicitar el cambio de correo de la cuenta, pinche en el botón
        debajo del texto.
      </p>
      <button @click="cambiomail()" class="p-1 rounded-md bg-blue-500 text-white">
        Solicitar cambio de correo electrónico
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      datos: firebase.auth().currentUser,
    };
  },
  methods: {
    cambiocontrasena() {
      firebase.auth().sendPasswordResetEmail(this.datos.email)
        .then(function () {
          // Email sent.
        })
        .catch(function (error) {
          // An error happened.
        });
    },
    cambiomail(){
    }
  },
};
</script>

<style>
</style>