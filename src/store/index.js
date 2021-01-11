import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import https from "https";

import { filterManufacturer } from "./filters";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { userDevices: [], currUserDevice: "", selectedDevices: [] },

  getters: {
    allUserDevices: state => state.userDevices,

    filteredByManufacturer(state) {
      return filterManufacturer(state.selectedDevices, state.currUserDevice);
    },

    selectedDevices: state => state.selectedDevices
  },

  mutations: {
    setUserDevices(state, devices) {
      state.userDevices = devices;
    },

    changeCurrentDevice(state, device) {
      console.log(device);
      state.currUserDevice = device;
    },

    selectCategory(state, category) {
      state.selectedDevices = state.userDevices.filter(device => device.category == category);
    }
  },

  actions: {
    getUserDevices({ commit }) {
      axios
        .get(Vue.prototype.$api + "/devices", {
          httpAgent: new https.Agent({
            rejectUnauthorized: false
          })
        })
        .then(devices => {
          commit("setUserDevices", devices.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
