<template>
  <div
    id="centro"
    class="w-2/5 container shadow-md rounded-md bg-white mx-auto px-10 py-5 md:w-2/3"
  >
    <h1 v-if="!register" class="text-center text-3xl font-light">
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
      v-if="!register"
      class="mx-auto flex flex-col px-5 justify-between w-1/2"
    >
      <label for="">Email</label>
      <input
        class="bg-gray-400 rounded px-2 py-2"
        type="email"
        name=""
        v-model="mail"
      />
      <label for="">Contraseña</label>
      <input
        class="bg-gray-400 rounded px-2 py-2"
        type="password"
        name=""
        v-model="password"
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
        ¿No estás registrado?<span class="p-1" href="#" @click="register = true"
          >Regístrate</span
        >
      </p>
    </form>

    <form
      @submit.prevent="register"
      v-else
      class="mx-auto flex flex-col px-5 justify-between w-1/2"
    >
      <div
        v-if="!picture"
        class="mx-auto h-20 w-20 rounded-full border border-black"
      >
        <input
          class="w-full h-full opacity-0"
          @change="processFile($event)"
          type="file"
          name=""
        />
      </div>
      <div v-else class="mx-auto h-20 w-20 rounded-full border border-black">
        <img class="w-full h-full rounded-full" :src="showpicture" />
      </div>
      <label for="">Nombre y Apellido</label>
      <input
        class="bg-gray-400 rounded px-2 py-2"
        type="text"
        name=""
        v-model="displayName"
      />
      <label for="">Email</label>
      <input
        class="bg-gray-400 rounded px-2 py-2"
        type="email"
        name=""
        v-model="mail"
      />
      <label for="">Contraseña</label>
      <input
        class="bg-gray-400 rounded px-2 py-2"
        type="password"
        name=""
        v-model="password"
      />
      <label for="">Repite contraseña</label>
      <input
        class="bg-gray-400 rounded px-2 py-2"
        type="password"
        name=""
        v-model="repeat"
        @keyup="checkpassword()"
      />
      <div v-if="passworderror" class="mx-auto">
        <p class="text-center text-red-600">Las contraseñas no coinciden</p>
      </div>
      <div v-if="errormessage" class="mx-auto">
        <p v-text="errormessage" class="text-center text-red-600" />
      </div>
      <button
        class="block bg-black text-white mt-5 px-2 py-2 rounded-md"
        type="submit"
        value=""
        id="btn_register"
        :disabled="!enabled"
      >
        Registrarse
      </button>
      <p class="text-center">
        ¿Tienes cuenta?<span class="p-1" @click="register = false"
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
      register: false,
      passworderror: false,
      errormessage: null,
      picture: null,
      showpicture: null,
      displayName: null,
      mail: null,
      password: null,
      repeat: null,
    };
  },
  computed: {
    enabled: () => {
      if (this.picture && this.displayName && this.mail && this.password) {
        if (this.password == this.repeat) {
          return true;
        }
      } else {
        return false;
      }
    },
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
    },

    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.mail, this.password)
        .then(
          (user) => this.$router.replace("/"),
          (error) => {
            this.errormessage = error.message;
          }
        );
    },
    processFile(event) {
      this.picture = event.target.files[0];
      this.showpicture = URL.createObjectURL(this.picture);
    },

    register() {
      if (this.password == this.repite) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.mail, this.password)
          .then(
            (user) => {
              firebase.auth().currentUser.updateProfile({
                displayName: this.displayName,
              });
              if (this.picture) {
                this.uploadpicture();
              }
              this.emailverification();
              this.logout();
            },
            (error) => {
              console.log("error");
              this.errormessage = false;
              this.errormessage = error.message;
            }
          );
      }
    },
    uploadpicture() {
      let storageRef = firebase.storage().ref(firebase.auth().currentUser.uid);
      storageRef.put(this.picture).then((image) => {
        storageRef.getDownloadURL().then((url) => {
          firebase.auth().currentUser.updateProfile({
            photoURL: url,
          });
        });
      });
    },
    checkpassword() {
      if (this.password != this.repite) {
        this.passworderror = true;
      } else {
        this.passworderror = false;
      }
    },
    emailverification() {
      firebase.auth().currentUser.sendEmailVerification();
    },
    logout() {
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