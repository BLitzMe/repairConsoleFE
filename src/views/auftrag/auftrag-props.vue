<template>
  <div>
    <v-container>
      <v-row>
        <h2 class="ml-3 mb-5">Mehr Information</h2>

        <v-col cols="12"
          ><v-list-item
            class="elevation-1"
            v-for="(prop, propName) in transformedProps"
            :key="propName"
          >
            <v-list-item-content>
              <v-row id="auftragProp">
                <v-col cols="4">
                  {{ propName }}
                </v-col>
                <v-col cols="8">
                  <v-btn
                    text
                    @click="newRepairDeviceModal = true"
                    v-if="propName === 'Reparatür Gerät' && prop == null"
                    >Reparatür Gerät Hinzufügen<v-icon class="ml-3"
                      >mdi-plus-circle-outline</v-icon
                    ></v-btn
                  >
                  <p v-else-if="propName === 'Reparatür Gerät'">
                    Repatür Gerät vorhanden<v-btn
                      text
                      class="ml-3"
                      depressed
                      color="green white--text"
                      @click="repairDeviceModal = true"
                    >
                      Details Anzeigen
                      <v-icon class="ml-1">mdi-arrow-right-circle</v-icon>
                    </v-btn>
                  </p>
                  <p v-else>{{ prop }}</p>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item></v-col
        >
      </v-row>
      <v-dialog v-model="repairDeviceModal">
        <repair-device
          :repairDevice="getRepairDevice"
          @close="repairDeviceModal = false"
        ></repair-device>
      </v-dialog>
      <v-dialog v-model="newRepairDeviceModal">
        <new-repair-device
          @close="newRepairDeviceModal = false"
          :userDeviceId="auftragProps.id"
        ></new-repair-device>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import NewRepairDevice from "../repair-device/new-repair-device.vue";
import RepairDevice from "../repair-device/repair-device.vue";

export default {
  components: {
    "new-repair-device": NewRepairDevice,
    "repair-device": RepairDevice
  },

  props: {
    auftragProps: {
      required: true,
      type: Object
    }
  },

  data() {
    return {
      newRepairDeviceModal: false,
      repairDeviceModal: false
    };
  },

  computed: {
    transformedProps() {
      return this.getTransformedProps();
    },
    getRepairDevice() {
      return this.auftragProps.repairDevice;
    }
  },

  methods: {
    getTransformedProps() {
      let props = { ...this.auftragProps };
      props = {
        Alter: props.age,
        Kategorie: props.category,
        Defekt: props.defect,
        Lieferdatum: props.deliveryDay,
        Beschreibung: props.description,

        Hersteller: props.manufacturer,
        Model: props.model,
        Netzteil: props.powersupply,
        "Reparatür Gerät": props.repairDevice,
        Seriellnümmer: props.serialNumber
      };

      return props;
    }
  }
};
</script>

<style lang="scss" scoped>
#auftragProp:hover {
  cursor: pointer;
}
</style>
