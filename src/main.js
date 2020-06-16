import Vue from 'vue'
import App from './App.vue'
import VueRouter  from 'vue-router'
import store from './store'
import axios from 'axios'
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
 

import Main from './pages/shop/index.vue';
import goods from './pages/shop/goods.vue';
import detail from './pages/shop/detail.vue';

Vue.use(VueRouter);

Vue.directive('customerColor', {
  bind(el, binding, vnode) { 
    el.style.backgroundColor = 'green';
    console.log(binding)
  },
  unbind(el, binding, vnode) {
    console.log(el);
  }
});

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Main
        },{
          path: '/sub',
          component: goods
        },{
          path: '/detail',
          component: detail
        }
    ]
})  

new Vue({
  store,
  render: h => h(App),
  router: router
}).$mount('#app')
