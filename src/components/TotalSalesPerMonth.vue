<template>
  <zingchart :data="chartConfig" :theme="theme" :width="width" :height="'100%'"/>
</template>

<script>
import theme from '../theme/theme.js';
export default {
 props: ['data', 'width'],
  data() {
    return {
      theme,
    };
  },
  computed: {
    salesPerMonth() {
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
      return monthSales;
    },
    chartConfig() {
      
      return {
        type: 'line',
        title: {
          text: 'Total Sales Per Month',
          adjustLayout: true,
          align: 'left',
          margin: 0,
        },
        series: [
          {
            values: this.salesPerMonth,
            text: 'Sales'
          }
        ],
        crosshairX:{},
        tooltip: { visible: false },
        plotarea: {
          margin: '35 20 60 50'

        },
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
          label: {
            text: 'Amount in USD',
          },
          short:true,
          shortUnit: 'K',
        }
      };
    
    }
  }
};

function firstDayOfTheCurrentYear() {
  const today = new Date();
  return new Date('1/1/' + today.getFullYear()).getTime();
}
</script>