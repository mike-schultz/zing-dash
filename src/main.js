import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

import zingchartVue from 'zingchart-vue';
Vue.component('zingchart', zingchartVue);

import VCalendar from 'v-calendar';
Vue.use(VCalendar);

import ZingGrid from "zinggrid";

new Vue({
  render: h => h(App),
}).$mount('#app')
