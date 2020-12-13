<template>
  <div
    id="centro"
    class="w-2/5 container shadow-md rounded-md bg-white mx-auto px-10 py-5 md:px-2 md:py-2 min-w-1200 md:w-2/3"
  >
    <h1 v-if="!registerform" class="text-center text-3xl font-light">
      Iniciar sesión
    </h1>
    <h1 v-else class="text-center text-3xl font-light">Regístrate</h1>
    <div class="lg:mx-auto mt-2 mb-2 w-1/2 px-5 md:px-2 flex xl:flex-row md:flex-col xl:justify-around md:justify-center">
      <button
        @click="googlelog()"
        class="xl:w-2/5 p-1 md:w-full bg-white flex items-center text-white border border-black rounded  "
      >
        <span class="w-3/12 h-full flex justify-center rounded items-center bg-white"><img class="w-1/2" src="../assets/googleico.png" alt=""></span>
        <span class="w-full p-2 text-sm text-black">Sign in with Google</span>
      </button>
      <button
        @click="facebooklog()"
        class="xl:w-2/5 md:w-full p-1 fa fa-facebook facebookico text-white rounded md:mt-3 xl:mt-0 "
      >
        <span class="p-2 text-sm">Sign in with Facebook</span>
      </button>
    </div>

    <form
      @submit.prevent="login()"
      v-if="!registerform"
      class="lg:mx-auto flex flex-col px-5 md:px-2 justify-between w-1/2"
    >
      <label for="email">Email</label>
      <input
        class="bg-gray-400 rounded px-2 py-2"
        type="email"
        name="email"
        v-model="mail"
        required
      />
      <label for="pass">Contraseña</label>
      <input
        class="bg-gray-400 rounded px-2 py-2"
        type="password"
        name="pass"
        v-model="password"
        required
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
        ¿No estás registrado?<router-link to="/register" class="p-1" href="#"
          >Regístrate</router-link
        >
      </p>
    </form>

    <form
      @submit.prevent="register()"
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
      <label for="nombre">Nombre y Apellido</label>
      <input
        class="bg-gray-400 rounded px-2 py-2"
        type="text"
        name="nombre"
        v-model="displayName"
        required
      />
      <label for="email">Email</label>
      <input
        class="bg-gray-400 rounded px-2 py-2"
        type="email"
        name="email"
        v-model="mail"
        required
      />
      <label for="pass">Contraseña</label>
      <input
        class="bg-gray-400 rounded px-2 py-2"
        type="password"
        name="pass"
        v-model="password"
        required
      />
      <pre>{{password}}</pre>
      <label for="repit">Repite contraseña</label>
      <input
        class="bg-gray-400 rounded px-2 py-2"
        type="password"
        name="repit"
        v-model="repeat"
        @keyup="checkpassword()"
        required
      />
      <pre>{{repeat}}</pre>
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
      >
        Registrarse
      </button>
      <p class="text-center">
        ¿Tienes cuenta?<router-link to = "/login" class="p-1"
          >Inicia sesión</router-link>
      </p>
    </form>

  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
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
  props:[
    'registerform'
  ] ,
  methods: {
    /**
     * @description
     * Componente login.vue
     * 
     * Método para vaciar formularios en caso de iniciar sesión para evitar filtramiento de datos.
     */
    reset(){
      const data = {
        passworderror: false,
        errormessage: null,
        picture: null,
        showpicture: null,
        displayName: null,
        mail: null,
        password: null,
        repeat: null,
      };
      Object.assign(this.$data, data);

    },
    /**
     * @description
     * Método empleado para iniciar sesión o registrarse con la plataforma de Google.
     */
    googlelog() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(
          (user) => this.$router.replace("/"),
          (error) => console.log(error)
        );
    },
    /**
     * @description
     * Método empleado para iniciar sesión o registrarse con la plataforma de Facebook.
     */
    facebooklog() {
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(
          (user) => this.$router.replace("/"),
          (error) => console.log(error)
        );
    },

    /**
     * @description
     * Método para iniciar sesión en la aplicación con correo y contraseña.
     */
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.mail, this.password)
        .then(
          (user) =>{
            this.reset()
            this.$router.replace("/")
          },
          (error) => {
            this.errormessage = error.message;
          }
        );
    },
    /**
     * @description
     * Proceso para poder visualizar la imagen elegida del usuario en la aplicación.
     * @param {array} event
     * Array con el resultado del evento al cargar la imagen en el input
     */
    processFile(event) {
      this.picture = event.target.files[0];
      this.showpicture = URL.createObjectURL(this.picture);
    },

    /**
     * @description
     * Método para registrarse con correo y contraseña en la aplicación.
     */
    register() {
      if (this.password == this.repeat) {
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
              this.errormessage = false;
              this.errormessage = error.message;
            }
          );
      }
    },
    /**
     * @description
     * Método llamado para cargar la imagen de perfil de usuario en la base de datos una vez se registre. 
     * Guarda la imagen en Firestore y se guarda la url de ésta en la información del usuario.
     */
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
    /**
     * @description
     * Método que comprueba si la contraseña introducida es la misma que la del campo repetir contraseña.
     */
    checkpassword() {
      if (this.password != this.repeat) {
        this.passworderror = true;
      } else {
        this.passworderror = false;
      }
    },
    /**
     * @description
     * Método llamado una vez registrado en la base de datos. Manda un correo de verificación de cuenta
     * para poder acceder a todas las lecciones.
     */
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
  background-color: #4267B2;
}
label,
h1 {
  font-family: Montserrat;
}

span,
input {
  font-family: Arial, Helvetica, sans-serif;
}

#centro {
  position: relative;
  top: 15%;
}
</style>