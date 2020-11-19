<template>
  <div>
    <h1>Logros conseguidos</h1>
    <div
      v-for="(value, key) in achievements"
      :key="key"
      class="flex justify-between my-2 p-1 border border-solid border-black rounded-md"
    >
      <h4>{{ value.Nombreleccion }}</h4>
      <p>{{ value.Resultado }}</p>
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
    };
  },
  created() {
    this.getachievements();
  },
  methods: {
    getachievements() {
      const db = firebase.database();
      db.ref("/Logros")
        .child(this.user.uid)
        .on("value", (snapshot) => this.achievements = snapshot.val());
    },
  },
};
</script>

<style>
</style>