<template>
  <div class="scorecard">
    <div class="scorecard__value">{{currentValue}}</div>
    <div v-if="values" class="scorecard__spark">
      <spark :values="values" @mouseover="changeValue" :type="type"/>
    </div>
    <div class="scorecard__header"><slot name="header"></slot></div>
    <div class="scorecard__subheader"><slot name="subheader"></slot></div>
  </div>
</template>

<script>
import Spark from './Spark.vue';

export default {
  props: ['values', 'formatter', 'type'],
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
    changeValue(e) {
      this.currentValue = (this.formatter) ? this.formatter(e) : e.value
    },
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