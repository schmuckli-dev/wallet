<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-form @submit="login($event)" ref="formLogin" style="margin-left:auto;margin-right:auto;">
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
      </v-flex>
      <v-flex xs12 sm6>
        <v-form @submit="register($event)" ref="formRegister" style="margin-left:auto;margin-right:auto;">
          <v-card class="form_card">
            <v-card-title primary-title>
              <div style="width:100%;">
                <h3 class="headline mb-0">Register</h3>
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
            </v-card-title>
            <v-card-actions right>
              <v-btn type="submit" flat>Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { StoreMod } from "../store.js";
import firebase from "firebase";

export default {
  name: "Login",
  data(){
    return {
      //Login
      email: "",
      password: "",
      //Register
      Remail: "",
      Rpassword: "",
      RpasswordRepeat: ""
    }
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
    }
  }
}
</script>
