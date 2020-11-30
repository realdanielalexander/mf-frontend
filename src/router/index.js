import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// add component
import Home from '../views/Home.vue';
import Market from '../views/Market.vue';
import Cart from '../views/Cart.vue';
import DetailProduct from '../views/DetailProduct.vue';

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/market",
        name: "market",
        component: Market,
    },
    {
        path: "/cart",
        name: "cart",
        component: Cart,
    },
    {
        path: '/product/:productId',
        name: 'detailProduct',
        component: DetailProduct
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    linkActiveClass: "is-active",
    routes,
    scrollBehavior() {
        window.scrollTo(0, 0);
    }
});

export default router;
