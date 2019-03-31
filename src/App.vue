<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Wallet</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="#"
        target="_blank"
      >
        <span class="mr-2">About</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>

    <!-- Notification -->
    <v-snackbar
      v-model="notification"
    >
      {{ notification_text }}
      <v-btn
        color="pink"
        flat
        @click="notification = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { Store } from "./store.js";

export default {
  name: 'App',
  computed: {
    notification(){
      return Store.notification !== ""
    },
    notification_text(){
      return Store.notification;
    }
  }
}
</script>
