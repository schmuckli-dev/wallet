<template>
  <v-container>
    <v-form @submit="login" ref="formLogin" style="margin-left:auto;margin-right:auto;">
      <v-card class="form_card">
        <v-card-title primary-title>
          <div style="width:100%;">
            <h3 class="headline mb-0">Login</h3>
            <br>
            <v-text-field outline
              v-model="email"
              label="E-Mail" required
            ></v-text-field>
            <v-text-field outline
              v-model="password"
              type="password"
              label="Password" required
            ></v-text-field>
          </div>
        </v-card-title>
        <v-card-actions right>
          <v-btn type="submit" flat>Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import { StoreMod } from "../store.js";
import firebase from "firebase";

export default {
  name: "Login",
  data(){
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    login(){
      var global_this = this;
      if(this.$refs.formLogin.validate()){
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          function(){
            global_this.$router.replace('home');
            StoreMod.showNotification("Login successful.");
          },
          function(){
            StoreMod.showNotification("The email or password is invalid.");
          })
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
