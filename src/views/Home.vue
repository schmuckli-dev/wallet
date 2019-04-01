<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm9>
        <h1>Hello {{ userName }}</h1>
      </v-flex>
      <v-flex xs12 sm3 style="text-align:right;">
        <v-btn @click="logout">Logout</v-btn>
      </v-flex>
    </v-layout>
    <v-layout style="margin-top:50px;" justify-space-around row wrap>
      <Pass />
      <v-flex xs12 sm4>
        <Upload />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Upload from "../components/Upload";
import Pass from "../components/Pass";
import { StoreMod } from "../store.js";
import firebase from "firebase";

export default {
  name: "Home",
  components:{
    Upload,
    Pass
  },
  data(){
    return {
    }
  },
  computed: {
    userName(){
      var currentUser = firebase.auth().currentUser;
      if(currentUser.displayName == undefined){
        return currentUser.email;
      }else{
        return currentUser.displayName;
      }
    }
  },
  methods: {
    logout(){
      var global_this = this;
      firebase.auth().signOut().then(function() {
        global_this.$router.replace("login");
        StoreMod.showNotification("Logout was successful.");
      }, function(error) {
        StoreMod.showNotification("Logout not successful. " + error.getMessage());
      });
    }
  }
}
</script>

<style>
.form_card{
  width:50%;
}
@media only screen and (max-width: 600px) {
  .form_card {
    width:100%;
  }
}
</style>
