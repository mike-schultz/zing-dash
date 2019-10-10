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

        <section class="content">
          <div class="content__col" style="display: flex;">
            <div class="content__row">
              <div class="cell" style="flex:2;">
                <latest-transactions ref="latestTransactions" :data="last30DaysTransactions" />
              </div>
              <div class="cell">
                <transaction-breakdown ref="transactionBreakdown" :data="transactions" />
              </div>
            </div>
            <div class="content__row">
              <div class="cell">
                 <zing-grid
                ref="firstGrid"
                caption="Latest Transactions"
                layout="row"
                pager
                page-size="3"
                page-size-options="2,5,20"
                control-bar="false"
                style="width: 100%;"
                sorter
                filter
                height="150px"
              >
                <zg-colgroup>
                  <zg-column index="timestamp" header="Date" type="date" ></zg-column>
                  <zg-column index="company" header="Company" type="text"></zg-column>
                  <zg-column index="amount" header="Cost" type="currency"></zg-column>
                  <zg-column index="license_type" header="License" type="select"
                  type-select-options="enterprise,saas,website"></zg-column>
                  <zg-column index="purchase_type" header="Type" type="select" type-select-options="renewal, new, cancellation"></zg-column>
                </zg-colgroup>
              </zing-grid>
              </div>
            </div>
          </div>
          <div class="content__col" style="display: flex;">
            <div class="cell">
              <total-sales-per-month :data="transactions" />
            </div>
            <div class="cell">
              <year-to-date :data="transactions" />
            </div>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<style>
zg-head-cell {
  background: white;
  color: #5d7d9a;
  font-size: 1rem;
}
zg-row:nth-child(odd) {
  background: rgb(250, 250, 250);
}

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
  display: none;
}
zing-grid {
  border: 0px;
}

zing-grid input[type="text"], zing-grid input[type="number"]{
  border-radius: 5px;
}


/* SELECT */


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
  margin: 0.5rem 0;
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

.dashboard {
  width: 100%;
}
.content {
  display: flex;
  height: 600px;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
}
.content__col {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 780px;
  max-width: 780px;
  min-height: 600px;
  max-height: 600px;
}
.content__col + .content__col {
  padding-left: 1rem;
  border-left: 1px solid #ddd;
}
.content__row {
  flex: 1;
  display: flex;
}

.cell {
  flex: 1;
  margin: 1rem;
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

    const zgRef = document.querySelector('zing-grid');

      // Add listener for event
      // Trigger by mouse over a record / row
      zgRef.addEventListener('record:mouseover', (e) => {
        let ltChart = this.$refs.latestTransactions;
        const chartId = ltChart.$children[0].$el.getAttribute('id');
        zingchart.exec(chartId, 'setguide', {
          keyvalue : e.detail.ZGData.data.timestamp,
        });


        let ltPie = this.$refs.transactionBreakdown;
        const pieId = ltPie.$children[0].$el.getAttribute('id');

        // Determine the node index that corresponds to the transaction type
        const data = zingchart.exec(pieId, 'getseriesdata');
        const index = data.findIndex((o) => {
          return o.text === e.detail.ZGData.data.purchase_type;
        });
        zingchart.exec(pieId, 'showhoverstate', {
          plotindex: index,
          nodeindex: 0,
        });


      });
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

