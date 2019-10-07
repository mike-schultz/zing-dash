export default {
  type: 'pie',
  title: {
    text: 'Hello World'
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
    cursor: 'pointer'
  },
  legend:{
    header: {},
    highlightPlot: true, //Has to be explicit, not in the theme.
  },
  hoverMarker: {
    shadow: true,
    shadowAlpha: 1,
    backgroundColor:'red'
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
    { values: [3] },
    { values: [7] },
    { values: [3] },
    { values: [4] },
  ]
};

// export default {
//   type: 'pie',
//   title: {
//     text: 'Advanced Pie Chart',
//     color: '#5D7D9A',
//     align: 'left',
//     padding: '30 0 0 35',
//     fontSize: '24px'
//   },
//   subtitle: {
//     text: 'Unleash the power of the ZingCharts \nadvanced pie chart options to createanimated and interactive pie chartswith wildly different styles!',
//     color: '#5D7D9A',
//     fontSize: '16px',
//     fontWeight: 300,
//     align: 'left',
//     padding: '35 0 0 35'
//   },
//   shapes: {
//     type: 'triangle'
//   },
//   palette: ['#afecfe', '#7ddefd', '#36b6f8', '#3290be', '#5ca5ca', '#a0bed6', '#98c1de', '#aedaf2'],
//   legend: {
//     layout: '2x4',
//     highlightPlot: true,
//     item: {
//       fontColor: '#373a3c',
//       fontSize: '12px'
//     },
//     toggleAction: 'remove',
//     align: 'left',
//     verticalAlign: 'middle',
//     margin: '5px 20px 0 25px',
//     padding: '5px',
//     borderRadius: '5px',
//     header: {
//       text: 'Legend',
//       color: '#5D7D9A',
//       padding: '10px'
//     }
//   },
//   plot: {
//     slice: '0',
//     pieTransform: 'fold=20',
//     valueBox: {
//       fontColor: '#fff'
//     },
//     detach: false,
//     highlightState: {
//       borderColor: '#000',
//       borderWidth: '2px'
//     },
//     refAngle: 270
//   },
//   labels: [

//   ],
//   tooltip: {
//     padding: '10px 15px',
//     borderRadius: '3px'
//   },
//   series: [
//     {
//       values: [12.5],
//       text: 'One'
//     },
//     {
//       values: [12.5],
//       text: 'Two'
//     },
//     {
//       values: [12.5],
//       text: 'Three'
//     },
//     {
//       values: [12.5],
//       text: 'Four'
//     },
//     {
//       values: [12.5],
//       text: 'Five'
//     },
//     {
//       values: [12.5],
//       text: 'Six'
//     },
//     {
//       values: [12.5],
//       text: 'Seven'
//     },
//     {
//       values: [12.5],
//       text: 'Eight'
//     }
//   ]
// }