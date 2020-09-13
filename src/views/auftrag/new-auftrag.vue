<template>
  <v-card>
    <v-card-title class="headline">HEADLINE</v-card-title>
    <v-card-text>DESCRIPTION</v-card-text>
    <v-card-actions
      ><!-- //!!TODO: insert other required properties -->
      <v-spacer></v-spacer>
      <v-btn color="red darken-1" text @click="close"
        >Informationen Schliesen</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    repairDevice: {
      required: true,
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped></style>
