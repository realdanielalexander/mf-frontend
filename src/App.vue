<template>
  <div class="app">
    <Navbar
      v-bind:customers="customers"
      :currentCustomerId="currentCustomerId"
      v-on:change-user="onSelect"
    />
    <router-view v-bind:currentCustomerId="currentCustomerId" />
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import axios from "axios";
export default {
  components: {
    Navbar,
    Footer,
  },
  mounted() {
    this.fetchCustomer();
  },
  created() {
    if (localStorage.currentCustomerId) {
      this.currentCustomerId = localStorage.currentCustomerId;
    }
  },
  watch: {
    currentCustomerId(currentCustomerId) {
      localStorage.setItem("currentCustomerId", currentCustomerId);
    },
  },
  data() {
    return {
      customers: [],
      currentCustomerId: 1,
    };
  },
  methods: {
    async fetchCustomer() {
      const res = await axios.get("/customers");
      this.customers = res.data;
    },
    onSelect(id) {
      this.currentCustomerId = id;
    },
  },
};
</script>

<style lang="scss">
@import "../scss/main.scss";

.app {
  background-color: #ececec;
  height: 100%;
}
</style>

