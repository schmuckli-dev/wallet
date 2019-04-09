<template>
  <v-container>
    <v-layout row wrap>
      <v-flex order-xs2 order-sm1 xs12 sm6>
        <v-form @submit="login($event)" ref="formLogin" style="margin-left:auto;margin-right:auto;">
          <v-card class="form_card">
            <div style="width:100%;">
              <h2>{{ $t('login.login') }}</h2>
              <br>
              <v-text-field outline
                v-model="email"
                :label="$t('settings.email')" required
              ></v-text-field>
              <v-text-field outline
                v-model="password"
                type="password"
                :label="$t('settings.password')" required
              ></v-text-field>
            </div>
            <v-card-actions right>
              <v-btn type="submit" flat>{{ $t('login.login') }}</v-btn>
              <v-btn type="button" @click="goToRegister" flat>{{ $t('login.dontHaveAnAccount') }}</v-btn>
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
              StoreMod.showNotification("notification.loginSuccessful");
            },
            function(){
              StoreMod.showNotification("notification.emailOrPasswordIsWrong");
            }
          );
        } else {
          StoreMod.showNotification("notification.youCantLoginWhileOffline");
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
