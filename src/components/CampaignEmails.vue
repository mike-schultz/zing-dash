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
      expectedYTD: [10000, 25000, 30000, 40000, 60000, 90000, 120000, 130000, 140000],
      };
  },
  computed: {
    chartConfig() {
      return {
  "type": "mixed",
  "title": {
    "text": "Campaign E-mails",
  },
  "scaleX": {
    "labels": ["Welcome","Purchase","Newsletter","Promotion","Charge"],
    "guide": {
      "visible": false
    }
  },
  "scaleY": {
    "label": {
      "text": "E-mails opened"
    },
    "values": "0:50:10",
    "guide": {
      "visible": false
    }
  },
  "plotarea": {
    "margin": "50 100 70 100"
  },
  "plot": {
    "bars-overlap": "100%",
    "stacked": true
  },
  "series": [
   
    {
      "type": "bullet",
      "values": [35,36,40,43,36],
      "goals": [38,39,43,45,41],
      "stack": 2,
      backgroundColor: '#04A3F5',
      "goal": {
        backgroundColor: '#04A3F5',
      },
      "tooltip": {
        "text": "Actual: %v<br>Goal: %g",
        "font-color": "black",
        "background-color": "white"
      }
    }
  ]
}

    },

  }
}
function firstDayOfTheCurrentYear() {
  const today = new Date();
  return new Date('1/1/' + today.getFullYear()).getTime();
}
</script>