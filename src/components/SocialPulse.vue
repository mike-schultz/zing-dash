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

    chartConfig() {
      const config ={
  "type": "radar",
  "title": {
    "text": "Framework Pulse",
    align:'center'
  },
  "plot": {
    "aspect": "area",
    marker: {
      visible: false
    }
  },
  plotarea: {
    margin: 40,
  },
  scaleK: {
    labels: ['Vue', 'Angular', 'React', 'Web Components', 'Ember'],
  },

  "series": [{
      "values": [59, 30, 65, 34, 40],
      backgroundColor: '#45d6c4',
      lineColor: '#45d6c4',
      marker: {
        backgroundColor: '#45d6c4'
      }
    },
    {
      "values": [76, 60, 11, 21, 99],
            backgroundColor: '#04a3f5',
      lineColor: '#04a3f5',
      marker: {
        backgroundColor: '#04a3f5'
      }
    }
  ]
}
;
      return config;
    },
  }
};

function firstDayOfTheCurrentYear() {
  const today = new Date();
  return new Date('1/1/' + today.getFullYear()).getTime();
}
</script>