<template>
  <div class="scorecard">
    <spark :config="chart" :values="customerChange" @mouseover="changeValue"/>
    <div class="scorecard__value" :class="changeClass">
      <font-awesome-icon v-if="currentValue < 0" icon="chevron-down"/>
      <font-awesome-icon v-else icon="chevron-up"/>
      &nbsp;<span>{{Math.abs(currentValue)}}</span>
     </div>
    <div class="scorecard__header">Change in Customers</div>
    <div class="scorecard__subheader">from the month prior</div>

  </div>
</template>
<style scoped>
.change--positive {
  color: #009688;
}
.change--negative {
  color: #ff5252;
}
</style>

<script>
import Spark from './Spark.vue';

export default {
  components: {
    Spark
  },
  props: ['values'],
    props: {
    values: {
      type: Array,
      required: false,
    },
    formatter: {
      type: Function,
      required: false,
    },
    type: {
      type: String,
      default: 'line',
    }
  },
  methods: {
    changeValue(e) {
      this.currentValue = e.value;
    },
  },
  computed: {
    changeClass() {
      return this.currentValue > 0 ? 'change--positive': 'change--negative';
    },
    customerChange() {
      let monthChange = {};
      this.values.forEach(val => {
        const date = new Date(val.timestamp);
        const key = date.getMonth() +'-'+ date.getFullYear();
        switch(val.purchase_type) {
          case 'new':
            monthChange[key] = monthChange[key] || 0;
            monthChange[key]++;
          break;
          case 'cancellation': 
            monthChange[key] = monthChange[key] || 0;
            monthChange[key]--;
          break;
        }
      });
      const res = Object.keys(monthChange).map((month) => {
        return monthChange[month];
      });
      return res;
    },
    chart() {
      return {
        type: 'line',
        theme: 'spark',
        crosshairX: {
          alpha: 0,
          marker: {
            visible: true,
            size: 5,
          },
          plotLabel: {
            alpha: 0,
          },
          scaleLabel: {
            visible: false,
          },
        },
        
        plotarea: {
          margin: '15px'
        },
        plot: {
          lineWidth: 3,
            rules: [
            {
                rule: "%v > 0",
                'line-color': "#009688"
            },
            {
              rule: '%v < 0',
              'line-color': '#f44336'
            }
        ]
        },
        tooltip:{
          visible: false,
        }, 

        series: [
          {
            values: this.customerChange,
            lineColor: '#04A3F5',
            backgroundColor: '#04A3F5',
          }
        ]
      };
    }

  },
  data() {
    return {
      baseTotalCustomers: 2000,
      currentValue: this.values[this.values.length-1]
    };
  }
}
</script>