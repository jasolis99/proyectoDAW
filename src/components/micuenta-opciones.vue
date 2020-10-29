<template>
  <div class="h-auto overflow-y-auto">
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
            @click="resetear()"
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
          @click="resetear()"
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
        <div
          class="relative border border-dashed h-48 bg-blue-100 border-blue-200"
        >
          <input
            type="file"
            accept="image/*"
            id="imagen"
            class="z-10 relative opacity-0 border border-blue-200 w-full h-full"
            @change="processFile($event)"
          />
          <div class="absolute flex items-center inset-0">
            <p class="z-0 mx-auto w-4/5 text-center">
              Arrastra y suelta la imagen
            </p>
            <button
              v-if="!enviar"
              @click="resetear()"
              class="z-10 absolute bottom-0 p-1 rounded-md bg-blue-500 text-white w-full"
            >
              Cancelar
            </button>
            <div v-else class="absolute bottom-0 flex w-full">
              <button
                @click="actualizarimagen()"
                class="z-10 w-1/2 p-1 rounded-md bg-blue-500 text-white w-full"
              >
                Enviar
              </button>
              <button
                @click="prueba()"
                class="z-10 w-1/2 p-1 rounded-md bg-blue-500 text-white w-full"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
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
              v-if="nuevaimagen"
              :src="nuevaimagen"
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
import Vue from "vue";
export default {
  data() {
    return {
      datos: firebase.auth().currentUser,
      emailactual: firebase.auth().currentUser.email,
      correo: "",
      cambiar: false,
      cambiarimagen: false,
      baja: false,
      imagen: null,
      nuevaimagen: null,
      enviar: false,
    };
  },
  methods: {
    resetear() {
      const datos = {
        datos: firebase.auth().currentUser,
        emailactual: firebase.auth().currentUser.email,
        correo: "",
        cambiar: false,
        cambiarimagen: false,
        baja: false,
        imagen: null,
        nuevaimagen: null,
        enviar: false,
      };
      Object.assign(this.$data, datos);
    },
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
    processFile(event) {
      this.imagen = event.target.files[0];
      this.nuevaimagen = URL.createObjectURL(this.imagen);
      this.enviar = true;
    },
    actualizarimagen() {
      let storageRef = firebase.storage().ref(firebase.auth().currentUser.uid);
      storageRef.put(this.imagen).then((image) => {
        this.cambiarimagen = !this.cambiarimagen;
        console.log(image);
        storageRef.getDownloadURL().then((url) => {
          firebase.auth().currentUser.updateProfile({
            photoURL: url,
          });
        });
      });

      // firebase.auth().currentUser.updateProfile({
      //   photoURL:this.imagen,
      // }).then(()=>this.cambiarimagen = !this.cambiarimagen);
    },
  },
};
</script>

<style>
</style>