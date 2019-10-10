import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

import zingchartVue from 'zingchart-vue';
Vue.component('zingchart', zingchartVue);

import Scorecard from './components/Scorecard.vue';
Vue.component('scorecard', Scorecard);

import VCalendar from 'v-calendar';
Vue.use(VCalendar);


new Vue({
  render: h => h(App),
}).$mount('#app')
