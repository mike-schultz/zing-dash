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
      return this.data.sort((a,b) => {
        return a.timestamp - b.timestamp
      })
      .map(o => {
        return [o.timestamp, parseFloat(o.amount.slice(1,-1))]
      });
      
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
        plot: {
          aspect: 'spline',
          marker: {
            visible: false,
          }
        },
        crosshairX:{},
        tooltip: { visible: false },
        plotarea: {
          margin: '35 30 60 60'

        },
        scaleX: {
          transform: {
            type: 'date',
            all: '%M %d, %Y',
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