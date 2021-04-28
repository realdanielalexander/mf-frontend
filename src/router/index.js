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
import Chat from '../views/chat/Chat.vue';
import ChatAdmin from '../views/chat/ChatAdmin.vue';
import WaitingForConfirmation from '../views/WaitingForConfirmation.vue';
import Processed from '../views/Processed.vue';
import Shipped from '../views/Shipped.vue';
import Arrived from '../views/Arrived.vue';

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
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
  },
  {
    path: '/admin/chat',
    name: 'ChatAdmin',
    component: ChatAdmin,
  },
  {
    path: '/admin/waiting-for-confirmation',
    name: 'WaitingForConfirmation',
    component: WaitingForConfirmation,
  },
  {
    path: '/admin/processed',
    name: 'Processed',
    component: Processed,
  },
  {
    path: '/admin/shipped',
    name: 'Shipped',
    component: Shipped,
  },
  {
    path: '/admin/arrived',
    name: 'Arrived',
    component: Arrived,
  },
  {
    path: 'admin/product/:categoryId/:productId',
    name: 'detailProduct',
    component: DetailProduct,
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
