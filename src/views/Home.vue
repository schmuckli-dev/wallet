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
    <v-snackbar
      v-model="notification"
    >
      {{ notification_text }}
      <v-btn
        color="pink"
        flat
        @click="notification = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  data(){
    return {
      notification: false,
      notification_text: ""
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
      }, function(error) {
        global_this.notification = true;
        global_this.notification_text = "Logout not successfull. " + error.getMessage();
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
