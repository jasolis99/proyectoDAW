<template>
  <div>
    <h1>Lecciones</h1>
    <div v-if="!newlesson">
      <div class="flex flex-col items-end">
        <button
          class="my-3 p-1 bg-blue-200 rounded-md"
          @click="newlesson = !newlesson"
        >
          <span class="fa fa-plus"></span>
          Nueva leccion
        </button>
        <input
          class="border border-black rounded-md w-1/2 p-1"
          type="search"
          name=""
          id=""
          v-model="search"
        />
      </div>
      <div
        v-for="(value, key) in filterlessons"
        :key="key"
        class="border border-black rounded-md flex justify-between items-center rounded-md p-2 my-5"
      >
        <p>{{ value.Nombreleccion }}</p>
        <div>
          <button
            @click="modificatelesson(value)"
            class="p-1 bg-green-400 border border-black rounded-md"
          >
            Modificar
          </button>
          <button @click="removelesson(value.Id)" class="p-1 bg-red-600 border border-black rounded-md">
            Borrar
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <form class="mt-5 flex flex-col" @submit.prevent="createlesson()">
        <label for="">Nombre de la lección</label>
        <input
          v-model="lessonname"
          required
          class="border border-black rounded-md w-1/2 p-1"
          type="text"
        />
        <label for="">Número de la tabla</label>
        <input
          v-model="lessonnumber"
          required
          class="border border-black rounded-md w-1/2 p-1"
          type="text"
        />
        <label for="">Descripcion</label>
        <textarea
          v-model="description"
          class="border border-black rounded-md w-1/2 p-1"
          name=""
          id=""
          cols="30"
          rows="10"
          required
        ></textarea>
        <div class="flex justify-around w-1/2">
          <button
            class="p-1 rounded-md bg-blue-500 text-white my-2 w-1/3"
            type="submit"
          >
            <span v-if="!modificate">Enviar</span>
            <span v-else>Modificar</span>
          </button>
          <button
            class="p-1 rounded-md bg-blue-500 text-white my-2 w-1/3"
            type="button"
            @click="reset()"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  created() {
    this.getlessons();
  },
  data() {
    return {
      newlesson: false,
      modificate: false,
      lessonname: "",
      lessonnumber: "",
      description: "",
      key: '',
      search: "",
      lessons: [],
    };
  },
  computed: {
    filterlessons() {
      return this.lessons.filter((lesson) =>
        lesson.Nombreleccion.includes(this.search)
      );
    },
  },
  methods: {
    reset() {
      this.newlesson = false;
      this.modificate = false;
      this.lessonname = "";
      this.lessonnumber = "";
      this.description = "";
      this.key = "";
      this.search = "";
      this.lessons = [];
      this.getlessons();
    },
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
    createlesson() {
      const db = firebase.database();
      if (!this.modificate) {
        db.ref("/Lecciones")
          .child("lec"+ this.lessonnumber)
          .set({
            Descripcion: this.description,
            Nombreleccion: this.lessonname,
            Numerotabla: this.lessonnumber,
          })
          .then(this.reset());
      } else {
        db.ref("/Lecciones")
          .child(this.key)
          .set({
            Descripcion: this.description,
            Nombreleccion: this.lessonname,
            Numerotabla: this.lessonnumber,
          })
          .then(this.reset());
      }
    },
    modificatelesson(lesson) {
      this.newlesson = !this.newlesson;
      this.modificate = !this.modificate;
      this.lessonname = lesson.Nombreleccion;
      this.description = lesson.Descripcion;
      this.lessonnumber = lesson.Numerotabla;
      this.key = lesson.Id
    },
    removelesson(lesson){
      const db = firebase.database()

      db.ref("/Lecciones").child(lesson).remove().then(()=>{
        this.lessons = [];
        this.getlessons();
      })
    }
  },
};
</script>

<style>
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);
</style>