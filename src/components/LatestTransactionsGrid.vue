<template>
  <zing-grid
    ref="myGrid"
    caption="Latest Transactions"
    layout="row"
    pager
    page-size="3"
    page-size-options="2,5,20"
    control-bar="false"
    style="width: 100%;"
    sort
    filter
    height="150px"
    :data.prop="data"
  >
    <zg-colgroup>
      <zg-column index="timestamp" header="Date" type="date" ></zg-column>
      <zg-column index="company" header="Company" type="text"></zg-column>
      <zg-column index="amount" header="Cost" type="currency"></zg-column>
      <zg-column index="license_type" header="License" type="select"
      type-select-options="enterprise,saas,website"></zg-column>
      <zg-column index="purchase_type" header="Type" type="select" type-select-options="renewal, new, cancellation"></zg-column>
    </zg-colgroup>
  </zing-grid>
</template>

<script>
export default {
  props: ['data'],
  mounted() {

    // Attach an event listener to ZingGrid
    this.$refs.myGrid.addEventListener('record:mouseover', (e) => {

      // Set a guide on the LatestTransactions line chart to the corresponding row
      let ltChart = this.$refs.latestTransactions;
      const chartId = ltChart.$children[0].$el.getAttribute('id');
      zingchart.exec(chartId, 'setguide', {
        keyvalue : e.detail.ZGData.data.timestamp,
      });

      // Set a hoverState on the LatestTransactions pie chart
      let ltPie = this.$refs.transactionBreakdown;
      const pieId = ltPie.$children[0].$el.getAttribute('id');

      // Determine the node index that corresponds to the transaction type
      const data = zingchart.exec(pieId, 'getseriesdata');
      const index = data.findIndex((o) => {
        return o.text === e.detail.ZGData.data.purchase_type;
      });


      zingchart.exec(pieId, 'showhoverstate', {
        plotindex: index,
        nodeindex: 0,
      });


    });
  }
}
</script>
<style>
zg-head-cell {
  background: white;
  color: #5d7d9a;
  font-size: 1rem;
}
zg-row:nth-child(odd) {
  background: rgb(250, 250, 250);
}
zg-control-bar {
  display: none;
}
zg-caption {
  background: #5d7d9a;
  font-weight: bold;
  display: none;
}
zing-grid {
  border: 0px;
}

zing-grid input[type="text"], zing-grid input[type="number"]{
  border-radius: 5px;
}

</style>