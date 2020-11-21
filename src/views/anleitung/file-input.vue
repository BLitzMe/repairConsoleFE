<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col>
          <v-row>
            <v-file-input label="File input" outlined dense />
          </v-row>
          <v-row justify="end">
            <v-btn outlined color="red" class="text-capitalize" @click="$emit('close')">
              Abbrechen
            </v-btn>
            <v-btn color="green lighten-1 white--text" depressed class="ml-4 text-capitalize">
              Hinzufügen
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  export default {};
</script>

<style></style>
