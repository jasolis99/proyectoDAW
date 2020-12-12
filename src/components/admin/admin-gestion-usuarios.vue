<template>
  <div>
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
    <div
      v-for="user in userfilter"
      :key="user.uid"
      class="flex justify-between items-center border border-black rounded-md p-2 my-5"
    >
      <p class="w-1/2">{{ user.email }}</p>
      <div class="w-1/2 flex justify-around">
        <button
          @click="deleteaccount(user.uid)"
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
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      users: null,
      search: "",
    };
  },
  created() {
    setInterval(() => {
      this.getusers();
    }, 2000);
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
    },
    /**
     * @description
     * Método para enviar correo de cambio de contraseña a un usuario
     * @param {any} email
     * Email del usuario a enviar el correo
     */
    resetpassword(email) {
      firebase.auth().sendPasswordResetEmail(email);
    },
  },
};
</script>

<style>
</style>