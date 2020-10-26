<template>
  <div>
    <div>
      <h1>Cambio de contraseña</h1>
      <p class="my-3">
        Mantener una contraseña actualizada y segura aumenta la protección de tu
        cuenta.
      </p>
      <button
        @click="cambiocontrasena()"
        class="p-1 rounded-md bg-blue-500 text-white"
      >
        Solicitar cambio de contraseña
      </button>
    </div>

    <div class="my-5">
      <h1>Cambiar correo electrónico</h1>
      <p class="my-3">
        Para cambiar el correo de la cuenta, pinche en el botón debajo del
        texto.
      </p>
      <button
        v-if="!cambiar"
        @click="cambiomail()"
        class="p-1 rounded-md bg-blue-500 text-white"
      >
        Solicitar cambio de correo electrónico
      </button>
      <div v-else>
        <form @submit.prevent="updatemail()" action="">
          <input
            class="block w-2/5 border border-black rounded p-1"
            type="email"
            v-model="correo"
            :placeholder= "emailactual"
            name=""
            id=""
          />
          <button class="p-1 rounded-md bg-blue-500 text-white my-2">
            Enviar
          </button>
          <button
            @click="cambiomail()"
            class="p-1 rounded-md bg-blue-500 text-white my-2"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      datos: firebase.auth().currentUser,
      emailactual: firebase.auth().currentUser.email,
      correo: "",
      cambiar: false,
    };
  },
  methods: {
    cambiocontrasena() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.datos.email)
        .then(function () {
          // Email sent.
        })
        .catch(function (error) {
          // An error happened.
        });
    },
    cambiomail() {
      this.cambiar = !this.cambiar;
    },
    updatemail(){
      firebase.auth().currentUser.updateEmail(this.correo).then(()=>
        this.cambiar = false
      )
    }
  },
};
</script>

<style>
</style>