<template>
  <div
    class="columns is-centered"
    style="align-items: center; min-height: 100vh"
  >
    <div class="column is-four-fifths">
      <div class="card">
        <div class="card-content">
          <h1 class="title cart-header"><b>Shopping Cart</b></h1>
          <div></div>
          <div class="content" style="margin-bottom: 0">
            <b-table
              :data="data ? data : []"
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
                <b-field>
                  <b-numberinput
                    v-model="props.row.quantity"
                    min="1"
                    size="is-small"
                    controls-position="compact"
                  >
                  </b-numberinput>
                </b-field>
              </b-table-column>

              <b-table-column
                field="variation"
                label="Variation"
                width="125"
                v-slot="props"
              >
                {{ props.row.variation }}
              </b-table-column>

              <b-table-column field="price" label="Price" v-slot="props">
                Rp. {{ parseInt(props.row.price).toLocaleString("id-ID") }}
              </b-table-column>

              <b-table-column field="total" label="Total" v-slot="props"
                ><span v-if="typeof props.row.quantity !== 'undefined'">
                  Rp.
                  {{
                    parseInt(
                      props.row.price * props.row.quantity
                    ).toLocaleString("id-ID")
                  }}
                </span>
                <span v-else> - </span>
              </b-table-column>

              <b-table-column field="action" label="Action" v-slot="props">
                <b-button
                  @click="propsDeleteItem(props.row)"
                  type="is-danger"
                  icon-right="trash"
                />
              </b-table-column>

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
                >Rp
                {{ parseInt(calculateTotal()).toLocaleString("id-ID") }}</strong
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
              <b-button
                @click="isComponentModalActive = true"
                type="is-primary"
                style="width: 180px"
                :disabled="!checkValidity()"
                ><b>Pay</b></b-button
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
  props: ["currentCustomerId"],
  data() {
    const data = [];
    return {
      form: {
        method: "",
        total: 1000000,
      },

      // model for table
      quantities: [],

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
    this.fetchData();
  },
  computed: {
    getTotalBill: function () {
      return "Rp " + parseInt(this.calculateTotal()).toLocaleString("id-ID");
    },
  },
  methods: {
    calculateTotal() {
      var total = 0;
      this.data.forEach(function (item) {
        if (typeof item.quantity !== "undefined") {
          total += item.quantity * item.price;
        }
      });
      return total;
    },
    checkValidity() {
      var isValid = true;
      this.data.forEach(function (item) {
        if (typeof item.quantity === "undefined") {
          isValid = false;
          return;
        }
      });
      return isValid;
    },
    async fetchData() {
      try {
        const res = await axios.get("/carts/" + this.currentCustomerId);
        this.data = res.data;
      } catch (error) {
        this.data = [];
      }
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
      await axios.delete("/carts/" + this.currentCustomerId + "/" + item.id);
      await this.fetchData();
    },
    async postTransaction() {
      var products = [];
      this.data.forEach(function (item) {
        var product = {
          variation_id: item.variation_id,
          qty: item.quantity,
        };
        products.push(product);
      });
      var transaction = {
        customer_id: parseInt(this.currentCustomerId),
        date: moment(Date.now()).format("YYYY-MM-DDTHH:mm:ssZ"),
        products: products,
      };
      console.log(transaction);
      
      var transactionResult = await axios.post("/transactions", transaction);
      var shipmentStatus = {
          transaction_id: transactionResult.data.id,
          status: "Waiting for Confirmation"
      };
      await axios.post("/shipment-statuses", shipmentStatus);
      
      this.$buefy.dialog.alert({
        title: "Payment Successful",
        message:
          "Thank you for shopping at Millennial Fashion!",
        type: "is-success",
        hasIcon: true,
        icon: "check-circle",
        iconPack: "fa",
      });

      this.isComponentModalActive = false;
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
