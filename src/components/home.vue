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
      <div
        v-for="(value, key) in filterlessons"
        :key="key"
        class="w-2/3 bg-white rounded-md flex justify-between items-center p-3 mt-10"
      >
        <img class="w-1/5" src="../assets/cuadrado.jpg" alt="" />
        <p class="w-4/5 p-1 text-sm text-justify">
          <span class="block text-xl">{{ value.Nombreleccion }}</span>
          {{ value.Descripcion }}
        </p>
        <router-link
          v-if="auth"
          :to="'/leccion/' + value.Id"
          tag="button"
          class="p-1 text-xs text-white bg-green-400 rounded-md"
        >
          Comenzar
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      user: null,
      auth: false,
      show: false,
      name: "",
      search: '',
      lessons: [],
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.user = firebase.auth().currentUser;
      if (!this.user.photoURL) {
        this.name = this.user.email.charAt(0);
      }
      this.auth = true;
    }
    this.getlessons();
  },
  computed: {
    filterlessons() {
      return this.lessons.filter((lesson) =>
        lesson.Nombreleccion.includes(this.search)
      );
    },
  },
  methods: {
    getlessons() {
      const db = firebase.database();
      db.ref("/Lecciones").on("value", (snapshot) =>
        this.loadlessons(snapshot.val())
      );
    },
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
  margin-top: 15%;
}
</style>