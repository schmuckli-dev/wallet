<template>
  <v-container>
    <v-btn @click="back" flat><v-icon>keyboard_arrow_left</v-icon> back</v-btn>
    <h1>Settings</h1>
    <v-form ref="settings" @submit="save($event)">
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
      <v-btn type="submit">Save</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { StoreMod } from "./../store";
import firebase from "firebase";

export default {
  name: "Settings",
  data(){
    return {
      email: firebase.auth().currentUser.email,
      displayName: firebase.auth().currentUser.displayName
    }
  },
  methods: {
    back(){
      this.$router.replace("home");
    },
    save(event){
      event.preventDefault();

      var user = firebase.auth().currentUser;

      user.updateProfile({
        displayName: this.displayName,
      }).then(function() {
        StoreMod.showNotification("Profile data saved");
      }).catch(function(error) {
        StoreMod.showNotification("Error while saving profile: " + error);
      });
    }
  }
}
</script>

<style>
div.v-text-field {
  margin: 10px !important;
}
</style>
