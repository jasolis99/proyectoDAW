<template>
  <div id="app" class="fondo h-screen">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
<style lang="css">
.fondo {
  background: url("./assets/background-educativo-1.png");
  background-repeat: repeat;
  background-size: 100%;
}
</style>
