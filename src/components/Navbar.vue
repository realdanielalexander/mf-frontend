<template>
    <b-navbar style="background-color: white">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img src="@/assets/millenial_fashion.png"> 
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
                <span style="margin-left:0.5rem">Home</span>
            </b-navbar-item>
            <b-navbar-item href="/">
                <b-icon
                    pack="fas"
                    icon="shopping-bag"
                    size="is-small"
                    type="is-primary">
                </b-icon>
                <span style="margin-left:0.5rem">Market</span>
            </b-navbar-item>
            <b-navbar-item href="#">
                 <b-icon
                    pack="fas"
                    icon="shopping-cart"
                    size="is-small"
                    type="is-primary">
                </b-icon>
                 <span style="margin-left:0.5rem">Cart</span>
            </b-navbar-item>
        </template>
        <template slot="end">
            <b-navbar-item href="#">
                <b-field>
                    <b-select placeholder="Select a customer" icon="user">
                        <option value="flint">Flint</option>
                        <option value="silver">Silver</option>
                        <option value="vane">Vane</option>
                        <option value="billy">Billy</option>
                        <option value="jack">Jack</option>
                    </b-select>
                </b-field>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>