<template>
  <div class="container mx-auto">
    <div id="centro" class="flex flex-col items-center">
      <h1 v-if="!thanks" class="text-white font-bold">¿Qué quieres aprender hoy?</h1>
      <input
        v-if="!thanks"
        class="w-1/2 rounded-md p-2"
        type="search"
        placeholder="Buscar lección"
        name=""
        id=""
        v-model="search"
        @keyup="gracias()"
        @change="gracias()"
      />
      <div v-if="!thanks" id="altura" class="w-2/3 overflow-y-auto">
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
      <div v-else>
        <!-- <audio autoplay>
          <source src="../assets/esoquetumedas.mp3" type="audio/mpeg">
        </audio> -->
        <h1 @click="{thanks = false; search = ''}" class="text-white font-bold text-center my-3"> MUCHAS GRACIAS ESCUELA VIRGEN DE GUADALUPE</h1>
        <div class="flex flex-wrap text-center columna">
          <p onclick="alert('Por ser la primera.Por tu manera de enseñar y cariño a tus alumnos.')">Gloria de Miguel</p>
          <p onclick="alert('Os lo debo todo a Gloria y a ti. Mi primera profesora de inglés. Todo empezó con vosotras. Vuestra forma de ser y amor a esta profesión os hace ser únicas.Os tengo un gran aprecio. Os llevaré siempre conmigo en mis recuerdos.')">Pilar de Miguel</p>
          <p onclick="alert('Por ayudarme a superar cada escalón que no podía subir y confiar en que lo podía hacer.')">Antonio Rodríguez Barril</p>
          <p onclick="alert('Por ser uno de los pilares de mi educación. Cuatro estupendos años aprendiendo de tí.')">Carolina López</p>
          <p onclick="alert('Por ser única en el mundo. Adoraba tus clases de matemáticas. Descansa en Paz.')">Lourdes</p>
          <p>Paquita</p>
          <p>Padre Jorge</p>
          <p onclick="alert('Por tu manera de enseñar la religión.')">Padre Balta</p>
          <p onclick="alert('Por sacar lo mejor de mi.')">Carmen Rodríguez</p>
          <p>Cristina Manzano</p>
          <p onclick="alert('Por tu forma de ser y filosofía.')">Padre Antolín</p>
          <p>Antonio Gordillo</p>
          <p>Carmen Samino</p>
          <p>Santi</p>
          <p>Leticia</p>
          <p onclick="alert('Por el amor a tu profesión y tu forma de transmitirla.')">Parra</p>
          <p onclick="alert('Por tu simpatía.')">Francisco Ponce</p>
          <p>Andrés Retamar</p>
          <p onclick="alert('Por creer en mi.')">Chema Aretio</p>
          <p>Carolina León</p>
          <p onclick="alert('Por el buen ambiente que generas en clase.')">Diego Camisón</p>
          <p onclick="alert('Por hacerme adorar la música y la cultura clásica.')">Elia</p>
          <p onclick="alert('Por hacerme saber que llegaría muy lejos. Así ha sido.')">Marisol Fernández</p>
          <p onclick="alert('Por tu manera de valorar a la clase.')">Víctor (Profesor de prácticas de tecnología)</p>
          <p onclick="alert('Por tu respeto y seriedad.')">Manolo Merino</p>
          <p onclick="alert('Por ser la mejor en lo que hace. Nunca fallas en tus decisiones. Ya sabes a qué me refiero.')">Magdalena Pozo</p>
          <p onclick="alert('Por estar ahí cuando hacía falta.')">Magdalena Sánchez</p>
          <p>Padre Tomás</p>
          <p>Isabel Muñoz</p>
          <p>Francisco García</p>
          <p onclick="alert('Por tu gran carisma que hace de ti ser lo mejor que ha tenido esta escuela.')">Ángel Galán</p>
          <p onclick="alert('Por toda la energía positiva que transmites.')">Ernesto González</p>
          <p>José Ramón</p>
          <p onclick="alert('Por entrar en esta escuela. Por guiarme en mi proyecto. Te deseo todo lo mejor.')">Miguel Jaque</p>
          <p onclick="alert('Por traerme de vuelta a casa.')">Antonia Meléndez (Directora de la escuela)</p>
          <p>Juan Donoso (Jefe de estudios)</p>
          <p onclick="alert('Por vuestra labor en esta escuela. Sois únicos.')">Personal de mantenimiento</p>
          <p onclick="alert('Por ser el mejor conserje que ha tenido esta escuela.')">Manolo (Antiguo conserje de la escuela)</p>
          <p onclick="alert('Por ser el mejor tutor de empresa que uno puede tener.')">Vicente Calvo</p>
          <p onclick="alert('Por hacerme sentir como en casa.')">Diario HOY</p>
          <p onclick="alert('Por muchos años que nos queden.')">Azulae</p>
        </div>
        <h1 class="text-white font-bold text-center my-2">GRACIAS AMIGOS</h1>
        <div class="flex flex-wrap text-center columna">
          <p onclick="alert('Por estos 15 años amigo. El primer amigo de mi vida. Gracias por todos los momentos vividos.')">Franciso Javier Sánchez Campanón</p>
          <p onclick="alert('Por tu amistad. Por entenderme. Por tu personalidad.Por todos los momentos y los que quedan.')">Ángel Cabrera Guillén</p>
          <p onclick="alert('Por ser la mejor prima que uno puede tener. He tenido mucha suerte de coincidir contigo en clase.')">Andrea Godoy Gago (Prima y compañera)</p>
          <p onclick="alert('Por esos 5 años juntos. Ha sido un placer conocerte. Por muchos años más compañero.')">Pablo Trigo de la Piedad</p>
          <p onclick="alert('Por tu persona. Por tu amistad. Por ser tú. Muchas gracias amigos por todos los momentos vividos y risas.')">Jesús Morales Rodríguez</p>
          <p onclick="alert('Por todos esos grandes momentos. Solo fue un año, pero un año grande.')">David Nogales</p>
        </div>
        <h1 onclick="alert('Por ser el mejor primo que uno puede tener. Muchas gracias por tu cariño. Eres un hermano para mí. Gracias por ayuda y por hacerme adorar esta profesión.')" class="text-white font-bold text-center">GRACIAS BORJA</h1>
        <h1 onclick="alert('Por ser los mejores abuelos del mundo. Mis segundos padres. Que alegría pasar casi toda mi vida con vosotros. Descansad.')" class="text-white font-bold text-center"> DEDICADO A JOSÉ Y PURIFICACIÓN</h1>
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
      verified: false,
      thanks: false
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
    gracias(){
      if(this.search == "GRACIAS"){
        this.thanks = true
      }
    }
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
.columna>p{
  width: 33%;
  color: white
}
</style>