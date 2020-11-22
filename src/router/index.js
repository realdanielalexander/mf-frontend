import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// add component
import Home from '../views/Home.vue';

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
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