<template>
  <div>
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
                  Dar de baja a {{ maildelete }}
                </h3>
                <div class="mt-2">
                  <p class="text-sm leading-5 text-gray-700">
                    ¿Estás seguro de ello? Todos los datos de
                    {{ maildelete }} serán eliminados y no se podrán recuperar
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                @click="deleteaccount(userdelete)"
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-700 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                Aceptar
              </button>
            </span>
            <span
              class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto"
            >
              <button
                @click="modal = false"
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
    <div v-if="send" class="fixed z-10 inset-0 overflow-y-auto">
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
                  Correo enviado
                </h3>
                <div class="mt-2">
                  <p class="text-sm leading-5 text-gray-700">
                    El correo fue enviado correctamente al usuario.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                @click="send = false"
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-700 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                Aceptar
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
    <h1>Usuarios registrados</h1>
    <div class="flex justify-end">
      <input
        class="border border-black rounded-md w-1/2 p-1"
        type="search"
        name=""
        id=""
        v-model="search"
      />
    </div>
    <div class=" my-2 h-64 overflow-y-auto">
      <div
        v-for="user in userfilter"
        :key="user.uid"
        class="flex justify-between items-center border border-black rounded-md p-2 my-5"
      >
        <p class="w-1/2">{{ user.email }}</p>
        <div class="w-1/2 flex justify-around">
          <button
            @click="
              modal = true;
              userdelete = user.uid;
              maildelete = user.email;
            "
            class="p-1 border border-black bg-red-600 rounded-md"
          >
            Dar de baja
          </button>
          <button
            @click="resetpassword(user.email)"
            class="p-1 border border-black bg-green-400 rounded-md"
          >
            Cambio de contraseña
          </button>
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
      users: null,
      search: "",
      modal: false,
      userdelete: "",
      maildelete: "",
      send: false,
    };
  },
  created() {
    setTimeout(() => {
      this.getusers();
    }, 1000);
  },
  computed: {
    /**
     * @description
     * Método que nos permitirá filtrar usuarios según nuestra búsqueda.
     * @returns {array}
     * Array con el array de usuarios filtrados.
     */
    userfilter() {
      if (this.users)
        return this.users.filter((userdata) =>
          userdata.email.includes(this.search)
        );
    },
  },
  methods: {
    /**
     * @description
     * Obtiene los usuarios registrados en la plataforma.
     * Conecta con nuestro servidor node.js y obtiene los datos
     */
    async getusers() {
      const response = await fetch(
        "https://bakend-daw-project.herokuapp.com/users"
      );
      this.users = await response.json();
    },
    /**
     * @description
     * Método para dar de baja a un usuario. Conecta con nuestro servirdor node.js
     * y éste eliminará el usuario con el uid indicado.
     * @param {array} uid
     * Array con los datos del usuario.
     */
    deleteaccount(uid) {
      if (firebase.storage().ref(uid)) {
        let storageRef = firebase.storage().ref(uid);
        storageRef.delete();
      }

      if (firebase.database().ref("Logros/" + uid)) {
        firebase
          .database()
          .ref("Logros/" + uid)
          .remove();
      }
      fetch("https://bakend-daw-project.herokuapp.com/deleteuser", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: uid }),
      });
      this.modal = false;
      setTimeout(() => {
        this.getusers()
      }, 1000);
    },
    /**
     * @description
     * Método para enviar correo de cambio de contraseña a un usuario
     * @param {any} email
     * Email del usuario a enviar el correo
     */
    resetpassword(email) {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          this.send = true;
        });
    },
  },
};
</script>

<style>
</style>