<template>
  <v-card class="pass" :style="cardStyle">
    <v-card-title primary-title>
      <div style="width:100%;">
        <div :style="logoSrc" style="width:100%;height:100px;
        -webkit-mask-image:-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
      mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0));" v-if="logo !== ''"></div>
        <div style="float:right;width:auto;text-align:right;">

          <br>
          <span v-if="organization !== '' && logo === ''">{{ organization }}</span>
        </div>
        <div class="headline" style="margin-bottom:10px;">
          {{ title }}
        </div>
        <div v-if="passData !== undefined && relevantDate !== ''">
          <b>Date & Time</b><br>
          {{ relevantDate }}
        </div>
        <div style="margin-top:10px;" v-if="passData !== undefined && ticketType !== ''">
          <b>Type</b><br>
          {{ ticketType }}
        </div>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default{
  name: "Pass",
  props:{
    title: String,
    date: String,
    type: String,
    logo: String,
    backgroundColor: String,
    foregroundColor: String,
    organization: String
  },
  computed: {
    cardStyle(){
      try{
        return "background-color: " + this.backgroundColor + ";color:" + this.foregroundColor;
      }catch(e){
        return "";
      }
    },
    logoSrc(){
      return "background-image:url(data:image/png;base64," + this.logo + ");background-size:cover;background-repeat:no-repeat;";
    },
  }
}
</script>

<style scoped>
.pass{
  margin-top: 30px;
  margin-left: 10px;
  margin-right: 10px;
}

.pass_inner{
  width: 100%;
}
</style>
