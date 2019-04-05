<template>
  <v-card class="pass" :style="cardStyle" @click="openPass">
    <v-card-title primary-title>
      <div style="width:100%;">
        <div class="headerCard">
          <div :style="logoSrc" style="width:100%;height:100px;
          -webkit-mask-image:-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
        mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0));" v-if="logo !== ''"></div>
          <div style="float:right;width:auto;text-align:right;">

            <br>
            <span v-if="organization !== '' && logo === ''">{{ organization }}</span>
          </div>
          <div class="headline" :title="title" style="margin-bottom:10px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">
            {{ title }}
          </div>
        </div>
        <!--<slide-up-down :active="isDetailOpen" :duration="300">
          <v-layout style="margin-top:20px;" row>
            <v-flex xs6 v-if="date !== ''">
              <b>Date &amp; Time</b><br>
              {{ formattedDate }}
            </v-flex>
            <v-flex xs6 v-if="type !== ''">
              <b>Type</b><br>
              {{ type }}
            </v-flex>
          </v-layout>
          <v-btn v-if="isBackgroundLight" style="float:right;" light flat >Show pass</v-btn>
          <v-btn v-if="!isBackgroundLight" style="float:right;" dark flat @click="openPass">Show pass</v-btn>
        </slide-up-down>-->
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
import Vue from "vue";
import SlideUpDown from 'vue-slide-up-down';
import { lightOrDark } from "../assets/js/color";
import { StoreMod } from "../store.js";

import { getFormattedDate } from "../assets/js/date";

Vue.component('slide-up-down', SlideUpDown)

export default{
  name: "Pass",
  props:{
    id: String,
    title: String,
    date: Number,
    type: String,
    logo: String,
    backgroundColor: String,
    foregroundColor: String,
    organization: String
  },
  data(){
    return {
      isDetailOpen: false
    }
  },
  computed: {
    isBackgroundLight(){
      try{
        return lightOrDark(this.backgroundColor) == 'light';
      }catch(e){
        return false;
      }
    },
    cardStyle(){
      try{
        return "background-color: " + this.backgroundColor + ";color:" + this.foregroundColor;
      }catch(e){
        return "";
      }
    },
    logoSrc(){
      return "background-image:url(data:image/png;base64," + this.logo + ");background-size:cover;background-repeat:no-repeat;";
    },
    formattedDate(){
      return getFormattedDate(this.date);
    }
  },
  methods: {
    openPass(){
      StoreMod.setCurrentPass(this.id);
      this.$router.replace("pass");
    }
  }
}
</script>

<style scoped>
.pass{
  margin-top: 30px;
  margin-left: 10px;
  margin-right: 10px;
}
.pass_inner{
  width: 100%;
}
.headerCard{
  cursor: pointer;
}
</style>
