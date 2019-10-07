<template>
    <div class="dashboard">
      <section class="dashboard__summary">
        <scorecard :key="index" v-for="(card, index) in scorecards">
          <template #value>{{card.value}}</template>
          <template #header>{{card.header}}</template>
          <template #subheader>{{card.subheader}}</template>
        </scorecard>
      </section>

      <section class="dashboard__charts">
        <div class="row">
          <div class="cell" style="height: 300px; width:650px;">
            <total-sales-per-month :data="customers"/>
          </div>

         <div class="cell" style="height: 300px; width:650px; margin-left: 50px;">
            <year-to-date :data="customers"/>
          </div>
        </div>
        <div class="row">
           <div class="cell" style="width: 1000px; margin-right: 50px;">
            <zing-grid
              ref="firstGrid"
              caption="Latest Leads"
              layout="row"
              pager
              page-size="3"
              page-size-options="2,5,20"
              control-bar="false"
              style="width: 100%;"
            >
            </zing-grid>
          </div>
                    <!-- <div class="cell" style=" height:300px; width:250px;">
              <product-breakdown :data="customers"/>
          </div> -->
          <div class="cell" style=" height:300px; width:250px;">
              <acquisition-breakdown :data="customers"/>
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
import TotalSalesPerMonth from '../components/TotalSalesPerMonth.vue';
import ProductBreakdown from '../components/ProductBreakdown.vue';
import YearToDate from '../components/YearToDate.vue';
import AcquisitionBreakdown from '../components/AcquisitionBreakdown.vue';
import ZingGrid from "zinggrid";


import leads from '../dataset/sales-leads.js';

export default {
  name: 'app',
  components: {
    ProductBreakdown,
    TotalSalesPerMonth,
    YearToDate,
    AcquisitionBreakdown,
  },
  data() {
    return {
      customers,
      leads,
      expectedYTD: [10000, 25000, 30000, 40000, 60000, 90000, 120000, 130000, 140000],
      scorecards: [
        {
          value: '$3k',
          header: 'Sales this Month',
        },
        {
          value: '$94k',
          header: 'Total YTD Sales',
        },
        {
          value: '+5',
          header: 'Change in Customers',
          subheader: '(from last month)',
        }
      ]
    };
  },
  mounted() {
    this.$refs.firstGrid.setData(this.leads);
  },
  computed: {
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

