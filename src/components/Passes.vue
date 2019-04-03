<template>
  <v-layout style="margin-top:50px;" justify-space-around row wrap>
    <v-flex xs12 sm4 v-for="pass in passes" :key="pass.title">
      <Pass />
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
      passes: [1, 2, 3, 4]
    }
  },
  mounted(){
    this.loadPasses();
  },
  methods: {
    loadPasses(){
      var starCountRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/passes');
      starCountRef.on('value', function(snapshot) {
        try {
          var data = Object.entries(snapshot.val());
          
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
