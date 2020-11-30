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
export default {
    data() {
        return {
            isLoading: false,
            products: [
                {'id' : 36805, 'name' : 'Baju Abal-Abal', 'image_url': 'assets/product/set_1.png', 'price' : 1000000},
                {'id' : 38266, 'name' : 'Baju Super Abal', 'image_url': 'assets/product/set_2.png', 'price' : 1500000},
                {'id' : 38317, 'name' : 'Baju Super KW', 'image_url': 'assets/product/set_3.png', 'price' : 1250000},
                {'id' : 37283, 'name' : 'Baju Super Ampas', 'image_url': 'assets/product/set_4.png', 'price' : 2000000},
                {'id' : 37682, 'name' : 'Baju Super Jelek', 'image_url': 'assets/product/set_5.png', 'price' : 2500000},
                {'id' : 38100, 'name' : 'Baju Pasaran', 'image_url': 'assets/product/set_6.png', 'price' : 1750000},
                {'id' : 38063, 'name' : 'Baju Abang Jagp', 'image_url': 'assets/product/set_7.png', 'price' : 3000000},
                {'id' : 38085, 'name' : 'Baju Anak Gelo', 'image_url': 'assets/product/set_8.png', 'price' : 3500000},
                {'id' : 38687, 'name' : 'Baju Kaya Banget', 'image_url': 'assets/product/set_9.png', 'price' : 4000000},
            ],
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            // For fetch data product
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