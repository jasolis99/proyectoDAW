<template>
  <div id="centro" class=" w-2/5 container shadow-md rounded-md bg-white mx-auto px-10 py-5 pt-30">
    <h1 class="text-center text-3xl font-light">Iniciar sesión</h1>
    
    <form class="mx-auto flex flex-col px-5 justify-between w-1/2">
      <label for="">Correo</label>
      <input class="bg-gray-400 rounded px-2 py-2" type="email" name="" id="" />
      <label for="">Contraseña</label>
      <input class="bg-gray-400 rounded px-2 py-2" type="password" name="" id="" />
      <button
        class="block bg-black text-white mt-5 px-2 py-2 rounded-md"
        type="submit"
        value=""
      >
        Iniciar sesión
      </button>
    </form>
  </div>
</template>



<script>
export default {
  data() {
    return {
      register: false
    }
  },
};
</script>

<style>
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);
@import url(https://fonts.googleapis.com/css?family=Montserrat:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic);

#centro{
 position: relative;
 top: 25%; 
}

.facebookico{
  background-color: #3B5998 ;
}

.googleico{
  background-color: #dd4b39;
}
label,h1{
    font-family: Montserrat;
}
</style>