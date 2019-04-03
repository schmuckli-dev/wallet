<template>
  <v-flex xs12 sm4>
    <v-card class="pass" id="upload_box" :style="cardStyle">
      <v-card-title primary-title>
        <div class="headline" style="margin-bottom:10px;" v-if="passData === undefined">
          New Ticket
        </div>
        <p v-if="passData === undefined">
          Upload here your .pkpass file<br>
          <input
            v-on:input="upload($event)"
            type="file">
        </p>
        <div v-if="passData !== undefined" style="width:100%;">
          <div v-if="passData !== undefined && title !== ''">
            <span class="headline">{{ title }}</span>
          </div>
          <div v-if="passData !== undefined" style="float:right;width:auto;text-align:right;">
            <img :src="logoSrc" width="50%" v-if="passData !== undefined && current_logo !== ''" >
            <br>
            <span v-if="passData.organizationName !== '' && current_logo === ''">{{ passData.organizationName }}</span>
          </div>
          <div v-if="passData !== undefined && relevantDate !== ''">
            <b>Date & Time</b><br>
            {{ relevantDate }}
          </div>
          <div style="margin-top:10px;" v-if="passData !== undefined && ticketType !== ''">
            <b>Type</b><br>
            {{ ticketType }}
          </div>
        </div>
      </v-card-title>
      <v-card-actions v-if="passData !== undefined && !isSavingPass">
        <v-btn v-if="!isBackgroundLight" @click="addToWallet" dark flat>Add to wallet</v-btn>
        <v-btn v-if="isBackgroundLight" @click="addToWallet" light flat>Add to wallet</v-btn>

        <v-btn v-if="!isBackgroundLight" @click="resetPassData" dark flat>Cancel</v-btn>
        <v-btn v-if="isBackgroundLight" @click="resetPassData" light flat>Cancel</v-btn>
      </v-card-actions>
      <v-card-actions v-if="passData !== undefined && isSavingPass">
        <v-progress-linear :indeterminate="true"></v-progress-linear>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>
<script>
import firebase from "firebase";
require("firebase/firestore");

import { StoreMod } from "../store.js";
import { lightOrDark } from "../assets/js/color";
import { getFormattedDate } from "../assets/js/date";
var JSZip = require("jszip");

export default{
  name: "Upload",
  data(){
    return {
      passData: undefined,
      current_logo: undefined,
      isSavingPass: false,
      currentFile: undefined
    }
  },
  computed: {
    isBackgroundLight(){
      try{
        return lightOrDark(this.passData.backgroundColor) == 'light';
      }catch(e){
        return false;
      }
    },
    cardStyle(){
      try{
        return "background-color: " + this.passData.backgroundColor + ";color:" + this.passData.foregroundColor;
      }catch(e){
        return "";
      }
    },
    logoSrc(){
      return 'data:image/png;base64,' + this.current_logo;
    },
    relevantDate(){
      try{
        return getFormattedDate(this.passData.relevantDate);
      }catch(e){
        return "";
      }
    },
    title(){
      try {
        if(this.passData.eventTicket){
          return this.passData.eventTicket.primaryFields[0].value;
        } else if (this.passData.boardingPass){
          return "Boarding-Pass";
        } else {
          return "Other";
        }
      } catch (e){
        return "";
      }
    },
    ticketType(){
      try {
        if(this.passData.eventTicket){
          return "Event";
        } else if (this.passData.boardingPass){
          return "Boarding-Pass";
        } else {
          return "Other";
        }
      } catch (e){
        return "";
      }
    }
  },
  methods: {
    resetPassData(){
      this.passData = undefined;
    },
    addToWallet(){
      var global_this = this;
      this.isSavingPass = true;
      var realDBRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/passes").push();
      realDBRef.set(
        this.passData, function(error) {
        if (error) {
          global_this.isSavingPass = false;
          StoreMod.showNotification("There was an error while saving the pass: " + error);
        } else {
          var storageFile = firebase.storage().ref("users/" + firebase.auth().currentUser.uid + "/passes/" + realDBRef.key + ".pkpass");
          storageFile.put(global_this.currentFile).then(function(snapshot) {
            global_this.isSavingPass = false;
            global_this.resetPassData();
            StoreMod.showNotification("The pass has been saved.");
          });
        }
      });
    },
    upload(e){
      var files = e.target.files;
      var global_this = this;

      console.log(files);
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        this.currentFile = file;
        JSZip.loadAsync(file).then(function(zip) {
          Object.entries(zip.files).forEach(function(zipEntry){
            switch (zipEntry[0]) {
              case 'pass.json':
                global_this.handleJsonData(zip, zipEntry[0]);
                break;

              case 'logo.png':
                global_this.handleLogo(zip, zipEntry[0]);
                break;

            /*case 'thumbnail.png':
              handleForegroundImage(zip, zipEntry.name, $('.primaryFields'));
              break;

            case 'background.png':
              handleBackgroundImage(zip, zipEntry.name, $pass.find('.side.front'));
              break;

            case 'strip.png':
              handleBackgroundImage(zip, zipEntry.name, $pass.find('.primaryFields'));
              break;*/
            }
          });
        }, function (e) {
          console.log(e.message)
          StoreMod.showNotification("Cannot upload this file.");
        });
      }
    },
    handleJsonData(zip, name){
      var global_this = this;
      zip.file(name).async('string').then(function success(content) {
        var passData = JSON.parse(content);

        global_this.passData = passData;
        if(passData.eventTicket){
          //
        } else if (passData.boardingPass){

        }

      });
    },
    handleLogo(zip, name){
      var global_this = this;
      zip.file(name).async('base64').then(function success(content) {
        global_this.current_logo = content;
      }, function error() {
          StoreMod.showNotification("There was a problem with loading the logo of the pass.");
      });
    }
  }
}
</script>
<style scoped>
div:not(#upload_box){
  width: 100%;
}

#upload_box{
  margin-top:30px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
