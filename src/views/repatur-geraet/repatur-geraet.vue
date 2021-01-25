<template>
  <v-card>
    <v-card-title>
      Reparaturanleitung
      <v-spacer />

      <anhaenge :repair-device="repairDevice" />
    </v-card-title>

    <v-card-text>
      <v-list>
        <v-container>
          <v-row>
            <v-list-item
              class="elevation-1"
              v-for="(prop, propName) in transformedRepairDevice"
              :key="propName"
            >
              <v-col cols="4">{{ propName }}</v-col>

              <v-col cols="8">
                <p v-if="propName == 'Bearbeitungszeit' && prop == null && !editTime">
                  keine Angabe
                  <v-btn @click="editTime = true" text color="green white--text">
                    <v-icon>mdi-square-edit-outline</v-icon>
                  </v-btn>
                </p>

                <p v-if="propName == 'Bearbeitungszeit' && prop != null">
                  {{ prop }}
                  <v-btn @click="editTime = true" text>
                    <v-icon>mdi-square-edit-outline</v-icon>
                  </v-btn>
                </p>

                <p v-if="editTime && propName == 'Bearbeitungszeit'">
                  <v-container>
                    <v-row>
                      <v-col cols="8">
                        <v-text-field v-model="timeInput"></v-text-field>
                      </v-col>
                      <v-col cols="2" class="pt-5">
                        <v-btn @click="editTime = false" outlined color="green white--text">
                          <v-icon size="26">mdi-check</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="2" class="pt-5">
                        <v-btn @click="editTime = false" outlined color="red darken-1">
                          <v-icon size="26">mdi-window-close</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </p>

                <anleitungen
                  :anleitungen="prop"
                  :name="propName"
                  v-else-if="propName == 'Dokumente' || propName == 'Linke'"
                />

                <p v-else>{{ prop }}</p>
              </v-col>
            </v-list-item>
          </v-row>
        </v-container>
      </v-list>

      <v-card-actions class="justify-end">
        <v-btn outlined color="red  lighten-1 " @click="close" class="text-capitalize">
          Abbrechen
        </v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
  import Anhaenge from "./anhaenge/anhaenge.vue";
  import Anleitungen from "./anleitungen/anleitungen.vue";

  export default {
    components: {
      anhaenge: Anhaenge,
      anleitungen: Anleitungen
    },

    props: {
      repairDevice: {
        type: Object,
        required: true
      }
    },

    data() {
      return {
        timeInput: null,
        editTime: false
      };
    },

    computed: {
      transformedRepairDevice() {
        let props = {
          "Name des Geräts": this.repairDevice.name,
          Notizen: this.repairDevice.notes,
          Bearbeitungszeit: this.repairDevice.timeTaken,
          Dokumente: this.repairDevice.documents,
          Linke: this.repairDevice.links
        };
        return props;
      }
    },

    methods: {
      close() {
        this.$emit("close");
      }
    }
  };
</script>

<style lang="css">
  .v-card p {
    margin: unset;
  }
</style>
