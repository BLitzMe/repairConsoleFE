<template>
  <div>
    <h1 v-if="filterTerm != ''" class="pt-5 pl-5">
      {{ filterTerm.charAt(0).toUpperCase() + filterTerm.slice(1) }}
      <v-btn text @click="clearFilter" title="Filter beheben">
        <v-icon>mdi-window-close</v-icon>
      </v-btn>
    </h1>

    <div class="manuals">
      <div v-for="reparaturGeraet in selectedRepairDevices" :key="reparaturGeraet.id">
        <v-card>
          <v-card-title>
            <v-btn
              @click="openModal(reparaturGeraet)"
              text
              class="text-capitalize"
              title="Anleitung Öffnen"
            >
              Anleitung Nr. {{ reparaturGeraet.id }}
            </v-btn>
          </v-card-title>

          <v-card-text>
            <p>
              <b>Name:</b>
              {{ reparaturGeraet.name }}
            </p>

            <p>
              <b>Durchschnittszeit:</b>
              {{
                reparaturGeraet.averageTimeTaken == null
                  ? "Keine Daten"
                  : reparaturGeraet.averageTimeTaken
              }}
            </p>

            <p>
              <b>Hersteller:</b>
              <v-btn
                text
                class="text-capitalize"
                :title="
                  `Nur ${reparaturGeraet.manufacturer.charAt(0).toUpperCase() +
                    reparaturGeraet.manufacturer.slice(1)} Anleitungen anzeigen`
                "
                @click="filterManufacturers(reparaturGeraet.manufacturer)"
              >
                {{ reparaturGeraet.manufacturer }}
              </v-btn>
            </p>

            <p>
              <b>Notizen:</b>
              {{ reparaturGeraet.notes }}
            </p>
          </v-card-text>
        </v-card>
      </div>

      <v-dialog v-model="modalBool" persistent>
        <reparaturGeraet :repair-device="data" @close="closeModal()" />
      </v-dialog>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from "vuex";
  import reparaturGerät from "../repatur-geraet/repatur-geraet.vue";

  export default {
    components: {
      reparaturGeraet: reparaturGerät
    },

    mounted() {
      this.changeCurrentDevice("");
    },

    data() {
      return {
        data: null,
        modalBool: false,
        filterTerm: ""
      };
    },

    computed: {
      ...mapGetters(["selectedRepairDevices"])
    },

    methods: {
      ...mapMutations(["changeCurrentDevice"]),

      filterManufacturers(manufacturer) {
        this.filterTerm = manufacturer;
        this.changeCurrentDevice(this.filterTerm);
      },

      clearFilter() {
        this.filterTerm = "";
        this.changeCurrentDevice("");
      },

      openModal(reparaturGeraet) {
        this.data = reparaturGeraet;
        this.modalBool = true;
      },

      closeModal() {
        this.modalBool = false;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .v-card p {
    background-color: #a9b8bb;
    margin: 2px;
    padding: 4px;
    border-radius: 0.3em;
  }

  .manuals {
    padding: 2em 0em 0em 0em;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
  }

  .card:hover {
    cursor: pointer;
    background-color: rgb(185, 187, 185);
  }

  .row-pointer:hover {
    cursor: pointer;
  }
</style>
