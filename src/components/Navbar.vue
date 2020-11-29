<template>
    <b-navbar style="background-color: #fafafa">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <!-- <img
                    
                    alt="Lightweight UI components for Vue.js based on Bulma"
                > -->
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item href="/">
               <b-icon
                pack="fas"
                icon="home"
                size="is-small"
                type="is-primary">
                </b-icon>
                <span style="margin-left:0.5rem">Market</span>
            </b-navbar-item>
            <b-navbar-item href="#">
                 <b-icon
                pack="fas"
                icon="shopping-bag"
                size="is-small"
                type="is-primary">
                </b-icon>
                 <span style="margin-left:0.5rem">Cart</span>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>