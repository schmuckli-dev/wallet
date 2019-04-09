<template>
  <v-container>
    <v-btn @click="back" flat><v-icon>keyboard_arrow_left</v-icon> {{ $t("general.back") }}</v-btn>
    <v-slide-y-transition>
      <v-layout justify-space-around row wrap v-show="show">
        <Upload />
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import Upload from "../components/Upload";

export default {
  name: "Home",
  data(){
    return {
      show: false
    }
  },
  components:{
    Upload
  },
  methods: {
    back(){
      this.$router.replace("home");
    }
  },
  mounted(){
    //Fade animation effect on load
    var global_this = this;
    setTimeout(function(){
      global_this.show = true;
    }, 80);
  }
}
</script>
