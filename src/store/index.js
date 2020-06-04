import Vue from 'vue'
import Vuex from 'vuex'
import product from './product.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: "counter"
  },
  mutations: {
    delCounter(state, payload) {
        console.log(payload + "payload");
    }
  },
  actions: {
    delCounter(context, ob) {
      console.log(ob);
      context.commit("delCounter", ob);
    },

    addCounter({ commit, state, dispatch }, products) {
      console.log(products + "products Test");
      dispatch("delCounter", products);

    },


  },
  modules: {
    product
  }
})
