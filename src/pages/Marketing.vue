<template>
    <div class="dashboard">
      <section class="dashboard__summary">
        <div class="scorecard">
          <div class="scorecard__value">255,383</div>
          <div class="scorecard__header">Website Vistors</div>
          <div class="scorecard__subheader">(last 30 days)</div>
        </div>
        <div class="scorecard">
          <div class="scorecard__value">down 5%</div>
          <div class="scorecard__header">Change in traffic</div>
          <div class="scorecard__subheader">(last week)</div>
        </div>
        <div class="scorecard">
          <div class="scorecard__value">3%</div>
          <div class="scorecard__header">Bounce Rate</div>
        </div>
        <div class="scorecard">
          <div class="scorecard__value">+15</div>
          <div class="scorecard__header">Conversions</div>
          <div class="scorecard__subheader">(since last week)</div>
        </div>
      </section>

      <section class="dashboard__charts">
        <div class="row">
          <div class="cell" style="height: 300px; width:650px;">
              <website-traffic />
          </div>

         <div class="cell" style="height: 300px; width:650px; margin-left: 50px;">
            <campaign-emails />
          </div>
        </div>
        <div class="row">
           <div class="cell" style="width: 1000px; height:300px; margin-right: 50px;">
            <!-- <total-sales-per-month :data="customers"/>   -->
            <daily-campaign-tracker/>
          </div>
                    <!-- <div class="cell" style=" height:300px; width:250px;">
              <product-breakdown :data="customers"/>
          </div> -->

          <div class="cell" style=" height:300px; width:250px;">
              <social-pulse :data="customers"/>
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
import WebsiteTraffic from '../components/WebsiteTraffic.vue';
import PopularKeywords from '../components/PopularKeywords.vue';
import SocialPulse from '../components/SocialPulse.vue';
import DailyCampaignTracker from '../components/DailyCampaignTracker.vue';
import CampaignEmails from '../components/CampaignEmails.vue';
import ZingGrid from "zinggrid";

import leads from '../dataset/sales-leads.js';

export default {
  name: 'app',
  components: {
    ProductBreakdown,
    TotalSalesPerMonth,
    YearToDate,
    AcquisitionBreakdown,
    WebsiteTraffic,
    PopularKeywords,
    SocialPulse,
    DailyCampaignTracker,
    CampaignEmails,
  },
  data() {
    return {
      customers,
      leads,
      expectedYTD: [10000, 25000, 30000, 40000, 60000, 90000, 120000, 130000, 140000],
    };
  },
  mounted() {
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

