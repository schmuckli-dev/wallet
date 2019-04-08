<template>
  <v-container>
    <v-layout row>
      <v-flex xs6>
        <v-btn @click="back" flat><v-icon>keyboard_arrow_left</v-icon> back</v-btn>
      </v-flex>
      <v-flex xs6 style="text-align:right;">
        <v-btn @click="openEditDialog" flat><v-icon>edit</v-icon> edit</v-btn>
      </v-flex>
    </v-layout>
    <v-slide-y-transition>
      <v-layout justify-space-around row wrap v-show="show">
        <v-flex xs12 sm9 md6 lg4 >
          <v-card class="pass" :style="cardStyle">
            <v-card-title primary-title>
              <slide-up-down :active="frontCardSide" style="width:100%;">
                <div style="width:100%;" id="pass_front">
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
                  <v-layout style="margin-top:20px;" row wrap>
                    <v-flex xs6 v-for="field in frontFields" :key="field.key">
                      <b>{{ convertLabel(getKeyOrLabel(field)) }}</b><br>
                      {{ field.value }}
                    </v-flex>
                  </v-layout>
                </div>
              </slide-up-down>
              <slide-up-down :active="!frontCardSide" style="width:100%;">
                <div style="width:100%;" id="card_back">
                  <v-layout row wrap>
                    <v-flex xs6 v-for="field in backFields" :key="field.key" style="padding:2px;">
                      <b class="field_label" :title="convertLabel(field.label)">{{ convertLabel(field.label) }}</b>
                      <span class="field_value">{{ field.value }}</span>
                    </v-flex>
                  </v-layout>
                </div>
              </slide-up-down>
              <div style="width:100%;text-align:right;" v-if="data.fields !== undefined && data.fields.backFields !== undefined">
                <v-icon style="font-size:20px;color:white;" v-if="!isBackgroundLight" @click="frontCardSide = !frontCardSide" >loop</v-icon>
                <v-icon style="font-size:20px;color:black" v-if="isBackgroundLight" @click="frontCardSide = !frontCardSide">loop</v-icon>
              </div>
            </v-card-title>
            <v-card-actions style="float:right;">
              <v-btn v-if="!data.archive" @click="archivePass" light flat><v-icon style="margin-right:10px;">archive</v-icon> archive</v-btn>
              <v-btn v-if="data.archive" @click="unarchivePass" light flat><v-icon style="margin-right:10px;">unarchive</v-icon> unarchive</v-btn>
              <v-btn @click="deletePass" light flat><v-icon style="margin-right:10px;">delete</v-icon> delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
    <!-- Edit dialog -->
    <v-dialog v-model="dialogEdit" width="500">
      <v-card>
        <v-card-title class="headline lighten-2" primary-title>
          Edit pass
        </v-card-title>
        <v-card-text>
          <v-text-field
              v-model="dialogEditTitle"
              label="Title"
              persistent-hint
            ></v-text-field>
          <p>You can change here the date and time of the passport, if it has not proposed correctly.</p>
          <v-menu
            ref="date"
            v-model="dialogEditDateModal"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="fade-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                  v-model="dialogEditDateFormatted"
                  label="Date"
                  hint="DD.MM.YYYY format"
                  persistent-hint
                  prepend-icon="event"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="dialogEditDate" @input="dialogEditDateModal = false"></v-date-picker>
            </v-menu>
            <v-menu
              ref="time"
              v-model="dialogEditTimeModal"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="dialogEditTime"
              lazy
              transition="fade-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                    v-model="dialogEditTime"
                    label="Time"
                    hint="HH:MM format"
                    persistent-hint
                    prepend-icon="event"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker format="24hr"
                  v-if="dialogEditTimeModal"
                  v-model="dialogEditTime"
                  full-width
                  @click:minute="$refs.time.save(dialogEditTime)"
                ></v-time-picker>
              </v-menu>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="dialogEdit = false">Cancel</v-btn>
          <v-btn flat @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Delete dialog -->
    <v-dialog v-model="dialogDelete" width="500">
      <v-card>
        <v-card-title class="headline lighten-2" primary-title>
          Delete this pass?
        </v-card-title>
        <v-card-text>
          Do you really want to delete this pass?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="dialogDelete = false">Cancel</v-btn>
          <v-btn flat color="red" @click="deleteConfirm">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Vue from "vue";
import { Store, StoreMod } from "./../store.js";
import { lightOrDark } from "../assets/js/color";
import { convertLabel } from "../assets/js/label";
import { getFormattedDate, getFormattedJustDate, getFormattedJustTime, getFormattedJustDateUS } from "../assets/js/date";
import bwipjs from 'bwip-js';
import firebase from "firebase";

