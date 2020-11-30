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
                                <img class="image-product" src="../assets/product/product_1.jpg">
                            </figure>
                            <router-link :to="{ path: '/product/1' }">
                                <p class="product-name"><strong>Baju Oblong Adidas Kw</strong></p>
                            </router-link>
                            <p class="price">Rp. 1.000.000</p>
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
export default {
    data() {
        return {
            isLoading: false,
            products: [1, 2, 3, 4, 5, 6, 7, 8]
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            // For fetch data product
        }
    }
}
</script>

<style scoped>
.image-product {
    max-height: 300px;
}

.product-name {
    font-size: 20px;
    margin-bottom: 0 !important;
}

.price {
    color: gray;
}
</style>