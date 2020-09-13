<template>
  <v-app-bar absolute color="#fcb69f" dark src="../assets/repairPic.jpg" app>
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      ></v-img>
    </template>

    <v-toolbar-title>Repair Console</v-toolbar-title>

    <v-spacer></v-spacer>
    <template v-slot:extension>
      <v-tabs align-with-title>
        <v-tab v-for="link in links" :key="link.text" router :to="link.route"
          ><v-icon class="mr-2">{{ link.icon }} </v-icon> {{ link.text }}</v-tab
        >
      </v-tabs>
    </template>
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: "mdi-tablet-cellphone", text: "Geräte", route: "/" },
        { icon: "mdi-briefcase-outline", text: "Aufträge", route: "/auftraege" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
