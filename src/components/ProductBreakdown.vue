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
    };
  },
  computed: {
    productBreakdown() {
      const products = {};
      this.data.forEach((customer) => {
        customer.products.forEach((product) => {
          products[product.type] = products[product.type] || 1;
          products[product.type] += product.price;
        });
      });
      return products;
    },
    chartConfig() {
      const config ={
        type: 'pie',
        legend: {
          verticalAlign: 'bottom',
          visible: false,
        },
        title: {
          text: 'Products Sold',
          align: 'center',
          fontSize: '14'
        },
        plotarea: {
          margin: '30 30 30 30'
        },
        series: Object.keys(this.productBreakdown).map((type) => {
          return {
            values: [this.productBreakdown[type]],
            text: type,
          };
        })
      };
      return config;
    },
  }
};

function firstDayOfTheCurrentYear() {
  const today = new Date();
  return new Date('1/1/' + today.getFullYear()).getTime();
}
</script>