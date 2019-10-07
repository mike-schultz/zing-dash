export default {
  type: 'line',
  title: {
    text: 'Hello World',
  },
  subtitle: {
    fontWeight: 300,
    align: 'left',
    padding: '20 20 15 35',
    text: 'Subtitle',
    fontSize: '16px',
    color: '#5D7D9A',
  },
  "plot":{
    // Can't inherit highlight state
    // Should grey out the rest of the plots
    highlightState: {
      lineWidth: '3px',
    },
  },
  legend:{
    header: {},
    highlightPlot: true, //Has to be explicit, not in the theme.
  },
  crosshairX: {
  },
  scaleX: {
    label : {
      text: 'Scale X'
    }
  },
  scaleY: {
    label: {
      text: 'Scale Y'
    }
  },
  series: [
    { values: randomData() },
    { values: randomData() },
    { values: randomData() },
    { values: randomData() },
    { values: randomData() },
  ]
};
function randomData() {
  return Array.from(new Array(10)).map(() => {
    return parseInt(Math.random() * 10) + 1;
  });
}