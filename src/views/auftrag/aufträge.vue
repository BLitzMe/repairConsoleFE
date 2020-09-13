<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          v-bind:items="myUserDevices"
          class="elevation-1"
          :items-per-page="15"
          :footer-props="{
            showFirstLastPage: true,

            'items-per-page-text': 'Auftäre Pro Seite'
          }"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr
                v-for="item in items"
                :key="item.id"
                @click="item.showModal = true"
              >
                <td>{{ item.id }}</td>
                <td>{{ item.deliveryDay }}</td>
                <td>{{ item.status }}</td>
                <v-dialog v-model="item.showModal" persistent>
                  <auftrag-modal
                    @close="item.showModal = false"
                    :auftrag="item"
                  ></auftrag-modal>
                </v-dialog>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<!-- -->
<script>
import AuftragModal from "./auftrag.vue";
export default {
  components: {
    "auftrag-modal": AuftragModal
  },
  data() {
    return {
      headers: [
        {
          text: "id",
          value: "id"
        },
        {
          text: "Eingangs Datum",
          value: "deliveryDay"
        },
        {
          text: "Status des Auftrags",
          value: "status"
        }
      ],

      auftragDialogShow: false
    };
  },
  computed: {
    myUserDevices() {
      return this.$store.state.userDevices.map((device) => ({
        ...device,
        status: "not in bearbeitung", //!!TODO: take it out when back end has one available
        showModal: false
      }));
    }
  }
};
</script>

<style lang="scss" scoped></style>
