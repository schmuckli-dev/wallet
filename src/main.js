import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router';
import firebase from "firebase";

Vue.config.productionTip = false

let app = '';

firebase.initializeApp({
  apiKey: "AIzaSyDAE-MVcia1IvxvjzSTWf0LnmE28CMS3WY",                             // Auth / General Use
  authDomain: "wallet-schmuckli.firebaseapp.com",
  databaseURL: "https://wallet-schmuckli.firebaseio.com/",
  projectId: "wallet-schmuckli"
});

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});
