<template>
  <div id="app">
    <div class="dashboard">
      <header>
      <h1 style="margin: 0">Your Sales Dashboard</h1>
        <section style="display: flex; align-items: center;margin-right: 26px;">
          <div style="margin-right:10px"> Showing data from</div> <v-date-picker mode='range' v-model="range" :popover="{placement:'bottom-end'}" />
        </section>
        </header>
        <sales/>
     </div>
  </div>
</template>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 2rem;
}
header {
  display: flex;
  justify-content: space-between;
    border-bottom: 1px solid #DDD;
  padding-bottom: 1rem;
}
nav {
  display: flex;
  align-items: center;
}
</style>
<style>
  .scorecard {
    padding: 1rem;
  }
  .scorecard__value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #04A3F5;
  }
  .scorecard__header {
    margin-top: 0.4rem;
  }
  .scorecard__subheader {
    font-size: 0.8rem;
  }
  .dashboard__summary {
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
  }

  .scorecard {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  a {
    color: #2196f3;
    text-decoration: none;
    font-size: 1.1rem;
  }
  a + a {
    margin: 0 1rem;
  }
  a:visited {
    color: #2196f3;
  }
  a:hover {
    text-decoration: none;
  }
  a.router-link-exact-active {
    font-weight: 500;
    border-bottom: 2px solid#2196f3;;
  }
</style>

<script>
import customers from './dataset/customers.js';
import Sales from './pages/Sales.vue';
export default {
  name: 'app',
  components: {
    Sales,
  },
  data() {
    return {
      customers,
      expectedYTD: [10000, 25000, 30000, 40000, 60000, 90000, 120000, 130000, 140000],
      range: {
        start: new Date(2018, 0, 16), // Jan 16th, 2018
        end: new Date(2018, 0, 19)    // Jan 19th, 2018
      },
      
    };
  },
  
}
</script>

