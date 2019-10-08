<template>
  <div class="scorecard">
    <spark :values="accumulatedValues" @mouseover="changeValue" type="area"/>
    <div class="scorecard__value">{{currentValue}}</div>
    <div class="scorecard__header">Total Sales this Year</div>
  </div>
</template>

<script>
import Spark from './Spark.vue';

export default {
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
  components: {
    Spark,
  },
  methods: {
    formatValue(value) {
      return `$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
    },
    changeValue(e) {
      this.currentValue = this.formatValue(e.value);
    },
  },
  computed: {
    thisYearsTransactions() {
      const date = new Date();
      const currentYear = date.getFullYear();

      const min = new Date(`1/1/${currentYear}`).getTime();
      const max = date.getTime();

      const list = this.values.filter(entry => {
        let time = entry.timestamp;
        return time >= min && time < max;
      });
      return list;
    },
    accumulatedValues() {
      let total = 0;
      const result = this.thisYearsTransactions.map(entry => total += parseFloat(entry.amount));
      return result;
    }
  },
  data() {
    return {
      currentValue: this.values[this.values.length-1],
    };
  }
}
</script>

<style scoped>

</style>