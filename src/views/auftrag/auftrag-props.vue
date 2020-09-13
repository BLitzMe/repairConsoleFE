<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12"
          ><v-list-item
            v-for="(prop, propName) in auftragProps"
            :key="propName"
          >
            <v-list-item-content>
              <v-row>
                <v-col cols="4"> {{ propName }}</v-col>
                <v-col cols="8">{{ prop }}</v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item></v-col
        >
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    auftragProps: {
      required: true,
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped></style>
