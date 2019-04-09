<template>
  <v-flex xs12 sm4>
    <v-card class="pass" id="upload_box" :style="cardStyle">
      <v-card-title primary-title>
        <div v-if="passData === undefined" style="text-align:center;">
          <div class="headline" style="margin-bottom:10px;">
            {{ $t("upload.uploadNewPass") }}
          </div>
          <v-btn @click='openFileDialog'>
            <v-icon style="margin-right:10px;">cloud_upload</v-icon> {{ $t("upload.upload") }}
          </v-btn>
          <input id="upload_file" style="display:none;"
            @change="upload($event)"
            type="file">
          <p>{{ $t("upload.uploadDescription") }}</p>
        </div>
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
            <b>{{ $t("detail.dateTime") }}</b><br>
            {{ relevantDateFormatted }}
          </div>
          <div style="margin-top:10px;" v-if="passData !== undefined && ticketType !== ''">
            <b>{{ $t("detail.type") }}</b><br>
            {{ ticketType }}
          </div>
        </div>
      </v-card-title>
      <v-card-actions v-if="passData !== undefined && !isSavingPass">
        <v-btn v-if="!isBackgroundLight" @click="addToWallet" dark flat>{{ $t("upload.addToWallet") }}</v-btn>
        <v-btn v-if="isBackgroundLight" @click="addToWallet" light flat>{{ $t("detail.addToWallet") }}</v-btn>

        <v-btn v-if="!isBackgroundLight" @click="resetPassData" dark flat>{{ $t("general.cancel") }}</v-btn>
        <v-btn v-if="isBackgroundLight" @click="resetPassData" light flat>{{ $t("general.cancel") }}</v-btn>
      </v-card-actions>
      <v-card-actions v-if="passData !== undefined && isSavingPass">
        <v-progress-linear :indeterminate="true" v-if="!isBackgroundLight" color="white"></v-progress-linear>
        <v-progress-linear :indeterminate="true" v-if="isBackgroundLight" color="black"></v-progress-linear>
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
    relevantDateFormatted(){
      return getFormattedDate(this.relevantDate);
    },
    relevantDate(){
      try{
        if(this.passData.eventTicket){ //If event ticket
          return new Date(this.passData.relevantDate);
        } else if (this.passData.boardingPass){ //If boarding pass
          //Try to fetch the time
          if(this.passData.relevantDate !== undefined){
            return new Date(this.passData.relevantDate);

            //For Swiss Airlines passes
          } else if (this.passData.boardingPass.auxiliaryFields && this.passData.boardingPass.auxiliaryFields[1] && this.passData.boardingPass.auxiliaryFields[1].value != undefined
          && this.passData.boardingPass.auxiliaryFields && this.passData.boardingPass.auxiliaryFields[2] && this.passData.boardingPass.auxiliaryFields[2].value != undefined){
            return new Date(this.passData.boardingPass.auxiliaryFields[1].value + " " + this.passData.boardingPass.auxiliaryFields[2].value);
          } else {
            return new Date();
          }
        } else {
          return new Date();
        }
      }catch(e){
        return new Date();
      }
    },
    title(){
      try {
        if(this.passData.eventTicket){ //If event ticket
          return this.passData.eventTicket.primaryFields[0].value;
        } else if (this.passData.boardingPass){ //If boarding pass
          if(this.passData.boardingPass.transitType === "PKTransitTypeAir"){ //If Airplane
            return this.passData.boardingPass.primaryFields[0].value + " ✈ " + this.passData.boardingPass.primaryFields[1].value;
          } else { //All other transports
            return this.passData.boardingPass.primaryFields[0].value + " → " + this.passData.boardingPass.primaryFields[1].value;
          }
        } else if(this.passData.generic) {
          return this.passData.generic.primaryFields[0].value;
        } else {
          return "Other";
        }
      } catch (e){
        return "";
      }
    },
    fields(){
      try {
        if(this.passData.eventTicket){
          return this.passData.eventTicket;
        } else if (this.passData.boardingPass){
          return this.passData.boardingPass;
        } else if (this.passData.generic){
          return this.passData.generic;
        } else {
          return {};
        }
      } catch (e){
        return {};
      }
    },
    ticketType(){
      try {
        if(this.passData.eventTicket){
          return "Event";
        } else if (this.passData.boardingPass){
          return "Boarding-Pass";
        } else if (this.passData.generic){
          return "General"
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

      var saveData = {
        title: this.title,
        logo: this.current_logo,
        type: this.ticketType,
        date: this.relevantDate.getTime(),
        backgroundColor: this.passData.backgroundColor,
        foregroundColor: this.passData.foregroundColor,
        organization: this.passData.organizationName,
        fields: this.fields,
        barcode: this.passData.barcode
      };

      var realDBRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/passes").push();
      realDBRef.set(
        saveData, function(error) {
        if (error) {
          global_this.isSavingPass = false;
          StoreMod.showNotification("There was an error while saving the pass: " + error);
        } else {
          //Store the untouched .pkpass file to the storage bucket.
          var storageFile = firebase.storage().ref("users/" + firebase.auth().currentUser.uid + "/passes/" + realDBRef.key + ".pkpass");
          storageFile.put(global_this.currentFile).then(function() {
            global_this.isSavingPass = false;
            global_this.$router.replace("home");
            global_this.resetPassData();
            StoreMod.showNotification("The pass has been saved.");
          });
        }
      });
    },
    openFileDialog(){
      document.getElementById("upload_file").click();
    },
    upload(e){
      var files = e.target.files;
      var global_this = this;

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
        }, function () {
          StoreMod.showNotification("Cannot upload this file.");
        });
      }
    },
    handleJsonData(zip, name){
      var global_this = this;
      zip.file(name).async('string').then(function success(content) {
        var passData = JSON.parse(content);
        global_this.passData = passData;
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
