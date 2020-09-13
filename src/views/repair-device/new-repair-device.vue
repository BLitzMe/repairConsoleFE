<template>
  <v-card>
    <v-card-title>Neues Repatür Gerät</v-card-title>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h4>Name</h4>
          <v-text-field
            v-model="name"
            placeholder="Geben Sie der Name Ein"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="my-4">
        <v-col cols="12">
          <h4>Notiz</h4>
          <v-textarea
            v-model="notes"
            placeholder="Geben Sie Notizen Ein"
            outlined
          ></v-textarea>
        </v-col> </v-row
      ><v-card-actions class="justify-end">
        <v-btn outlined color="red  lighten-1 " @click="close">Abrechen</v-btn
        ><v-btn
          depressed
          @click="sendDeviceDetails"
          class="mx-4"
          color="green lighten-1 white--text"
          >Spichern</v-btn
        >
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
import axios from "axios";
import https from "https";
export default {
  props: {
    userDeviceId: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      name: null,
      notes: null
    };
  },
  methods: {
    close() {
      this.$emit("close");
      this.name = null;
      this.notes = null;
    },
    sendDeviceDetails() {
      axios
        .post(
          "https://localhost:5001/api/devices/repairdevice",
          { name: this.name, notes: this.notes },
          {
            "Content-Type": "application/json",
            httpAgent: new https.Agent({
              rejectUnauthorized: false
            })
          }
        )
        .then((response) => {
          this.patchDeviceId(response.data.id);
          console.log("new repair device: ", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    patchDeviceId(repairDeviceId) {
      axios
        .patch(
          `https://localhost:5001/api/devices/${this.userDeviceId}/setRepairDevice?id=${repairDeviceId}`,
          {
            httpAgent: new https.Agent({
              rejectUnauthorized: false
            })
          }
        )
        .then((devices) => {
          this.$store.dispatch("getUserDevices");
          this.close();
          console.log("UserDevices: ", devices.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
