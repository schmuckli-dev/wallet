<template>
  <v-container>
    <v-layout row wrap>
      <v-flex order-xs2 order-sm1 xs12 sm6>
        <v-form @submit="register($event)" ref="formRegister" style="margin-left:auto;margin-right:auto;">
          <v-card class="form_card">
            <div style="width:100%;">
              <h2>Register</h2>
              <br>
              <v-text-field outline
                v-model="Remail"
                label="E-Mail" required
              ></v-text-field>
              <v-text-field outline
                v-model="Rpassword"
                type="password"
                label="Password" required
              ></v-text-field>
              <v-text-field outline
                v-model="RpasswordRepeat"
                type="password"
                label="Repeat password" required
              ></v-text-field>
            </div>
            <v-card-actions right>
              <v-btn type="submit" flat>Register</v-btn>
              <v-btn type="button" @click="goToLogin" flat>Already have an account?</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
      <v-flex order-xs1 order-sm2 xs12 sm6 pull-left>
        <FeatureCard />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { StoreMod } from "../store.js";
import firebase from "firebase";
import FeatureCard from "../components/FeatureCard";

export default {
  name: "Login",
  data(){
    return {
      Remail: "",
      Rpassword: "",
      RpasswordRepeat: ""
    }
  },
  components: {
    FeatureCard
  },
  methods: {
    register(event){
      event.preventDefault();

      var global_this = this;
      if(this.$refs.formRegister.validate()){
        if (this.Rpassword === this.RpasswordRepeat) {
          if(navigator.onLine){
            firebase.auth().createUserWithEmailAndPassword(this.Remail.trim(), this.Rpassword).then(
              function(){
                global_this.$router.replace('home');
                StoreMod.showNotification("Registration successful. You're now logged in.");
              },
              function(error){
                StoreMod.showNotification(error);
              }
            );
          } else {
            StoreMod.showNotification("You can't register while you're offline.");
          }
        }
      }
    },
    goToLogin(){
      this.$router.replace("login");
    }
  }
}
</script>
<style>
h2 {
  margin: 10px 10px 0 10px;
}
</style>
