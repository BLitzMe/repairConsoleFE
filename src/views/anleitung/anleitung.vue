<template>
  <v-card>
    <v-card-title>Reparaturanleitung</v-card-title>

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
                <p v-if="prop == null">Nicht vorhanden</p>
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
  export default {
    props: {
      repairDevice: {
        type: Object,
        required: true
      }
    },

    computed: {
      transformedRepairDevice() {
        let props = {
          Id: this.repairDevice.id,
          "Name des Geräts": this.repairDevice.name,
          Notizen: this.repairDevice.notes,
          Dokumente: this.repairDevice.documents
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

<style lang="scss" scoped></style>
