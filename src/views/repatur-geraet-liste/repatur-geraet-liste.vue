<template>
  <div class="manuals">
    <div v-for="reparaturGeraet in reparaturGeraeten" :key="reparaturGeraet.id">
      <v-card @click="openModal(reparaturGeraet)">
        <v-card-title>Anleitung Nr. {{ reparaturGeraet.id }}</v-card-title>
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
            <b>Notizen:</b>
            {{ reparaturGeraet.notes }}
          </p>
        </v-card-text>
      </v-card>
    </div>
    <v-dialog v-model="modalBool">
      <reparaturGeraet :repair-device="data" @close="closeModal()" />
    </v-dialog>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import reparaturGerät from "../repatur-geraet/repatur-geraet.vue";

  export default {
    components: {
      reparaturGeraet: reparaturGerät
    },

    data() {
      return {
        data: null,
        modalBool: false
      };
    },

    computed: {
      ...mapGetters(["selectedRepairDevices"]),

      reparaturGeraeten() {
        return this.selectedRepairDevices.map(manual => ({
          ...manual,
          showModal: false
        }));
      }
    },

    methods: {
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
    padding: 4em 0em 0em 0em;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
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
