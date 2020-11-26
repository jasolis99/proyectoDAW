<template>
  <div id="centro" class="container mx-auto">
    <div id="blackboard" class="p-5 rounded-md bg-white border border-black">
      <div class="mx-auto">
        <h1 class="text-center text-white text-4xl uppercase">
          {{ lessons.Nombreleccion }}
        </h1>
        <div v-if="!end" class="flex justify-center my-40">
          <button
            @click="startall()"
            class="p-5 bg-blue-200 rounded text-3xl"
            v-if="!start"
          >
            Comenzar
          </button>
          <p v-else class="text-white text-6xl" v-text="tabla"></p>
        </div>
        <div v-else class="flex justify-center text-white">
          <table class="text-2xl">
            <tr class="border border-red-200">
              <td class="p-2 border border-red-200">Multiplicación</td>
              <td class="p-2 border border-red-200">Solución</td>
              <td class="p-2 border border-red-200">Tu respuesta</td>
              <td class="p-2 border border-red-200">Acertada</td>
            </tr>
            <tr
              class="border border-red-200"
              v-for="(value, key) in results"
              :key="key"
            >
              <td class="border border-red-200 text-center">
                {{ value.mult }}
              </td>
              <td class="border border-red-200 text-center">
                {{ value.correctanswer }}
              </td>
              <td class="border border-red-200 text-center">
                {{ value.answer }}
              </td>
              <td class="border border-red-200 text-center">
                {{ value.result }}
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div v-if="startbuttons" class="flex justify-around">
        <button
          class="text-white border border-white rounded p-1"
          @click="startlesson()"
        >
          SEGUIR
        </button>
        <button class="text-white border border-white rounded p-1" @click ="reset()">
          Reintentar desde el principio
        </button>
      </div>
      <div v-if="end" class="flex justify-center">
        <button @click="endlesson()" class="text-white border border-white rounded p-1">
          Finalizar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

export default {
  data() {
    return {
      lessons: [],
      tabla: 3,
      mult: 1,
      aciertos: 0,
      fallos: 0,
      start: null,
      respuesta: null,
      talking: false,
      button: false,
      numberdictionary: [],
      results: [],
      end: false,
      startbuttons: false,
    };
  },
  created() {
    this.dictionary();
    this.getlessons();
  },
  mounted() {
    recognition.maxAlternatives = 1;
    recognition.interimResults = false;

    recognition.addEventListener("speechstart", () => {});

    recognition.addEventListener("speechend", () => {
      recognition.stop();
    });

    recognition.addEventListener("result", (e) => {
      console.log(e);
      let last = e.results.length - 1;
      let text = e.results[last][0].transcript;
      if(text = "una"){
        text = "uno"
      }
      this.respuesta = text;
      console.log(this.respuesta);
      this.guess();
    });

    recognition.addEventListener("error", (e) => {
      console.log(e);
      this.tabla = "No te escuchamos. Tómate tu tiempo si es necesario";
    });
  },
  methods: {
    dictionary() {
      const writtenNumber = require("written-number");

      for (let i = 1; i <= 8; i++) {
        let index = writtenNumber(i, { lang: "es" });
        this.numberdictionary.push({
          name: index,
          number: i,
        });
      }
    },
    startall() {
      this.startbuttons = true
      this.start = !this.start;
      this.countdown();
    },
    countdown() {
      if (this.tabla > 0) {
        setTimeout(() => {
          this.tabla--;
          this.countdown();
        }, 1000);
      } else {
        this.startlesson();
      }
    },
    startlesson() {
      if (this.mult <= 3) {
        this.tabla = this.lessons.Numerotabla + " x " + this.mult;
        this.startSpeak();
      } else {
        this.updateresult();
      }
    },
    startSpeak() {
      recognition.lang = "es-ES";
      recognition.start();
      console.log("empieza");
    },
    guess() {
      if (this.lessons.Numerotabla * this.mult == this.respuesta) {
        this.aciertos++;
        this.tabla = "¡ESTUPENDO! ¡SIGUE ASÍ!";
      } else {
        for (let number in this.numberdictionary) {
          if (this.respuesta == this.numberdictionary[number].name) {
            this.respuesta = this.numberdictionary[number].number;
          }
        }
        if (this.lessons.Numerotabla * this.mult == this.respuesta) {
          this.aciertos++;
          this.tabla = "¡ESTUPENDO! ¡SIGUE ASÍ!";
        } else {
          let correctanswer = this.lessons.Numerotabla * this.mult;
          this.fallos++;
          this.tabla = "La respuesta era " + correctanswer;
          setTimeout(() => {
            this.tabla = "¡ANIMO! ¡PUEDES CONSEGUIRLO!";
          }, 2000);
        }
      }
      this.saveresult();
      this.mult++;
      this.button = true;
    },
    saveresult() {
      let check = "";
      if (this.lessons.Numerotabla * this.mult == this.respuesta) {
        check = "V";
      } else {
        check = "X";
      }
      this.results.push({
        mult: this.lessons.Numerotabla + "x" + this.mult,
        correctanswer: this.lessons.Numerotabla * this.mult,
        answer: this.respuesta,
        result: check,
      });
    },
    getlessons() {
      const db = firebase.database();
      db.ref("/Lecciones/" + this.$route.params.les).on(
        "value",
        (snapshot) => (this.lessons = snapshot.val())
      );
    },
    updateresult() {
      let resultado = "";
      const db = firebase.database();

      if (this.aciertos < 5) {
        resultado = "Mejorable";
      } else {
        if (this.aciertos >= 5 && this.aciertos <= 8) {
          resultado = "Bien";
        } else {
          if (this.aciertos >= 8 && this.aciertos <= 9) {
            resultado = "Muy bien";
          } else {
            resultado = "Excelente";
          }
        }
      }

      db.ref("/Logros")
        .child(firebase.auth().currentUser.email)
        .child(this.$route.params.les)
        .set({
          Nombreleccion: this.lessons.Nombreleccion,
          Resultado: resultado,
          Respuestas: this.results
        })
        .then((this.end = true));
    },
    reset() {
      const data = {
        tabla: 3,
        mult: 1,
        aciertos: 0,
        fallos: 0,
        start: null,
        respuesta: null,
        talking: false,
        button: false,

        results: [],
        end: false,
      };
      Object.assign(this.$data, data)
    },
    endlesson(){
      this.$router.replace("/")
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => this.$router.replace("/"));
    },
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Montserrat:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic);
@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,300italic,regular,italic,600,600italic,700,700italic,800,800italic);
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);

@font-face {
  font-family: "blackboard";
  src: url("../assets/DkCrayonCrumble-ddll.ttf");
}

#centro {
  position: relative;
  top: 25%;
}

#blackboard {
  font-family: blackboard;
  background-image: url("../assets/blackboard.png");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>