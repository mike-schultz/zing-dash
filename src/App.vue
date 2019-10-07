<template>
  <div id="app">
    <div class="dashboard">
      <h1>Your SaaS Dashboard</h1>
      <header>


        <section style="display: flex; align-items: center;">
          <div style="margin-right:10px"> Showing data from</div> <v-date-picker mode='range' v-model="range" />
        </section>
        <nav>
          <router-link :to="{ path: '/'}" replace>Summary</router-link>
          <router-link :to="{ path: '/sales'}" replace>Sales</router-link>
          <router-link :to="{ path: '/marketing'}" replace>Marketing</router-link>
          <router-link :to="{ path: '/support'}" replace>Support</router-link>
        </nav>
      </header>

      <router-view></router-view>
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
export default {
  name: 'app',
  data() {
    return {
      customers,
      expectedYTD: [10000, 25000, 30000, 40000, 60000, 90000, 120000, 130000, 140000],
      range: {
        start: new Date(2018, 0, 16), // Jan 16th, 2018
        end: new Date(2018, 0, 19)    // Jan 19th, 2018
      }
    };
  },
  
}
</script>

