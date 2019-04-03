<template>
  <v-app>
    <v-toolbar color="#9D6447" style="color:white;" app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Wallet</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        dark
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
        color="#9D6447"
        flat
        @click="notification = ''"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { Store, StoreMod } from "./store.js";

export default {
  name: 'App',
  computed: {
    notification: {
      get() { return Store.notification !== "" },
      set() { StoreMod.showNotification(""); }
    },
    notification_text(){
      return Store.notification;
    }
  }
}
</script>
