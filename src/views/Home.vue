<template>
  <v-container>
    <Passes />
    <div style="text-align:center;margin-top:50px;">
      <v-btn @click="goArchive" flat><v-icon style="margin-right:10px;">archive</v-icon> {{ $t("app.showArchivedPasses") }}</v-btn>
    </div>
  </v-container>
</template>

<script>
import { StoreMod } from "./../store";
import Passes from "../components/Passes";

export default {
  name: "Home",
  components:{
    Passes
  },
  methods: {
    goArchive(){
      if (navigator.onLine) {
        this.$router.replace("archive");
      } else {
        StoreMod.showNotification("notification.youCantVisitTheArchiveWhileYouAreOffline");
      }
    }
  }
}
</script>
