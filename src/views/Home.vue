<template>
  <v-container>
      <h1>Hello {{ userName }}</h1>
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
      email: "",
      password: "",
      notification: false
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
