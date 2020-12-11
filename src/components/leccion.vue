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
          class="text-white text-xl border border-white rounded p-1"
          @click="startlesson()"
        >
          SEGUIR
        </button>
        <button class="text-white text-xl border border-white rounded p-1" @click ="reset()">
          Reintentar desde el principio
        </button>
      </div>
      <div v-if="end" class="flex justify-center">
        <button @click="endlesson()" class="text-white text-xl border border-white rounded p-1">
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
  /**
   * @description
   * 
   * Mounted componente leccion.vue
   * 
   * Cuando la instancia Vue es montada configura todo lo necesario para poder 
   * ejecutar el speech recognition.
   */
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
      if(text == "una"){
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
    /**
     * @description
     * En este método se crea un array que almacena el nombre del número y el número perteneciente 
     * nada más montarse la instancia Vue. 
     * Esto se crea debido a que el speech recognition no reconoce como número los comprendidos entre 1 y 8. Lo
     * reconoce como una string de su nombre. 
     * Cuando mencionamos un número de estos en cualquier lección lo transforma de nombre a número comprobándolo
     * en el array creado para poder comprobar dicho número mencionado en el speech.
     */
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
    /**
     * @description
     * Este método oculta el botón de comenzar lección y da lugar al comienzo de la lección con una cuenta atrás.
     */
    startall() {
      this.startbuttons = true
      this.start = !this.start;
      this.countdown();
    },
    /**
     * @description
     * Método que da comienzo a la cuenta atrás. Una vez terminada, comienza lección.
     */
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
    /**
     * @description
     * Método que comienza la lección en sí. Una vez que llega el contador a 10, se muestra el resultado y lo
     * sube a la base de datos.
     */
    startlesson() {
      if (this.mult <= 3) {
        this.tabla = this.lessons.Numerotabla + " x " + this.mult;
        this.startSpeak();
      } else {
        this.updateresult();
      }
    },
    /**
     * @description
     * Método que da comienzo al speech recognition. Se empieza a hablar y los eventos montados en la instancia Vue
     * comienzan a dar lugar al reconocimiento de voz.
     */
    startSpeak() {
      recognition.lang = "es-ES";
      recognition.start();
      console.log("empieza");
    },
    /**
     * @description
     * Método que comprueba la respuesta del usuario a la multiplicación. Una vez comprobado muestra 
     * un mensaje en pantalla indicando el resultado dicho por voz.
     */
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
    /**
     * @description
     * Método que guarda el resultado de nuestra respuesta en el array que guardaremos en la base de datos para poder
     * consultarse en cualquier momento.
     */
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
    /**
     * @description
     * Método ejecutado una vez se monta la instancia Vue. Obtiene de la base de datos la lección que desea 
     * el usuario realizar.
     */
    getlessons() {
      const db = firebase.database();
      db.ref("/Lecciones/" + this.$route.params.les).on(
        "value",
        (snapshot) => (this.lessons = snapshot.val())
      );
    },
    /**
     * @description
     * Método que una vez finalizada la lección, subirá el resultado de dicha lección en la base de datos.
     */
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
        .child(firebase.auth().currentUser.uid)
        .child(this.$route.params.les)
        .set({
          Nombreleccion: this.lessons.Nombreleccion,
          Resultado: resultado,
          Respuestas: this.results
        })
        .then((this.end = true));
    },
    /**
     * @description
     * Método empleado para reiniciar la lección en caso deseado. Reinicia todas las variables a su estado inicial. 
     * De esta manera se evita recargar el componente.
     */
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
    /**
     * @description
     * Método que nos devuelve a la pantalla de Home una vez finalizada la lección
     */
    endlesson(){
      this.$router.replace("/")
    },
    /**
     * @description
     * Método que cierra sesión de la aplicación.
     */
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
  top: 10%;
}

#blackboard {
  font-family: blackboard;
  background-image: url("../assets/blackboard.png");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>