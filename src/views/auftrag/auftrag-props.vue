<template>
  <div>
    <v-container>
      <v-row>
        <h2 class="ml-3 mb-5">Mehr Information</h2>

        <v-col cols="12">
          <v-list-item
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
                  <v-container class="py-0 my-0" v-if="propName === 'Reparaturanleitung'">
                    <v-row>
                      <v-col cols="6">
                        <p v-if="prop != null">
                          Reparaturanleitung vorhanden
                          <v-btn
                            text
                            class="ml-3 text-capitalize"
                            depressed
                            color="green white--text"
                            @click="anleitungDialog = true"
                          >
                            Details Anzeigen
                            <v-icon class="ml-1">mdi-arrow-right-circle</v-icon>
                          </v-btn>
                        </p>
                      </v-col>
                      <v-spacer />
                      <v-col cols="6">
                        <v-btn text @click="newAnleitungDialog = true" class="text-capitalize">
                          Antleitung Hinzufügen
                          <v-icon class="ml-3">mdi-plus-circle-outline</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>

                  <p v-else>{{ prop }}</p>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
      <v-dialog v-model="anleitungDialog">
        <anleitung device :repairDevice="getAnleitung" @close="anleitungDialog = false" />
      </v-dialog>

      <v-dialog v-model="newAnleitungDialog">
        <neue-anleitung @close="newAnleitungDialog = false" :userDeviceId="auftragProps.id" />
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
  import NeueAnleitung from "../anleitung/neue-anleitung.vue";
  import Anleitung from "../anleitung/anleitung.vue";

  export default {
    components: {
      "neue-anleitung": NeueAnleitung,
      anleitung: Anleitung
    },

    props: {
      auftragProps: {
        required: true,
        type: Object
      }
    },

    data() {
      return {
        newAnleitungDialog: false,
        anleitungDialog: false
      };
    },

    computed: {
      transformedProps() {
        return this.getTransformedProps();
      },
      getAnleitung() {
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
          Modell: props.model,
          Netzteil: props.powersupply,
          Reparaturanleitung: props.repairDevice,
          Seirennümmer: props.serialNumber
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
