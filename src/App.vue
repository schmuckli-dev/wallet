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
      <FirebaseAuth/>
    </v-content>
  </v-app>
</template>

<script>
import FirebaseAuth from './components/FirebaseAuth'

export default {
  name: 'App',
  components: {
    FirebaseAuth
  },
  data () {
    return {
      //
    }
  }
}
</script>
