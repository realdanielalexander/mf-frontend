import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// add component
import Home from '../views/Home.vue';
import Market from '../views/Market.vue';
import Cart from '../views/Cart.vue';
import DetailProduct from '../views/DetailProduct.vue';
import Signup from '../views/Signup.vue';
import Wish from '../views/Wish.vue';
import Transactions from '../views/Transactions.vue';
import DetailTransaction from '../views/DetailTransaction.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/market',
    name: 'market',
    component: Market,
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
  },
  {
    path: '/product/:categoryId/:productId',
    name: 'detailProduct',
    component: DetailProduct,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: Signup,
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: Wish,
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: Transactions,
  },
  {
    path: '/transactions/:transactionId',
    name: 'detailTransaction',
    component: DetailTransaction,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'is-active',
  routes,
  scrollBehavior() {
    window.scrollTo(0, 0);
  },
});

export default router;
