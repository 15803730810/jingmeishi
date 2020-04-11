import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    uname: sessionStorage.getItem("uname"),
    uid: sessionStorage.getItem("uid"),
    phone: sessionStorage.getItem("phone"),
  },
  mutations: {
    updateUser(state) {
      state.uname = sessionStorage.getItem("uname");
      state.uid = sessionStorage.getItem("uid");
      state.phone = sessionStorage.getItem("phone");
    },
  },
});
