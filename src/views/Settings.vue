<template>
  <v-container>
    <v-btn @click="back" flat><v-icon>keyboard_arrow_left</v-icon> back</v-btn>
    <h1>Settings</h1>
    <v-form>
      <v-layout row wrap>
        <v-flex xs12 sm6 md3>
          <v-text-field outline
            label="Display name"
            v-model="displayName"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <v-text-field
            label="E-Mail"
            disabled
            outline
            v-model="email"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "Settings",
  methods: {
    back(){
      this.$router.replace("home");
    }
  }
}
</script>

<style>
div.v-text-field {
  margin: 10px !important;
}
</style>