import SlideUpDown from 'vue-slide-up-down'
Vue.component('slide-up-down', SlideUpDown)

export default {
  name: "Detail",
  data(){
    return {
      id: "",
      data: {},
      show: false,
      frontCardSide: true,
      dialogDelete: false,
      //Edit dialog
      dialogEdit: false,
      dialogEditTitle: "",
      dialogEditDateModal: "",
      dialogEditDate: this.formattedJustDate,
      dialogEditDateFormatted: this.formattedJustDate,
      dialogEditTimeModal: "",
      dialogEditTime: this.formattedJustTime,
      dialogEditTimeFormatted: this.formattedJustTime
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
    },
    formattedJustDate(){
      return getFormattedJustDate(this.data.date);
    },
    formattedJustTime(){
      return getFormattedJustTime(this.data.date);
    },
    frontFields(){
      if(this.data.fields){
        return (this.data.fields.primaryFields.concat(this.data.fields.secondaryFields)).concat(this.data.fields.auxiliaryFields);
      } else {
        return [];
      }
    },
    backFields(){
      if(this.data.fields){
        return this.data.fields.backFields;
      } else {
        return [];
      }
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

          //Set active pass settings
          global_this.dialogEditTitle = global_this.data.title;
          global_this.dialogEditDate = getFormattedJustDateUS(global_this.data.date);
          global_this.dialogEditTime = getFormattedJustTime(global_this.data.date);


          global_this.renderQrCode();
        }catch(e){
          StoreMod.showNotification("This pass is not available.");
          global_this.$router.replace("home");
        }
      }
    },
    openEditDialog(){
      if (navigator.onLine) {
        this.dialogEdit = true;
      } else {
        StoreMod.showNotification("You can't edit a pass while you are offline.");
      }
    },
    save(){
      var global_this = this;
      var datetime = new Date(this.dialogEditDate + " " + this.dialogEditTime);
      var time = datetime.getTime();

      var title = this.dialogEditTitle;
      firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/passes/" + this.data.id).update({"date": time, "title": title}, function (error) {
        if (error) {
          StoreMod.showNotification("There was an error while updating the pass.");
        } else {
          //Update fields directly for card
          global_this.data.date = time;
          global_this.data.title = title;

          StoreMod.showNotification("The pass has been updated.");
          global_this.dialogEdit = false;
        }
      });
    },
    archivePass(){
      var global_this = this;
      //Delete the pass
      firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/passes/" + this.data.id).update({"archive": true}, function (error) {
        if (error) {
          StoreMod.showNotification("There was an error while archiving the pass.");
        } else {
          StoreMod.showNotification("The pass has been archived.");
          global_this.$router.replace("home");
        }
      });
    },
    unarchivePass(){
      var global_this = this;
      //Delete the pass
      firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/passes/" + this.data.id).update({"archive": null}, function (error) {
        if (error) {
          StoreMod.showNotification("There was an error while archiving the pass.");
        } else {
          StoreMod.showNotification("The pass has been unarchived.");
          global_this.$router.replace("archive");
        }
      });
    },
    deletePass(){
      if(navigator.onLine){
        this.dialogDelete = true;
      } else {
        StoreMod.showNotification("You can't delete a pass while you're offline.");
      }
    },
    deleteConfirm(){
      this.dialogDelete = false;
      var global_this = this;
      //Delete the pass
      firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/passes/" + this.data.id).set(null, function (error) {
        if (error) {
          StoreMod.showNotification("There was an error while deleting the pass.");
        } else {
          StoreMod.showNotification("The pass has been deleted.");
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
        case "PKBarcodeFormatPDF417":
          type = "pdf417"
          break;
        default:
          //Detect new formats
          //console.log(this.data.barcode.format);
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
    getKeyOrLabel(field){
      if(field.label){
        return field.label;
      } else {
        return field.key;
      }
    },
    parseDate(date){
      return getFormattedJustDate(date);
    },
    convertLabel(label){
      return convertLabel(label);
    },
    back(){
      StoreMod.setCurrentPass("");
      if(this.data.archive){
        this.$router.replace("archive");
      } else {
        this.$router.replace("home");
      }
    }
  },
  watch: {
    dialogEditDate (val) {
      this.dialogEditDateFormatted = this.parseDate(val)
    }
  }
}
</script>
<style scoped>
.field_label{
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.field_value{
  display: block;
  white-space: normal;
  text-overflow: ellipsis;
  overflow: hidden;
}
.link{
  text-decoration: underline;
}
</style>
