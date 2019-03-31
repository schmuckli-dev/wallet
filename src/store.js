import Vue from 'vue';

export const Store = Vue.observable({
  notification: ""
});

export const StoreMod = {
  showNotification(notification){
    Store.notification = notification;
  }
};
