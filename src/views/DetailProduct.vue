<template>
  <div
    class="columns is-multiline is-flex"
    style="align-items: center; min-height: 100vh"
  >
    <div class="column is-5 ml-6 mr-6">
      <figure>
        <b-image :src="require(`@/${product.image_url}`)" />
      </figure>
    </div>

    <div class="column is-5 mr-6">
      <p class="title-product">
        <strong>{{ product.name }}</strong>
      </p>
      <p>Rp. {{ parseInt(product.price).toLocaleString('id-ID') }}</p>
      <hr style="background-color: hsl(0, 0%, 86%); margin: 12px 0" />
      <p class="description">
        {{ product.description }}
      </p>
      <hr style="background-color: hsl(0, 0%, 86%); margin: 12px 0" />
      <div class="is-flex" style="flex-direction: row">
        <b-button
          class="mr-3"
          type="is-light"
          @click="viewDesign3D(product.preview_url)"
          expanded
          ><strong>View</strong></b-button
        >
        <b-button type="is-primary" expanded
          ><strong>+ Add to Cart</strong></b-button
        >
      </div>
    </div>

    <div
      id="showcaseContainer"
      class="lity-container"
      style="width:100vw; position: fixed; display: none"
    >
      <div class="lity-content">
        <button
          class="lity-close"
          type="button"
          aria-label="Close (Press escape to close)"
          @click="toggle()"
        >
          X
        </button>
        <div class="lity-iframe-container" style="max-height: 536px;">
          <iframe
            id="showcase"
            frameborder="0"
            allowfullscreen
            src="https://dsign4you.com/3d/viewer/?q=hq&design=36805"
            __idm_frm__="280"
            style="width:100vw; height: 500px"
          >
          </iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      global: {},
      product: null,
      productId: '',
    };
  },
  mounted() {
    this.productId = this.$route.params.productId;
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const res = await axios.get(`/products/${this.productId}`);
      this.product = res.data;
    },
    viewDesign3D(id) {
      var showcaseContainer = document.getElementById('showcaseContainer');
      document.getElementById('showcase').src =
        'https://dsign4you.com/3d/viewer/?q=hq&design=' + id;
      if (showcaseContainer.style.display === 'none') {
        showcaseContainer.style.display = 'block';
      }
    },
    toggle() {
      var showcaseContainer = document.getElementById('showcaseContainer');
      if (showcaseContainer.style.display === 'none') {
        showcaseContainer.style.display = 'block';
      } else {
        showcaseContainer.style.display = 'none';
      }
    },
  },
};
</script>

<style scoped>
img {
  border-radius: 10px;
  max-height: 600px;
}

.title-product {
  font-size: 30px;
}

.description {
  text-align: justify;
}
</style>
