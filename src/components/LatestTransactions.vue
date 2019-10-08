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
    transactions() {
      // Limit by the last 30 days
      return this.data.map(o => parseFloat(o.amount.slice(1,-1)));
    },

    chartConfig() {
      
      return {
        type: 'line',
        title: {
          text: 'Latest Transactions',
          adjustLayout: true,
          align: 'left',
          margin: 0,
        },
        subtitle: {
          text: 'Last 30 days',
          align: 'left'
        },
        series: [
          {
            values: this.transactions,
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