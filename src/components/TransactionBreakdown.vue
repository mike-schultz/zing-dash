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
      const colors = [
        {
          backgroundColor: '#04A3F5',
          hoverState: {
            backgroundColor: '#45D6C4'
          }
        },
        {
          backgroundColor: '#98D1EE',
          hoverState: {
            backgroundColor: '#45D6C4'
          }
        },
                {
          backgroundColor: '#295A73',
          hoverState: {
            backgroundColor: '#45D6C4'
          }
        },

      ]
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
        tooltip: {
          text: '%npv%'
        },
        plotarea: {
          margin: '5'
        },
        plot: {
          valueBox: {
            fontSize: 10,
            text: '%t'
          },
          animation: {
            "effect":"2",
            "speed":"400",
            "method":"3",
            "sequence":"3",
            delay: 2000,
          },
          hoverState: {
            // borderColor: '#04A3F5',
         	  borderWidth: 2,
          }
        },
        series: Object.keys(this.acquisitionBreakdown).map((type, index) => {
          return Object.assign(
            { values: [this.acquisitionBreakdown[type]], text: type},
            colors[index],
          );
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