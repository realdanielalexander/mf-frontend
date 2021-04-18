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
          <!-- ----------------------------------------------------------------------------- -->
          <!-- SteppersOptional -->
          <!-- ----------------------------------------------------------------------------- -->
          <div class="content">
            <div class="mt-4">
              <v-stepper v-model="shipmentStatuses.length" class="mt-12">
                <v-stepper-header>
                  <v-stepper-step step="1"
                    >Waiting for Confirmation
                    <small v-if="this.shipmentStatuses.length >= 1">{{ formatDate(this.shipmentStatuses[0].created_at)}}</small>
                  </v-stepper-step>
                  <v-divider></v-divider>

                  <v-stepper-step step="2">
                    Processed
                    <small v-if="this.shipmentStatuses.length >= 2">{{ formatDate(this.shipmentStatuses[1].created_at)}}</small>
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step step="3">
                    Shipped
                    <small v-if="this.shipmentStatuses.length >= 3">{{ formatDate(this.shipmentStatuses[2].created_at)}}</small>
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step step="4">
                    Arrived
                    <small v-if="this.shipmentStatuses.length >= 4">{{ formatDate(this.shipmentStatuses[3].created_at)}}</small>
                  </v-stepper-step>

                  <v-divider></v-divider>
                </v-stepper-header>
              </v-stepper>
            </div>
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
      quantity: 1,

      // Table
      data,
      isLoading: false,

      // modal
      isComponentModalActive: false,

      // customers
      customers: [],
      shipmentStatuses: [],
      user: "",
    };
  },
  mounted() {
    this.transactionId = this.$route.params.transactionId;
    this.fetchData();
    this.fetchShipmentStatuses();
  },
  computed: {
    getTotalBill: function () {
      return parseInt(this.form.total).toLocaleString("id-ID");
    },
  },
  methods: {
    async fetchData() {
      try {
        const res = await axios.get(
          "/transactions/" + this.currentCustomerId + "/" + this.transactionId
        );
        this.data = res.data;
      } catch (error) {
        this.data = [];
      }
    },

    async fetchShipmentStatuses() {
      try {
        const res = await axios.get("/shipment-statuses/" + this.transactionId);
        console.log(res.data);
        this.shipmentStatuses = res.data;
      } catch (error) {
        this.data = [];
      }
    },
    formatDate(date) {
      return moment(String(date)).format("DD MMMM YYYY h:mm a");
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