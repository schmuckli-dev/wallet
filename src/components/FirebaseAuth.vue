<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-form ref="formLogin" style="margin-left:auto;margin-right:auto;">
        <v-card width="400">
          <v-card-title primary-title>
            <div style="width:100%;">
              <h3 class="headline mb-0">Login</h3>
              <br>
              <v-text-field outline
                v-model="email"
                label="E-Mail"
              ></v-text-field>
              <v-text-field outline
                v-model="password"
                label="Password"
              ></v-text-field>
            </div>
          </v-card-title>
          <v-card-actions style="text-align:right;">
            <v-btn @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-layout>
    <v-snackbar
      v-model="notification"
    >
      {{ text }}
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
  name: "FirebaseAuth",
  data(){
    return {
      email: "",
      password: "",
      notification: false
    }
  },
  methods: {
    login(){
      if(this.$refs.formLogin.validate()){
        firebase.auth().signInWithEmailAndPasswort(this.email, this.password).then(
          function(){

          },
          function(){
            this.notification = "The email or password is invalid.";
          })
      }
    }
  }
}
</script>

<style>

</style>
