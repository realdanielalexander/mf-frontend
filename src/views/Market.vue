<template>
  <div class="columns is-vcentered is-flex" style="flex-direction: column">
    <div class="column">
      <h1 style="padding: 12px 48px" class="has-text-centered title">
        Millenial Catalog
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
        <router-link :to="{ path: '/product/' + product.id }">
          <div class="card">
            <div class="card-content">
              <div class="content">
                <figure style="text-align: center; margin: 0">
                  <img
                    class="image-product"
                    :src="require(`@/${product.image_url}`)"
                  />
                </figure>

                <a class="product-name"
                  ><strong>{{ product.name }}</strong></a
                >
                <p class="price">
                  Rp. {{ parseInt(product.price).toLocaleString("id-Id") }}
                </p>
                <!-- <div> -->
                <!-- <b-numberinput
                  min="1"
                  size="is-small"
                  controls-position="compact"
                ></b-numberinput> -->
                <!-- <b-button type="is-primary" expanded>+ Add to Cart</b-button>
                </div> -->
              </div>
            </div>
          </div>
        </router-link>
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
      const res = await axios.get("/products");
      this.products = res.data;
    },
    async fetchCustomer() {
      const res = await axios.get("/customers");
      this.customers = res.data;
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