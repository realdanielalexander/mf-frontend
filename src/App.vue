<template>
    <div class="app">
        <Navbar />
        <router-view />
        <Footer />
    </div>
</template>

<script>
import Navbar from './components/Navbar';
import Footer from './components/Footer';
export default {
  components: { 
    Navbar,
    Footer
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
