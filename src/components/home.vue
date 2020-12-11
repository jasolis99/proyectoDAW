<template>
  <div class="container mx-auto">
    <div id="centro" class="flex flex-col items-center">
      <h1 class="text-white font-bold">¿Qué quieres aprender hoy?</h1>
      <input
        class="w-1/2 rounded-md p-2"
        type="search"
        placeholder="Buscar lección"
        name=""
        id=""
        v-model="search"
      />
      <div id="altura" class="w-2/3 overflow-y-auto">
        <div
          v-for="(value, key) in filterlessons"
          :key="key"
          class="w-full bg-white rounded-md flex justify-between items-center p-3 mt-10"
        >
          <p class="w-1/5 text-6xl text-center text-orange-600 numero">
            x{{ value.Numerotabla }}
          </p>
          <p class="w-4/5 p-1 text-sm text-justify">
            <span class="block text-xl">{{ value.Nombreleccion }}</span>
            {{ value.Descripcion }}
          </p>
          <router-link
            v-if="auth && verified"
            :to="'/leccion/' + value.Id"
            tag="button"
            class="p-1 text-md text-white bg-green-700 rounded-md"
          >
            Comenzar
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  /**
   * @description
   * Todas las variables usadas en el componente.
   */

  data() {
    return {
      user: null,
      auth: false,
      show: false,
      name: "",
      search: "",
      lessons: [],
      verified: false
    };
  },
  /**
   * @description
   * Created Home.vue
   *
   * Al crearse la instancia Vue en el componente, comprobamos si el usuario está autenticado o no.
   * Si está autenticado, cargamos en la variable user el objeto devuelto con la información del usuario
   * autenticado. Obtenemos igualmente estemos autenticados o no el listado de todas lecciones existentes en la
   * aplicación
   */
  created() {
    if (firebase.auth().currentUser) {
      this.user = firebase.auth().currentUser;
      this.auth = true;
      if (this.user.emailVerified) {
        this.verified = true;
      }
    }
    this.getlessons();
  },
  computed: {
    /**
     * @description
     * Filterlessons nos filtrará las lecciones según coincida su título respecto al input de buscar lecciones.
     * La búsqueda se realiza en el array que contiene las lecciones obtenidas de la base de datos.
     * @returns {array}
     * Array resultante de la búsqueda realizada
     */
    filterlessons() {
      return this.lessons.filter((lesson) =>
        lesson.Nombreleccion.includes(this.search)
      );
    },
  },
  methods: {
    /**
     * @description
     * Getlessons es el método que conecta con la base de datos y nos devuelve las lecciones creadas.
     */
    getlessons() {
      const db = firebase.database();
      db.ref("/Lecciones").on("value", (snapshot) =>
        this.loadlessons(snapshot.val())
      );
    },
    /**
     * @description
     * Loadlessons es el método encargado de obtener el array resultado del método getlessons y lo carga en otro que creamos
     * con el que cargaremos las lecciones en el componente y en el que realizaremos la búsqueda de dichas lecciones
     * @param {array} obtainedlessons
     * Array con las lecciones obtenidas
     */
    loadlessons(obtainedlessons) {
      for (let key in obtainedlessons) {
        this.lessons.push({
          Descripcion: obtainedlessons[key].Descripcion,
          Nombreleccion: obtainedlessons[key].Nombreleccion,
          Numerotabla: obtainedlessons[key].Numerotabla,
          Id: key,
        });
      }
    },
    /**
     * @description
     * Método con el que cerramos la sesión del usuario.
     */
    logout() {
      firebase.auth().signOut();
    },
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,300italic,regular,italic,600,600italic,700,700italic,800,800italic);
@import url(https://fonts.googleapis.com/css?family=Roboto:100,100italic,300,300italic,regular,italic,500,500italic,700,700italic,900,900italic);
@import url(https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic);
@import url(https://fonts.googleapis.com/css?family=Chilanka:regular);

@font-face {
  font-family: "abc";
  src: url("../assets/abc3D.ttf");
}

.numero {
  font-family: "abc";
}
p {
  font-family: Open Sans;
}
button {
  font-family: Arial, Helvetica, sans-serif;
}
h1 {
  font-family: Chilanka;
  font-size: 40px;
  text-transform: uppercase;
}
#centro {
  margin-top: 5%;
}
#altura{
  height: 480px;
}
</style>