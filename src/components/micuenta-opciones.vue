<template>
  <div class="overflow-y-scroll">
    <div>
      <h1>Cambio de contraseña</h1>
      <p class="my-3">
        Mantener una contraseña actualizada y segura aumenta la protección de tu
        cuenta.
      </p>
      <button
        v-if="!oksend"
        @click="updatepassword()"
        class="p-1 rounded-md bg-blue-500 text-white"
      >
        Solicitar cambio de contraseña
      </button>
      <div v-else class="p-1 rounded-md bg-green-500 text-white">
        Correo enviado correctamente
      </div>
    </div>
    <div class="my-5">
      <h1>Cambiar correo electrónico</h1>
      <p class="my-3">
        Para cambiar el correo de la cuenta, pinche en el botón debajo del
        texto.
      </p>
      <button
        v-if="!change && !okmail"
        @click="change = !change"
        class="p-1 rounded-md bg-blue-500 text-white"
      >
        Solicitar cambio de correo electrónico
      </button>
      <div v-else-if="!okmail">
        <form @submit.prevent="updatemail()" action="">
          <input
            class="block w-2/5 border border-black rounded p-1"
            type="email"
            v-model="email"
            :placeholder="currentmail"
            name=""
            id=""
            required
          />
          <button
            type="submit"
            class="p-1 rounded-md bg-blue-500 text-white my-2"
          >
            Enviar
          </button>
          <button
            type="button"
            @click="reset()"
            class="p-1 rounded-md bg-blue-500 text-white my-2"
          >
            Cancelar
          </button>
        </form>
      </div>
      <div v-if="okmail" class="p-1 rounded-md bg-green-500 text-white">
        Correo cambiado correctamente
      </div>
    </div>
    <div class="my-5">
      <h1>Eliminar cuenta</h1>
      <p class="my-3">
        Darse de baja conlleva la pérdida de todos los datos y de todos tus
        progresos
      </p>
      <button
        v-if="!delet"
        @click="delet = !delet"
        class="p-1 rounded-md bg-red-600 text-white"
      >
        Darse de baja
      </button>
      <div v-else>
        <p>¿Estas seguro? Esta acción no se podrá revertir</p>
        <button
          @click="deleteaccount()"
          class="p-1 rounded-md bg-red-600 text-white my-3"
        >
          Aceptar
        </button>
        <button @click="reset()" class="p-1 rounded-md bg-red-600 text-white">
          Cancelar
        </button>
      </div>
    </div>
    <div>
      <h1>Cambiar imagen de perfil</h1>
      <p class="my-3">Cambia tu imagen de perfil y da estilo a tu cuenta</p>
      <button
        v-if="!updatepicture && !okpicture"
        @click="updatepicture = !updatepicture"
        class="p-1 rounded-md bg-blue-500 text-white"
      >
        Cambiar imagen de perfil
      </button>
      <div v-else-if="!okpicture">
        <div
          class="relative border border-dashed h-48 bg-blue-100 border-blue-200"
        >
          <input
            type="file"
            accept="image/*"
            id="picture"
            class="z-10 relative opacity-0 border border-blue-200 w-full h-full"
            @change="processFile($event)"
          />
          <div class="absolute flex items-center inset-0">
            <p class="z-0 mx-auto w-4/5 text-center">
              Arrastra y suelta la imagen
            </p>
            <button
              v-if="!send"
              @click="reset()"
              class="z-10 absolute bottom-0 p-1 rounded-md bg-blue-500 text-white w-full"
            >
              Cancelar
            </button>
            <div v-else class="absolute bottom-0 flex w-full">
              <button
                @click="updatepicturemethod()"
                class="z-10 w-1/2 p-1 rounded-md bg-blue-500 text-white w-full"
              >
                Enviar
              </button>
              <button
                @click="reset()"
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
              v-if="datauser.photoURL"
              :src="datauser.photoURL"
              alt=""
            />
          </div>
          <div class="flex flex-col items-center">
            <h1>Imagen nueva</h1>
            <img
              class="h-20 w-20 rounded-full"
              v-if="newpicture"
              :src="newpicture"
              alt=""
            />
          </div>
        </div>
      </div>
      <div v-if="okpicture" class="p-1 rounded-md bg-green-500 text-white">
        Imagen actualizada correctamente
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
      datauser: firebase.auth().currentUser,
      currentmail: firebase.auth().currentUser.email,
      email: "",
      change: false,
      updatepicture: false,
      delet: false,
      picture: null,
      newpicture: null,
      send: false,
      oksend: false,
      okmail: false,
      okpicture: false,
    };
  },
  methods: {
    reset() {
      const data = {
        datauser: firebase.auth().currentUser,
        currentmail: firebase.auth().currentUser.email,
        email: "",
        change: false,
        updatepicture: false,
        deleteaccount: false,
        picture: null,
        newpicture: null,
        send: false,
        delet: false,
        oksend: false,
        okmail: false,
        okpicture: false,
      };
      Object.assign(this.$data, data);
    },
    updatepassword() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.datauser.email)
        .then(() => {
          this.oksend = true;
          setTimeout(() => {
            this.oksend = !this.oksend;
          }, 5000);
        })
        .catch(function (error) {
          console.log(error.message);
        });
    },
    updatemail() {
      this.datauser.updateEmail(this.email).then(() => {
        setTimeout(() => {
          this.reset();
        }, 3000);
        this.okmail = !this.okmail;
        setTimeout(() => {
          this.reset();
        }, 5000);
      });
    },
    deleteaccount() {
      let storageRef = firebase.storage().ref(firebase.auth().currentUser.uid);
      storageRef.delete().then(() => {
        firebase
          .auth()
          .currentUser.delete()
          .then(() => this.$router.replace("/"));
      });
    },
    processFile(event) {
      this.picture = event.target.files[0];
      this.newpicture = URL.createObjectURL(this.picture);
      this.send = true;
    },
    updatepicturemethod() {
      let storageRef = firebase.storage().ref(firebase.auth().currentUser.uid);
      storageRef.put(this.picture).then(() => {
        storageRef.getDownloadURL().then((url) => {
          firebase.auth().currentUser.updateProfile({
            photoURL: url,
          });
        });
      });
      this.okpicture = !this.okpicture;
      setTimeout(() => {
        this.reset();
      }, 2000);
    },
    reautenticar(){
      
    }
  },
};
</script>

<style>
</style>