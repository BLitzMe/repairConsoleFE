<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="tableHeaders"
            v-bind:items="reparaturGeraeten"
            class="elevation-1"
            :footer-props="{
              showFirstLastPage: true,
              'items-per-page-text': 'Aufträge Pro Seite'
            }"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr
                  class="row-pointer"
                  v-for="reparaturGeraet in items"
                  :key="reparaturGeraet.id"
                  @click="openModal(reparaturGeraet)"
                >
                  <td>{{ reparaturGeraet.id }}</td>
                  <td>{{ reparaturGeraet.name }}</td>
                  <td>{{ reparaturGeraet.averageTimeTaken }}</td>
                  <td>{{ reparaturGeraet.notes }}</td>

                  <v-dialog v-model="reparaturGeraet.showModal" persistent>
                    <reparaturGerät
                      :repair-device="reparaturGeraet"
                      @close="closeModal(reparaturGeraet)"
                      :elemente="reparaturGeraet"
                    />
                  </v-dialog>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import reparaturGerät from "../repatur-geraet/repatur-geraet.vue";

  export default {
    components: {
      reparaturGerät: reparaturGerät
    },

    data() {
      return {
        headers: [
          { text: "ID", value: "id" },
          { text: "Name", value: "name" },
          { text: "Durchschnittszeit", value: "averageTimeTaken" },
          { text: "Notes", value: "notes" }
        ]
      };
    },

    computed: {
      ...mapGetters(["selectedRepairDevices"]),

      reparaturGeraeten() {
        return this.selectedRepairDevices.map(manual => ({
          ...manual,
          showModal: false
        }));
      },

      tableHeaders() {
        return this.headers.map(it => ({ ...it, width: 20 }));
      }
    },

    methods: {
      openModal(reparaturGeraet) {
        reparaturGeraet.showModal = true;
      },

      closeModal(reparaturGeraet) {
        reparaturGeraet.showModal = false;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .row-pointer:hover {
    cursor: pointer;
  }
</style>
