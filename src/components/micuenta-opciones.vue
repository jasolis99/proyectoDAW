<template>
  <div class="overflow-y-scroll">
    <div v-if="delet" class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Darse de baja
                </h3>
                <div class="mt-2">
                  <p class="text-sm leading-5 text-gray-500">
                    ¿Estás seguro de ello? Todos los datos serán eliminados y no
                    se podrán recuperar
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                @click="deleteaccount()"
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                Aceptar
              </button>
            </span>
            <span
              class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto"
            >
              <button
                @click="delet = !delet"
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                Cancelar
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="modal" class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Introducir contraseña
                </h3>
                <div class="mt-2">
                  <p class="text-sm leading-5 text-gray-500">
                    Para realizar esta acción debes volver a introducir tus
                    datos por motivos de seguridad
                  </p>
                  <p
                    v-if="errorsign"
                    v-text="errorsign"
                    class="text-sm text-red-500"
                  ></p>
                </div>
                <div
                  v-if="datauser.providerData[0].providerId == 'password'"
                  class="mt-2"
                >
                  <input
                    v-model="password"
                    type="password"
                    class="border border-black rounded p-1 text-sm leading-5"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                @click="reauth()"
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                Aceptar
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!updatepicture">
      <div v-if="datauser.providerData[0].providerId == 'password'">
        <h1>Cambio de contraseña</h1>
        <p class="my-3">
          Mantener una contraseña actualizada y segura aumenta la protección de
          tu cuenta.
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
      <div
        v-if="datauser.providerData[0].providerId == 'password'"
        class="my-5"
      >
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
    <div class="my-5">
      <h1>Eliminar cuenta</h1>
      <p class="my-3">
        Darse de baja conlleva la pérdida de todos los datos y de todos tus
        progresos
      </p>
      <button
        @click="delet = !delet"
        class="p-1 rounded-md bg-red-600 text-white"
      >
        Darse de baja
      </button>
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
      password: "",
      modal: true,
      errorsign: null,
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
        picture: null,
        newpicture: null,
        send: false,
        delet: false,
        oksend: false,
        okmail: false,
        okpicture: false,
        password: "",
        modal: false,
        errorsign: null,
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
          console.log(error);
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
    reauth() {
      switch (this.datauser.providerData[0].providerId) {
        case "password":
          this.reauthpass();
          break;

        case "google.com":
          this.reauthgoogle();
          break;

        default:
          this.reauthfacebook();
      }
    },
    reauthpass() {
      const credential = firebase.auth.EmailAuthProvider.credential(
        this.datauser.email,
        this.password
      );
      // Now you can use that to reauthenticate
      this.datauser.reauthenticateWithCredential(credential).then(
        () => {
          this.modal = !this.modal;
        },
        (error) => (this.errorsign = error.message)
      );
    },
    reauthgoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.datauser.reauthenticateWithPopup(provider).then(
        () => {
          this.modal = !this.modal;
        },
        (error) => (this.errorsign = error.message)
      );
    },
    reauthfacebook() {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.datauser.reauthenticateWithPopup(provider).then(
        () => {
          this.modal = !this.modal;
        },
        (error) => (this.errorsign = error.message)
      );
    },
  },
};
</script>

<style>
</style>