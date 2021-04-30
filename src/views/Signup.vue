<template>
  <div>
    <div class="align-self-stretch pl-2 py-0 white">
      <v-breadcrumbs :items="breadcrumbs">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </div>
    <div class="container">
      <div class="is-column6" style="padding: 2rem">
        <h1 class="title">Create New User</h1>
        <b-field label="Name">
          <b-input
            v-model="person.name"
            placeholder="Insert Your Name"
          ></b-input>
        </b-field>
        <b-field label="Email">
          <b-input v-model="person.email" placeholder="Insert Email"></b-input>
        </b-field>
        <b-field label="Password">
          <b-input
            type="password"
            v-model="person.password"
            placeholder="Insert Password"
          ></b-input>
        </b-field>
        <b-field label="Address">
          <b-input
            v-model="person.address"
            placeholder="Insert Address"
          ></b-input>
        </b-field>
        <b-button
          :disabled="isValid"
          class="is-success"
          v-on:click.native="postCustomer"
          >Create</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["currentCustomerId"],
  name: "SignUp",
  data() {
    return {
      person: {
        name: "",
        email: "",
        password: "",
        address: "",
      },
      breadcrumbs: [
          {
            text: "Home",
            disabled: false,
          },
          {
            text: "Sign Up",
            disabled: true,
          },
        ],
    };
  },
  methods: {
    async postCustomer() {
      console.log(this.person);
      await axios.post("/customers", this.person);
      this.$router.push({ name: "home" });
    },
  },
  computed: {
    isValid() {
      let obj = this.person;
      if (
        obj.name.length == 0 ||
        obj.address.length == 0 ||
        obj.email.length == 0 ||
        obj.password.length == 0
      ) {
        return true;
      }

      return false;
    },
  },
};
</script>

<style></style>
