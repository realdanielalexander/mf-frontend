<template>
<div>
  <div class="align-self-stretch pl-2 py-0 white">
      <v-breadcrumbs :items="breadcrumbs">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </div>
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
        <div class="modal-card" style="width: 1000px">
          <header class="modal-card-head">
            <p class="modal-card-title">Pay the Bill</p>
          </header>
          <section class="modal-card-body">
            <b-field label="Total">
              <b-input name="total" :value="getTotalBill" disabled> </b-input>
            </b-field>
            <!-- <b-field label="Pay Method">
              <b-select
                v-model="method"
                placeholder="Select a pay method"
                expanded
              >
                <option value="Cash">Cash</option>
                <option value="Transfer">Transfer</option>
              </b-select>
            </b-field> -->
            <b-field label="Payment Method">
              <v-item-group v-model="selectedMethod">
                <v-container>
                  <v-row>
                    <v-col
                      v-for="paymentMethod in paymentMethods"
                      :key="paymentMethod.id"
                      cols="12"
                      md="4"
                    >
                      <v-item v-slot="{ active, toggle }">
                        <v-card
                          :color="active ? 'primary' : ''"
                          class="d-flex align-center"
                          dark
                          height="200"
                          @click="toggle"
                        >
                          <v-img
                            height="200px"
                            :src="require(`@/${paymentMethod.image}`)"
                          />
                          <v-fade-transition>
                            <v-overlay v-if="active" absolute color="#000000">
                              <v-icon dark x-large color="green">
                                mdi-checkbox-marked-circle
                              </v-icon>
                            </v-overlay>
                          </v-fade-transition>
                        </v-card>
                      </v-item>
                    </v-col>
                  </v-row>
                </v-container>
              </v-item-group>
            </b-field>
            <b-field label="Promo Code">
              <v-card>
                <v-card-text>
                  <v-autocomplete
                    v-model="promo"
                    :items="promoItems"
                    :loading="isLoading"
                    :search-input.sync="searchPromo"
                    hide-no-data
                    hide-selected
                    item-text="code"
                    item-value="id"
                    placeholder="Start typing to Search"
                    return-object
                  ></v-autocomplete>
                </v-card-text>
                <v-expand-transition>
                  <v-list v-if="promo" class="lighten-3">
                    <v-list-item v-for="(field, i) in promoFields" :key="i">
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="field.value"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                          v-text="field.key"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-expand-transition>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn :disabled="!promo" color="white" @click="promo = null">
                    Clear
                    <v-icon right> mdi-close-circle </v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </b-field>
            <b-field label="Courier">
              <v-card>
                <v-card-text>
                  <v-autocomplete
                    v-model="courier"
                    :items="courierItems"
                    :loading="isLoading"
                    :search-input.sync="searchCourier"
                    hide-no-data
                    hide-selected
                    item-text="name"
                    item-value="id"
                    placeholder="Start typing to Search"
                    return-object
                  ></v-autocomplete>
                </v-card-text>
                <v-expand-transition>
                  <v-list v-if="courier" class="lighten-3">
                    <v-list-item v-for="(field, i) in courierFields" :key="i">
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="field.value"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                          v-text="field.key"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-expand-transition>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    :disabled="!courier"
                    color="white"
                    @click="courier = null"
                  >
                    Clear
                    <v-icon right> mdi-close-circle </v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
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
              :disabled="!paymentAllowed()"
              @click="postTransaction()"
              >Continue to Pay</b-button
            >
            <div class="ml-8">{{ message }}</div>
          </footer>
        </div>
      </form>
    </b-modal>
  </div>
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
      method: "",
      total: null,
      promo: null,
      courier: null,

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

      // payment methods
      paymentMethods: [],
      selectedMethod: null,

      //autocomplete promo code
      promoEntries: [],
      searchPromo: null,
      promoCount: 0,

      //autocomplete courier
      courierEntries: [],
      searchCourier: null,
      courierCount: 0,

      message: "",

      
      breadcrumbs: [
        {
          text: "Home",
          disabled: false,
        },
        {
          text: "Cart",
          disabled: true,
        },
      ],
    };
  },
  mounted() {
    this.fetchData();
    this.fetchPaymentMethods();
  },
  computed: {
    getTotalBill: function () {
      return "Rp " + parseInt(this.calculateTotal()).toLocaleString("id-ID");
    },

    promoFields() {
      if (!this.promo) return [];

      return Object.keys(this.promo).map((key) => {
        return {
          key,
          value: this.promo[key] || "n/a",
        };
      });
    },
    promoItems() {
      return this.promoEntries.map((entry) => {
        const code = entry.code;
        const id = entry.id;

        return Object.assign({}, entry, { id, code });
      });
    },

    courierFields() {
      if (!this.courier) return [];

      return Object.keys(this.courier).map((key) => {
        return {
          key,
          value: this.courier[key] || "n/a",
        };
      });
    },
    courierItems() {
      return this.courierEntries.map((entry) => {
        const id = entry.id;
        // const amount = 'Rp' + entry.amount.toLocaleString("id-ID");
        const amount = entry.amount;

        return Object.assign({}, entry, { id, amount });
      });
    },
  },
  watch: {
    searchPromo() {
      // Items have already been loaded
      if (this.promoItems.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      fetch(`http://localhost:8080/promos`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          this.promoCount = res.length;
          this.promoEntries = res;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
    searchCourier() {
      // Items have already been loaded
      if (this.courierItems.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      fetch(`http://localhost:8080/couriers`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          this.courierCount = res.length;
          this.courierEntries = res;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
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

      if (this.promo && this.message === "") {
        if (this.promo.percentage) {
          const amount = (total * this.promo.amount) / 100;
          console.log(amount);
          total = total - amount;
        } else {
          total = total - this.promo.amount;
        }
      }

      if (this.courier && this.message === "") {
        total = total + this.courier.amount;
      }

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
    paymentAllowed() {
      var isValid = true;
      if (this.selectedMethod === undefined || this.selectedMethod === null) {
        isValid = false;
        this.message = "Please select your desired payment method.";
      } else if (
        this.promo &&
        this.calculateTotal() <= this.promo.minimum_order
      ) {
        isValid = false;
        this.message =
          "Your total payment is not sufficient for this promo code.";
      } else if (
        this.promo &&
        moment(Date.now()).isAfter(this.promo.valid_to)
      ) {
        isValid = false;
        this.message = "Your promo code has expired.";
      } else if (
        this.promo &&
        moment(Date.now()).isBefore(this.promo.valid_from)
      ) {
        isValid = false;
        this.message = "Your promo is not valid yet.";
      } else if (isValid) {
        this.message = "";
      }

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
    async fetchPaymentMethods() {
      try {
        const res = await axios.get("/payment-methods");
        this.paymentMethods = res.data;
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
      await axios.delete(
        "/carts/" + this.currentCustomerId + "/" + item.variation_id
      );
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
        payment_method: this.paymentMethods[this.selectedMethod].name,
        promo: this.promo ? this.promo.code : "",
        total: this.calculateTotal(),
      };

      var transactionResult = await axios.post("/transactions", transaction);
      var shipmentStatus = {
        transaction_id: transactionResult.data.id,
        status: "Waiting for Confirmation",
      };

      await axios.post("/shipment-statuses", shipmentStatus);

      this.$buefy.dialog.alert({
        title: "Payment Successful",
        message: "Thank you for shopping at Millennial Fashion!",
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
