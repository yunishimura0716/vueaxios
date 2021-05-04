import Vue from 'vue'
import App from './App.vue'
import axios from "axios";

Vue.config.productionTip = false

const projectID = "vueaxios-9795a";
const firestoreURL = `https://firestore.googleapis.com/v1/projects/${projectID}/databases/(default)/documents\n`;
axios.defaults.baseURL = firestoreURL;
axios.interceptors.request.use(
    config => {
      console.log(config);
    },
    error => {
        console.log(error);
    })
axios.interceptors.response

new Vue({
  render: h => h(App),
}).$mount('#app')
