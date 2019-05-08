import Vue from 'vue'
import VueI18n from 'vue-i18n'
import './plugins/vuetify'
import { translations, getLanguage } from './translation.js';
import App from './App.vue'
import router from './router';
import firebase from "firebase";

Vue.config.productionTip = false

Vue.use(VueI18n);

let app = '';

firebase.initializeApp({
  apiKey: "AIzaSyDAE-MVcia1IvxvjzSTWf0LnmE28CMS3WY",
  authDomain: "wallet-schmuckli.firebaseapp.com",
  databaseURL: "https://wallet-schmuckli.firebaseio.com",
  projectId: "wallet-schmuckli",
  storageBucket: "wallet-schmuckli.appspot.com",
  messagingSenderId: "690999163645",
  appId: "1:690999163645:web:3164810de5f2f015"
});

firebase.performance();

const i18n = new VueI18n({
  locale: getLanguage(), // set locale
  fallbackLocale: 'en',
  messages: translations // set locale messages
});

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      i18n,
      render: h => h(App)
    }).$mount('#app');
  }
});
