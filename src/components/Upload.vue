<template>
  <v-card id="upload_box" :style="cardStyle">
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
      <p v-if="passData !== undefined">
        <v-layout row wrap>
          <v-flex xs12 sm6>
            <div v-if="passData !== undefined && current_logo !== ''">
              <img :src="logoSrc" width="75%">
            </div>
          </v-flex>
          <v-flex xs12 sm6 style="text-align:right;">
            <div v-if="passData !== undefined && passData.organizationName !== ''">
              <b>{{ passData.organizationName }}</b>
            </div>
          </v-flex>
        </v-layout>

        <div v-if="passData !== undefined && relevantDate !== ''">
          <b>Date & Time</b><br>
          {{ relevantDate }}
        </div>
        <br>

      </p>
    </v-card-title>
    <v-card-actions v-if="passData !== undefined">
      <v-btn v-if="!isBackgroundLight" dark flat>Add to wallet</v-btn>
      <v-btn v-if="isBackgroundLight" light flat>Add to wallet</v-btn>

      <v-btn v-if="!isBackgroundLight" @click="resetPassData" dark flat>Cancel</v-btn>
      <v-btn v-if="isBackgroundLight" @click="resetPassData" light flat>Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { StoreMod } from "../store.js";
import { lightOrDark } from "../assets/js/color";
import { getFormattedDate } from "../assets/js/date";
var JSZip = require("jszip");

export default{
  name: "Upload",
  data(){
    return {
      passData: undefined,
      current_logo: undefined
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
    }
  },
  methods: {
    resetPassData(){
      this.passData = undefined;
    },
    upload(e){
      var files = e.target.files;
      var global_this = this;

      console.log(files);
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
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
          StoreMod.showNotification(e.message);
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
      }, function error(e) {
          global_this.showNotification("There was a problem with loading the logo of the pass.");
      });
    }
  }
}
</script>
<style scoped>
div{
  width: 100%;
}
</style>
