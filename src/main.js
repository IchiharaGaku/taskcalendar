import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";

Vue.config.productionTip = false;

const config = {
  apiKey: "AIzaSyCPC5p9RBPPUsIShl8CYb63py-6Xa6370Y",
  projectId: "taskcalender-588c7",
  authDomain: "taskcalender-588c7.firebaseapp.com",
  databaseURL: "https://taskcalender-588c7.firebaseio.com",
  storageBucket: "taskcalender-588c7.appspot.com",
};

firebase.initializeApp(config);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
