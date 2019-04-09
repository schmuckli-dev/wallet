<template>
  <v-container>
    <v-btn @click="back" flat><v-icon>keyboard_arrow_left</v-icon> back</v-btn>
    <h1>Settings</h1>
    <h3>{{ $t("settings.profile") }}</h3>
    <v-form ref="settings" @submit="save($event)">
      <v-layout row wrap>
        <v-flex xs12 sm6 md3>
          <v-text-field outline
            :label='$t("settings.displayName")'
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
    <h3>Update password</h3>
    <v-form ref="password" @submit="updatePassword($event)">
      <v-layout row wrap>
        <v-flex xs12 sm6 md3>
          <v-text-field outline
            label="New password"
            type="password"
            v-model="newPassword"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <v-text-field
            label="Repeat new password"
            type="password"
            outline
            v-model="newPasswordRepeat"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-btn type="submit">Set password</v-btn>
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
      displayName: firebase.auth().currentUser.displayName,
      newPassword: "",
      newPasswordRepeat: ""
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
    },
    updatePassword(event){
      event.preventDefault();

      var user = firebase.auth().currentUser;

      if(this.newPassword === this.newPasswordRepeat){
        user.updatePassword(this.newPassword).then(function() {
          StoreMod.showNotification("The password has been set.");
        }).catch(function(error) {
          StoreMod.showNotification(error);
        });
      } else {
        StoreMod.showNotification("The passwords does not match.");
      }
    }
  }
}
</script>

<style>
div.v-text-field {
  margin: 10px !important;
}

h3{
  margin-top:30px;
}
</style>
