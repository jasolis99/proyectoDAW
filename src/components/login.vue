<template>
  <div
    id="centro"
    class="w-2/5 container shadow-md rounded-md bg-white mx-auto px-10 py-5 md:w-2/3"
  >
    <h1 v-if="!registro" class="text-center text-3xl font-light">
      Iniciar sesión
    </h1>
    <h1 v-else class="text-center text-3xl font-light">Regístrate</h1>
    <div class="mx-auto mt-2 mb-2 w-1/2 px-5 flex justify-around">
      <button
        @click="googlelog()"
        class="w-2/5 p-2 fa fa-google googleico text-white rounded"
      >
        <span class="p-2">Google</span>
      </button>
      <button
        @click="facebooklog()"
        class="w-2/5 p-2 fa fa-facebook facebookico text-white rounded"
      >
        <span class="p-2">Facebook</span>
      </button>
    </div>

    <form
      @submit.prevent="login"
      v-if="!registro"
      class="mx-auto flex flex-col px-5 justify-between w-1/2"
    >
      <label for="">Correo</label>
      <input
        class="bg-gray-400 rounded px-2 py-2"
        type="email"
        name=""
        v-model="correo"
      />
      <label for="">Contraseña</label>
      <input
        class="bg-gray-400 rounded px-2 py-2"
        type="password"
        name=""
        v-model="contrasena"
      />
      <div v-if="errormessage">
        <p v-text="errormessage" class="text-center text-red-600" />
      </div>
      <button
        class="block bg-black text-white mt-5 px-2 py-2 rounded-md"
        type="submit"
        value=""
      >
        Iniciar sesión
      </button>
      <p class="text-center">
        ¿No estás registrado?<span class="p-1" href="#" @click="registro = true"
          >Regístrate</span
        >
      </p>
    </form>

    <form
      @submit.prevent="register"
      v-else
      class="mx-auto flex flex-col px-5 justify-between w-1/2"
    >
      <label for="">Nombre y Apellido</label>
      <input
        class="bg-gray-400 rounded px-2 py-2"
        type="text"
        name=""
        v-model="displayName"
      />
      <label for="">Correo</label>
      <input
        class="bg-gray-400 rounded px-2 py-2"
        type="email"
        name=""
        v-model="correo"
      />
      <label for="">Contraseña</label>
      <input
        class="bg-gray-400 rounded px-2 py-2"
        type="password"
        name=""
        id=""
        v-model="contrasena"
      />
      <label for="">Repite contraseña</label>
      <input
        class="bg-gray-400 rounded px-2 py-2"
        type="password"
        name=""
        v-model="repite"
        @keyup="comprobar()"
      />
      <div v-if="errorcontrasena" class="mx-auto">
        <p class="text-center text-red-600">Las contraseñas no coinciden</p>
      </div>
      <div v-if="errormessage">
        <p v-text="errormessage" class="text-center text-red-600" />
      </div>
      <button
        class="block bg-black text-white mt-5 px-2 py-2 rounded-md"
        type="submit"
        value=""
        id="btn_registro"
      >
        Registrarse
      </button>
      <p class="text-center">
        ¿Tienes cuenta?<span class="p-1" @click="registro = false"
          >Inicia sesión</span
        >
      </p>
    </form>
  </div>
</template>



<script>
import firebase from "firebase";
export default {
  created() {
    if (firebase.auth().currentUser) this.$router.replace("/");
  },
  data() {
    return {
      registro: false,
      errorcontrasena: false,
      errormessage: "",
      displayName: "",
      correo: "",
      contrasena: "",
      repite: "",
    };
  },
  methods: {
    googlelog() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(
          (user) => this.$router.replace("/"),
          (error) => console.log(error)
        );
      // .then(function (result) {
      //   // This gives you a Google Access Token. You can use it to access the Google API.
      //   var token = result.credential.accessToken;
      //   // The signed-in user info.
      //   var user = result.user;
      //   // ...
      //   alert(token);
      // })
      // .catch(function (error) {
      //   // Handle Errors here.
      //   var errorCode = error.code;
      //   var errorMessage = error.message;
      //   // The email of the user's account used.
      //   var email = error.email;
      //   // The firebase.auth.AuthCredential type that was used.
      //   var credential = error.credential;
      //   // ...
      //   console.log("Error porque me da la gana")
      // });
    },
    facebooklog() {
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(
          (user) => this.$router.replace("/"),
          (error) => console.log(error)
        );
      // .then(function (result) {
      //   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      //   var token = result.credential.accessToken;
      //   // The signed-in user info.
      //   var user = result.user;
      //   // ...
      // })
      // .catch(function (error) {
      //   // Handle Errors here.
      //   var errorCode = error.code;
      //   var errorMessage = error.message;
      //   // The email of the user's account used.
      //   var email = error.email;
      //   // The firebase.auth.AuthCredential type that was used.
      //   var credential = error.credential;
      //   // ...
      // });
    },

    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.correo, this.contrasena)
        .then(
          (user) => this.$router.replace("/"),
          (error) => {
            this.errormessage = error.message;
          }
        );
    },

    register() {
      if (this.contrasena == this.repite) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.correo, this.contrasena)
          .then(
            (user) => {
              firebase.auth().currentUser.updateProfile({
                displayName: this.displayName,
                photoURL: "https://www.kindpng.com/picc/m/9-93879_computer-icons-user-image-person-silhouette-user-silhouettes.png"
              });
              this.verifica();
              this.cerrar();
            },
            (error) => {
              this.errormessage = error.message;
            }
          );
      }
    },
    comprobar() {
      if (this.contrasena != this.repite) {
        this.errorcontrasena = true;
      } else {
        this.errorcontrasena = false;
      }
    },
    verifica() {
      firebase.auth().currentUser.sendEmailVerification();
    },
    cerrar() {
      firebase.auth().signOut();
    },
  },
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic);
@import url(https://fonts.googleapis.com/css?family=Montserrat:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic);
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);
.facebookico {
  background-color: #1877f2;
}

.googleico {
  background-color: #ed1c24;
}
label,
h1 {
  font-family: Montserrat;
}

button,
input {
  font-family: Arial, Helvetica, sans-serif;
}

#centro {
  position: relative;
  top: 25%;
}
</style>