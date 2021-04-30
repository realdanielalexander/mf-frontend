<template>
  <div class="columns is-vcentered is-flex" style="flex-direction: column">
    <div class="align-self-stretch pl-2 py-0 white">
      <v-breadcrumbs :items="breadcrumbs">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </div>
    <div class="mt-8 d-flex align-self-stretch justify-space-between">
      <div style="padding: 12px 48px" class="ml-8 title font-weight-bold">Millenial Catalog</div>
      <b-field class="mr-16">
        <v-select
          :items="categories"
          label="Category"
          outlined
          v-model="currentCategory"
          @change="onChange"
        ></v-select>
      </b-field>
    </div>
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
        <router-link
          :to="{ path: '/product/' + product.category_id + '/' + product.id }"
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

                <a class="product-name"
                  ><strong>{{ product.name }}</strong></a
                >
                <p class="price">
                  Rp. {{ parseInt(product.price).toLocaleString("id-Id") }}
                </p>
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
      <p>Market is empty!</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["currentCustomerId"],
  mounted() {
    this.fetchData();
    this.fetchCategory();
  },
  data() {
    return {
      isLoading: false,
      products: [],
      categories: [],
      currentCategory: null,
      breadcrumbs: [
        {
          text: "Home",
          disabled: false,
        },
        {
          text: "Market",
          disabled: true,
        },
      ],
    };
  },
  methods: {
    async fetchData() {
      const res = await axios.get("/products");
      this.products = res.data;
    },
    async fetchDataByCategory(categoryId) {
      const res = await axios.get("/products/" + categoryId);
      this.products = res.data;
    },
    async fetchCategory() {
      const res = await axios.get("/categories");
      this.categories = this.categoriesAdapter(res.data);
    },
    categoriesAdapter(categories) {
      var categoriesAdapted = categories.map((category) => ({
        id: category.id,
        text: category.name,
        value: category.id,
      }));
      return categoriesAdapted;
    },
    onChange: function () {
      console.log("change triggerd");
      this.fetchDataByCategory(this.currentCategory);
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