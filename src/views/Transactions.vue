<template>
  <div>
    <div class="align-self-stretch pl-2 py-0 white">
      <v-breadcrumbs :items="breadcrumbs">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </div>
    <div class="mt-4">
      <v-tabs
        fixed-tabs
        background-color="white"
        v-model="currentTab"
        @change="filterTransactions(currentTab)"
      >
        <v-tab> Waiting for Confirmation </v-tab>
        <v-tab> Processed </v-tab>
        <v-tab> Shipped </v-tab>
        <v-tab> Arrived </v-tab>
      </v-tabs>
      <div
        class="columns is-centered"
        style="align-items: center; min-height: 100vh"
      >
        <div class="column is-four-fifths">
          <div class="card">
            <div class="card-content">
              <h1 class="title cart-header"><b>Transaction History</b></h1>
              <div></div>
              <div class="content" style="margin-bottom: 0">
                <b-table
                  :data="displayedData ? displayedData : []"
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

                  <b-table-column field="Date" label="Date" v-slot="props">
                    {{ formatDate(props.row.date) }}
                  </b-table-column>

                  <b-table-column field="total" label="Total" v-slot="props">
                    Rp. {{ parseInt(props.row.total).toLocaleString("id-ID") }}
                  </b-table-column>

                  <b-table-column field="action" label="Action" v-slot="props">
                    <router-link
                      :to="{ path: '/transactions/' + props.row.id }"
                    >
                      <b-button type="is-white" icon-right="search" />
                    </router-link>
                  </b-table-column>

                  <template slot="empty">
                    <section class="section">
                      <div class="content has-text-grey has-text-centered">
                        <p>No transactions</p>
                      </div>
                    </section>
                  </template>
                </b-table>
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

      displayedData: [],
      shipmentStatus: null,
      currentTab: null,
      user: "",
      breadcrumbs: [
        {
          text: "Home",
          disabled: false,
        },
        {
          text: "Transactions History",
          disabled: true,
        },
      ],
    };
  },
  async mounted() {
    await this.fetchData();
    await this.filterTransactions(0);
  },
  computed: {
    getTotalBill: function () {
      return parseInt(this.form.total).toLocaleString("id-ID");
    },
  },
  methods: {
    async fetchData() {
      try {
        const res = await axios.get("/transactions/" + this.currentCustomerId);
        this.data = res.data;
      } catch (error) {
        this.data = [];
      }
    },
    formatDate(date) {
      return moment(String(date)).format("DD MMMM YYYY");
    },
    
    filterTransactions(currentTab) {
      var shipmentStatus = null;
      switch (currentTab) {
        case 0:
          shipmentStatus = "Waiting for Confirmation"
          break;
        case 1:
          shipmentStatus = "Processed"
          break;
        case 2:
          shipmentStatus = "Shipped"
          break;
        case 3:
          shipmentStatus = "Arrived"
          break;
        default:
        // code block
      }
      this.displayedData = this.data.filter(
        (transaction) => transaction.shipment_status == shipmentStatus
      );
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