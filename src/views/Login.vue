<template>
  <v-container>
    <v-layout row wrap>
      <v-flex order-xs2 order-sm1 xs12 sm6>
        <v-form @submit="login($event)" ref="formLogin" style="margin-left:auto;margin-right:auto;">
          <v-card class="form_card">
            <div style="width:100%;">
              <h2>Login</h2>
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
            <v-card-actions right>
              <v-btn type="submit" flat>Login</v-btn>
              <v-btn type="button" @click="goToRegister" flat>Don't have an account?</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
      <v-flex order-xs1 order-sm2 xs12 sm6>
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
      //Login
      email: "",
      password: "",
    }
  },
  components: {
    FeatureCard
  },
  methods: {
    login(event){
      event.preventDefault();

      var global_this = this;
      if(this.$refs.formLogin.validate()){
        if(navigator.onLine){
          firebase.auth().signInWithEmailAndPassword(this.email.trim(), this.password).then(
            function(){
              global_this.$router.replace('home');
              StoreMod.showNotification("Login successful.");
            },
            function(){
              StoreMod.showNotification("The email or password is invalid.");
            }
          );
        } else {
          StoreMod.showNotification("You can't login while you're offline.");
        }
      }
      return false;
    },
    goToRegister(){
      this.$router.replace("register");
    }
  }
}
</script>
<style>
h2 {
  margin: 10px 10px 0 10px;
}
</style>
