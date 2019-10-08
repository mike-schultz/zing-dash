<template>
  <div id="app">
    <div class="dashboard">
      <header>
        <h1 style="margin: 0">Your Sales Dashboard</h1>
        <section style="display: flex; align-items: center;margin-right: 26px;">
          <div style="margin-right:10px">Showing data from</div>
          <v-date-picker mode="range" v-model="range" :popover="{placement:'bottom-end'}" />
        </section>
      </header>
      <div class="dashboard">
        <section class="dashboard__summary">
          <total-sales-spark :values="transactions" :start="range.start" :end="range.end"/>
          <total-ytd-spark :values="transactions" :start="range.start" :end="range.end"/>
          <change-customers-spark :values="transactions" />
        </section>

        <section class="dashboard__charts">
          <div class="row">
            <div class="cell" style="height: 300px; width:650px;">
              <latest-transactions :data="last30DaysTransactions" />
            </div>
            <div class="cell" style="height: 300px; width:650px;">
              <total-sales-per-month :data="transactions" />
            </div>

            <div class="cell" style="height: 300px; width:650px; margin-left: 50px;">
              <year-to-date :data="transactions" />
            </div>
          </div>
          <div class="row">
            <div class="cell" style="width: 1000px; margin-right: 50px;">
              <zing-grid
                ref="firstGrid"
                caption="Latest Transactions"
                layout="row"
                pager
                page-size="3"
                page-size-options="2,5,20"
                control-bar="false"
                style="width: 100%;"
              >
                <zg-colgroup>
                  <zg-column index="timestamp" header="Date" type="date"></zg-column>
                  <zg-column index="company" header="Company" type="text"></zg-column>
                  <zg-column index="amount" header="Cost" type="currency"></zg-column>
                  <zg-column index="license_type" header="License"></zg-column>
                  <zg-column index="purchase_type" header="Type"></zg-column>
                </zg-colgroup>
              </zing-grid>
            </div>
            <div class="cell" style=" height:300px; width:250px;">
              <transaction-breakdown :data="transactions" />
            </div>
          </div>
          <div class="row"></div>
        </section>
      </div>
    </div>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 2rem;
}
header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 1rem;
}
nav {
  display: flex;
  align-items: center;
}
</style>
<style>
zg-control-bar {
  display: none;
}
zg-caption {
  background: #5d7d9a;
  font-weight: bold;
}
zing-grid {
  border: 0px;
}
.scorecard {
  padding: 1rem;
}
.scorecard__value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #04a3f5;
}
.scorecard__header {
  margin-top: 0.4rem;
}
.scorecard__subheader {
  font-size: 0.8rem;
}
.dashboard__summary {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
}

.scorecard {
  display: flex;
  flex-direction: column;
  align-items: center;
}
a {
  color: #2196f3;
  text-decoration: none;
  font-size: 1.1rem;
}
a + a {
  margin: 0 1rem;
}
a:visited {
  color: #2196f3;
}
a:hover {
  text-decoration: none;
}
a.router-link-exact-active {
  font-weight: 500;
  border-bottom: 2px solid#2196f3;
}
.cell {
  height: 100%;
}
.dashboard__charts {
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
  margin-bottom: 30px;
}
</style>

<script>
import rawTransactions from "./dataset/transactions.js";

import TotalSalesPerMonth from "./components/TotalSalesPerMonth.vue";
import YearToDate from "./components/YearToDate.vue";
import TransactionBreakdown from "./components/TransactionBreakdown.vue";
import LatestTransactions from "./components/LatestTransactions.vue";
import ZingGrid from "zinggrid";

import TotalSalesSpark from "./components/TotalSalesSpark.vue";
import TotalYTDSpark from "./components/TotalYTDSpark.vue";
import ChangeCustomersSpark from "./components/ChangeCustomersSpark.vue";

export default {
  name: "app",
  components: {
    LatestTransactions,
    TotalSalesPerMonth,
    YearToDate,
    TransactionBreakdown,
    TotalSalesSpark,
    "total-ytd-spark": TotalYTDSpark,
    ChangeCustomersSpark
  },
  watch: {
    last30DaysTransactions() {
      this.updateGrid();
    }
  },
  computed: {
    transactions() {
      return this.rawTransactions.filter(entry => {
        return (
          entry.timestamp >= this.range.start.getTime() &&
          entry.timestamp < this.range.end.getTime()
        );
      });
    },
    last30DaysTransactions() {
      // Limit by the last 30 days
      const data = this.transactions.filter(entry => {
        let THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;
        return this.range.end.getTime() - entry.timestamp < THIRTY_DAYS;
      });
      return data;
    }
  },
  methods: {
    updateGrid() {
      this.$refs.firstGrid.setData(this.last30DaysTransactions);
    }
  },
  mounted() {
    this.updateGrid();
  },
  data() {
    return {
      rawTransactions,
      expectedYTD: [
        10000,
        25000,
        30000,
        40000,
        60000,
        90000,
        120000,
        130000,
        140000
      ],
      range: {
        start: new Date(2019, 0, 1), // Jan 16th, 2018
        end: new Date(2019, 9, 8) // Jan 19th, 2018
      }
    };
  }
};
function firstDayOfTheCurrentYear() {
  const today = new Date();
  return new Date("1/1/" + today.getFullYear()).getTime();
}
</script>

