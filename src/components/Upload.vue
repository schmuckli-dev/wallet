<template>
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

#upload_box{
  margin-top:30px;
}
</style>