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
          <button
            @click="removelesson(value.Id)"
            class="p-1 bg-red-600 border border-black rounded-md"
          >
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
          maxlength="2"
          class="border border-black rounded-md w-1/2 p-1"
          @blur="checklesson()"
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
            v-if="!modificate && checkbutton"
            class="p-1 rounded-md bg-blue-500 text-white my-2 w-1/3"
            type="submit"
          >
            Enviar
          </button>
          <button
            v-if="modificate && checkbutton"
            class="p-1 rounded-md bg-blue-500 text-white my-2 w-1/3"
            type="submit"
          >
            Modificar
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
      key: "",
      search: "",
      lessons: [],
      checkbutton: true,
      modnumber: "",
    };
  },
  computed: {
    /**
     * @description
     * Devuelve un array con las lecciones que coincidan con la búsqueda deseada
     * @returns {array}
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
     * Devuelve las variables a su estado original sin tener que volver a recargar la página.
     */
    reset() {
      this.newlesson = false;
      this.modificate = false;
      this.lessonname = "";
      this.lessonnumber = "";
      this.description = "";
      this.key = "";
      this.search = "";
      this.lessons = [];
      this.checkbutton = true;
      this.modnumber = "",
      this.getlessons();
    },
    /**
     * @description
     * Obtiene todas las lecciones de la base de datos
     */
    getlessons() {
      const db = firebase.database();
      db.ref("/Lecciones").on("value", (snapshot) =>
        this.loadlessons(snapshot.val())
      );
    },
    /**
     * @description
     * Crea un array con el resultado obtenido que nos permitirá poder realizar búsquedas de lecciones
     * en el componente
     * 
     * @param {any} obtainedlessons
     * Lecciones obtenidas de la base de datos
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
     * Método que nos permitirá crear lecciones y modificar según hayamos elegido.
     */
    createlesson() {
      const db = firebase.database();
      if (!this.modificate) {
        db.ref("/Lecciones")
          .child("lec" + this.lessonnumber)
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
    /**
     * @description
     * Método que comprueba si la lección que vayamos a crear o modificar ya está en la base de datos o no. 
     */
    checklesson() {
      let cont = 0;
      if (this.modificate) {
        if (this.lessonnumber == this.modnumber) {
          this.checkbutton = true;
        } else {
          for (let key in this.lessons) {
            if (
              this.lessonnumber == this.lessons[key].Numerotabla &&
              this.lessonnumber != this.modnumber
            ) {
              cont++;
            }
          }
          if (cont > 0) {
            this.checkbutton = false;
          } else {
            this.checkbutton = true;
          }
        }
      } else {
        for (let key in this.lessons) {
          if (this.lessonnumber == this.lessons[key].Numerotabla) {
            cont++;
          }
        }
        if (cont > 0) {
          this.checkbutton = false;
        } else {
          this.checkbutton = true;
        }
      }
    },
    /**
     * @description
     * Método que rellena el formulario de la modificación de lecciones cuando vayamos a modificar alguna con sus
     * datos actuales para facilitar la operación.
     * @param {array} lesson
     * Array con los datos de la lección a modificar.
     */
    modificatelesson(lesson) {
      this.newlesson = !this.newlesson;
      this.modificate = !this.modificate;
      this.lessonname = lesson.Nombreleccion;
      this.description = lesson.Descripcion;
      this.lessonnumber = lesson.Numerotabla;
      this.modnumber = lesson.Numerotabla;
      this.key = lesson.Id;
    },
    /**
     * @description
     * Método que nos permitirá borrar lecciones.
     * @param {array} lesson
     * Array con los datos de la lección a borrar.
     * 
     */
    removelesson(lesson) {
      const db = firebase.database();

      db.ref("/Lecciones")
        .child(lesson)
        .remove()
        .then(() => {
          this.lessons = [];
          this.getlessons();
        });
    },
  },
};
</script>

<style>
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);
</style>