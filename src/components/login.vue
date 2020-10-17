<template>
  <div class="container shadow-md mx-auto mt-10 px-10 py-5 pt-30">
    <h1 class="text-center font-bold">Iniciar sesión</h1>
    <div class=" mx-auto w-1/2 px-5 flex justify-between border border-solid border-red-400">
        <div class="w-1/2 border border-solid border-red-400">
            <img src="../assets/btn_google_signin_light_normal_web@2x.png" alt="">
        </div>
        <div class="w-1/2 border border-solid border-red-400">
            <img src="../assets/btn_facebook_signin.png" alt="">
        </div>
    </div>

    <form class="mx-auto border border-solid border-red-400 flex flex-col px-5 justify-between w-1/2">
      <label for="">Email</label>
      <input class="bg-gray-200 rounded px-2 py-2" type="email" name="" id="" />
      <label for="">Password</label>
      <input class="bg-gray-200 rounded px-2 py-2" type="password" name="" id="" />
      <button
        class="block bg-black text-white mt-5 px-2 py-2 rounded-md"
        type="submit"
        value=""
      >
        Iniciar sesión
      </button>
      <p class="text-center">¿No estás registrado?<a href="">Regístrate</a></p>
    </form>
  </div>
</template>



<script>
export default {};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Montserrat:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic);
@import "../style/main.css";

label{
    font-family: Montserrat;
}
</style>