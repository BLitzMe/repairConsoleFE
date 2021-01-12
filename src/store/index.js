import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import https from "https";

import { filterManufacturer } from "./filters";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { userDevices: [], currUserDevice: "", selectedRepairDevices: [] },

  getters: {
    allUserDevices: state => state.userDevices,

    filteredByManufacturer(state) {
      return filterManufacturer(state.userDevices, state.currUserDevice);
    },

    selectedRepairDevices: state => state.selectedRepairDevices
  },

  mutations: {
    setUserDevices(state, devices) {
      state.userDevices = devices;
    },

    changeCurrentDevice(state, device) {
      console.log(device);
      state.currUserDevice = device;
    },

    selectRepairDevices(state, category) {
      state.selectedRepairDevices = state.userDevices
        .filter(device => device.category == category)
        .map(device => device.repairDevice);
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
