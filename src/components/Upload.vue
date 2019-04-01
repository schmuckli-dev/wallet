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
        <div v-if="passData !== undefined && passData.description !== ''">
          <b>Description</b><br>
          {{ passData.description }}
        </div>
        <br>
        <div v-if="passData !== undefined && passData.organizationName !== ''">
          <b>Organization</b><br>
          {{ passData.organizationName }}
        </div>
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
var JSZip = require("jszip");

export default{
  name: "Upload",
  data(){
    return {
      passData: undefined
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

            /*case 'logo.png':
              handleForegroundImage(zip, zipEntry.name, $('.headerFields'));
              break;

            case 'thumbnail.png':
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
        }

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
