import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

Vue.config.productionTip = false;

import zingchartVue from 'zingchart-vue';
Vue.component('zingchart', zingchartVue);
import 'zingchart/modules/zingchart-calendar.min.js';
import 'zingchart/modules/zingchart-wordcloud.min.js';

import Scorecard from './components/Scorecard.vue';
Vue.component('scorecard', Scorecard);

import VCalendar from 'v-calendar';
Vue.use(VCalendar);

Vue.use(VueRouter);
import SalesDashboard from './pages/Sales.vue';
import MarketingDashboard from './pages/Marketing.vue';


import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faChevronDown)
library.add(faChevronUp);
Vue.component('font-awesome-icon', FontAwesomeIcon)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/sales', component: SalesDashboard},
    { path: '/marketing', component: MarketingDashboard},
  ]
});


new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
