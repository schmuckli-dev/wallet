<template>
  <v-card class="pass">
    <v-card-title primary-title>
      <div class="headline" style="margin-bottom:10px;" v-if="passData === undefined">
        {{ title }}
      </div>
      <div style="width:100%;">
        <div v-if="passData !== undefined && title !== ''">
          <span class="headline">{{ title }}</span>
        </div>
        <div v-if="passData !== undefined" style="float:right;width:auto;text-align:right;">
          <img :src="logoSrc" width="50%" v-if="passData !== undefined && current_logo !== ''" >
          <br>
          <span v-if="passData.organizationName !== '' && current_logo === ''">{{ passData.organizationName }}</span>
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
