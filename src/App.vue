<template>
  <div class="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar';
export default {
  components: { 
    Navbar 
  }
}
</script>

<style lang="scss">
@import "../scss/main.scss";

.app {
  background-color: #ececec;
  height: 100%; 
}
</style>
