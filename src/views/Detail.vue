<template>
  <v-container>
    <v-btn @click="back" flat><v-icon>keyboard_arrow_left</v-icon> back</v-btn>
    <v-card class="pass" :style="cardStyle">
      <v-card-title primary-title>
        <div style="width:100%;">
          <div class="headerCard">
            <div :style="logoSrc" style="width:100%;height:100px;
            -webkit-mask-image:-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
          mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0));" v-if="data.logo !== ''"></div>
            <div style="float:right;width:auto;text-align:right;">

              <br>
              <span v-if="data.organization !== '' && data.logo === ''">{{ data.organization }}</span>
            </div>
            <div class="headline" style="margin-bottom:10px;">
              {{ data.title }}
            </div>
          </div>
          <v-layout style="margin-top:20px;" row>
            <v-flex xs6 v-if="data.date !== ''">
              <b>Date &amp; Time</b><br>
              {{ formattedDate }}
            </v-flex>
            <v-flex xs6 v-if="data.type !== ''">
              <b>Type</b><br>
              {{ data.type }}
            </v-flex>
          </v-layout>
          <div style="text-align:center;margin-top:40px;">
            <canvas id="barcode" style="width:200px;"></canvas>
          </div>
        </div>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
import { Store, StoreMod } from "./../store.js";
import firebase from "firebase";
import bwipjs from 'bwip-js';

import { getFormattedDate } from "../assets/js/date";

export default {
  name: "Detail",
  data(){
    return {
      id: "",
      data: {}
    }
  },
  computed: {
    cardStyle(){
      try{
        return "background-color: " + this.data.backgroundColor + ";color:" + this.data.foregroundColor;
      }catch(e){
        return "";
      }
    },
    logoSrc(){
      return "background-image:url(data:image/png;base64," + this.data.logo + ");background-size:cover;background-repeat:no-repeat;";
    },
    formattedDate(){
      return getFormattedDate(this.data.date);
    }
  },
  mounted(){
    this.loadData();
  },
  methods: {
    loadData(){
      var global_this = this;

      this.id = Store.currentPass;
      if (this.id === "") { //Redirect to home if loaded without id
        StoreMod.showNotification("Please select a pass.");
        this.$router.replace("home");
      } else {
        var passRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/passes/' + this.id);
        passRef.on('value', function(snapshot) {
          try {
            global_this.passes = [];
            var data = snapshot.val();
            global_this.data = data;
            global_this.renderQrCode();
          }catch(e){
            StoreMod.showNotification("This pass is not available.");
            global_this.$router.replace("home");
          }
        });
      }
    },
    renderQrCode(){
      var type = "qrcode";
      switch(this.data.barcode.format){
        case "PKBarcodeFormatAztec":
          type = "azteccode"
          break;
        case "PKBarcodeFormatQR":
          type = "qrcode";
          break;
        default:
          //Detect new formats
          break;
      }
      bwipjs('barcode', {
            bcid:        type,       // Barcode type
            text:        this.data.barcode.message,    // Text to encode
            scale:       3,               // 3x scaling factor
            /*height:      20,*/              // Bar height, in millimeters
            includetext: true,            // Show human-readable text
            textxalign:  'center',        // Always good to set this
        }, function (err) {
            if (err) {
              StoreMod.showNotification("There was an error while creating the barcode");
            }
        });
    },
    back(){
      StoreMod.setCurrentPass("");
      this.$router.replace("home");
    }
  }
}
</script>
