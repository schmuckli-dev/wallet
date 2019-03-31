import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import firebase from "firebase";

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: "AIzaSyDAE-MVcia1IvxvjzSTWf0LnmE28CMS3WY",                             // Auth / General Use
});

new Vue({
  render: h => h(App),
}).$mount('#app')
