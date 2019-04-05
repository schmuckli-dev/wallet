<template>
  <v-slide-y-transition>
    <v-card class="pass" :style="cardStyle" v-show="show" @click="openPass">
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
        </div>
      </v-card-title>
    </v-card>
  </v-slide-y-transition>
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
    index: Number,
    id: String,
    title: String,
    date: Number,
    type: String,
    logo: String,
    backgroundColor: String,
    foregroundColor: String,
    organization: String,
    full: String
  },
  data(){
    return {
      show: false
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
      StoreMod.setCurrentPass(this.full);
      this.$router.replace("pass");
    }
  },
  mounted(){
    //Fade animation effect on load
    var global_this = this;
    setTimeout(function(){
      global_this.show = true;
    }, 80 * this.index);
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
