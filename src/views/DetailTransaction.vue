<template>
  <div
    class="columns is-centered"
    style="align-items: center; min-height: 100vh"
  >
    <div class="column is-four-fifths">
      <div class="card">
        <div class="card-content">
          <h1 class="title cart-header">
            <b>{{ "Transaction " + formatDate(this.data.date) }}</b>
          </h1>
          <div>
            <!-- <b-field>
              <b-select
                placeholder="Select a customer"
                icon="user"
                value="user"
                @onSelect="onSelect"
              >
                <option
                  v-for="(customer, index) in customers"
                  :key="customer.id"
                  :index="index"
                  value="customer.id"
                >
                  {{ customer.name }}
                </option>
              </b-select>
            </b-field> -->
          </div>
          <div class="content" style="margin-bottom: 0">
            <b-table
              :data="data.products ? data.products : []"
              :hoverable="true"
              :loading="isLoading"
            >
              <b-table-column
                field="id"
                label="No"
                width="40"
                numeric
                v-slot="props"
              >
                {{ props.index + 1 }}
              </b-table-column>

              <b-table-column field="Name" label="Name" v-slot="props">
                {{ props.row.name }}
              </b-table-column>

              <b-table-column
                field="description"
                label="Description"
                width="200"
                v-slot="props"
              >
                {{ props.row.description }}
              </b-table-column>

              <b-table-column field="image" label="Image" v-slot="props">
                <figure style="text-align: center; margin: 0">
                  <img
                    class="image-product"
                    :src="require(`@/${props.row.image_url}`)"
                    width="200px"
                  />
                </figure>
              </b-table-column>

              <b-table-column
                field="quantity"
                label="Quantity"
                width="125"
                v-slot="props"
              >
                {{ props.row.qty }}
              </b-table-column>

              <b-table-column field="price" label="Price" v-slot="props">
                Rp. {{ parseInt(props.row.price).toLocaleString("id-ID") }}
              </b-table-column>

              <b-table-column field="total" label="Total" v-slot="props">
                Rp. {{ parseInt(props.row.total).toLocaleString("id-ID") }}
              </b-table-column>

              <!-- <b-table-column field="action" label="Action" v-slot="props">
                <b-button
                  @click="propsDeleteItem(props.row)"
                  type="is-danger"
                  icon-right="trash"
                />
              </b-table-column> -->

              <template slot="empty">
                <section class="section">
                  <div class="content has-text-grey has-text-centered">
                    <p>Cart is empty!</p>
                  </div>
                </section>
              </template>
            </b-table>
          </div>

          <hr style="background-color: black; margin: 24px 0" />

          <div class="level is-flex" style="padding: 0 24px">
            <p><strong>Total All Item</strong></p>
            <p>
              <strong
                >Rp. {{ parseInt(data.total).toLocaleString("id-ID") }}</strong
              >
            </p>
          </div>

          <hr style="background-color: black; margin: 24px 0" />

          <div class="level">
            <div class="level-right is-flex" style="width: 100%">
              <b-button
                tag="router-link"
                to="/market"
                type="is-light"
                style="margin-right: 12px"
                ><b>Continue Shopping</b></b-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal
      v-model="isComponentModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
    >
      <form action="">
        <div class="modal-card" style="width: 500px">
          <header class="modal-card-head">
            <p class="modal-card-title">Pay the Bill</p>
          </header>
          <section class="modal-card-body">
            <b-field label="Total">
              <b-input name="form.total" :value="getTotalBill" disabled>
              </b-input>
            </b-field>
            <b-field label="Pay Method">
              <b-select
                v-model="form.method"
                placeholder="Select a pay method"
                expanded
              >
                <option value="Cash">Cash</option>
                <option value="Transfer">Transfer</option>
                <option value="Credit">Credit</option>
              </b-select>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <b-button
              type="is-secondary"
              @click="isComponentModalActive = false"
              >Cancel</b-button
            >
            <b-button
              type="is-primary"
              :disabled="form.method == ''"
              @click="postTransaction()"
              >Continue to Pay</b-button
            >
          </footer>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    const data = [];
    return {
      form: {
        method: "",
        total: 1000000,
      },

      // model for table
      quantity: 1,

      // Table
      data,
      isLoading: false,

      // modal
      isComponentModalActive: false,

      // customers
      customers: [],
      user: "",
    };
  },
  mounted() {
    this.transactionId = this.$route.params.transactionId;
    this.fetchData();
    this.fetchCustomer();
  },
  computed: {
    getTotalBill: function () {
      return parseInt(this.form.total).toLocaleString("id-ID");
    },
  },
  methods: {
    async fetchData() {
      console.log("test");
      try {
        const res = await axios.get("/transactions/1/" + this.transactionId);
        this.data = res.data;
      } catch (error) {
        this.data = [];
      }
    },
    formatDate(date) {
      return moment(String(date)).format("DD MMMM YYYY");
    },
    propsDeleteItem(item) {
      this.$buefy.dialog.confirm({
        title: "Delete this item from cart?",
        message:
          "Item that has been <b>deleted</b> will not be count as your item again!",
        type: "is-danger",
        hasIcon: true,
        icon: "times-circle",
        iconPack: "fa",
        cancelText: "No",
        confirmText: "Yes",
        onConfirm: () => this.deleteFromCart(item),
      });
    },
    async deleteFromCart(item) {
      await axios.delete("/carts/1/" + item.id);
      alert("Item " + item.name + " deleted"); // for delete item from cart
      await this.fetchData();
    },
    async postTransaction() {
      console.log("post");
      var transaction = {
        customer_id: 1,
        date: "2012-11-01T22:08:41+00:00",
        products: [
          {
            product_id: 1,
            qty: 1,
          },
          {
            product_id: 2,
            qty: 2,
          },
        ],
      };
      await axios.post("/transactions", transaction);
      alert("Payment Successful!");
      this.isComponentModalActive = false;
    },

    async fetchCustomer() {
      const res = await axios.get("/customers");
      this.customers = res.data;
    },
    onSelect(value) {
      this.user = value;
    },
  },
};
</script>

<style scoped>
.column {
  padding-top: 24px;
}

.cart-header {
  border-bottom: 1px solid black;
  padding-bottom: 24px;
}
</style>