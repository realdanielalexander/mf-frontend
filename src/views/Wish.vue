<template>
  <div class="columns is-vcentered is-flex" style="flex-direction: column">
    <div class="column">
      <h1 style="padding: 12px 48px" class="has-text-centered title">
        Your Wishlist
      </h1>
    </div>
    <!-- <div>
      <b-field>
        <b-select
          placeholder="Select a customer"
          icon="user"
          value="user"
          @onSelect="onSelect"
        >
          <option
            v-for="(customer, index) in customers"
            :key="customer.id"
            :index="index"
            value="customer.id"
          >
            {{ customer.name }}
          </option>
        </b-select>
      </b-field>
    </div> -->
    <div
      v-if="products.length != 0"
      class="columns is-multiline"
      style="width: 100%; padding: 12px 48px"
    >
      <div
        class="column is-one-third"
        v-for="(product, index) in products"
        :key="product.id"
        :index="index"
      >
        <div class="card">
          <div class="card-content">
            <div class="content">
              <figure style="text-align: center; margin: 0">
                <img
                  class="image-product"
                  :src="require(`@/${product.image_url}`)"
                />
              </figure>
              <router-link :to="{ path: '/product/' + product.id }">
                <a class="product-name"
                  ><strong>{{ product.name }}</strong></a
                >
              </router-link>
              <p class="price">
                Rp. {{ parseInt(product.price).toLocaleString("id-Id") }}
              </p>
              <div>
                <!-- <b-numberinput
                  min="1"
                  size="is-small"
                  controls-position="compact"
                ></b-numberinput> -->
                <b-button
                  type="is-danger"
                  expanded
                  icon-left="trash"
                  @click="propsDeleteItem(product)"
                  >Remove from Wishlist</b-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <b-loading
        :is-full-page="true"
        v-model="isLoading"
        :can-cancel="true"
      ></b-loading>
    </div>

    <div
      style="padding: 12px 48px"
      v-else
      class="level has-text-grey has-text-centered"
    >
      <p>Wishlist is empty!</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    this.fetchData();
    this.fetchCustomer();
  },
  data() {
    return {
      isLoading: false,
      products: [],
      customers: [],
      user: "",
    };
  },
  methods: {
    async fetchData() {
      try {
        const res = await axios.get("/wishlists/1");
        this.products = res.data;
      } catch (error) {
        this.products = [];
      }
    },
    async fetchCustomer() {
      const res = await axios.get("/customers");
      this.customers = res.data;
    },
    propsDeleteItem(item) {
      console.log(item);
      this.$buefy.dialog.confirm({
        title: "Delete this item from wishlist?",
        message:
          "Item that has been <b>deleted</b> will not be count as your item again!",
        type: "is-danger",
        hasIcon: true,
        icon: "times-circle",
        iconPack: "fa",
        cancelText: "No",
        confirmText: "Yes",
        onConfirm: () => this.removeFromWishlist(item),
      });
    },
    async removeFromWishlist(item) {
      await axios.delete(`/wishlists/1/` + item.id);
      await this.fetchData();
    },
    onSelect(value) {
      this.user = value;
    },
  },
};
</script>

<style scoped>
.image-product {
  max-height: 300px;
  height: 300px;
}

.product-name {
  font-size: 20px;
  margin-bottom: 0 !important;
}

.price {
  color: gray;
}
</style>
