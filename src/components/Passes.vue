<template>
  <v-layout justify-space-around row wrap>
    <v-progress-circular
      :size="70"
      :width="7"
      color="#9D6447" style="margin-top:30px;"
      indeterminate v-if="!loaded"
    ></v-progress-circular>
    <v-flex xs12 sm4 md3 v-for="(pass, index) in passes" :key="pass.id">
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
import Pass from "../components/Pass";
import firebase from "firebase";

export default {
  name: "Passes",
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
        var passesRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/passes').orderByChild("date");
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
            window.localStorage.setItem("passes", JSON.stringify(global_this.passes));
          }catch(e){
            StoreMod.showNotification("There are no passes stored.");
          }
        });
      } else {
        global_this.passes = JSON.parse(window.localStorage.getItem("passes"));
      }
    }
  },
  components: {
    Pass
  }
}
</script>
