<template>
  <v-app>
    <div class="app">
      <Navbar
        v-bind:customers="customers"
        :currentCustomerId="currentCustomerId"
        v-on:change-user="onSelect"
        v-if="!$route.path.includes('admin')"
      />
      <router-view v-bind:currentCustomerId="currentCustomerId" />
      <Footer />
      <v-navigation-drawer
        v-if="$route.path.includes('admin')"
        v-model="sidebar"
        mobile-breakpoint="960"
        clipped
        mini-variant-width="70"
        :expand-on-hover="true"
        app
        id="main-sidebar"
      >
        <v-divider></v-divider>
        <!--- Progress -->
        <v-list-item two-line>
          <v-list-item-content class>
            <img src="@/assets/millenial_fashion.jpg" />
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item two-line>
          <v-list-item-content class>
            <v-list-item-title class="d-flex mb-3 align-center">
              <router-link :to="{ path: '/admin/waiting-for-confirmation' }"
                ><span class="font-weight-bold body-1 text-truncate"
                  >Waiting for Confirmation</span
                ></router-link
              >
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item two-line>
          <v-list-item-content class>
            <v-list-item-title class="d-flex mb-3 align-center">
              <router-link :to="{ path: '/admin/processed' }"
                ><span class="font-weight-bold body-1 text-truncate"
                  >Processed</span
                ></router-link
              >
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        
        <v-list-item two-line>
          <v-list-item-content class>
            <v-list-item-title class="d-flex mb-3 align-center">
              <router-link :to="{ path: '/admin/shipped' }"
                ><span class="font-weight-bold body-1 text-truncate"
                  >Shipped</span
                ></router-link
              >
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        
        <v-list-item two-line>
          <v-list-item-content class>
            <v-list-item-title class="d-flex mb-3 align-center">
              <router-link :to="{ path: '/admin/arrived' }"
                ><span class="font-weight-bold body-1 text-truncate"
                  >Arrived</span
                ></router-link
              >
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item two-line>
          <v-list-item-content class>
            <v-list-item-title class="d-flex mb-3 align-center">
              <router-link :to="{ path: '/admin/chat' }"
                ><span class="font-weight-bold body-1 text-truncate"
                  >Chat</span
                ></router-link
              >
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        

        <v-list-item two-line>
          <v-list-item-content class>
            <v-list-item-title class="d-flex mb-3 align-center">
              <router-link :to="{ path: '/admin/market' }"
                ><span class="font-weight-bold body-1 text-truncate"
                  >Market</span
                ></router-link
              >
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--- Progress -->
      </v-navigation-drawer>
    </div>
  </v-app>
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
      sidebar: true,
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

#main-sidebar {
  box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
  -webkit-box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
  .v-navigation-drawer__border {
    display: none;
  }
  .v-list {
    padding: 8px 15px;
  }
  .v-list-item {
    min-height: 35px;
    &__icon--text,
    &__icon:first-child {
      justify-content: center;
      text-align: center;
      width: 20px;
    }
  }
  .v-list-item__icon i {
    width: 20px;
  }
  .icon-size .v-list-group__items i {
    width: 16px;
    font-size: 16px;
  }
  .profile-bg {
    &.theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
      opacity: 1;
    }
    .v-avatar {
      padding: 15px 0;
    }
  }
  .theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }
}

.app {
  background-color: #ececec;
  height: 100%;
}
</style>

