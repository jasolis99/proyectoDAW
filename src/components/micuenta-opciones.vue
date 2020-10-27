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
        @click="cambiar = !cambiar"
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
            :placeholder="emailactual"
            name=""
            id=""
          />
          <button class="p-1 rounded-md bg-blue-500 text-white my-2">
            Enviar
          </button>
          <button
            @click="cambiar = !cambiar"
            class="p-1 rounded-md bg-blue-500 text-white my-2"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
    <div class="my-5">
      <h1>Eliminar cuenta</h1>
      <p class="my-3">
        Darse de baja conlleva la pérdida de todos los datos y de todos tus
        progresos
      </p>
      <button
        v-if="!baja"
        @click="baja = !baja"
        class="p-1 rounded-md bg-red-600 text-white"
      >
        Darse de baja
      </button>
      <div v-else>
        <p>¿Estas seguro? Esta acción no se podrá revertir</p>
        <button
          @click="eliminarcuenta()"
          class="p-1 rounded-md bg-red-600 text-white my-3"
        >
          Aceptar
        </button>
        <button
          @click="baja = !baja"
          class="p-1 rounded-md bg-red-600 text-white"
        >
          Cancelar
        </button>
      </div>
    </div>
    <div>
      <h1>Cambiar imagen de perfil</h1>
      <p class="my-3">Cambia tu imagen de perfil y da estilo a tu cuenta</p>
      <button
        v-if="!cambiarimagen"
        @click="cambiarimagen = !cambiarimagen"
        class="p-1 rounded-md bg-blue-500 text-white"
      >
        Cambiar imagen de perfil
      </button>
      <div v-else>
        <input
          v-model="imagen"
          placeholder="URL de imagen"
          class="p-1 border border-black rounded-md"
          type="text"
        />
        <button
          class="p-1 rounded-md bg-blue-500 text-white my-2"
          @click="actualizarimagen()"
        >
          Enviar
        </button>
        <button
          class="p-1 rounded-md bg-blue-500 text-white my-2"
          @click="cambiarimagen = !cambiarimagen"
        >
          Cancelar
        </button>
        <div class="flex justify-around my-2">
          <div class="flex flex-col items-center">
            <h1>Imagen actual</h1>
            <img
              class="h-20 w-20 rounded-full"
              v-if="datos.photoURL"
              :src="datos.photoURL"
              alt=""
            />
          </div>
          <div class="flex flex-col items-center">
            <h1>Imagen nueva</h1>
            <img
              class="h-20 w-20 rounded-full"
              v-if="imagen"
              :src="imagen"
              alt=""
            />
          </div>
        </div>
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
      cambiarimagen: false,
      baja: false,
      imagen: "",
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
    updatemail() {
      firebase
        .auth()
        .currentUser.updateEmail(this.correo)
        .then(() => (this.cambiar = false));
    },
    eliminarcuenta() {
      firebase
        .auth()
        .currentUser.delete()
        .then(() => this.$router.replace("/"));
    },
    actualizarimagen() {
      firebase.auth().currentUser.updateProfile({
        photoURL:this.imagen,
      }).then(()=>this.cambiarimagen = !this.cambiarimagen);
    },
  },
};
</script>

<style>
</style>