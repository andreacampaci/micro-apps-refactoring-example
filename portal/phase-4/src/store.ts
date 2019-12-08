import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categorySelected: "",
    cartData: [],
    componentsLazy: []
  },
  mutations: {
    cartData (state, product: any) {
      let addedToExistingItem = false;
      for (let i = 0; i <  state.cartData.length; i++) {
        if ( state.cartData[i].id == product.id) {
          state.cartData[i].count++;
          addedToExistingItem = true;
          break;
        }
      }
      if (!addedToExistingItem) {
        state.cartData.push({
          count: 1, id: product.id, price: product.price, name: product.name
        });
      }
    },
    categorySelected (state, categorySelected: string) {
      state.categorySelected = categorySelected;
    },
    componentsLazy(state, url: string) {
      state.componentsLazy.push(url);
    },
  },
  actions: {
    cartData ({ commit }, product: unknown) {
      commit('cartData', product)
    },
    categorySelected ({ commit }, category: string) {
      commit('categorySelected', category)
    },
    componentsLazy({ commit }, url: string) {
      commit('componentsLazy', url)
    },
  },
  getters: {
    categorySelected: state => {
      return state.categorySelected;
    },
    cartData: state => {
      return state.cartData;
    },
    hasComponentsAlreadyLoad: state => url => {
      return state.componentsLazy.filter(component => component === url).length > 0;
    }
  }
});
