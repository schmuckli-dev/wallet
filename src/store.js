import Vue from 'vue';

export const Store = Vue.observable({
  notification: "",
  currentPass: ""
});

export const StoreMod = {
  showNotification(notification){
    Store.notification = notification;
  },
  setCurrentPass(pass_id){ //For Detail View
    Store.currentPass = pass_id;
  }
};
