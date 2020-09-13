<template>
  <v-container class="mt-12">
    <v-row wrap class="d-flex align-content-space-between">
      <v-col
        class="mx-7 d-flex align-content-space-between"
        cols="2"
        v-for="device in transformedRepairDevices"
        :key="device.Id"
      >
        <v-dialog
          v-model="device.showNAModal"
          persistent
          hide-overlay
          fullscreen
          transition="dialog-bottom-transition"
          scrollable
        >
          <new-auftrag
            @close="device.showNAModal = false"
            :repairDevice="device"
          >
          </new-auftrag>
        </v-dialog>
        <v-card
          min-width="344"
          max-width="344"
          outlined
          @click.stop="device.showNAModal = true"
        >
          <v-list-item>
            <v-list-item-content>
              <div class="overline mb-4">OVERLINE</div>
              <v-list-item-title class="headline mb-1">{{
                device.Name
              }}</v-list-item-title>
              <v-list-item-subtitle>{{ device.Notes }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="grey"
            ></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn text>Auftrag Starten</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NewAuftrag from "../views/auftrag/new-auftrag.vue";
export default {
  components: {
    "new-auftrag": NewAuftrag
  },
  mounted() {
    this.$store.dispatch("getRepairDevices");
  },
  data() {
    return {
      repairDevices: []
    };
  },
  computed: {
    transformedRepairDevices() {
      return this.$store.state.repairDevices.map((device) => ({
        ...device,
        showNAModal: false
      }));
    }
  }
};
</script>

<style lang="scss" scoped></style>
