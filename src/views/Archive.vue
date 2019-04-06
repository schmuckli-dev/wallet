<template>
  <v-container>
    <Passes :showArchived="true" />
    <div style="text-align:center;margin-top:50px;">
      <v-btn @click="goHome" flat>Show current passes</v-btn>
    </div>
  </v-container>
</template>

<script>
import Passes from "../components/Passes";

export default {
  name: "Home",
  components:{
    Passes
  },
  methods: {
    goHome(){
      this.$router.replace("home")
    }
  }
}
</script>
