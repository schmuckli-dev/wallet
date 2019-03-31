<template>
  <v-card id="upload_box">
    <v-card-title primary-title>
      <div class="headline" style="width:100%;margin-bottom:10px;">New Ticket</div>
      <p v-if="passData === undefined">
        Upload here your .pkpass file<br>
        <input
          v-on:input="upload($event)"
          type="file">
      </p>
    </v-card-title>
  </v-card>
</template>
<script>
import { StoreMod } from "../store.js";
var JSZip = require("jszip");

export default{
  name: "Upload",
  data(){
    return {
      passData: undefined
    }
  },
  methods: {
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

        document.getElementById("upload_box").style.backgroundColor = passData.backgroundColor;
        document.getElementById("upload_box").style.color = passData.foregroundColor;
        global_this.passData = passData;
      });
    }
  }
}
</script>
