<template>
    <div class="dashboard">
      <section class="dashboard__summary">
        <total-sales-spark :values="transactions"/>
        <total-ytd-spark :values="transactions"/>
        <change-customers-spark :values="transactions"/>
      </section>

      <section class="dashboard__charts">
        <div class="row">
          <div class="cell" style="height: 300px; width:650px;">
            <latest-transactions :data="last30DaysTransactions"/>
          </div>
          <div class="cell" style="height: 300px; width:650px;">
            <total-sales-per-month :data="transactions"/>
          </div>

         <div class="cell" style="height: 300px; width:650px; margin-left: 50px;">
            <year-to-date :data="transactions"/>
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
                <!-- <zg-column index="first_name" header="First Name" type="text"></zg-column>
                <zg-column index="last_name" header="Last Name" type="text"></zg-column> -->
                <zg-column index="timestamp" header="Date" ></zg-column>
                <zg-column index="company" header="Company" type="text"></zg-column>
                <zg-column index="amount" header="Cost" type="currency"></zg-column>
                <zg-column index="license_type" header="License" ></zg-column>
                <zg-column index="purchase_type" header="Type" ></zg-column>
                
              </zg-colgroup>
            </zing-grid>
           </div>
                    <!-- <div class="cell" style=" height:300px; width:250px;">
              <product-breakdown :data="customers"/>
          </div> -->
          <div class="cell" style=" height:300px; width:250px;">
              <transaction-breakdown :data="transactions"/>
          </div>

        </div>
        <div class="row">

        </div>

      </section>
     </div>
</template>
<style>
  zg-control-bar {
    display: none;
  }
  zg-caption {
    background: #5D7D9A;
   font-weight: bold;
  }
  zing-grid {
    border: 0px;
  }
</style>
<style scoped>
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
/*   
  .dashboard__charts > * {
    min-width: 300px;
    max-width: 500px;
    min-height: 400px;
    border: 1px solid gray;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    margin: 0.5rem;
  } */
</style>



<script>

import customers from '../dataset/customers.js';
import transactions from '../dataset/transactions.js';
import TotalSalesPerMonth from '../components/TotalSalesPerMonth.vue';
import ProductBreakdown from '../components/ProductBreakdown.vue';
import YearToDate from '../components/YearToDate.vue';
import TransactionBreakdown from '../components/TransactionBreakdown.vue';
import LatestTransactions from '../components/LatestTransactions.vue';
import ZingGrid from "zinggrid";

import Spark from '../components/Spark.vue';
import SparkScorecard from '../components/SparkScorecard.vue';
import TotalSalesSpark from '../components/TotalSalesSpark.vue';
import TotalYTDSpark from '../components/TotalYTDSpark.vue';
import ChangeCustomersSpark from '../components/ChangeCustomersSpark.vue';

import leads from '../dataset/sales-leads.js';

export default {
  name: 'app',
  components: {
    Spark,
    SparkScorecard,
    LatestTransactions,
    ProductBreakdown,
    TotalSalesPerMonth,
    YearToDate,
    TransactionBreakdown,
    TotalSalesSpark,
    'total-ytd-spark': TotalYTDSpark,
    ChangeCustomersSpark,
  },
  data() {
    return {
      transactions,
      customers,
      leads,
      expectedYTD: [10000, 25000, 30000, 40000, 60000, 90000, 120000, 130000, 140000],
    };
  },
  mounted() {
    this.$refs.firstGrid.setData(this.last30DaysTransactions);
  },
  methods: {
    formatMonthlySales(event) {
      return`$${event.value}`;
    }
  },
  computed: {
    last30DaysTransactions() {
      // Limit by the last 30 days
      const data = this.transactions.filter((entry) => {
      let THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;
      return (new Date().getTime() - entry.timestamp * 1000) < THIRTY_DAYS;
      });
      return data;
    },
    acquisitionBreakdown() {
      const categories = this.customers.reduce((acc, customer) => {
        acc[customer.acquisition] = acc[customer.acquisition] || 0;
        acc[customer.acquisition]++;
        return acc;
      }, {});
      return {
        type: 'pie',
        legend: {},
        series: Object.keys(categories).map((name) => {
          return {
            values: [categories[name]],
            text: name,
          };
        })
      };
      return config;
    },
    ytdChart() {
     return {
        type: 'bar',
        series: [
          {
            values: this.expectedYTD,
            text: 'Predicted'
          },
          {
            values: this.ytd,
            text: 'Actual'
          },
        ],
        legend:{},
        scaleX: {
          step: 'month',
          minValue: firstDayOfTheCurrentYear(),
          label: {
            text: 'Month/Year',
          },
          transform: {
            type: 'date',
            all: '%m/%y',
          }
        }
      };
    },
    ytd() {
      let total = 0;
      return this.salesPerMonth.map((amount) => {
        total += amount;
        return total;
      });
    },
  }
}

function firstDayOfTheCurrentYear() {
  const today = new Date();
  return new Date('1/1/' + today.getFullYear()).getTime();
}


</script>

