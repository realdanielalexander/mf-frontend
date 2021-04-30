<template>
  <div>
    <div
      class="columns is-multiline is-flex"
      style="align-items: center; min-height: 75vh"
    >
      <div class="column is-5 ml-6 mr-6">
        <figure>
          <b-image v-if="product" :src="require(`@/${product.image_url}`)" />
        </figure>
      </div>

      <div class="column is-5 mr-6">
        <p class="title-product">
          <strong v-if="product">{{ product.name }}</strong>
        </p>

        <hr style="background-color: hsl(0, 0%, 86%); margin: 12px 0" />
        <p v-if="product" class="description">
          {{ product.description }}
        </p>
        <hr style="background-color: hsl(0, 0%, 86%); margin: 12px 0" />

        <!-- <p v-if="product" class="font-weight-bold flex-grow-1 display-1">
          Rp. {{ parseInt(product.price).toLocaleString("id-ID") }}
        </p> -->
        <b-numberinput
          v-model="product.price"
          min="1"
          controls-position="compact"
        >
        </b-numberinput>
        <b-button
            class="mr-3"
            type="is-light"
            @click="updatePrice()"
            expanded
            ><strong>Save Price</strong></b-button
          >
        <p class="font-weight-bold flex-grow-1 description">Variants</p>

        <!-- ----------------------------------------------------------------------------- -->
        <!-- GrpItemMandatory -->
        <!-- ----------------------------------------------------------------------------- -->
        <div style="width: 50%">
          <v-item-group mandatory v-model="selectedVariation">
            <v-row>
              <v-col v-for="n in this.variations" :key="n.id" cols="12" md="4">
                <v-item v-slot:default="{ active, toggle }">
                  <v-card
                    :color="active ? 'primary' : 'white'"
                    class="d-flex align-center black--text"
                    dark
                    height="50"
                    @click="toggle"
                  >
                    <div
                      class="font-weight-bold flex-grow-1 text-center"
                      v-bind:class="{ 'white--text': active }"
                    >
                      {{ n.variation }}
                    </div>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-item-group>
        </div>
        <div v-if="this.selectedVariationObject">
          Stock: {{ this.selectedVariationObject.stock }}
        </div>
        <div class="is-flex" style="flex-direction: row">
          <b-button
            class="mr-3"
            type="is-light"
            @click="viewDesign3D(product.preview_url)"
            expanded
            ><strong>View</strong></b-button
          >
          <b-button
            v-if="this.selectedVariationObject"
            :disabled="selectedVariationObject.stock < 1"
            class="mr-3"
            type="is-primary"
            expanded
            @click="addToCart()"
            ><strong>+ Add to Cart</strong></b-button
          >

          <b-button type="is-danger" expanded @click="addToWishlist()"
            ><strong>+ Add to Wishlist</strong></b-button
          >
        </div>
      </div>

      <div
        id="showcaseContainer"
        class="lity-container"
        style="width: 100vw; position: fixed; display: none"
      >
        <div class="lity-content">
          <button
            class="lity-close"
            type="button"
            aria-label="Close (Press escape to close)"
            @click="toggle()"
          >
            X
          </button>
          <div class="lity-iframe-container" style="max-height: 536px">
            <iframe
              id="showcase"
              frameborder="0"
              allowfullscreen
              src="https://dsign4you.com/3d/viewer/?q=hq&design=36805"
              __idm_frm__="280"
              style="width: 100vw; height: 500px"
            >
            </iframe>
          </div>
        </div>
      </div>
    </div>
    <div>
      <!-- ----------------------------------------------------------------------------- -->
      <!-- TabsItems -->
      <!-- ----------------------------------------------------------------------------- -->
      <div>
        <div class="my-4 mx-16">
          <v-tabs v-model="tab">
            <v-tab> Comments </v-tab>
            <v-tab> Reviews </v-tab>
            <v-tab> Prices </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab" class="">
            <v-tab-item>
              <v-row class="py-16">
                <v-col cols="2"> </v-col>
                <v-col cols="8">
                  <p class="font-weight-bold">Comments</p>
                  <div
                    v-for="comment in comments"
                    :key="comment.id"
                    class="d-flex flex-column"
                  >
                    <v-divider />
                    <v-row>
                      <v-col cols="3">
                        <v-row class="mr-3">
                          <v-col cols="3">
                            <v-avatar size="42"
                              ><img
                                :src="require(`@/${comment.image}`)"
                                :alt="comment.image"
                            /></v-avatar>
                          </v-col>
                          <v-col cols="9">
                            <span class="font-weight-bold block">
                              {{ comment.name }}
                            </span>
                            <br />
                            <small class="block">
                              {{ formatDate(comment.created_at) }}
                            </small>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="6">
                        <v-avatar size="42"></v-avatar>
                        <span>{{ comment.message }}</span>
                      </v-col>
                      <v-col cols="3"
                        ><b-button
                          @click="deleteComment(comment.id)"
                          type="is-danger"
                          icon-right="trash"
                        />
                      </v-col>
                    </v-row>
                    <b v-if="comment.replies && comment.replies.length > 0">Replies:</b>
                    <v-row
                      v-for="reply in comment.replies"
                      :key="reply.id"
                      class="ml-8"
                    >
                      <v-col cols="3">
                        <v-row class="mr-3">
                          <v-col cols="3">
                            <v-avatar size="42"
                              ><img
                                :src="require(`@/${reply.image}`)"
                                :alt="reply.image"
                            /></v-avatar>
                          </v-col>
                          <v-col cols="9">
                            <span class="font-weight-bold block">
                              {{ reply.name }}
                            </span>
                            <br />
                            <small class="block">
                              {{ formatDate(reply.created_at) }}
                            </small>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="6">
                        <v-avatar size="42"></v-avatar>
                        <span>{{ reply.message }}</span>
                      </v-col>
                      <v-col cols="3"
                        ><b-button
                          @click="deleteCommentReply(reply.id, comment)"
                          type="is-danger"
                          icon-right="trash"
                        />
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
              </v-row>
            </v-tab-item>

            <v-tab-item>
              <v-row class="py-16">
                <v-col cols="2"> </v-col>
                <v-col cols="8">
                  <p class="font-weight-bold">Reviews</p>
                  <div
                    v-for="review in reviews"
                    :key="review.id"
                    class="d-flex flex-column"
                  >
                    <v-divider />
                    <v-row>
                      <v-col cols="3">
                        <v-row class="mr-3">
                          <v-col cols="3">
                            <v-avatar size="42"
                              ><img
                                :src="require(`@/${review.image}`)"
                                :alt="review.image"
                            /></v-avatar>
                          </v-col>
                          <v-col cols="9"
                            ><v-rating
                              class="px-0 mx-0"
                              hover
                              dense
                              length="5"
                              small
                              v-model="review.rating"
                              readonly
                            ></v-rating>
                            <span class="font-weight-bold block">
                              {{ review.name }}
                            </span>
                            <br />
                            <small class="block">
                              {{ formatDate(review.created_at) }}
                            </small>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="6">
                        <v-avatar size="42"></v-avatar>
                        <span>{{ review.message }}</span>
                      </v-col>
                      <v-col cols="3"
                        ><b-button
                          @click="deleteReview(review.id)"
                          type="is-danger"
                          icon-right="trash"
                        />
                      </v-col>
                    </v-row>
                    <b v-if="review.replies && review.replies.length > 0">Replies:</b>
                    <v-row
                      v-for="reply in review.replies"
                      :key="reply.id"
                      class="ml-8"
                    >
                      <v-col cols="3">
                        <v-row class="mr-3">
                          <v-col cols="3">
                            <v-avatar size="42"
                              ><img
                                :src="require(`@/${reply.image}`)"
                                :alt="reply.image"
                            /></v-avatar>
                          </v-col>
                          <v-col cols="9">
                            <span class="font-weight-bold block">
                              {{ reply.name }}
                            </span>
                            <br />
                            <small class="block">
                              {{ formatDate(reply.created_at) }}
                            </small>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="6">
                        <v-avatar size="42"></v-avatar>
                        <span>{{ reply.message }}</span>
                      </v-col>
                      <v-col cols="3"
                        ><b-button
                          @click="deleteReviewReply(reply.id, review)"
                          type="is-danger"
                          icon-right="trash"
                        />
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
              </v-row>
            </v-tab-item>

            <v-tab-item>
              <div class="content" style="margin-bottom: 0">
                <b-table
                  :data="prices ? prices : []"
                  :hoverable="true"
                  :loading="isLoading"
                >
                  <b-table-column
                    field="id"
                    label="Id"
                    width="5"
                    numeric
                    v-slot="props"
                  >
                    {{ props.row.id }}
                  </b-table-column>

                  <b-table-column
                    field="Price"
                    width="40"
                    label="Price"
                    v-slot="props"
                  >
                    {{ props.row.price }}
                  </b-table-column>

                  <b-table-column
                    field="Change Date"
                    label="Change Date"
                    width="40"
                    v-slot="props"
                  >
                    {{ props.row.created_at }}
                  </b-table-column>

                  <template slot="empty">
                    <section class="section">
                      <div class="content has-text-grey has-text-centered">
                        <p>Prices is empty!</p>
                      </div>
                    </section>
                  </template>
                </b-table>
              </div>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  props: ["currentCustomerId"],
  data() {
    return {
      global: {},
      product: null,
      productId: "",
      variations: [],
      comments: [],
      reviews: [],
      comment: null,
      review: null,
      commentReply: null,
      rating: 5,
      selectedVariation: null,
      selectedStock: null,
      tab: null,
      prices: [],
      isLoading: false,

      // modal
      isComponentModalActive: false,
    };
  },
  created() {
    this.productId = this.$route.params.productId;
    this.categoryId = this.$route.params.categoryId;
    this.fetchData();
    this.fetchVariations();
    this.fetchComments();
    this.fetchReviews();
    this.fetchPrices();
  },
  computed: {
    selectedVariationObject: function () {
      return this.variations[this.selectedVariation];
    },
  },
  methods: {
    async fetchData() {
      const res = await axios.get(
        `/products/${this.categoryId}/${this.productId}`
      );
      this.product = res.data;
    },

    async fetchVariations() {
      const res = await axios.get(`/variations/${this.productId}/product`);
      this.variations = res.data;
    },

    async fetchComments() {
      const res = await axios.get(`/comments/${this.productId}`);
      this.comments = res.data.reverse();
      console.log(res.data);
    },
    async fetchReviews() {
      const res = await axios.get(`/reviews/${this.productId}`);
      this.reviews = res.data.reverse();
      console.log(res.data);
    },
    async fetchPrices() {
      const res = await axios.get(`/prices/${this.productId}`);
      this.prices = res.data.reverse();
    },
    async postComment() {
      if (this.comment === "" || this.comment === null) return;
      const res = await axios.post(`/comments`, {
        customer_id: parseInt(this.currentCustomerId),
        product_id: parseInt(this.productId),
        message: this.comment,
      });
      this.comment = "";
      this.comments.unshift(res.data);
    },
    async postCommentReply(comment) {
      console.log(comment);
      if (comment.reply === "" || comment.reply === null) return;
      const res = await axios.post(`/comment-replies`, {
        customer_id: parseInt(this.currentCustomerId),
        comment_id: parseInt(comment.id),
        message: comment.reply,
      });
      comment.reply = "";
      if (!comment.replies) {
        comment.replies = [];
      }
      comment.replies.unshift(res.data);
    },
    async postReview() {
      if (this.review === "" || this.review === null) return;
      const res = await axios.post(`/reviews`, {
        customer_id: parseInt(this.currentCustomerId),
        product_id: parseInt(this.productId),
        message: this.review,
        rating: this.rating,
      });
      this.review = "";
      this.reviews.unshift(res.data);
    },
    async postReviewReply(review) {
      if (review.reply === "" || review.reply === null) return;
      const res = await axios.post(`/review-replies`, {
        customer_id: parseInt(this.currentCustomerId),
        review_id: parseInt(review.id),
        message: review.reply,
      });
      review.reply = "";
      if (!review.replies) {
        review.replies = [];
      }
      review.replies.unshift(res.data);
    },
    async updatePrice() {
      const res = await axios.put(`/products/${this.productId}`, {
        price: this.product.price
      });
      
      console.log({
        product_id: parseInt(this.productId),
        price: parseInt(this.product.price)
      });

      await axios.post(`/prices`, {
        product_id: parseInt(this.productId),
        price: this.product.price
      });
      this.prices.unshift(res.data);

      this.$buefy.dialog.alert({
        title: "Update Successful",
        message: "Price updated successfully.",
        type: "is-success",
        hasIcon: true,
        icon: "check-circle",
        iconPack: "fa",
      });
    },

    async deleteComment(id) {
      await axios.delete(`/comments/${id}`);
      this.comments = this.comments.filter((comment) => comment.id !== id);

      this.$buefy.dialog.alert({
        title: "Delete Successful",
        message: "Comment deleted successfully.",
        type: "is-success",
        hasIcon: true,
        icon: "check-circle",
        iconPack: "fa",
      });
    },

    async deleteReview(id) {
      await axios.delete(`/reviews/${id}`);
      this.reviews = this.reviews.filter((review) => review.id !== id);

      this.$buefy.dialog.alert({
        title: "Delete Successful",
        message: "Review deleted successfully.",
        type: "is-success",
        hasIcon: true,
        icon: "check-circle",
        iconPack: "fa",
      });
    },

    async deleteCommentReply(id, comment) {
      await axios.delete(`/comment-replies/${id}`);
      comment.replies = comment.replies.filter((reply) => reply.id !== id);

      this.$buefy.dialog.alert({
        title: "Delete Successful",
        message: "Reply deleted successfully.",
        type: "is-success",
        hasIcon: true,
        icon: "check-circle",
        iconPack: "fa",
      });
    },

    async deleteReviewReply(id, review) {
      await axios.delete(`/review-replies/${id}`);
      review.replies = review.replies.filter((reply) => reply.id !== id);

      this.$buefy.dialog.alert({
        title: "Delete Successful",
        message: "Reply deleted successfully.",
        type: "is-success",
        hasIcon: true,
        icon: "check-circle",
        iconPack: "fa",
      });
    },

    async addToCart() {
      await axios.post(`/carts`, {
        customer_id: parseInt(this.currentCustomerId),
        variation_id: parseInt(
          this.variations[this.selectedVariation].variation_id
        ),
      });

      this.$buefy.dialog.alert({
        title: "Add Product to Cart",
        message:
          "Product " + this.product.name + " successfully added to cart.",
        type: "is-success",
        hasIcon: true,
        icon: "check-circle",
        iconPack: "fa",
      });
    },
    async addToWishlist() {
      await axios.post(`/wishlists`, {
        customer_id: parseInt(this.currentCustomerId),
        product_id: parseInt(this.productId),
      });

      this.$buefy.dialog.alert({
        title: "Add Product to Wishlist",
        message: "Product " + this.product.name + " added to wishlist.",
        type: "is-success",
        hasIcon: true,
        icon: "check-circle",
        iconPack: "fa",
      });
    },
    viewDesign3D(id) {
      var showcaseContainer = document.getElementById("showcaseContainer");
      document.getElementById("showcase").src =
        "https://dsign4you.com/3d/viewer/?q=hq&design=" + id;
      if (showcaseContainer.style.display === "none") {
        showcaseContainer.style.display = "block";
      }
    },
    toggle() {
      var showcaseContainer = document.getElementById("showcaseContainer");
      if (showcaseContainer.style.display === "none") {
        showcaseContainer.style.display = "block";
      } else {
        showcaseContainer.style.display = "none";
      }
    },

    formatDate(date) {
      return moment(String(date)).format("DD MMMM YYYY");
    },
  },
};
</script>

<style scoped>
img {
  border-radius: 10px;
  max-height: 600px;
}

.title-product {
  font-size: 30px;
}

.description {
  text-align: justify;
}
</style>
