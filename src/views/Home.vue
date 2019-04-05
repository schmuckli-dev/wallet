<template>
  <v-container>
    <Passes />
  </v-container>
</template>

<script>
import Passes from "../components/Passes";

export default {
  name: "Home",
  components:{
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
