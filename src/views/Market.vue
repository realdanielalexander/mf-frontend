<template>
    <div class="columns is-vcentered is-flex" style="flex-direction: column; min-height: 100vh">
        <div class="column">
            <h1 class="has-text-centered title">MILLENIAL CATALOG</h1>
        </div>
        <div class="columns is-multiline" style="padding: 12px 48px">
            <div class="column is-4" v-for="(product, index) in products" :key="product.id" :index="index">
                <div class="card">
                    <div class="card-content">
                        <div class="content">
                            <figure style="text-align: center; margin: 0">
                                <img class="image-product" :src="require(`@/${product.image_url}`)" />
                            </figure>
                            <router-link :to="{ path: '/product/' + product.id }">
                                <a class="product-name"><strong>{{ product.name }}</strong></a>
                            </router-link>
                            <p class="price">
                                Rp. {{ parseInt(product.price).toLocaleString('id-Id') }}
                            </p>
                            <b-button type="is-primary" expanded>+ Add to Cart</b-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="true"></b-loading>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    mounted(){
        this.fetchData();
    },
    data() {
        return {
            isLoading: false,
            products: [],
        }
    },
      methods: {
        async fetchData() {
            const res = await axios.get('/products');
            this.products = res.data
        },
    }
}
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