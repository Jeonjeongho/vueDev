import Vue from 'vue'
import Vuex from 'vuex'

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
      console.log(products);
      dispatch("delCounter", products);

    },


  },
  modules: {
  }
})
