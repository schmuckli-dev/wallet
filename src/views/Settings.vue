<template>
  <v-container>
    <v-btn @click="back" flat><v-icon>keyboard_arrow_left</v-icon> {{ $t("general.back") }}</v-btn>
    <h1>{{ $t("settings.settings") }}</h1>
    <h3>{{ $t("settings.profile") }}</h3>
    <v-form ref="settings" @submit="save($event)">
      <v-layout row wrap>
        <v-flex xs12 sm6 md3>
          <v-text-field outline
            :label="$t('settings.displayName')"
            v-model="displayName"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <v-text-field
            :label="$t('settings.email')"
            disabled
            outline
            v-model="email"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-btn type="submit">{{ $t('general.save') }}</v-btn>
    </v-form>
    <h3>{{ $t('settings.password') }}</h3>
    <v-form ref="password" @submit="updatePassword($event)">
      <v-layout row wrap>
        <v-flex xs12 sm6 md3>
          <v-text-field outline
            :label="$t('settings.newPassword')"
            type="password"
            v-model="newPassword"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <v-text-field
            :label="$t('settings.newPasswordRepeat')"
            type="password"
            outline
            v-model="newPasswordRepeat"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-btn type="submit">{{ $t('general.save') }}</v-btn>
    </v-form>
    <h3>{{ $t('settings.language') }}</h3>
    <v-form ref="language" @submit="updateLanguage($event)">
      <v-layout row wrap>
        <v-flex xs12 sm6 md3>
          <v-select
            :items="supportedLanguages"
            item-text="value"
            item-value="key"
            v-model="language"
            :label="$t('settings.language')"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-btn type="submit">{{ $t('general.save') }}</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { StoreMod } from "./../store";
import { getLanguage } from "./../translation";
import firebase from "firebase";
import cookies from 'js-cookie';

export default {
  name: "Settings",
  data(){
    return {
      email: firebase.auth().currentUser.email,
      displayName: firebase.auth().currentUser.displayName,
      newPassword: "",
      newPasswordRepeat: "",
      language: getLanguage()
    }
  },
  computed: {
    supportedLanguages(){
      return [
        {key: 'en', value: 'English'},
        {key: 'de', value: 'Deutsch'}
      ]
    }
  },
  methods: {
    back(){
      this.$router.replace("home");
    },
    save(event){
      event.preventDefault();

      var user = firebase.auth().currentUser;

      user.updateProfile({
        displayName: this.displayName,
      }).then(function() {
        StoreMod.showNotification("notification.theProfileHasBeenSaved");
      }).catch(function() {
        StoreMod.showNotification("notification.thereWasAnErrorWhileSavingTheProfile");
      });
    },
    updatePassword(event){
      event.preventDefault();

      var user = firebase.auth().currentUser;

      if(this.newPassword === this.newPasswordRepeat){
        user.updatePassword(this.newPassword).then(function() {
          StoreMod.showNotification("notification.thePasswordHasBeenSet");
        }).catch(function(error) {
          StoreMod.showNotification(error);
        });
      } else {
        StoreMod.showNotification("notification.thePasswordsDoesNotMatch");
      }
    },
    updateLanguage(event){
      event.preventDefault();

      cookies.set("lang", this.language, { expires: 365 * 10 });

      StoreMod.showNotification("notification.theLanguageHasBeenUpdated");
      setTimeout(function(){
        window.location.reload(); //Refresh the page
      }, 2000);
    }
  }
}
</script>

<style>
div.v-text-field {
  margin: 10px !important;
}

h3{
  margin-top:30px;
}
</style>
