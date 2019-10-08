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
      const categories = this.data.reduce((acc, transaction) => {
        acc[transaction.purchase_type] = acc[transaction.purchase_type] || 0;
        acc[transaction.purchase_type]++;
        return acc;
      }, {});
      return categories;
    },
    chartConfig() {
      const config ={
        type: 'pie',
        _title: {
          text: 'Percentage of Products Sold',
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
          margin: '5'
        },
        plot: {
          valueBox: {
            fontSize: 12,
            text: '%t'
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