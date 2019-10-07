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
    acquisitionBreakdown() {
      const categories = this.data.reduce((acc, customer) => {
        acc[customer.acquisition] = acc[customer.acquisition] || 0;
        acc[customer.acquisition]++;
        return acc;
      }, {});


      return categories;
    },
    chartConfig() {
      const config ={
        type: 'pie',
        title: {
          text: 'Customer Acquisition\nby Type',
          align: 'center',
          fontSize: '14'
        },
        legend: {
          visible: false,
          verticalAlign: 'bottom',
          align : 'center',
          offsetX: 20,
        },
        plotarea: {
          margin: '20'
        },
        plot: {
          valueBox: {
            fontSize: 10,
          }
        },
        series: Object.keys(this.acquisitionBreakdown).map((type) => {
          return {
            values: [this.acquisitionBreakdown[type]],
            text: type,
          };
        })
      };
      return config;
    },
  }
}
function firstDayOfTheCurrentYear() {
  const today = new Date();
  return new Date('1/1/' + today.getFullYear()).getTime();
}
</script>