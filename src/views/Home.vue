<template>
  <v-container>
    <Passes />
    <Upload />
  </v-container>
</template>

<script>
import Upload from "../components/Upload";
import Passes from "../components/Passes";

export default {
  name: "Home",
  components:{
    Upload,
    Passes
  }
}
</script>

<style>
.form_card{
  width:50%;
}
@media only screen and (max-width: 600px) {
  .form_card {
    width:100%;
  }
}
</style>
