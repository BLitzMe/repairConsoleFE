<template>
  <v-card>
    <v-card-title class="headline">{{ auftrag.id }}</v-card-title>
    <v-card-text>{{ auftrag.description }}</v-card-text>
    <v-list>
      <auftrag-props :auftragProps="getRemainingProperties"></auftrag-props>
    </v-list>
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
import AuftragProps from "./auftrag-props.vue";
export default {
  components: {
    "auftrag-props": AuftragProps
  },
  props: {
    auftrag: {
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
  },
  computed: {
    getRemainingProperties() {
      let remProps = { ...this.auftrag };
      console.log(`these are the before deletion props ${remProps}`);
      delete remProps.id;
      delete remProps.description;
      console.log(`these are the remaining props ${remProps}`);
      return remProps;
    }
  }
};
</script>

<style lang="scss" scoped></style>
