export default {
  type: 'scatter',
  title: {
    text: 'Hello World'
  },
  subtitle: {
    fontWeight: 600,
    align: 'left',
    padding: '20 20 15 35',
    text: 'Subtitle'
  },
  "plot":{
    fontWeight: 300,
    align: 'left',
    padding: '20 20 15 35',
    text: 'Subtitle',
    fontSize: '16px',
    color: '#5D7D9A',
  },
  legend:{
    header: {},
    highlightPlot: true, //Has to be explicit, not in the theme.
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
    return[parseInt(Math.random() * 10) +1,parseInt(Math.random() * 10) +1];
  });
}