<template>
  <v-layout style="margin-top:50px;" justify-space-around row wrap>
    <v-flex xs12 sm4 md3 v-for="pass in passes" :key="pass.id">
      <Pass
      :title="pass.title"
      :type="pass.type"
      :backgroundColor="pass.backgroundColor"
      :foregroundColor="pass.foregroundColor"
      :organization="pass.organization"
      :date="pass.date"
      :logo="pass.logo"
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
      passes: []
    }
  },
  mounted(){
    this.loadPasses();
  },
  methods: {
    loadPasses(){
      var global_this = this;

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
        }catch(e){
          StoreMod.showNotification("There are no passes stored.");
        }
      });
    }
  },
  components: {
    Pass
  }
}
</script>
