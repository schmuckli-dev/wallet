<template>
  <v-card class="form_card">
    <h2>Main features</h2>
    <v-list three-line>
      <v-list-tile>
        <v-list-tile-avatar>
          <v-icon color="blue" style="font-size:40px;">cloud</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>Backup</v-list-tile-title>
          <v-list-tile-sub-title>Just upload your passes like boarding pass or event ticket and keep them save in one place.</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-avatar>
          <v-icon color="red" style="font-size:40px;">offline_bolt</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>Offline</v-list-tile-title>
          <v-list-tile-sub-title>Thanks to the power of progessive web apps, you can also access your current passes even without an active internet connection.</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-avatar>
          <v-icon color="green" style="font-size:40px;">archive</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>Archive</v-list-tile-title>
          <v-list-tile-sub-title>You don't have to delete your passes. Keep the memories to your event in your archive.</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>
