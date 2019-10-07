<template>
   <zingchart :data="chartConfig" :theme="theme" :height="'100%'"/> 
</template>

<script>
import theme from '../theme/theme.js';
export default {
  props: ['data'],
  data() {
    return {
      theme,
      expectedYTD: [10000, 25000, 30000, 40000, 60000, 90000, 120000, 130000, 140000],
      };
  },
  computed: {
    chartConfig() {
      return {
        type: 'bar',
        title: {
          text: 'Projected Sales'
        },
        series: [
          {
            values: this.expectedYTD,
            text: 'Projected'
          },
          {
            values: this.yearToDate,
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
        },
        scaleY: {
          short: true,
          shortUnit: 'K'
        },
      };
    },
    yearToDate() {
      let types = ['referral', 'organic', 'marketing', 'legacy', 'unknown'];
      this.data.map((customer) => {
      if(parseInt(Math.random() * 10) % 2 === 0) {
          customer.acquisition= types[parseInt(Math.random() * 2)];
      } else {
        customer.acquisition= types[parseInt(Math.random() * 4)];
      }
        return customer;
      });

      const monthSales = [];
      const currentYear =  new Date().getFullYear();

      // Loop through all the customers and bucket each sale by month
      this.data.forEach((customer) => {
        let customerTotal = 0;
        customer.products.forEach((product) => {
          // Check the paid date if its within the calendar year.
          const paidDate = new Date(product.paid);
          if(paidDate.getFullYear() === currentYear) {
            monthSales[paidDate.getMonth()] = product.price * product.quantity;
          }
        });
      });
      let total = 0;
      return monthSales.map((amount) => {
        total += amount;
        return total;
      });
    }
  }
}
function firstDayOfTheCurrentYear() {
  const today = new Date();
  return new Date('1/1/' + today.getFullYear()).getTime();
}
</script>