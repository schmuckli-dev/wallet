<template>
  <v-container>
    <v-btn @click="back" flat><v-icon>keyboard_arrow_left</v-icon> back</v-btn>
    <v-slide-y-transition>
      <v-layout justify-space-around row wrap v-show="show">
        <v-flex xs12 sm6 md4>
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
            <v-card-actions style="float:right;">
              <v-btn v-if="isOnline" @click="deletePass" light flat><v-icon style="margin-right:10px;">delete</v-icon> delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
    <!-- Delete dialog -->
    <v-dialog
      v-model="dialogDelete"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline lighten-2"
          primary-title
        >
          Delete this pass?
        </v-card-title>

        <v-card-text>
          Do you really want to delete this pass?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            flat
            @click="deleteConfirm"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { Store, StoreMod } from "./../store.js";
import { lightOrDark } from "../assets/js/color";
import bwipjs from 'bwip-js';
import firebase from "firebase";

import { getFormattedDate } from "../assets/js/date";

export default {
  name: "Detail",
  data(){
    return {
      id: "",
      data: {},
      show: false,
      dialogDelete: false
    }
  },
  computed: {
    isBackgroundLight(){
      try{
        return lightOrDark(this.data.backgroundColor) == 'light';
      }catch(e){
        return false;
      }
    },
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

    //Fade animation effect on load
    var global_this = this;
    setTimeout(function(){
      global_this.show = true;
    }, 80);
  },
  methods: {
    loadData(){
      var global_this = this;

      this.id = Store.currentPass;
      if (this.id === "") { //Redirect to home if loaded without id
        StoreMod.showNotification("Please select a pass.");
        this.$router.replace("home");
      } else {
        try{
          global_this.data = Store.currentPass;
          global_this.renderQrCode();
        }catch(e){
          StoreMod.showNotification("This pass is not available.");
          global_this.$router.replace("home");
        }
      }
    },
    deletePass(){
      this.dialogDelete = true;
    },
    deleteConfirm(){
      this.dialogDelete = false;
      var global_this = this;
      //Delete the pass
      firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/passes/" + this.data.id).set(null, function (error) {
        if (error) {
          StoreMod.showNotification("There was an error while deleting the app.");
        } else {
          StoreMod.showNotification("The pass has been deleted");
          global_this.$router.replace("home");
        }
      });
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
    isOnline(){
      return navigator.onLine;
    },
    back(){
      StoreMod.setCurrentPass("");
      this.$router.replace("home");
    }
  }
}
</script>
