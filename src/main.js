import Vue from 'vue'
import App from './App.vue'
import axios from "axios";
import router from "./router";
import config from "./config";
import store from "./store";

Vue.config.productionTip = false

const projectID = config.projectID;
const firestoreURL = `https://firestore.googleapis.com/v1/projects/${projectID}/databases/(default)/documents\n`;
axios.defaults.baseURL = firestoreURL;

store.dispatch('autoLogin').then(() => {
    new Vue({
        store,
        router,
      render: h => h(App),
    }).$mount('#app');
});
