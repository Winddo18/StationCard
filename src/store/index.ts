import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = new Vuex.Store({
  state: {
    model: [],
    uploadModel: []
  },
  getters: {

  },
  mutations: {
    setModel(state, model) {
      state.model = model;
    },
    setUploadModel(state, uploadModel){
      state.uploadModel = uploadModel
    }
  },
  actions: {

  },
  plugins: [createPersistedState()],// 持久化：默认将vuex中的值保存到localStorage
});
export default store;
