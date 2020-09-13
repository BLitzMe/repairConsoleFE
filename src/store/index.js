import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import https from "https";
Vue.use(Vuex);

export default new Vuex.Store({
  state: { userDevices: [], repairDevices: [] },
  mutations: {
    setUserDevices(state, devices) {
      state.userDevices = devices;
    },
    setRepairDevices(state, devices) {
      state.repairDevices = devices;
    }
  },
  actions: {
    getUserDevices({ commit }) {
      axios
        .get("https://localhost:5001/api/devices", {
          httpAgent: new https.Agent({
            rejectUnauthorized: false
          })
        })
        .then((devices) => {
          commit("setUserDevices", devices.data);
          console.log("UserDevices: ", devices.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRepairDevices({ commit }) {
      axios
        .get("https://localhost:5001/api/devices/repairdevices", {
          httpAgent: new https.Agent({
            rejectUnauthorized: false
          })
        })
        .then((devices) => {
          commit("setRepairDevices", devices.data);
          console.log("Repair Devices: ", devices.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  modules: {}
});
