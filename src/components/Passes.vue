<template>
  <v-layout justify-space-around row wrap>
    <v-progress-circular
      :size="70"
      :width="7"
      color="#9D6447" style="margin-top:30px;"
      indeterminate v-if="!loaded"
    ></v-progress-circular>
    <v-flex xs12 style="text-align:center;" v-if="passes.length === 0 && loaded">
      <v-icon style="display:block;font-size:100px;color:black;">inbox</v-icon>
    </v-flex>
    <v-flex xs12 style="text-align:center;" v-if="passes.length === 0 && loaded">
      <p style="display:block;">No passes stored yet.<br>Add one with the button at the bottom right.</p>
    </v-flex>
    <v-flex xs12 sm4 md3 v-for="(pass, index) in passes" :key="pass.id">
      <h3 v-if="index == 0">{{ getMonthYear(pass.date) }}</h3>
      <h3 v-if="passes[index-1] && getMonthYear(pass.date) !== getMonthYear(passes[index-1].date)">{{ getMonthYear(pass.date) }}</h3>
      <h3 v-if="passes[index-1] && getMonthYear(pass.date) === getMonthYear(passes[index-1].date)" class="hidden-xs-only">&nbsp;</h3>
      <Pass
      :index="index"
      :id="pass.id"
      :title="pass.title"
      :type="pass.type"
      :backgroundColor="pass.backgroundColor"
      :foregroundColor="pass.foregroundColor"
      :organization="pass.organization"
      :date="pass.date"
      :logo="pass.logo"
      :full="pass"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import { StoreMod } from "../store.js";
import { getMonthYear } from "../assets/js/date.js";
import Pass from "../components/Pass";
import firebase from "firebase";

export default {
  name: "Passes",
  props: {
    showArchived: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      passes: [],
      loaded: false
    }
  },
  mounted(){
    this.loadPasses();
  },
  methods: {
    loadPasses(){
      var global_this = this;

      if(navigator.onLine){
        var passesRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/passes').orderByChild("archive").equalTo(this.showArchived);
        passesRef.on('value', function(snapshot) {
          try {
            global_this.passes = [];
            var data = Object.entries(snapshot.val());
            data.sort(function(a, b){return a[1].date - b[1].date}); //Sort by newest
            data.reverse(); //Newest to the front
            data.forEach(function(pass){
              global_this.passes.push(Object.assign(pass[1], {id: pass[0]}));
            });
            global_this.loaded = true;
            if(global_this.showArchived !== true){ //Do not save archive for offline usage
              window.localStorage.setItem("passes", JSON.stringify(global_this.passes));
            }
          }catch(e){
            global_this.loaded = true;
          }
        });
      } else {
        global_this.passes = JSON.parse(window.localStorage.getItem("passes"));
        global_this.loaded = true;
        StoreMod.showNotification("Loading offline passes.");
      }
    },
    getMonthYear(timestamp){
      return getMonthYear(timestamp);
    }
  },
  components: {
    Pass
  }
}
</script>

<style scoped>
h3{
  margin:10px;
  margin-top: 30px;
  color:grey;
}
</style>
