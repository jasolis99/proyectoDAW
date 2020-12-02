<template>
  <div>
    <h1>Logros conseguidos</h1>
    <div v-if="results">
      <button @click="results=null" class="my-3 p-1 bg-blue-700 rounded text-white">Volver</button>
      <table>
        <tr class="border">
          <td class="p-2 border">Multiplicación</td>
          <td class="p-2 border">Solución</td>
          <td class="p-2 border">Tu respuesta</td>
          <td class="p-2 border">Acertada</td>
        </tr>
        <tr class="border" v-for="(value, key) in results" :key="key">
          <td class="border text-center">
            {{ value.mult }}
          </td>
          <td class="border text-center">
            {{ value.correctanswer }}
          </td>
          <td class="border text-center">
            {{ value.answer }}
          </td>
          <td class="border text-center">
            {{ value.result }}
          </td>
        </tr>
      </table>
    </div>
    <div
      v-else
      v-for="(value, key) in achievements"
      :key="key"
      class="flex justify-between my-2 p-1 border border-solid border-black rounded-md"
    >
      <h4 class="p-1">{{ value.Nombreleccion }}</h4>
      <div class="flex justify-around w-3/6">
        <p class="p-1">{{ value.Resultado }}</p>
        <button @click="seeresults(key)" class="p-1 bg-green-300 rounded">
          Resultados
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
      user: firebase.auth().currentUser,
      achievements: [],
      results: null,
    };
  },
  created() {
    this.getachievements();
  },
  methods: {
    /**
     * @description
     * Método llamado una vez creada la instancia Vue que obtiene de la base de datos 
     * los logros del usuario registrado.
     */
    getachievements() {
      const db = firebase.database();
      db.ref("/Logros")
        .child(this.user.uid)
        .on("value", (snapshot) => (this.achievements = snapshot.val()));
    },
    /**
     * @description
     * Método que devuelve el resultado obtenido en esa lección para poder consultarlo. 
     * @param {array} lesson
     * Array con la lección elegida para obtener resultado. 
     */
    seeresults(lesson) {
      const db = firebase.database();
      db.ref("/Logros")
        .child(this.user.uid)
        .child(lesson)
        .child("Respuestas")
        .on("value", (snapshot) => (this.results = snapshot.val()));
    },
  },
};
</script>
<style>
</style>