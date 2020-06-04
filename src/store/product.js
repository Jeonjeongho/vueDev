const productA = {
  namespaced: true,
  state: {
    counter: "product"
  },
  mutations: {

  },
  actions: {

    addCounter({ commit, state, dispatch }, products) {
      console.log(products + "products name");

    },
  },
}
export default productA;