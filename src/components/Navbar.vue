<template>
  <b-navbar transparent style="background-color: #222222; padding: 16px" shadow>
    <template slot="brand">
      <b-navbar-item
        style="background-color: #222222"
        tag="router-link"
        :to="{ path: '/' }"
      >
        <img src="@/assets/millenial_fashion.jpg" />
      </b-navbar-item>
    </template>
    <template slot="start" style="background-color: #222222">
      <b-navbar-item style="background-color: #222222" href="/">
        <b-icon
          class="white--text"
          variant="dark"
          pack="fas"
          icon="home"
          size="is-small"
          type="is-primary"
        >
        </b-icon>
        <span class="white--text" style="margin-left: 0.5rem">Home</span>
      </b-navbar-item>
      <b-navbar-item style="background-color: #222222" href="/market">
        <b-icon
          class="white--text"
          pack="fas"
          icon="shopping-bag"
          size="is-small"
          type="is-primary"
        >
        </b-icon>
        <span class="white--text" style="margin-left: 0.5rem">Market</span>
      </b-navbar-item>
      <b-navbar-item style="background-color: #222222" href="/cart">
        <b-icon
          class="white--text"
          pack="fas"
          icon="shopping-cart"
          size="is-small"
          type="is-primary"
        >
        </b-icon>
        <span class="white--text" style="margin-left: 0.5rem">Cart</span>
      </b-navbar-item>
      <b-navbar-item style="background-color: #222222" href="/wishlist">
        <b-icon
          class="white--text"
          pack="fas"
          icon="heart"
          size="is-small"
          type="is-primary"
        >
        </b-icon>
        <span class="white--text" style="margin-left: 0.5rem">Wishlist</span>
      </b-navbar-item>
      <b-navbar-item style="background-color: #222222" href="/transactions">
        <b-icon
          class="white--text"
          pack="fas"
          icon="history"
          size="is-small"
          type="is-primary"
        >
        </b-icon>
        <span class="white--text" style="margin-left: 0.5rem"
          >Transactions</span
        >
      </b-navbar-item>
      <b-navbar-item style="background-color: #222222" href="/signup">
        <b-icon
          class="white--text"
          pack="fas"
          icon="user"
          size="is-small"
          type="is-primary"
        >
        </b-icon>
        <span class="white--text" style="margin-left: 0.5rem">New User</span>
      </b-navbar-item>
      <b-navbar-item style="background-color: #222222" href="/chat">
        <b-icon
          class="white--text"
          pack="fas"
          icon="comments"
          size="is-small"
          type="is-primary"
        >
        </b-icon>
        <span
          class="white--text"
          style="background-color: #222222; margin-left: 0.5rem"
          >Customer Service</span
        >
      </b-navbar-item>
      <b-navbar-item
        style="background-color: #222222"
        href="/admin/waiting-for-confirmation"
      >
        <b-icon
          class="white--text"
          pack="fas"
          icon="user-lock"
          size="is-small"
          type="is-primary"
        >
        </b-icon>
        <span class="white--text" style="margin-left: 0.5rem">Admin</span>
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item style="background-color: #222222">
        <v-menu
          style="background-color: #222222"
          bottom
          left
          offset-y
          origin="top right"
          transition="scale-transition"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              plain
              icon
              v-on="on"
              class="mr-1"
              @click="updateNotifications"
            >
              <v-badge :value="unread" color="red" dot>
                <b-icon
                  class="white--text"
                  pack="fas"
                  icon="bell"
                  size="is-small"
                  type="is-primary"
                >
                </b-icon>
              </v-badge>
            </v-btn>
          </template>
          <v-list>
            <h4 class="px-5 py-3 pt-2 font-weight-medium title">
              Notifications
            </h4>
            <v-divider></v-divider>
            <v-list-item
              v-for="(item, i) in notifications"
              :key="i"
              @click="href(item.link)"
            >
              <v-list-item-title>
                <div class="d-flex align-center py-3">
                  <div class="mr-3">
                    <v-btn
                      class="mr-3"
                      depressed
                      fab
                      small
                      dark
                      :color="item.iconbg"
                    >
                      <v-img
                        max-height="50"
                        max-width="50"
                        v-bind:src="require('@/assets/product/' + item.image)"
                      ></v-img>
                    </v-btn>
                  </div>
                  <div>
                    <h4 class="font-weight-medium">{{ item.title }}</h4>
                    <span
                      class="text--secondary caption descpart d-block text-truncate"
                      >{{ item.desc }}</span
                    >
                    <small class="text--secondary">{{ item.time }}</small>
                  </div>
                  <div>
                    <h4
                      v-if="!item.isRead"
                      class="font-weight-medium red--text ml-8"
                    >
                      NEW
                    </h4>
                  </div>
                </div>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </b-navbar-item>
      <!-- ---------------------------------- -->
      <!---Notification -->
      <!-- ---------------------------------- -->
      <b-navbar-item style="background-color: #222222">
        <b-field>
          <select
            class="white--text black"
            placeholder="Select a customer"
            icon="user"
            value="user"
            @change="$emit('change-user', selectedCustomerId)"
            style="
              padding: 8px 48px;
              margin-left: 8px;
              border: 1px solid grey;
              outline: 0px;
            "
            v-model="selectedCustomerId"
          >
            <option
              v-for="(customer, index) in customers"
              :key="customer.id"
              :index="index"
              v-bind:value="customer.id"
            >
              User: {{ customer.name }}
            </option>
          </select>
        </b-field>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import axios from "axios";
export default {
  props: ["customers", "currentCustomerId"],
  mounted() {
    this.fetchData();
  },
  data() {
    return {
      selectedCustomerId: this.currentCustomerId,
      notifications: [],
      unread: 0,
      // href() {
      //   return undefined;
      // },
    };
  },
  methods: {
    async fetchData() {
      const res = await axios.get("/notifications/" + this.currentCustomerId);
      this.notifications = res.data.map((notification) => ({
        title: notification.title,
        iconbg: "white",
        icon: "mdi-account",
        desc: notification.message,
        image: notification.image,
        link: notification.link,
        isRead: notification.is_read,
        time: "",
      }));
      this.unread = this.notifications.filter(
        (notification) => !notification.isRead
      ).length;
      console.log(this.notifications);
    },
    async updateNotifications() {
      await axios.put("/notifications/" + this.currentCustomerId, {});
    },
    href(link) {
      this.$router.push({ path: link });
      this.$router.go();
    },
  },
};
</script>
