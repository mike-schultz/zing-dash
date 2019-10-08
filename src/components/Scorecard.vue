<template>
  <div class="scorecard">
    <div class="scorecard__value"><slot name="value"></slot></div>
    <div v-if="values" class="scorecard__spark">
      <spark :values="values" />
    </div>
    <div class="scorecard__header"><slot name="header"></slot></div>
    <div class="scorecard__subheader"><slot name="subheader"></slot></div>
  </div>
</template>

<script>
import Spark from './Spark.vue';

export default {
  props: ['values'],
  components: {
    Spark,
  },
  methods: {

  },

  data() {
    return {

    };
  }
}
</script>

<style scoped>

</style>