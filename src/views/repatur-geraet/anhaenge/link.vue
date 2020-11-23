<template>
  <v-card>
    <v-card-title>Neue Link</v-card-title>

    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="linkInput" label="Link" outlined clearable />
        </v-col>
      </v-row>

      <v-row justify="end">
        <v-btn outlined color="red  lighten-1 " @click="$emit('close')" class="text-capitalize">
          Abbrechen
        </v-btn>

        <v-btn
          depressed
          @click="sendDeviceDetails"
          class="ml-4 text-capitalize"
          color="green lighten-1 white--text"
        >
          Speichern
        </v-btn>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        linkIniput: ""
      };
    }
  };
</script>

<style></style>
