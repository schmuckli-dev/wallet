<template>
  <v-app>
    <v-toolbar color="#9D6447" style="color:white;" app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Wallet</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu
        transition="slide-y-transition"
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn
            flat
            dark
            v-on="on"
          >
            {{ userName }}
          </v-btn>
        </template>
        <v-list>
          <v-list-tile @click="openSettings">
            <v-icon>settings</v-icon>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="logout">
            <v-icon>power_settings_new</v-icon>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>

    <!-- Notification -->
    <v-snackbar
      v-model="notification"
    >
      {{ notification_text }}
      <v-btn
        color="#9D6447"
        flat
        @click="notification = ''"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-btn fab dark color="#9D6447" fixed right bottom>
        <v-icon @click="openNew" dark>add</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
import { Store, StoreMod } from "./store.js";
import firebase from "firebase";

export default {
  name: 'App',
  data() {
    return {
      currentUser: firebase.auth().currentUser
    }
  },
  computed: {
    /* Notification */
    notification: {
      get() { return Store.notification !== "" },
      set() { StoreMod.showNotification(""); }
    },
    notification_text(){
      return Store.notification;
    },
    /* Notificatio End */
    userName(){
      if(this.currentUser == undefined){
        return "Not logged in";
      }
      if(this.currentUser.displayName == undefined){
        return this.currentUser.email;
      }else{
        return this.currentUser.displayName;
      }
    },
  },
  methods: {
    openSettings(){

    },
    openNew(){
      if(navigator.onLine){
        this.$router.replace("new");
      } else {
        StoreMod.showNotification("You only can add passes, when you are online.");
      }
    },
    logout(){
      var global_this = this;
      firebase.auth().signOut().then(function() {
        global_this.$router.replace("login");
        StoreMod.showNotification("Logout was successful.");
      }, function(error) {
        StoreMod.showNotification("Logout not successful. " + error.getMessage());
      });
    }
  },
  watch:{
    //$route (to, from){
    $route (){ //Call everytime when route changes
      this.currentUser = firebase.auth().currentUser;
    }
  }
}
</script>

<style>
@import "./assets/css/layout.css";
</style>
