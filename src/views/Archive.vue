<template>
  <v-container>
    <div style="text-align:center;margin-top:50px;">
      <v-btn @click="goHome" flat><v-icon style="margin-right:10px;">unarchive</v-icon>  {{ $t("app.showCurrentPasses") }}</v-btn>
    </div>
    <Passes :showArchived="true" />
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
