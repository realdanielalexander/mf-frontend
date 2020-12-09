<template>
  <b-navbar style="background-color: white; padding: 16px" shadow>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="@/assets/millenial_fashion.png" />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item href="/">
        <b-icon pack="fas" icon="home" size="is-small" type="is-primary">
        </b-icon>
        <span style="margin-left: 0.5rem">Home</span>
      </b-navbar-item>
      <b-navbar-item href="/market">
        <b-icon
          pack="fas"
          icon="shopping-bag"
          size="is-small"
          type="is-primary"
        >
        </b-icon>
        <span style="margin-left: 0.5rem">Market</span>
      </b-navbar-item>
      <b-navbar-item href="/cart">
        <b-icon
          pack="fas"
          icon="shopping-cart"
          size="is-small"
          type="is-primary"
        >
        </b-icon>
        <span style="margin-left: 0.5rem">Cart</span>
      </b-navbar-item>
      <b-navbar-item href="/wishlist">
        <b-icon pack="fas" icon="heart" size="is-small" type="is-primary">
        </b-icon>
        <span style="margin-left: 0.5rem">Wishlist</span>
      </b-navbar-item>
      <b-navbar-item href="/transactions">
        <b-icon pack="fas" icon="history" size="is-small" type="is-primary">
        </b-icon>
        <span style="margin-left: 0.5rem">Transactions</span>
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item href="/signup">
        <b-button class="button is-primary">Sign Up</b-button>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {};
</script>
