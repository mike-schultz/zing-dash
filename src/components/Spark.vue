<template>
  <div @mouseleave="left">
    <zingchart ref="chart" :data="chartConfig" :width="100" :height="50" @guide_mousemove="emitValue" />  
  </div>
</template>

<script>
export default {
  methods: {
    emitValue(e) {
      this.$emit('mouseover', {
        value: e.items[0].value,
        index: e.items[0].nodeindex,
      });
    },
    left() {
      zingchart.exec(this.$refs.chart.$el.getAttribute('id'), 'setguide', {
        keyvalue : this.values.length - 1
    });
    }
  },
  computed: {
    chartConfig() {
      if(this.config) {
        this.config.series[0].values = this.values;
        return this.config;
      } else {
        return this.chart;
      }
    }
  },
  mounted() {
    zingchart.exec(this.$refs.chart.$el.getAttribute('id'), 'setguide', {
        keyvalue : this.values.length - 1
    });
  },
  props: {
    values: {
      type: Array,
      required: false,
    },
    type: {
      type: String,
      default: 'line',
    },
    config: {
      type: Object, 
      default: null,
    }
  },
  data() {
    return {
      chart: {
        type: this.type,
        theme: 'spark',
        crosshairX: {
          alpha: 0,
          marker: {
            visible: true,
            size: 5,
          },
          plotLabel: {
            alpha: 0,
            x: 70,
            y: -8,
            text: '%v',
            timeout: 10000000,
            backgroundColor: 'none',
            borderColor: 'none',
            fontColor: '#04A3F5'
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
        },
        tooltip:{
          visible: false,
        }, 
        series: [
          {
            values: this.values,
            lineColor: '#04A3F5',
            backgroundColor: '#04A3F5',
          }
        ]
      }
    }
  }
}
</script>

<style>
</style>