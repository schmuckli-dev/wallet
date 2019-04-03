<template>
  <v-card class="pass" :style="cardStyle">
    <v-card-title primary-title>
      <div style="width:100%;">
        <div class="headerCard" @click="isDetailOpen = !isDetailOpen">
          <div :style="logoSrc" style="width:100%;height:100px;
          -webkit-mask-image:-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
        mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0));" v-if="logo !== ''"></div>
          <div style="float:right;width:auto;text-align:right;">

            <br>
            <span v-if="organization !== '' && logo === ''">{{ organization }}</span>
          </div>
          <div class="headline" style="margin-bottom:10px;">
            {{ title }}
          </div>
        </div>
        <slide-up-down :active="isDetailOpen" :duration="300">
          <div v-if="date !== ''">
            <b>Date & Time</b><br>
            {{ formattedDate }}
          </div>
          <div style="margin-top:10px;" v-if="type !== ''">
            <b>Type</b><br>
            {{ type }}
          </div>
        </slide-up-down>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
import Vue from "vue";
import SlideUpDown from 'vue-slide-up-down';

import { getFormattedDate } from "../assets/js/date";

Vue.component('slide-up-down', SlideUpDown)

export default{
  name: "Pass",
  props:{
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
